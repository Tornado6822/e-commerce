import "./Header.css";

function Header() {
  return (
    <header className="d-flex justify-content-evenly align-items-center">
      <div className="container" style={{ height: "100%" }}></div>
      <h1>A-To-Z Books</h1>
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
