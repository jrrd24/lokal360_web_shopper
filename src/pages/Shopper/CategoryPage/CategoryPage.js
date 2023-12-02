import React, { useEffect } from "react";
import CustomAppbar from "../../../components/Appbar/CustomAppbar";
import { useParams } from "react-router-dom";
import CategoryContent from "./CategoryContent";

function CategoryPage() {
  //Set Document Title
  const { categoryName } = useParams();
  useEffect(() => {
    document.title = `${categoryName} | Lokal 360`;
    return () => {
      document.title = "Lokal 360";
    };
  }, [categoryName]);

  return (
    <CustomAppbar
      component={() => <CategoryContent categoryName={categoryName} />}
    />
  );
}

export default CategoryPage;
