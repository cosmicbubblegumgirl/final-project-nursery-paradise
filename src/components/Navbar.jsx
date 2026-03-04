import { useSelector } from 'react-redux';
import { selectCartCount } from '../CartSlice.jsx';

const Navbar = ({ currentRoute }) => {
  const cartCount = useSelector(selectCartCount);

  return (
    <header className="site-header">
      <a href="#home" className="brand-mark">
        <span className="brand-icon">🪴</span>
        <span>
          <strong>Pixie Petal Patch</strong>
          <small>Paradise Nursery Shop</small>
        </span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        <a className={currentRoute === 'home' ? 'active' : ''} href="#home">
          Home
        </a>
        <a className={currentRoute === 'plants' ? 'active' : ''} href="#plants">
          Plants
        </a>
        <a className={currentRoute === 'cart' ? 'active cart-link' : 'cart-link'} href="#cart">
          Cart <span className="cart-count">{cartCount}</span>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
