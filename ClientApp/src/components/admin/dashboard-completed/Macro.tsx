import React from "react";
import DeliveryExcelDownload from "components/admin/dashboard-completed/DeliveryExcelDownload";
import Table from "components/admin/dashboard-completed/Table";

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
