import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import bgImage from '../images/img.png';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { PanoramaSharp, SettingsOutlined } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginTop: '1rem',
    backgroundColor: '#d32f2f',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#b71c1c',
    },
  },
}));

const SearchPage = () => {
  const classes = useStyles();
  const [title, setTitle] = useState()
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [games, setGames] = useState([]);
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8000/api';
  useEffect(() => {
    axios.get(`${baseUrl}/genres/`).then((res) => {
      setGenres(res.data.data)
    })

    axios.get(`${baseUrl}/games/`).then((res) => {
      setGames(res.data.data)
    })
  }, [])
  const handleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== parseInt(value)));
    }
  };
  const handleChangeRating = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setRatings([...ratings, name]);
    } else {
      setRatings(ratings.filter((rating) => rating !== name));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams()
    params.append('genres', selectedGenres);
    params.append('title', title)
    params.append('rating', ratings)
    navigate({pathname: '/search-result', search: '?' + params.toString()})
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflowX:'hidden',
    overflowY : 'hidden',   
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.90)',
          padding: '2rem',
          borderRadius: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin:'4rem',
          overflowX: 'hidden',
          overflowY : 'hidden',
          alignItems: 'center',
        }}
      >
        <h1>Search for Games</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Search by title"
            variant="outlined"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <div>
            <h5>Genres:</h5>
            {genres.map((genre) => (
              <FormControlLabel
                key={genre.id}
                control={<Checkbox name='genre' onChange={handleChange} />}
                value={genre.id}
                label={genre.name}
              />
            ))}
          <h5>Ratings:</h5>
          {[
            '5 ','4+ ','3+ ','2+','1'
          ].map((ratings) =>(
            <FormControlLabel
              control={<Checkbox name={ratings} onChange={handleChangeRating} />}
              label={ratings}
            />
          ))}
          </div>
          <Button
            variant="contained"
            className={classes.button}
            size="large"
            type="submit"
          >
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;