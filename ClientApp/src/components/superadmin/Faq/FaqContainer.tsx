import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import Questions from "components/landing-page/Questions";
import React, { useEffect, useState, ChangeEvent } from "react";
import FaqInformation from "./FaqInformation";

interface IFaqInformation {
  accessToken: string;
}

interface faqInfo {
  question: string;
  info: string;
  contentType: string;
  index: string;
  timestamp: string;
}

interface IChangeEvent {
  name?: string | undefined;
  value: unknown;
}

const FaqContainer: React.FC<IFaqInformation> = ({ accessToken }) => {
  const apiservice = new ApiService(accessToken);
  const [faq, setFaq] = useState<faqInfo[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>("");

  const getFaqInformation = () => {
    apiservice
      .get("cms/getall", { params: { contentType: "FAQ" } })
      .then((response) => {
        if (response.data.length > 0) {
          setFaq(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(getFaqInformation, []);
  const handleChanges = (event: ChangeEvent<IChangeEvent>) => {
    setSelectedItem(event.target.value as string);
  };

  const menuItems = faq.map((item, index) => {
    return (
      <MenuItem key={index} value={item.index}>
        {item.question}
      </MenuItem>
    );
  });

  return (
    <Grid container direction="column">
      <Typography variant="h5"> Ofte stile spørsmål</Typography>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Velg et spørsmål</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedItem}
            label="Velg et spørsmål"
            onChange={handleChanges}
            fullWidth
          >
            {menuItems}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FaqInformation accessToken={accessToken} index={selectedItem} />
      </Grid>
      <Grid item>
        <Questions />
      </Grid>
    </Grid>
  );
};

export default FaqContainer;
