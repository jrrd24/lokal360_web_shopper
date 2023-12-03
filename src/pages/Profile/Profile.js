import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileContent from "./ProfileContent";
import CustomAppbar from "../../components/Appbar/CustomAppbar";

const Profile = React.memo(() => {
  //Set Page Title
  useEffect(() => {
    document.title = "Profile | Lokal 360";
    return () => {
      document.title = "Lokal 360";
    };
  }, []);

  return <CustomAppbar component={() => <ProfileContent />} />;
});

export default Profile;
