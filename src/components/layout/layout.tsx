import { Outlet } from 'react-router-dom';
import Aside from '../Aside/Aside';

function Layout() {
  return (
    <div>
      <Aside />
      <Outlet />
    </div>
  );
}

export default Layout;
