import { FiberManualRecord } from "@material-ui/icons";
import { FC } from "react";

interface ICircle {
  color: "red" | "yellow" | "green";
}

const Circle: FC<ICircle> = ({ color }) => {
  let hexcolor = "";
  switch (color) {
    case "red":
      hexcolor = "#ed8175";
      break;
    case "yellow":
      hexcolor = "#f4cf8a";
      break;
    case "green":
      hexcolor = "#49a591";
      break;
    default:
      throw new Error(`Invalid color: ${color}`);
  }
  return <FiberManualRecord fontSize="large" style={{ color: hexcolor }} />;
};

export default Circle;
