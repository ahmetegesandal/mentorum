const Logo = ({ w = 32, h = 32, s = 22, c = "text-heading" }) => {
  return (
    <>
      <span className="app-brand-logo demo" style={{ width: w, height: h }}>
        <img
          src="/img/odek.png"
          alt="Mentorum Logo"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </span>
      <span
        className={`app-brand-text demo fw-bold ${c}`}
        style={{ fontSize: s }}
      >
        Mentorum
      </span>
    </>
  );
};

export default Logo;
