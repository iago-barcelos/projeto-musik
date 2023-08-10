import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import NotFound from './pages/not-found/not-found';
import Search from './pages/search/search';
import './index.css';
import Loading from './components/loading/loading';
import Album from './pages/album/album';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
      <Route path="/album/:id" element={ <Album /> } />
      <Route path="/loading" element={ <Loading /> } />
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
