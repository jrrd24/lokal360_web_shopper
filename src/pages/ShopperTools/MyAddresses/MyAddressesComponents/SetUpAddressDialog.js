import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import theme from "../../../../Theme";
import ButtonSave from "../../../../components/Buttons/ButtonSave";
import ButtonCloseDialog from "../../../../components/Buttons/ButtonCloseDialog";
import { CustomInput } from "../../../../components/FormComponents/CustomInput";
import {
  barangays,
  districts,
  municipalities,
  provinces,
  regions,
} from "../../../../utils/MapSelectMenuItems";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import { LoadingCircle } from "../../../../components/Loading/Loading";

function SetUpAddressDialog({ open, handleClose, handleSave }) {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  // For React Hook Form
  const {
    control,
    handleSubmit,
    formState: { isDirty },
    setValue,
    reset,
  } = useForm();

  //API CALL CREATE ADDRESS
  const { useCustomMutate } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const { mutate } = useCustomMutate(
    "createDeliveryAddress",
    async (data) => {
      await axiosPrivate.post(
        `api/user/create_delivery_address/?shopperID=${auth.shopperID}`,
        data
      );
    },
    ["getAllDeliveryAddress"],
    {
      onError: (error) => {
        handleSave("error", error.response.data.error);
      },
      onMutate: () => {
        <LoadingCircle />;
      },
      onSuccess: () => {
        handleSave("success", "Delivery Address Added Successfully");
        handleClose();
        reset();
      },
    }
  );

  const onSubmit = async (data, event) => {
    event.preventDefault();

    mutate(data);
  };

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");

  const [filteredProvince, setFilteredProvince] = useState([]);
  const [filteredMunicipality, setFilteredMunicipality] = useState([]);
  const [filteredBarangay, setFilteredBarangay] = useState([]);

  // Keep track of whether the component has loaded
  const [componentLoaded, setComponentLoaded] = useState(false);

  //For filtered Provinces
  useEffect(() => {
    const selectedRegionCode = regions.find(
      (region) => region.label === selectedRegion
    )?.code;

    let ProvinceData = [];
    if (selectedRegionCode === "130000000") {
      ProvinceData = districts.filter(
        (province) => province.regionCode === selectedRegionCode
      );
    } else {
      ProvinceData = provinces.filter(
        (province) => province.regionCode === selectedRegionCode
      );
    }

    // Check if the component has loaded before clearing the fields
    if (componentLoaded) {
      setSelectedProvince("");
      setSelectedMunicipality("");
      setSelectedBarangay("");

      setValue("province", "");
      setValue("municipality", "");
      setValue("barangay", "");
    } else {
      // Set the component as loaded after the initial render
      setComponentLoaded(true);
    }

    setFilteredProvince(ProvinceData);
  }, [selectedRegion]);

  //For filtered Municipalities
  useEffect(() => {
    const selectedProvinceCode =
      provinces.find((province) => province.label === selectedProvince)
        ?.provinceCode ||
      districts.find((district) => district.label === selectedProvince)
        ?.districtCode;

    const MunicipalityData = municipalities.filter(
      (municipality) =>
        municipality.provinceCode === selectedProvinceCode ||
        municipality.districtCode === selectedProvinceCode
    );

    if (componentLoaded) {
      setSelectedMunicipality("");
      setSelectedBarangay("");

      setValue("municipality", "");
      setValue("barangay", "");
    } else {
      setComponentLoaded(true);
    }

    setFilteredMunicipality(MunicipalityData);
  }, [selectedProvince, selectedRegion]);

  //For filtered Barangays
  useEffect(() => {
    const selectedMunicipalityCode = municipalities.find(
      (municipality) => municipality.label === selectedMunicipality
    )?.municipalityCode;

    const BarangayData = barangays.filter(
      (barangay) =>
        barangay.municipalityCode === selectedMunicipalityCode ||
        barangay.cityCode === selectedMunicipalityCode
    );

    if (componentLoaded) {
      setSelectedBarangay("");

      setValue("barangay", "");
    } else {
      setComponentLoaded(true);
    }

    setFilteredBarangay(BarangayData);
  }, [selectedMunicipality]);

  return (
    <div>
      <Dialog
        fullScreen={isSmScreen}
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        hideBackdrop={true}
        sx={{ ...theme.components.dialog.dialogBox }}
        PaperProps={{ sx: { ...theme.components.dialog.paperProps } }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Dialog Title/ Buttons */}
          <DialogTitle sx={{ ...theme.components.dialog.dialogTitle }}>
            <Box sx={{ ...theme.components.dialog.dialogTitleContent }}>
              {/* Dialog Title*/}
              <Typography variant="sectionTitle">Set Up Address</Typography>

              {/*  Buttons */}
              <DialogActions sx={{ gap: "16px" }}>
                <ButtonSave
                  type="submit"
                  isDirty={isDirty}
                  sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                />
                <ButtonCloseDialog handleClose={handleClose} />
              </DialogActions>
            </Box>
          </DialogTitle>

          {/* Dialog Content */}
          <DialogContent sx={{ ...theme.components.dialog.dialogContent }}>
            {/*Main*/}
            <Stack spacing={2} sx={{ width: "600px", pt: 5 }}>
              <Stack spacing={3}>
                {/*Address Line 1*/}
                <CustomInput
                  control={control}
                  name="addressLine1"
                  label="Address Line 1"
                  width="100%"
                  rules={{
                    required: "Address Line 1 Is Required",
                    maxLength: {
                      value: 200,
                      message: "Max Length of 200 Characters",
                    },
                  }}
                />

                {/*Address Line 2*/}
                <CustomInput
                  control={control}
                  name="addressLine2"
                  label="Address Line 2"
                  width="100%"
                />

                {/*region/province */}
                <Stack direction={"row"} spacing={3}>
                  {/*region*/}
                  <CustomInput
                    control={control}
                    name="region"
                    label="Region"
                    width="48%"
                    select
                    selectMenuItems={regions}
                    setSelectedValue={setSelectedRegion}
                    rules={{ required: "Region Is Required" }}
                  />
                  {/*barangay*/}

                  {/*province*/}
                  <CustomInput
                    control={control}
                    name="province"
                    label="Province"
                    width="48%"
                    select
                    selectMenuItems={filteredProvince}
                    setSelectedValue={setSelectedProvince}
                    rules={{ required: "Province Is Required" }}
                  />
                </Stack>

                {/*municipality/ barangay */}
                <Stack direction={"row"} spacing={3}>
                  {/*municipality*/}
                  <CustomInput
                    control={control}
                    name="municipality"
                    label="City/ Municipality"
                    width="48%"
                    select
                    selectMenuItems={filteredMunicipality}
                    setSelectedValue={setSelectedMunicipality}
                    rules={{ required: "City/ Municipality Is Required" }}
                  />

                  <CustomInput
                    control={control}
                    name="barangay"
                    label="Barangay"
                    width="48%"
                    select
                    selectMenuItems={filteredBarangay}
                    setSelectedValue={setSelectedBarangay}
                    rules={{ required: "Barangay Is Required" }}
                  />
                </Stack>
                {/*postal code*/}
                <CustomInput
                  control={control}
                  name="postalCode"
                  label="Postal Code"
                  width="48%"
                  rules={{
                    required: "Postal Code Is Required",
                    maxLength: {
                      value: 4,
                      message: "Postal Code has 4 digits Only (Sample: 3500)",
                    },
                  }}
                />
              </Stack>
            </Stack>
          </DialogContent>

          {/* Show Save Button at Bottom for small screens */}
          <Box sx={{ ...theme.components.dialog.saveButtonSmall }}>
            <DialogActions sx={{ py: 2, display: "flex" }}>
              <ButtonSave type="submit" isDirty={isDirty} />
            </DialogActions>
          </Box>
        </form>
      </Dialog>
    </div>
  );
}

export default SetUpAddressDialog;
