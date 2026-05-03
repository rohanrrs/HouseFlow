import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/dashboard',    icon: '🏠', label: 'Dashboard' },
  { section: 'Property' },
  { to: '/buildings',    icon: '🏢', label: 'Buildings' },
  { to: '/floors',       icon: '📐', label: 'Floors' },
  { to: '/units',        icon: '🚪', label: 'Units' },
  { section: 'People' },
  { to: '/tenants',      icon: '👤', label: 'Tenants' },
  { to: '/users',        icon: '🔑', label: 'Users' },
  { section: 'Finance' },
  { to: '/rents',        icon: '📋', label: 'Rent Bills' },
  { to: '/payments',     icon: '💳', label: 'Payments' },
  { to: '/expenses',     icon: '💸', label: 'Expenses' },
  { section: 'Developer' },
  { to: '/api-explorer', icon: '🔌', label: 'API Explorer' },
];

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h1>HouseFlow</h1>
          <p>Property Management</p>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item, i) =>
            'section' in item ? (
              <div key={i} className="nav-section">{item.section}</div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to!}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                <span className="icon">{item.icon}</span>
                {item.label}
              </NavLink>
            )
          )}
        </nav>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}