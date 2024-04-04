import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import AdbIcon from '@mui/icons-material/Adb';

import SearchPage from './pages/SearchForm';
import GettingStartedPage from './pages/GettingStartedPage';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#d32f2f',
    width:'100vw'
  },
}));
function App() {
  const classes = useStyles();
  return (
    <Router>
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography variant="h6">Games Scout</Typography>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<GettingStartedPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;