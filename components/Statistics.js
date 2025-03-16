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
      <div className="flex justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg border border-gray-200 p-6 sm:p-10">
          <div className="statistics-container">
            {stats.map((stat, index) => (
              <div key={index} className="statistics-item">
                <div className="statistics-value">{stat.value}</div>
                <div className="statistics-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Statistics;
  