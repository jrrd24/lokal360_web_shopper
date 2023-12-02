import * as React from "react";
import { useNavigate } from "react-router-dom";
import theme from "../../Theme";
import PropTypes from "prop-types";
// mui components import
import { styled } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  useScrollTrigger,
  Slide,
  AppBar,
  Container,
  IconButton,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import Searchbar from "./Searchbar";
import { AccountCircle, MoreVert } from "@mui/icons-material";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const CustomAppbar = React.memo(({ component: MainComponent }, props) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Toolbar
            sx={{
              backgroundColor: theme.palette.background.paper,
              transition: "background-color 0.3s ease",
            }}
          >
            {/*Branding Logo */}
            <IconButton
              sx={{ ...classes.brandingLogo }}
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                src={require("../../assets/lokal360_logo_filled.png")}
                alt="logo"
                style={{ width: 45, height: 45 }}
              />
            </IconButton>

            <Searchbar />

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                onClick={() => {
                  navigate(`/profile/`);
                }}
                sx={{ color: "primary" }}
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              {/**Add on click for mobile view */}
              <IconButton size="large" onClick={""} sx={{ color: "primary" }}>
                <MoreVert />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
        {/*MAIN */}
        <Box component="main" sx={{ ...classes.mainComponentContainer }}>
          {MainComponent && (
            <Box
              sx={{
                ...classes.mainComponent,
                p: 3,
                "@media (max-width: 600px)": {
                  p: 0,
                  py: 3,
                },
              }}
            >
              <MainComponent />
            </Box>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
});

const classes = {
  brandingLogo: {
    width: 45,
    height: 45,
    marginRight: 10,
    "@media (max-width: 900px)": {
      marginRight: 2,
    },
  },

  menuItems: {
    pb: 5,
    "& .MuiListItemButton-root:hover": {
      backgroundColor: "#f0f0f0",
    },
    "& .MuiListItemButton-root.Mui-selected": {
      backgroundColor: "transparent",
    },
    "& .MuiListItemButton-root.Mui-selected:hover": {
      backgroundColor: "#f0f0f0",
    },
  },

  mainComponentContainer: {
    flexGrow: 1,
    backgroundColor: `${theme.palette.background.main}`,
    minHeight: "100vh",
  },

  mainComponent: {
    width: "100%",
    display: "block",
    textAlign: "center",
    margin: "0 auto",
    maxWidth: "2000px",
  },
};

export default CustomAppbar;
