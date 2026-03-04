import { useEffect, useMemo, useState } from 'react';
import AboutUs from './components/AboutUs.jsx';
import Navbar from './components/Navbar.jsx';
import ProductList from './components/ProductList.jsx';
import CartItem from './components/CartItem.jsx';
import './App.css';

const validRoutes = ['home', 'plants', 'cart'];

const getRouteFromHash = () => {
  const route = window.location.hash.replace('#', '') || 'home';
  return validRoutes.includes(route) ? route : 'home';
};

function App() {
  const [route, setRoute] = useState(getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const page = useMemo(() => {
    if (route === 'plants') return <ProductList />;
    if (route === 'cart') return <CartItem />;

    return (
      <main className="landing-page">
        <div className="landing-overlay" />
        <div className="landing-content">
          <p className="eyebrow">Paradise Nursery Shopping Application</p>
          <AboutUs />
          <a href="#plants" className="primary-button get-started-button">
            Get Started
          </a>
        </div>
      </main>
    );
  }, [route]);

  return (
    <div className="app-root">
      {(route === 'plants' || route === 'cart') && <Navbar currentRoute={route} />}
      {page}
    </div>
  );
}

export default App;
