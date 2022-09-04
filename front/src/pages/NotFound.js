import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h2>{t("404-oops")} 404</h2>
      <p>{t("404-no-page")} ☹️</p>
      <Link to="" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faLeftLong} /> {t("goback")}
      </Link>
    </div>
  );
}
