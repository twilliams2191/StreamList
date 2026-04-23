import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
    <h1 className="logo">🎬 StreamList</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;