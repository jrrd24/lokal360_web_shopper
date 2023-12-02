import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileContent from "./ProfileContent";
import ShopSidebar from "../../components/Sidebar/ShopSidebar";

const Profile = React.memo(() => {
  //Set Page Title
  useEffect(() => {
    document.title = "Profile | Lokal 360";
    return () => {
      document.title = "Lokal 360";
    };
  }, []);

  return <ShopSidebar component={() => <ProfileContent />} />;
});

export default Profile;
