import { useState } from "react";

function useAlert() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [alertMsg, setAlertMsg] = useState("");

  const showAlert = (severity, message) => {
    setSeverity(severity);
    setAlertMsg(message);
    setOpen(true);
  };

  const hideAlert = () => {
    setOpen(false);
  };

  return {
    open,
    severity,
    alertMsg,
    showAlert,
    hideAlert,
  };
}

export default useAlert;
