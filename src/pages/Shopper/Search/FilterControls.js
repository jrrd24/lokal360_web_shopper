import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../components/Loading/Loading";
import theme from "../../../Theme";
import { ExpandMore, FilterAlt } from "@mui/icons-material";
import { useRequestProcessor } from "../../../hooks/useRequestProcessor";

const FilterControls = ({
  category,
  categoryID,
  query,
  type,
  prodType,
  handleSetValues,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { useCustomQuery } = useRequestProcessor();

  const { data, isLoading } = useCustomQuery(
    "getCategory",
    () => axiosPrivate.get(`/api/category`).then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Box width={200} sx={{ ...classes.filterContainer }}>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        sx={{ display: "flex", gap: "8px" }}
      >
        Search Filter{" "}
        <span>
          <FilterAlt />
        </span>
      </Typography>

      {/**Categories */}
      <FormControl sx={{ width: "100%", mb: 2 }}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="category-content"
            id="category-header"
          >
            <FormLabel id="category-radio">
              <Typography variant="subtitle1">By Category</Typography>
            </FormLabel>
          </AccordionSummary>

          <AccordionDetails>
            <RadioGroup
              aria-labelledby="category-radio"
              defaultValue={categoryID ? categoryID : "All"}
              name="category-radio-group"
            >
              <FormControlLabel
                value={"All"}
                control={<Radio size="small" />}
                label={"All Categories"}
                onClick={() => {
                  handleSetValues("All", "null", query, type, prodType);
                }}
              />
              {data.map((category) => {
                return (
                  <FormControlLabel
                    value={category.categoryID}
                    control={<Radio size="small" />}
                    label={category.category_name}
                    onClick={() => {
                      handleSetValues(
                        category.category_name,
                        category.categoryID,
                        query,
                        type,
                        prodType
                      );
                    }}
                  />
                );
              })}
            </RadioGroup>
          </AccordionDetails>
        </Accordion>
      </FormControl>

      {/**Product Type */}
      <FormControl sx={{ width: "100%", mb: 2 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="prodType-content"
            id="prodType-header"
          >
            <FormLabel id="category-radio">
              <Typography variant="subtitle1">By Product Type</Typography>
            </FormLabel>
          </AccordionSummary>

          <AccordionDetails>
            <RadioGroup
              aria-labelledby="category-radio"
              defaultValue={prodType ? prodType : "All"}
              name="category-radio-group"
              onClick={(event) => {
                handleSetValues(
                  category,
                  categoryID,
                  query,
                  type,
                  event.target.value === "All" ? "null" : event.target.value
                );
              }}
            >
              <FormControlLabel
                value={"All"}
                control={<Radio size="small" />}
                label={"All Products"}
              />
              <FormControlLabel
                value={"Finished Products"}
                control={<Radio size="small" />}
                label={"Finished Products"}
              />

              <FormControlLabel
                value={"Raw Materials"}
                control={<Radio size="small" />}
                label={"Raw Materials"}
              />
              <FormControlLabel
                value={"Quick Sellers"}
                control={<Radio size="small" />}
                label={"Quick Sellers"}
                disabled
              />
            </RadioGroup>
          </AccordionDetails>
        </Accordion>
      </FormControl>

      {/**Type*/}
      <FormControl sx={{ width: "100%", mb: 2 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="type-content"
            id="type-header"
          >
            <FormLabel id="category-radio">
              <Typography variant="subtitle1">By Type</Typography>
            </FormLabel>
          </AccordionSummary>

          <AccordionDetails>
            {console.log("TYPE", type)}
            <RadioGroup
              aria-labelledby="category-radio"
              defaultValue={type ? type : "All"}
              name="category-radio-group"
              onClick={(event) => {
                handleSetValues(
                  category,
                  categoryID,
                  query,
                  event.target.value === "All" ? "null" : event.target.value,
                  prodType
                );
              }}
            >
              <FormControlLabel
                value={"All"}
                control={<Radio size="small" />}
                label={"Products and Shops"}
              />
              <FormControlLabel
                value={"Product"}
                control={<Radio size="small" />}
                label={"Products Only"}
              />

              <FormControlLabel
                value={"Shop"}
                control={<Radio size="small" />}
                label={"Shops Only"}
              />
            </RadioGroup>
          </AccordionDetails>
        </Accordion>
      </FormControl>
    </Box>
  );
};

const classes = {
  filterContainer: {
    background: theme.palette.background.paper,
    p: 1.5,
    width: "100%",
    borderRadius: 3,
    border: `solid 1px ${theme.palette.text.ten}`,
    borderBottom: `solid 3px ${theme.palette.text.ten}`,
    userSelect: "none",
    position: "sticky",
    mb: 2,
  },
};

export default FilterControls;
