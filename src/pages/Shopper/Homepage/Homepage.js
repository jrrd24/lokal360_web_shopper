import React, { useEffect } from "react";
import CustomAppbar from "../../../components/Appbar/CustomAppbar";
import HomepageContent from "./HomepageContent";

function Homepage() {
  //Set Document Title
  useEffect(() => {
    document.title = "Lokal 360";
    return () => {
      document.title = "Lokal 360";
    };
  }, []);

  return <CustomAppbar component={HomepageContent} isHome />;
}

export default Homepage;
