import React from "react";
import DeliveryExcelDownload from "components/admin/dashboard-completed/DeliveryExcelDownload";
import Table from "components/admin/dashboard-completed/Table";

interface IMacro {
  location: string;
}

const Macro: React.FC<IMacro> = ({ location }) => {
  return (
    <>
      <DeliveryExcelDownload location={location} />
      <Table />
    </>
  );
};

export default Macro;
