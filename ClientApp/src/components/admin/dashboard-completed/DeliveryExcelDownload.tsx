import { Button, Snackbar } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import ApiService from "common/functions/apiServiceClass";

interface IDeliveryExcelDownload {
  accessToken: string;
  location: string;
}

interface IAlertState {
  msg: React.ReactNode;
  severity?: "error" | "info" | "success" | "warning";
  open: boolean;
}

const initAlertState: () => IAlertState = () => ({
  msg: "",
  severity: undefined,
  open: false,
});

const DeliveryExcelDownload: React.FC<IDeliveryExcelDownload> = ({ accessToken, location }) => {
  const apiservice = new ApiService(accessToken);
  const [alertState, setAlertState] = useState(initAlertState());

  const setAlert = (
    open?: boolean,
    message?: React.ReactNode,
    severity?: "error" | "info" | "success" | "warning"
  ) => {
    setAlertState((prev) => ({
      ...prev,
      msg: message !== undefined ? message : prev.msg,
      severity: severity !== undefined ? severity : prev.severity,
      open: open !== undefined ? open : prev.open,
    }));
  };

  const handleAlertClose = () => {
    setAlert(false);
  };

  const download = () => {
    apiservice
      .downloadFile(`admin/excel/delivery/${location}`, `Leveranseliste_${location}.xlsx`)
      .catch((e) => {
        console.error("Error while trying to download delivery excel", e);
        setAlert(true, "Kunne ikke laste ned dokument. Vennligst prøv på nytt.", "error");
      });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={alertState.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert severity={alertState.severity} onClose={handleAlertClose}>
          {alertState.msg}
        </Alert>
      </Snackbar>
      <Button
        variant="contained"
        color="primary"
        startIcon={<GetAppIcon />}
        onClick={download}
        disabled={!location}
      >
        Last ned oversikt
      </Button>
    </>
  );
};

export default DeliveryExcelDownload;
