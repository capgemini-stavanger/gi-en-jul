import { Box, Button, ListItem, ListItemIcon, List, Grid } from "@material-ui/core";
import { useCallback, useContext, useEffect, useState } from "react";
import { ContentEditableEvent, DefaultEditor } from "react-simple-wysiwyg";
import parse from "html-react-parser";
import ConfirmationBox from "components/shared/ConfirmationBox";
import useStyles from "../../Styles";
import { IMunicipality } from "../ManageMunicipalityContainer";
import img_placeholder from "styling/img/person.png";
import { Delete } from "@material-ui/icons";
import ApiService from "common/functions/apiServiceClass";
import accessTokenContext from "contexts/accessTokenContext";

interface IMunicipalityInformation {
  municipality: IMunicipality;
  role: string;
  updateMunicipalityInformation: (municipality: IMunicipality) => void;
  setSelectedMunicipality: (municipality: IMunicipality) => void;
  deleteMunicipalityInformation: (municipality: IMunicipality) => void;
}

const MunicipalityInformation: React.FC<IMunicipalityInformation> = ({
  municipality,
  role,
  updateMunicipalityInformation,
  deleteMunicipalityInformation,
  setSelectedMunicipality,
}) => {
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [openImages, setOpenImages] = useState(false);
  const classes = useStyles();
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);
  const [openDeleteImageConfirmBox, setOpenDeleteImageConfirmBox] = useState(false);
  const [imageToDelete, setImageToDelete] = useState("");
  const [images, setImages] = useState(municipality.images);
  const accessToken = useContext(accessTokenContext);
  const apiService = new ApiService(accessToken);

  function onChange(e: ContentEditableEvent) {
    setSelectedMunicipality({ ...municipality, information: e.target.value });
  }

  const handleSaveClick = () => {
    setOpenConfirmBox(true);
  };

  const handleSaveResponse = (response: boolean) => {
    if (response) {
      updateMunicipalityInformation(municipality);
      setOpenEditor(false);
    }
  };

  const handleDeleteResponse = (response: boolean) => {
    if (response) {
      setSelectedMunicipality({ ...municipality, information: "" });
      deleteMunicipalityInformation(municipality);
    }
  };

  const handleOpenEditor = () => {
    if (openEditor) {
      setOpenEditor(false);
      return;
    }
    setOpenEditor(true);
    setOpenImages(false);
  };

  const handleOpenImages = () => {
    if (openImages) {
      setOpenImages(false);
      return;
    }
    setOpenEditor(false);
    setOpenImages(true);
  };

  const handleDeleteImage = (response: boolean) => {
    if (!response) return;

    apiService.delete("municipality/image", imageToDelete).then((resp) => {
      if (resp.status < 400) {
        removeImageFromView(imageToDelete);
      }
    });
  };

  useEffect(() => {
    setImages(municipality.images);
  }, [municipality]);

  const removeImageFromView = useCallback(
    (img: string) => {
      const imgs = images;
      const i = imgs.indexOf(img);
      imgs.splice(i, 1);
      setImages([...imgs]);
      setImageToDelete("");
      municipality.images = [...imgs];
    },
    [images]
  );

  const openDelteImageDialog = (img: string) => {
    setImageToDelete(img);
    setOpenDeleteImageConfirmBox(true);
  };

  const handleFileChange = (event: any) => {
    const files = Array.from<File>(event.target.files);
    if (files.length) {
      files.forEach((file: File) => {
        const formData = new FormData();
        formData.append("file", file, file.name);
        apiService.post(`municipality/image/${municipality.name}`, formData).then((response) => {
          if (response.data) {
            setImages([...images, response.data]);
            municipality.images = [...municipality.images, response.data];
          }
        });
      });
    }
  };

  return (
    <>
      <Box className={classes.tableBody} style={{ marginTop: "15px" }}>
        {parse(municipality.information) ?? "Ingen informasjon"}
      </Box>

      <Button
        style={{ marginTop: "10px", marginBottom: "10px" }}
        variant="contained"
        className={classes.button}
        onClick={handleOpenEditor}
      >
        Rediger tekst
      </Button>

      <Button
        style={{ margin: "10px" }}
        variant="contained"
        className={openImages ? classes.buttonError : classes.button}
        onClick={handleOpenImages}
      >
        {openImages ? "Skjul bilder" : "Vis bilder"}
      </Button>

      {openEditor && (
        <>
          <Grid container direction="column">
            Hvis du skal legge inn en link. ( dette for å forhindre at url lenken blir for lang.)
            <List>
              <ListItem>
                <ListItemIcon>1</ListItemIcon>
                Lag tekst som brukeren kan trykke på ( f.eks: Klikk her for å lese mer om kommunen)
              </ListItem>
              <ListItem>
                <ListItemIcon>2</ListItemIcon>
                Marker den nye teksten.
              </ListItem>
              <ListItem>
                <ListItemIcon>3</ListItemIcon>
                Trykk på Link knappen i verktøylinjen.
              </ListItem>
              <ListItem>
                <ListItemIcon>4</ListItemIcon>
                Skriv inn den nye url lenken.
              </ListItem>
            </List>
          </Grid>
          <DefaultEditor value={municipality.information} onChange={onChange} />
          <br />
          <Button
            style={{ marginRight: "10px" }}
            className={classes.button}
            variant="contained"
            onClick={handleSaveClick}
          >
            Lagre endringer
          </Button>
          <Button
            style={{ marginRight: "10px" }}
            variant="contained"
            onClick={() => {
              setOpenEditor(false);
            }}
          >
            Avbryt
          </Button>
          <Button
            className={classes.buttonError}
            variant="outlined"
            hidden={role != "SuperAdmin"}
            onClick={() => {
              setOpenDeleteConfirmBox(true);
            }}
          >
            Slett informasjon om valgt kommune
          </Button>
        </>
      )}

      {openImages && (
        <>
          <Grid container justifyContent="space-evenly">
            {images.map((img, index) => {
              if (!img) {
                return <></>;
              }
              return (
                <Grid item key={`img${index}`}>
                  <Grid container direction={"column"}>
                    <Grid item>
                      <img
                        key={index}
                        src={img}
                        className={classes.infoImage}
                        alt={"Finner ikke bildet"}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = `${img_placeholder}`;
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Grid container justifyContent="space-evenly" style={{ marginTop: "5px" }}>
                        <Grid item>
                          <Button
                            className={classes.buttonError}
                            onClick={() => openDelteImageDialog(img)}
                          >
                            Slett
                            <Delete />
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <Button variant={"contained"} component={"label"} className={classes.button}>
            Last opp nytt bilde
            <input type={"file"} accept={"image/*"} onChange={handleFileChange} hidden />
          </Button>
        </>
      )}

      <ConfirmationBox
        open={openConfirmBox}
        text={"Er du sikker på at du ønsker å oppdatere teksten?"}
        handleClose={() => {
          setOpenConfirmBox(false);
        }}
        handleResponse={handleSaveResponse}
      />
      <ConfirmationBox
        open={openDeleteConfirmBox}
        text={"Er du sikker på at du ønsker å slette all informasjon?"}
        handleClose={() => {
          setOpenDeleteConfirmBox(false);
        }}
        handleResponse={handleDeleteResponse}
      />
      <ConfirmationBox
        open={openDeleteImageConfirmBox}
        text={"Er du sikker på at du ønsker å slette bildet?"}
        handleClose={() => {
          setImageToDelete("");
          setOpenDeleteImageConfirmBox(false);
        }}
        handleResponse={handleDeleteImage}
      />
    </>
  );
};

export default MunicipalityInformation;
