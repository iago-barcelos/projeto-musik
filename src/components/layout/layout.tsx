import { Outlet } from 'react-router-dom';
import Aside from '../Aside/Aside';

function Layout() {
  return (
    <div className="layout-div-container">
      <Aside />
      <div className="layout-div-outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
