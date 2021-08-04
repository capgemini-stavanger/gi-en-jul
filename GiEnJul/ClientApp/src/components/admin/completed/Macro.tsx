import React from "react";
import DeliveryExcelDownload from "./DeliveryExcelDownload";
import Table from "./Table";

interface IMacro {
  accessToken: string;
  location: string;
}

const Macro: React.FC<IMacro> = ({ accessToken, location }) => {
  return (
    <>
      <DeliveryExcelDownload accessToken={accessToken} location={location} />
      <Table accessToken={accessToken} />
    </>
  );
};

export default Macro;
