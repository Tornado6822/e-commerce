import "./Header.css";
import { IoMdCart } from "react-icons/io";

function Header({ cartSize, cartOpen, setCartOpen }) {
  return (
    <header className="container">
      <div className="row">
        <div
          className="col-6 d-flex justify-content-start align-items-center"
          style={{ height: "100px" }}
        >
          <h1 className="">A-To-Z Books</h1>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center px-5">
          <button
            className="btn cart-btn btn-outline-dark position-relative"
            onClick={() => setCartOpen((v) => !v)}
          >
            <IoMdCart className="cart-icon" />
            {cartSize > 0 && (
              <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartSize}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

/*
<header
  id="home"
  className="d-flex justify-content-between align-items-center p-3"
>
  <div className="d-flex align-items-center gap-2">
    <img
      src="./companyIcon.png"
      alt="Thrive Icon"
      className="rounded-circle"
      style={{ width: "100px", height: "auto" }}
    />

    <div className="d-flex flex-column">
      <h1 className="m-0 title fw-bold">THRIVE</h1>
      <h2 className="m-0 subTitle fw-semibold">PHYSIO & REHAB</h2>
    </div>
  </div>

  <div className="d-flex align-items-center gap-5">
    <Link to="/Booking">
      <button className="btn btn-primary">Book Now</button>
    </Link>

    <div className="d-flex align-items-center gap-3">
      <a href="https://facebook.com">
        <FaFacebookSquare className="icon" />
      </a>
      <a href="https://instagram.com">
        <FaInstagramSquare className="icon" />
      </a>
      <a href="https://youtube.com">
        <FaYoutube className="icon" />
      </a>
    </div>
  </div>
</header>;
*/
