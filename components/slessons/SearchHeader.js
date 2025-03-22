export default function SearchHeader({ searchTerm, setSearchTerm }) {
  return (
    <div className="card p-0 mb-6">
      <div className="card-body d-flex flex-column flex-md-row justify-content-between p-0 pt-6">
        <div className="app-academy-md-25 card-body py-0 pt-6 ps-12">
          <img
            src="img/illustrations/bulb-light.png"
            className="img-fluid app-academy-img-height scaleX-n1-rtl"
            alt="Bulb in hand"
            height="90"
          />
        </div>
        <div className="app-academy-md-50 card-body d-flex align-items-md-center flex-column text-md-center mb-6 py-6">
          <span className="card-title mb-4 lh-lg px-md-12 h4 text-heading">
            Eğitim, yetenekler ve kariyer fırsatları.{" "}
            <span className="text-primary text-nowrap">
              Hepsi tek bir yerde
            </span>
            .
          </span>
          <p className="mb-4 px-0 px-md-2">
            En güvenilir online kurslar ve sertifikalarla yeteneklerinizi
            geliştirin.
          </p>
          <div className="d-flex align-items-center justify-content-between app-academy-md-80">
            <input
              type="search"
              placeholder="Kursunuzu bulun"
              className="form-control me-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="button" className="btn btn-primary btn-icon">
              <i className="ti ti-search ti-md"></i>
            </button>
          </div>
        </div>
        <div className="app-academy-md-25 d-flex align-items-end justify-content-end">
          <img
            src="img/illustrations/pencil-rocket.png"
            alt="pencil rocket"
            height="188"
            className="scaleX-n1-rtl"
          />
        </div>
      </div>
    </div>
  );
}
