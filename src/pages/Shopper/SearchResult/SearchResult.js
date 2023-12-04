import React, { useEffect } from "react";
import SearchResultContent from "./SearchResultContent";
import { useParams } from "react-router-dom";
import CustomAppbar from "../../../components/Appbar/CustomAppbar";

function SearchResult() {
  const { query } = useParams();

  //Set Document Title
  useEffect(() => {
    document.title = `Result: ${query} | Lokal 360`;
    return () => {
      document.title = "Lokal 360";
    };
  }, [query]);

  return <CustomAppbar component={SearchResultContent} />;
}

export default SearchResult;
