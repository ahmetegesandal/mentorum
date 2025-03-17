import { useTranslation } from "next-i18next";

const Statistics = () => {
  const { t } = useTranslation("common");

  const stats = [
    { value: "23.000+", label: t("statisticlabel1") },
    { value: "30+", label: t("statisticlabel2") },
    { value: "96%", label: t("statisticlabel3") },
    { value: "93%", label: t("statisticlabel4") },
  ];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="rounded shadow-sm border p-4 p-md-5 text-center">
            <div className="row gy-4">
              {stats.map((stat, index) => (
                <div key={index} className="col-6 col-md-3">
                  <div className="d-flex flex-column align-items-center">
                    <div className="fs-2 fw-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="fs-6 text-muted">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
