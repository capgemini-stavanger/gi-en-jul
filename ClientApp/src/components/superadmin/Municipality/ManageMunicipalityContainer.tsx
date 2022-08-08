import { Divider, Grid, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import { useEffect, useState } from "react";
import MunicipalityManageTable from "./ManageMunicipality/MunicipalityManageTable";
import MunicipalityInformationContainer from "./MunicipalityInformation/MunicipalityInformationContainer";

interface props {
  accessToken: string;
  assignedLocation: string;
  role: string;
}
export interface IMunicipality {
  country: string;
  name: string;
  isActive: boolean;
  information: string;
  email: string;
  phoneNumber: string;
  contactPerson: string;
  images: string[];
  image: string;
  facebook: string;
  instagram: string;
}

export const initInterfaceMunicipality: IMunicipality = {
  country: "Norge",
  name: "",
  isActive: false,
  information: "",
  email: "",
  phoneNumber: "",
  contactPerson: "",
  images: [],
  image: "",
  facebook: "",
  instagram: "",
};

const ManageMunicipalityContainer: React.FC<props> = ({ accessToken, role, assignedLocation }) => {
  const apiservice = new ApiService(accessToken);
  const [municipalities, setMunicipalities] = useState<IMunicipality[]>([
    initInterfaceMunicipality,
  ]);
  const [openAdd, setOpenAdd] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const fetchInformation = () => {
    apiservice
      .get("municipality/all")
      .then((resp) => {
        if (role == "SuperAdmin") {
          setMunicipalities(resp.data);
        }
        if (role == "Admin") {
          setMunicipalities(resp.data.filter((data: any) => data.name === assignedLocation));
        }
      })
      .catch((errorStack) => {
        console.error(errorStack);
      });
  };

  const addMunicipality = (data: IMunicipality) => {
    apiservice
      .post("municipality", {
        Country: data.country,
        Name: data.name,
        Email: "",
        PhoneNumber: "",
        ContactPerson: "",
        Facebook: "",
        Instagram: "",
        IsActive: false,
        Information: "Det finnes ingen informasjon om denne kommunen",
      })
      .then((response) => {
        fetchInformation();
        if (response.status === 200) {
          setOpenAdd(true);
        }
      });
  };

  const handleCloseAdd = (response: boolean) => {
    if (response) {
      setOpenAdd(false);
    }
  };

  const updateMunicipalityInformation = (object: IMunicipality) => {
    apiservice
      .put(`Municipality/Update`, {
        Country: "Norge",
        Name: object.name,
        IsActive: object.isActive,
        Information: object.information,
        InfoImage1: object.images[0],
        InfoImage2: object.images[1],
        InfoImage3: object.images[2],
        Image: object.image,
        Email: object.email,
        PhoneNumber: object.phoneNumber,
        ContactPerson: object.contactPerson,
        Facebook: object.facebook,
        Instagram: object.instagram,
      })
      .then((response) => {
        if (response.status === 200) {
          fetchInformation();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteMunicipalityInformation = (object: IMunicipality) => {
    apiservice
      .put(`Municipality/Update`, {
        Country: "Norge",
        Name: object.name,
        Information: "",
      })
      .then((response) => {
        if (response.status === 200) {
          fetchInformation();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchInformation();
  }, []);

  useEffect(() => {
    municipalities;
  }, [municipalities]);

  return (
    <>
      <Grid style={{ marginLeft: "0" }} container direction="column">
        <Grid item>
          <MunicipalityManageTable
            municipalities={municipalities}
            setMunicipalities={setMunicipalities}
            addMunicipality={addMunicipality}
            updateMunicipalityInformation={updateMunicipalityInformation}
            openAdd={openAdd}
            setOpenAdd={setOpenAdd}
            handleCloseAdd={handleCloseAdd}
            open={open}
            setOpen={setOpen}
            role={role}
          />
        </Grid>
        <Divider />

        <Grid item style={{ marginTop: "4em" }}>
          <Typography style={{ marginBottom: "2em" }}>
            Nedenfor kan du redigere informasjon om kommunen
          </Typography>
          <MunicipalityInformationContainer
            role={role}
            assignedLocation={assignedLocation}
            municipalities={municipalities}
            updateMunicipalityInformation={updateMunicipalityInformation}
            deleteMunicipalityInformation={deleteMunicipalityInformation}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default ManageMunicipalityContainer;
