import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CharacterCreate from './components/CharacterCreate/CharacterCreate';
import Details from './components/Details/Details';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <LandingPage />} />
        <Route path='/home' element={ <Home />} />
        <Route path='/character' element={ <CharacterCreate />} />
        <Route path='/characters/:id' element={ <Details />} />
      </Routes>
    </div>
  );
};

export default App;