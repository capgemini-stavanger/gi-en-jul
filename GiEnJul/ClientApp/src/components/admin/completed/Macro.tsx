import React from "react";
import useUser from "../../../hooks/useUser";
import DeliveryExcelDownload from "./DeliveryExcelDownload";
import Table from "./Table";

interface IMacro {
  accessToken: string;
}

const Macro: React.FC<IMacro> = ({ accessToken }) => {
  const { location } = useUser();
  return (
    <>
      <DeliveryExcelDownload accessToken={accessToken} location={location} />
      <Table />
    </>
  );
};

export default Macro;
