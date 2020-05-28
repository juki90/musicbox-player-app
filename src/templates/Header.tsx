import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Navigation from "./Navigation";

const Header: React.FC = () => {
  return (
    <Box component="header">
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="row">
          <Navigation />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
