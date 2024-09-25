import "./homePage.css";
const HomePage = () => {
  return (
    <div className="mainPageContent">
      <h1 className="text-center p-3">Zawody Kartingowe</h1>
      <div
        id="carouselExampleInterval"
        className="carousel slide w-50 mx-auto"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src="/images/mainPage.jpg"
              className="d-block w-100"
              alt="picture"
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="/images/mainPage.jpg"
              className="d-block w-100"
              alt="picture"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/mainPage.jpg"
              className="d-block w-100"
              alt="picture"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section className="text-justify m-5">
        <p>
          ZSTiO Limanowa słynie z wysokiego poziomy nauczania zawodowego wielu
          profilu technicznych, jednym z nich jest technik pojazdów
          samochodowych. W celu promocji tego profilu Nasza szkoła decyduje się
          na organizację zawodów.
        </p>

        <p>
          Interesują cię gokarty? Myślisz, że to czas aby wygrać puchary? Chcesz
          spróbować swoich sił? Dołącz do nas! Uczestnikami zawodów może być
          każdy uczeń Naszej szkoły, bądź uczeń szkoły zaprzyjaźnionej.
        </p>

        <p>
          Zawody kartingowe są idealną okazją aby odnaleźć w sobie ukryty
          talelent kierowcy, sprawdzić swoje umiejętności, wzbudzić w sobie
          pasję do motoryzacji lub po prostu dobrze się bawić. Zawody są
          darmowe, odbywają się one dla różnych grup wiekowych, aby zachować
          balans umiejętności pomiędzy zawodnikami.
        </p>

        <p>
          Baczne oko sędziów jak zarówno zaangażowanych opiekunów czuwa nad
          bezpieczeństwem i dokładnością przebiegu rywalizacji.
        </p>
      </section>
      <section className="d-flex align-items-center flex-column py-3">
        <h4>Spróbuj swoich sił!</h4>
        <p className="m-0">
          W celu zapisania się na zawody skontaktuj się z nami.
        </p>
      </section>
    </div>
  );
};
export default HomePage;
