import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import APITestComponent from '../components/pages/ApiTestPage'
import LandingPage from '../components/pages/LandingPage'
import DemoPage from '../components/pages/DemoPage'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/healthcheck" element={<APITestComponent />} />
        <Route path="/demo" element={<DemoPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;