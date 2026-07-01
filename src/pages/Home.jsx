import Gallery from "../components/Gallery";
import Header from "../components/Header";

function Home() {
  return (
    <div className="main-container">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3 bg-danger"></div>
          <div className="col-12 col-md-9 bg-primary">
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
