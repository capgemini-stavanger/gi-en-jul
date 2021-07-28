import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import React, { useState } from "react";
import ApiService from "../../../../common/functions/apiServiceClass";

const DeliveryExcelDownload = () => {
  const [location, _] = useState("Nittedal");
  const apiservice = new ApiService();

  const download = () => {
    apiservice
      .get(`admin/excel/delivery/${location}`, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Leveranseliste_${location}.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
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
