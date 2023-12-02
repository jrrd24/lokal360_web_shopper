import { Search } from "@mui/icons-material";
import { Box, IconButton, InputBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "../../Theme";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (searchValue !== "" && searchValue !== null && searchValue.trim() !== "")
      setDisableButton(false);
    else setDisableButton(true);
  }, [searchValue]);

  const handleInputChange = (e) => setSearchValue(e.target.value);
  const handleEnterKey = (e) => e.key === "Enter" && handleSearchClick();

  const handleSearchClick = () => {
    navigate(`/search/${encodeURIComponent(searchValue)}`);
  };

  return (
    <Box sx={{ ...classes.searchBar }}>
      <InputBase
        name="searchBar"
        sx={{ ...classes.searchInput }}
        placeholder="Find What You Need"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterKey}
      />
      <IconButton
        type="button"
        sx={{
          p: "10px",
          color: theme.palette.primary.main,
        }}
        onClick={handleSearchClick}
        disabled={disableButton}
      >
        <Search />
      </IconButton>
    </Box>
  );
}

const classes = {
  searchBar: {
    width: 380,
    backgroundColor: "#fafafa",
    border: 1,
    borderColor: "#BBBBBB",
    borderRadius: 2,
    alignSelf: "center",
    display: { xs: "none", sm: "flex" },
    justifyContent: "space-around",
    "@media (max-width: 900px)": {
      width: 300,
    },
  },

  searchInput: {
    width: 280,
    "@media (max-width: 900px)": {
      width: 220,
    },
  },
};

export default Searchbar;
