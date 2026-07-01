import "./Header.css";

function Header() {
  return (
    <div className="container my-5">
      <nav className="navbar d-flex justify-content-evenly">
        <a href="#services" className="nav-link fw-semibold">
          Services
        </a>
        <a href="#team" className="nav-link fw-semibold">
          Our Team
        </a>
        <a href="#footer" className="nav-link fw-semibold">
          About Us
        </a>
        <a href="#footer" className="nav-link fw-semibold">
          Contact Us
        </a>
      </nav>
    </div>
  );
}

export default Header;
