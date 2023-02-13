import { Box } from "@mui/material";
import React from "react";
import logo from "../images/wolt.png";

const styles = {
  header: {
    display: "flex",
    justifyContent: "center",
  },
  headerImage: {
    height: "90px",
  },
};

export const Header: React.FunctionComponent = () => {
  return (
    <Box sx={styles.header}>
      <img src={logo} alt="logo" style={styles.headerImage} />
    </Box>
  );
};
