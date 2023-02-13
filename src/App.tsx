import { Box, ThemeProvider } from "@mui/material";
import React from "react";
import { DeliveryCalculator } from "./components/DeliveryCalculator";
import { theme } from "./Theme/Theme";
import bg from "./images/bg.png";

const styles = {
  paperContainer: {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    height: "100vh",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.paperContainer}>
        <DeliveryCalculator />
      </Box>
    </ThemeProvider>
  );
}

export default App;
