import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function StartPage() {
  const { t } = useTranslation();

  return (
    <div className="start-content">
      <header>
        <h1 className="website-title">
          the<span className="fw-bold">COLLECTOR</span>
        </h1>
      </header>
      <main>
        <p>{t("start-manage")}</p>
        <Link to="/login" className="btn btn-primary">
          {t("start-divein")}
        </Link>
      </main>
    </div>
  );
}
