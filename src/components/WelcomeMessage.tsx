import React from "react";
import { useTranslation } from "react-i18next";

const WelcomeMessage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-[30vh] text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">
        {t("welcomeTitle")}
      </h1>
      <h2 className="text-4xl font-bold text-primary mb-4">
        {t("welcomeSubTitle")}
      </h2>
      <p className="text-lg ">{t("pleaseSearchCity")}</p>
    </div>
  );
};

export default WelcomeMessage;
