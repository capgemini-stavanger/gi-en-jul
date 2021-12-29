import {
  DataGrid,
  GridCellParams,
  GridColumns,
  GridRowData,
} from "@material-ui/data-grid";
import { FC, useEffect, useState } from "react";
import ApiService from "../../../common/functions/apiServiceClass";
import useUser from "../../../hooks/useUser";
import clsx from "clsx";
import useStyles from "./Styles";

interface ITable {
  accessToken: string;
}

type ConnectionDto = {
  familyId: string;
  personCount: number;
  fullName: string;
  phoneNumber: string;
  confirmed: boolean;
  submitterFullName: string;
  submitterEmail: string; 
};

enum Page {
  Loading,
  Error,
  Table,
}

const ErrorTable = {
  columns: [
    {
      field: "errortext",
      headerName: "Error occurred",
      editable: false,
      flex: 1,
    },
  ],
  rows: [
    {
      id: 1,
      errortext:
        "An error occurred while fetching from server. Please try again.",
    },
  ],
};

const columns: GridColumns = [
  {
    field: "confirmed",
    headerName: "Status",
    editable: false,
    minWidth: 120,
    flex: 1,
    cellClassName: (params: GridCellParams) =>
      clsx("status", {
        completed: (params.value as string) === "Bekreftet",
        waiting: (params.value as string) === "Venter",
      }),
  },
  {
    field: "id",
    headerName: "Familienummer",
    editable: false,
    minWidth: 120,
    flex: 2,
  },
  {
    field: "familySize",
    headerName: "Familiestørrelse",
    editable: false,
    flex: 3,
  },
  {
    field: "giverName",
    headerName: "Givernavn",
    editable: false,
    flex: 4,
  },
  {
    field: "giverTelephone",
    headerName: "Givertelefon",
    editable: false,
    flex: 4,
  },
  {
    field: "contactName",
    headerName: "Kontaktperson",
    editable: false,
    flex: 4,
  },
  {
    field: "contactMail", 
    headerName: "Kontaktperson mail", 
    editable: false, 
    flex: 4, 
  }
];

const Table: FC<ITable> = ({ accessToken }) => {
  const classes = useStyles();
  const apiservice = new ApiService(accessToken);
  const { location } = useUser();
  const [connections, setConnections] = useState<
    GridRowData[] | undefined | null
  >(undefined);

  useEffect(() => {
    if (!location) return;
    apiservice
      .get(`admin/connections/${location}`)
      .then((response) => {
        setConnections(
          response.data.map((connection: ConnectionDto) => ({
            id: connection.familyId,
            confirmed: connection.confirmed ? "Bekreftet" : "Venter",
            familySize: `${connection.personCount}`,
            giverName: connection.fullName,
            giverTelephone: connection.phoneNumber,
            contactName: connection.submitterFullName,
            contactMail: connection.submitterEmail,
          }))
        );
      })
      .catch((error) => {
        console.error(error);
        setConnections(null);
      });
  }, [location]);

  const getPage = () => {
    switch (connections) {
      case undefined:
        return Page.Loading;
      case null:
        return Page.Error;
      default:
        return Page.Table;
    }
  };

  switch (getPage()) {
    case Page.Loading:
      return <DataGrid columns={columns} rows={[]} loading autoHeight />;
    case Page.Error:
      return (
        <DataGrid
          columns={ErrorTable.columns}
          rows={ErrorTable.rows}
          autoHeight
        />
      );
    case Page.Table:
      return (
        <DataGrid
          className={classes.root}
          columns={columns}
          rows={connections!}
          autoPageSize
          autoHeight
        />
      );
    default:
      throw new Error("Table page for given condition is not implemented yet");
  }
};
export default Table;
