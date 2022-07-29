import { FormControl, Grid, MenuItem, Select, Typography } from "@material-ui/core";
import ApiService from "common/functions/apiServiceClass";
import Questions from "components/landing-page/Questions";
import React, { useEffect, useState, ChangeEvent } from "react";
import FaqInformation from "./FaqInformation";
import SelectForm from "components/shared/input-fields/SelectForm";

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
  const [selectFormValue, setSelectFormValue] = useState<string>("");

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

  return (
    <Grid container direction="column">
      <Typography style={{ marginBottom: "20px" }} variant="h5">
        Ofte stile spørsmål
      </Typography>
      <Grid item>
        <FormControl fullWidth>
          <SelectForm
            name="Faq"
            variant="outlined"
            label="Velg faq"
            value={selectFormValue}
            options={faq.map((o) => {
              return { value: o.question, text: o.question };
            })}
            onChange={(e) => {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              setSelectedItem(faq.find((m: any) => m.question === e.target.value)!.index);
              setSelectFormValue(faq.find((m: any) => m.question === e.target.value)!.question);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FaqInformation
          getFaqInformation={getFaqInformation}
          accessToken={accessToken}
          index={selectedItem}
        />
      </Grid>
      <Grid item>
        <Questions />
      </Grid>
    </Grid>
  );
};

export default FaqContainer;
