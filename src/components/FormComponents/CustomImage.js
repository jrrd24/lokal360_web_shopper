import React from "react";
import { Controller } from "react-hook-form";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function CustomImage({
  control,
  name,
  rules,
  defaultValue,
  selectedImage,
  alt,
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <img
          src={selectedImage}
          alt={alt}
          style={{ maxHeight: 250, width: "100%" }}
        />
      )}
    />
  );
}

function ReadOnlyCustomImage({ selectedImage, alt }) {
  return (
    <Zoom>
      <img
        src={selectedImage}
        alt={alt}
        style={{ maxHeight: 250, width: "100%", objectFit: "cover" }}
      />
    </Zoom>
  );
}

export { CustomImage, ReadOnlyCustomImage };
