import { Grid } from "@mui/material";
import React, { useState } from "react";

import moment from "moment";

import "../index.css";
import { Header } from "./Header";
import { Calculator } from "./Calculator";
import { DeliveryDetails } from "./DeliveryDetails";

const styles = {
  Container: {
    height: "100px",
    mb: 4,
  },
};

const deliveryFeeByDistance = (distance: number): number => {
  // get total number of 500 meters from the total distance
  let noOfFiveHunderedMeters = Math.ceil(distance / 500);
  if (noOfFiveHunderedMeters <= 2) {
    return 2;
  } else {
    return noOfFiveHunderedMeters;
  }
};

const surchargeBasedOnTotalItems = (itemAmount: number): number => {
  if (itemAmount >= 5 && itemAmount <= 12) {
    return (itemAmount - 4) * 0.5;
  } else if (itemAmount > 12) {
    return (itemAmount - 4) * 0.5 + 1.2;
  } else {
    return 0;
  }
};

export const DeliveryCalculator: React.FunctionComponent = () => {
  const [cartValue, setCartValue] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [itemAmount, setItemAmount] = useState<string>("");
  const [totalDeliveryCharge, setTotalDeliveryCharge] = useState<number>(0);
  const [utcTime, setUtcTime] = React.useState<string | moment.Moment>(
    moment().utc()
  );
  const [showChargeDetail, setShowChargeDetail] = useState(false);

  const handleCartValue = (e: any) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setCartValue(e.target.value);
    }
  };

  const distanceAndItemCount = (e: any, type: "distance" | "itemCount") => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      if (type === "distance") {
        setDistance(e.target.value);
      }
      if (type === "itemCount") {
        setItemAmount(e.target.value);
      }
    }
  };

  const calculateDeliveryFee = () => {
    setShowChargeDetail(true);
    const dateTime = moment(utcTime);
    const day = dateTime.day();
    const hours = dateTime.hours();
    // Surcharge based on cart value
    const price = Number(cartValue);
    const surchargeOnCartValue: number =
      price < 10 ? (10 * 10 - price * 10) / 10 : 0;

    // Surcharge based on distance
    const distanceDeliveryFee = deliveryFeeByDistance(Number(distance));

    // Surcharge based on total number of Items
    const totalItem: number = surchargeBasedOnTotalItems(Number(itemAmount));

    // total delivery fees
    const totalDeliveryCharge =
      day === 5 && hours >= 15 && hours < 19
        ? (surchargeOnCartValue + distanceDeliveryFee + totalItem) * 1.2
        : surchargeOnCartValue + distanceDeliveryFee + totalItem;

    const finalDeliveryCharge =
      price > 100 ? 0 : totalDeliveryCharge > 15 ? 15 : totalDeliveryCharge;
    setTotalDeliveryCharge(
      Number(Number.parseFloat(finalDeliveryCharge.toString()).toFixed(2))
    );
  };
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.Container}>
        <Header />
      </Grid>
      <Grid item xs={12} md={6}>
        <Calculator
          cartValue={cartValue}
          handleCartValue={handleCartValue}
          distance={distance}
          distanceAndItemCount={distanceAndItemCount}
          itemAmount={itemAmount}
          utcTime={utcTime}
          setUtcTime={setUtcTime}
          handleClick={calculateDeliveryFee}
        />
      </Grid>
      {showChargeDetail && (
        <Grid item xs={12} md={6}>
          <DeliveryDetails
            cartValue={cartValue}
            distance={distance}
            itemAmount={itemAmount}
            utcTime={utcTime}
            totalDeliveryCharge={totalDeliveryCharge}
          />
        </Grid>
      )}
    </Grid>
  );
};
