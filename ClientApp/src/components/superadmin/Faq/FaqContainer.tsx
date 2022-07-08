import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import Questions from "components/landing-page/Questions";
import useStyles from "components/superadmin/Styles";
import React, { useEffect, useState, ChangeEvent } from "react";
import { Button } from "reactstrap";
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

const initFaqInfo: faqInfo = {
  question: "",
  info: "",
  contentType: "FAQ",
  index: "",
  timestamp: "",
};

interface IChangeEvent {
  name?: string | undefined;
  value: unknown;
}

const initFaqList: faqInfo[] = [];

const FaqContainer: React.FC<IFaqInformation> = ({ accessToken }) => {
  const classes = useStyles();
  const apiservice = new ApiService(accessToken);
  const [faq, setFaq] = useState<faqInfo[]>(initFaqList);
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
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedItem}
          label="Location"
          onChange={handleChanges}
          fullWidth
        >
          {menuItems}
        </Select>
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
