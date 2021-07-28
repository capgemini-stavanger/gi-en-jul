import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import React, { useState } from "react";
import ApiService from "../../../common/functions/apiServiceClass";

const DeliveryExcelDownload = () => {
  const [location, _] = useState("Nittedal");
  const apiservice = new ApiService();

  const download = () => {
    apiservice.downloadFile(
      `admin/excel/delivery/${location}`,
      `Leveranseliste_${location}.xlsx`
    );
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<GetAppIcon />}
      onClick={download}
    >
      Download - (Defaults to Nittedal)
    </Button>
  );
};

export default DeliveryExcelDownload;
