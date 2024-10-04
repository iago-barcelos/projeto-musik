import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import Search from './pages/search/search';
import Album from './pages/album/album';
import NotFound from './pages/not-found/not-found';
import './assets/index.css';
import Layout from './components/layout/layout';
import Favorites from './pages/favorites/Favorites';
import Profile from './pages/profile/Profile';
import ProfileEditForm from './pages/profile/ProfileEditForm';
import Aside from './components/Aside/Aside';

function App() {
  return (
    <div className="container">
      <Aside />
      <main className="main-content">
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/search" element={ <Search /> } />
          <Route path="/album/:id" element={ <Album /> } />
          <Route path="/favorites" element={ <Favorites /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/profile/edit" element={ <ProfileEditForm /> } />
          <Route path="/*" element={ <NotFound /> } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
