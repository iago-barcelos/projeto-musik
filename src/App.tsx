/* eslint-disable import/no-unresolved */
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Album from './pages/Album/Album';
import NotFound from './pages/NotFound/NotFound';
import './assets/index.css';
import Favorites from './pages/Favorites/Favorites';
import Profile from './pages/Profile/Profile';
import ProfileEditForm from './pages/Profile/ProfileEditForm';
import Layout from './components/Layout/Layout';
import { AlbumProvider } from './context/AlbumProvider';

function App() {
  return (
    <AlbumProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="*" element={ <NotFound /> } />

        <Route element={ <Layout /> }>
          <Route path="/search" element={ <Search /> } />
          <Route path="/album/:id" element={ <Album /> } />
          <Route path="/favorites" element={ <Favorites /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/profile/edit" element={ <ProfileEditForm /> } />
        </Route>
      </Routes>
    </AlbumProvider>
  );
}

export default App;
