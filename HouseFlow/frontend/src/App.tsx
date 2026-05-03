import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Buildings from './pages/Buildings';
import Floors from './pages/Floors';
import Units from './pages/Units';
import Tenants from './pages/Tenants';
import Rents from './pages/Rents';
import Payments from './pages/Payments';
import Expenses from './pages/Expenses';
import Users from './pages/Users';
import ApiExplorer from './pages/ApiExplorer';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard"    element={<Dashboard />} />
        <Route path="buildings"    element={<Buildings />} />
        <Route path="floors"       element={<Floors />} />
        <Route path="units"        element={<Units />} />
        <Route path="tenants"      element={<Tenants />} />
        <Route path="rents"        element={<Rents />} />
        <Route path="payments"     element={<Payments />} />
        <Route path="expenses"     element={<Expenses />} />
        <Route path="users"        element={<Users />} />
        <Route path="api-explorer" element={<ApiExplorer />} />
      </Route>
    </Routes>
  );
}