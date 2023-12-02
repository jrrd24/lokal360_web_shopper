import React from "react";
import CategoryContainer from "../../../../components/Containers/CategoryContainer";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import MapData from "../../../../utils/MapData";

function Categories() {
  //API CALL GET ALL ACTIVE SITEWIDE ADS
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: categoryData, isLoading } = useCustomQuery(
    "getAllCategory",
    () =>
      axiosPrivate
        .get(`/api/shopper_get/all_categories`)
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div>
      <MapData
        inputData={categoryData}
        component={CategoryContainer}
        horizontal
        height={90}
      />
    </div>
  );
}

export default Categories;
