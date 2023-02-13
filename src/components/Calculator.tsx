import {
  Box,
  Button,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Moment } from "moment";
import React, { Dispatch, SetStateAction } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const styles = {
  calculatorContainer: {
    display: "flex",
    justifyContent: "center",
  },
  header: {
    mb: "16px",
    fontWeight: "bold",
  },
  title: {
    width: "350px",
  },
  inputDiv: {
    margin: "16px 0",
  },
  label: {
    color: "black",
    fontSize: "18px",
    paddingBottom: "4px",
  },
  textField: {
    width: "100%",
    "& .MuiInputBase-root": {
      background: "white",
      borderRadius: "6px",
    },
  },
  buttonDiv: {
    margin: "32px 0",
  },
  button: {
    width: "100%",
    textTransform: "capitalize",
    fontWeight: "bold",
    backgroundColor: "#001464",
  },
};

interface CalculatorProps {
  cartValue: string;
  handleCartValue: (e: any) => void;
  distance: string;
  distanceAndItemCount: (e: any, type: "distance" | "itemCount") => void;
  itemAmount: string;
  utcTime: string | moment.Moment;
  setUtcTime: Dispatch<SetStateAction<string | Moment>>;
  handleClick: () => void;
}

export const Calculator: React.FunctionComponent<CalculatorProps> = ({
  cartValue,
  handleCartValue,
  distance,
  distanceAndItemCount,
  itemAmount,
  utcTime,
  setUtcTime,
  handleClick,
}) => {
  return (
    <Box sx={styles.calculatorContainer}>
      <div style={styles.title}>
        <Typography variant={"h5"} sx={styles.header}>
          Delivery Fee Calculator
        </Typography>
        <div style={styles.inputDiv}>
          <InputLabel sx={styles.label}>Cart value</InputLabel>
          <TextField
            variant="outlined"
            sx={styles.textField}
            InputProps={{
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
            placeholder="cart value in euros"
            value={cartValue}
            onChange={handleCartValue}
            data-testid="cart-value"
          />
        </div>
        <div style={styles.inputDiv}>
          <InputLabel sx={styles.label}>Delivery distance</InputLabel>
          <TextField
            variant="outlined"
            sx={styles.textField}
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
            }}
            value={distance}
            placeholder="distance in meters"
            onChange={(e) => distanceAndItemCount(e, "distance")}
            data-testid="delivery-distance"
          />
        </div>
        <div style={styles.inputDiv}>
          <InputLabel sx={styles.label}>Amount of items</InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            sx={styles.textField}
            placeholder="number of items"
            value={itemAmount}
            onChange={(e) => distanceAndItemCount(e, "itemCount")}
            data-testid="amount-of-items"
          />
        </div>
        <Box style={styles.inputDiv}>
          <InputLabel sx={styles.label}>Time(UTC)</InputLabel>
          <Datetime
            value={utcTime}
            onChange={(time) => setUtcTime(time)}
            timeFormat={true}
            utc={true}
            className={"date-time"}
            data-testid="date-time-picker"
          />
        </Box>
        <div style={styles.buttonDiv}>
          <Button
            onClick={handleClick}
            sx={styles.button}
            size="large"
            variant={"contained"}
            disabled={!cartValue || !distance || !itemAmount}
          >
            Calculate delivery price
          </Button>
        </div>
      </div>
    </Box>
  );
};
