import { createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6E5FDE",
      light: "#F2F2FF",
      dark: "#4d44d7",
    },
    secondary: {
      main: "#ffbb03",
      light: "#ffd14d",
      dark: "#ffae00",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#444444",
      contrastText: "#FFFFFF",
      eighty: "#444444CC",
      sixty: "#44444499",
      forty: "#44444466",
      ten: "#4444441A",
    },
    background: {
      paper: "#FFFFFF",
      default: "#F8F7FD",
      dialogBox: "#ECECEC80",
    },
    divider: "#9D9D9D",
    buttonHover: "#757575",
    success: { main: "#198754" },
    active: { main: "#00FF00" },
    warning: { main: "#ffc107" },
    danger: { main: "#dc3545", delete: "#AB3130" },
    orange: { main: "#F18701" },

    //? Colors for promo type
    promo: { peso: "#F7B801", percent: "#F18701", freeShipping: "#6E5FDE" },

    //? Colors for status
    status: {
      pending: "#F35B04",
      preparing: "#F18701",
      pickUp: "#F7B801",
      delivery: "#7678ED",
      complete: "#7A9163",
      cancel: "#AB3130",
      refund: "#231F20",
    },
  },

  typography: {
    sectionTitle: {
      fontSize: "24px",
      fontWeight: 600,
      color: "#444",
      letterSpacing: -0.3,
    },
    sectionTitleBig: {
      fontSize: "28px",
      fontWeight: 600,
      color: "#444",
      letterSpacing: -0.3,
    },
    sectionTitleSmall: {
      fontSize: "18px",
      fontWeight: 600,
      color: "#444",
      lineHeight: "20px",
      letterSpacing: -0.3,
      textTransform: "none",
      textAlign: "left",
    },

    sectionTitleSmallCenter: {
      fontSize: "20px",
      fontWeight: 600,
      color: "#444",
      lineHeight: "20px",
      letterSpacing: -0.3,
      textTransform: "none",
      textAlign: "center",
    },

    sectionSubTitle: {
      fontSize: "18px",
      color: "#44444499",
      lineHeight: "20px",
    },
    seeAll: {
      fontSize: "16px",
      color: "#44444499",
      textTransform: "none",
    },
    bigBadge: {
      fontSize: 30,
    },
    status: {
      fontSize: "16px",
      fontWeight: 600,
      color: "#444",
      lineHeight: "16px",
      letterSpacing: -0.3,
      textTransform: "none",
    },

    //for Vouchers
    voucherTitle: {
      fontSize: "26px",
      fontWeight: 600,
      letterSpacing: -0.3,
    },
    voucherTitleSmall: {
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: "20px",
      letterSpacing: -0.3,
      textTransform: "none",
    },
    minSpend: {
      fontSize: "14px",
      textTransform: "none",
    },
    shopName: {
      fontSize: "14px",
      fontWeight: 600,
      textTransform: "none",
    },
  },

  components: {
    //? all box component sx
    box: {
      //? for Parent Box (Container) of every Page
      //* sx={{...theme.components.box.pageContainer}}
      pageContainer: {
        backgroundColor: "transparent",
        maxWidth: 2250,
        alignItems: "center",
        justifyContent: "center",
        pb: 5,
      },

      //? for the Box wrapper of the page's Main Content
      //* sx={{...theme.components.box.mainContent}}
      mainContent: {
        display: "flex",
        flexDirection: "row",
        gap: "32px",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "center",
      },

      //? for Box wrappers inside the Main Content
      //? sample usage: (left and right side boxes)
      //? contentRow & contentColumn (flex direction)
      //* sx={{...theme.components.box.contentRow}}
      //* sx={{...theme.components.box.contentColumn}}
      contentRow: {
        display: "flex",
        flexDirection: "row",
        gap: "32px",
        flexWrap: "wrap",
      },
      contentColumn: {
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        flexWrap: "wrap",
      },

      //? for Boxes that wrap sections of the Main Contnet
      //? this includes the hover effects
      //* sx={{...theme.components.box.sectionContainer}}
      sectionContainer: {
        borderRadius: "10px",
        backgroundColor: (theme) => theme.palette.background.paper,
        boxShadow: "0px 2px 5px 0px rgba(110, 95, 222, 0.25)",
        transition: "background-color 0.3s, opacity 0.3s",
        padding: "20px",

        transform: "perspective(1px) translateZ(0)",
        transitionDuration: "0.3s",
        transitionProperty: "box-shadow",

        "&:hover, &:focus, &:active": {
          boxShadow: "0px 2px 5px 3px rgba(110, 95, 222, 0.25)",
        },
      },

      //? for Boxes that wrap section name
      //? withButton
      //* sx={{...theme.components.box.sectionName}}
      sectionName: {
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        flexWrap: "wrap",
        alignItems: "baseline",
        justifyContent: "flex-start",
        "@media (max-width: 500px)": {
          gap: "8px",
        },
      },

      //? for Boxes that wrap graphs
      //* sx={{...theme.components.box.graphContainer}}
      graphContainer: {
        borderRadius: "10px",
        minWidth: "750px",
        "@media (max-width: 1516px)": {
          alignItems: "center",
          justifyContent: "center",
          minWidth: "100%",
        },

        backgroundColor: (theme) => theme.palette.background.paper,
        boxShadow: "0px 2px 5px 0px rgba(110, 95, 222, 0.25)",
        transition: "background-color 0.3s, opacity 0.3s",
        gap: "32px",
        flexWrap: "wrap",
        padding: "20px",
        transform: "perspective(1px) translateZ(0)",
        transitionDuration: "0.3s",
        transitionProperty: "box-shadow",

        "&:hover, &:focus, &:active": {
          boxShadow: "0px 2px 5px 3px rgba(110, 95, 222, 0.25)",
        },
      },

      //? for Boxes that wrap icons inside dataGrid
      //* sx={{...theme.components.box.iconContainer}}
      iconContainer: {
        borderRadius: 10,
        height: 35,
        width: 35,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },

      productPreview: {
        "& .hvr-reveal": {
          display: "inline-block",
          verticalAlign: "middle",
          WebkitTransform: "perspective(1px) translateZ(0)",
          transform: "perspective(1px) translateZ(0)",
          boxShadow: "0 0 1px rgba(0, 0, 0, 0)",
          position: "relative",
          overflow: "hidden",
        },
        "& .hvr-reveal:before": {
          content: '""',
          position: "absolute",
          zIndex: -1,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          borderColor: "#2098D1",
          borderStyle: "solid",
          borderWidth: 0,
          transitionProperty: "border-width",
          transitionDuration: "0.1s",
          transitionTimingFunction: "ease-out",
        },
        "& .hvr-reveal:hover:before, & .hvr-reveal:focus:before, & .hvr-reveal:active:before":
          {
            WebkitTransform: "translateY(0)",
            transform: "translateY(0)",
            borderWidth: "4px",
          },
      },
    },

    dialog: {
      dialogBox: {
        backgroundColor: (theme) => theme.palette.background.dialogBox,
      },
      paperProps: { borderRadius: "15px" },

      //? for all dialogTitles
      //* sx={{...theme.components.dialog.dialogTitle}}
      dialogTitle: {
        minHeight: 70,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: `1px solid`,
        backgroundColor: (theme) => theme.palette.background.paper,
        borderColor: (theme) => theme.palette.text.forty,
      },

      //? for proper spacing of dialog title content
      //* sx={{...theme.components.dialog.dialogTitleContent}}
      dialogTitleContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },

      //? for all dialogContents
      //* sx={{...theme.components.dialog.dialogContent}}
      dialogContent: {
        height: "75vh",
        backgroundColor: (theme) => theme.palette.background.paper,
        display: "flex",
        justifyContent: "center",
        "@media (max-width: 600px)": {
          height: "90vh",
        },
      },

      dialogContentText: {
        pl: 5,
        minHeight: 50,
        pr: 2,
      },

      dialogActions: {
        pr: 3,
        justifyContent: "space-between",
        "& > *:not(:last-child)": {
          marginRight: "24px",
        },
      },

      //? styles for buttom saveButton on sm screens
      //* sx={{...theme.components.dialog.saveButtonSmall}}
      saveButtonSmall: {
        position: "sticky",
        bottom: 0,
        backgroundColor: (theme) => theme.palette.background.paper,
        zIndex: 1,
        display: {
          xs: "block",
          sm: "block",
          md: "none",
          lg: "none",
          xl: "none",
        },
      },
    },

    buttonBase: {
      main: {
        padding: 0,
        borderRadius: "10px",
        overflow: "hidden",
        width: 180,
      },

      large: {
        padding: 0,
        borderRadius: "10px",
        overflow: "hidden",
        width: "95%",
        maxWidth: 315,
      },
    },
  },
});

export default theme;
