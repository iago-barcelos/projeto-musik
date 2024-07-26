import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import Search from './pages/search/search';
import Album from './pages/album/album';
import NotFound from './pages/not-found/not-found';
import './index.css';
import Layout from './components/layout/layout';
import Favorites from './pages/favorites/Favorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Layout /> }>
        <Route index Component={ Search } />
      </Route>
      <Route path="/album/:id" element={ <Layout /> }>
        <Route index Component={ Album } />
      </Route>
      <Route path="/favorites" element={ <Layout /> }>
        <Route index Component={ Favorites } />
      </Route>
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
