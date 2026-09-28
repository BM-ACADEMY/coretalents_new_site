import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { ServicesIndex, ServicePage } from './pages/Services';
import { RolesIndex, RolePage } from './pages/Roles';
import { LocationsIndex, LocationPage } from './pages/Locations';
import { InsightsIndex, ArticlePage } from './pages/Insights';
import HowWeWork from './pages/HowWeWork';
import Pricing from './pages/Pricing';
import Empanelment from './pages/Empanelment';
import About from './pages/About';
import Contact from './pages/Contact';
import { Privacy, Terms } from './pages/Legal';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<ServicesIndex />} />
        <Route path="services/:slug" element={<ServicePage />} />
        <Route path="roles" element={<RolesIndex />} />
        <Route path="roles/:slug" element={<RolePage />} />
        <Route path="locations" element={<LocationsIndex />} />
        <Route path="locations/:slug" element={<LocationPage />} />
        <Route path="insights" element={<InsightsIndex />} />
        <Route path="insights/:slug" element={<ArticlePage />} />
        <Route path="how-we-work" element={<HowWeWork />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="empanelment" element={<Empanelment />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
