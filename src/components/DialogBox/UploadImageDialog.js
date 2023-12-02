import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Stack,
  Alert,
  AlertTitle,
  Link,
} from "@mui/material";
import { Image } from "@mui/icons-material";
import { CustomImage } from "../FormComponents/CustomImage";

function UploadImage({
  alt,
  name,
  control,
  register,
  setValue,
  sx,
  small,
  buttonSizeSmall,
}) {
  const [uploadError, setUploadError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  let selectedFile = null;

  // Handle image change
  const handleImageChange = (e) => {
    setUploadError(false);
    setSelectedImage(null);
    selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 2 * 1024 * 1024) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
      setValue(name, selectedFile, { shouldDirty: true });
    } else {
      setUploadError(true);
    }
  };

  // Use useEffect to observe selectedImage changes and update the form field
  useEffect(() => {
    if (selectedImage !== null) {
      setValue(name, selectedFile, { shouldDirty: true });
    }
  }, [selectedFile, setValue]);

  return (
    <Box sx={{ py: 2, width: "100%", ...sx }}>
      <Button
        variant="outlined"
        component="label"
        sx={{
          ...classes.uploadImageButton,
          width: small && !buttonSizeSmall ? "48%" : "100%",
        }}
      >
        <input
          type="file"
          hidden
          accept="image/*"
          {...register(name)}
          onChange={handleImageChange}
        />
        <Image />
        <Typography
          variant="sectionTitleSmall"
          color="inherit" // Change text color for invalid hex
        >
          Upload Image
        </Typography>
      </Button>
      {/*Display error message */}
      {uploadError && (
        <Alert severity="warning">
          <AlertTitle>Upload Warning:</AlertTitle>
          No Image Uploaded or <strong>2mb Maximum File Size </strong>is
          Exceeded
        </Alert>
      )}
      {/*Display Uploaded Image */}
      {!small && (
        <Stack spacing={1} sx={{ ...classes.displayUploadedImage }}>
          <Typography
            variant="sectionTitleSmall"
            color="inherit"
            sx={{ ...classes.selectedImageTypography }}
          >
            {uploadError || selectedImage === null ? "" : "    Image Preview"}
          </Typography>

          {selectedImage && (
            <Box sx={{ ...classes.customImageContainer }}>
              <CustomImage
                control={control}
                name={name}
                selectedImage={selectedImage}
                alt={alt}
              />
            </Box>
          )}
        </Stack>
      )}

      {small && (
        <Box sx={{ display: "flex", justifyContent: "left" }}>
          <Link href={selectedImage} target="_blank">
            {selectedImage}
          </Link>
        </Box>
      )}
    </Box>
  );
}

const classes = {
  uploadImageButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
    marginBottom: "10px",
    cursor: "pointer",
    border: "solid",
    borderStyle: "dashed",
    borderWidth: 2,
    transition: "background-color 0.3s",
  },
  displayUploadedImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: 2,
  },
  selectedImageTypography: {
    display: "flex",
    alignItems: "start",
  },
  customImageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 300,
    maxWidth: "100%",
  },
};

export { UploadImage };
