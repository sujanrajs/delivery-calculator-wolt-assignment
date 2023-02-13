import { Box, Divider, Paper, Typography } from "@mui/material";
import moment from "moment";
import React from "react";

const styles = {
  detailsContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "24px",
  },
  detailsContainerDiv: {
    width: "400px",
    padding: "0 18px",
  },
  detailsContainerCard: {
    padding: "16px",
    opacity: 0.9,
    borderRadius: "12px",
  },
  detailsLabel: {
    lineHeight: "40px",
  },
  detailsTitleDivider: {
    margin: "8px 0",
  },
  totalText: {
    padding: "8px",
    borderRadius: "4px",
    margin: "8px 0",
  },
  detailsTotalDivider: {
    marginTop: "12px",
  },
};

interface DeliveryDetailsProps {
  cartValue: string;
  distance: string;
  itemAmount: string;
  utcTime: string | moment.Moment;
  totalDeliveryCharge: number;
}

export const DeliveryDetails: React.FunctionComponent<DeliveryDetailsProps> = ({
  cartValue,
  distance,
  itemAmount,
  utcTime,
  totalDeliveryCharge,
}) => {
  return (
    <Box sx={styles.detailsContainer}>
      <div style={styles.detailsContainerDiv}>
        <Paper elevation={3} sx={styles.detailsContainerCard}>
          <Typography variant={"h6"}>Delivery details</Typography>
          <Divider sx={styles.detailsTitleDivider} />
          <Typography data-testid="cart-value-details" sx={styles.detailsLabel}>
            Cart value: <strong>{cartValue}€</strong>
          </Typography>
          <Typography data-testid="distance-details" sx={styles.detailsLabel}>
            Delivery distance: <strong>{distance} meters</strong>
          </Typography>
          <Typography data-testid="item-details" sx={styles.detailsLabel}>
            Item amount: <strong>{itemAmount} items</strong>
          </Typography>
          <Typography data-testid="date-time-details" sx={styles.detailsLabel}>
            Time(UTC):{" "}
            <strong>
              {moment(utcTime).format("dddd, MMM Do YYYY, hh:mm A")}
            </strong>
          </Typography>
          <Divider sx={styles.detailsTotalDivider} />
          <Typography
            data-testid="delivery-fee"
            variant="h5"
            sx={styles.totalText}
          >
            Total Delivery Fee:
            <strong> {totalDeliveryCharge}€</strong>
          </Typography>
        </Paper>
      </div>
    </Box>
  );
};
