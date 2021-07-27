import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import React, { useState } from "react";

const DeliveryExcelDownload = () => {
  const [location, _] = useState("Nittedal");
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<GetAppIcon />}
      href={`/api/admin/excel/delivery/${location}`}
      download={`Leveranseliste_${location}.xlsx`}
    >
      Download - (Defaults to Nittedal)
    </Button>
  );
};

export default DeliveryExcelDownload;
