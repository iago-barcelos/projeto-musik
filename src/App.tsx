import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import Search from './pages/search/search';
import Album from './pages/album/album';
import NotFound from './pages/not-found/not-found';
import './index.css';
import Layout from './components/layout/layout';
import Favorites from './pages/favorites/Favorites';
import Profile from './pages/profile/Profile';
import ProfileEditForm from './pages/profile/ProfileEditForm';

function App() {
  return (
    <main style={ { display: 'flex' } }>
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
        <Route path="/profile" element={ <Layout /> }>
          <Route index Component={ Profile } />
          <Route path="edit" Component={ ProfileEditForm } />
        </Route>
        <Route path="/*" element={ <NotFound /> } />
      </Routes>
    </main>
  );
}

export default App;
