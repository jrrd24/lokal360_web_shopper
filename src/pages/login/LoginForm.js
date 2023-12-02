import React, { useContext, useEffect } from "react";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Button,
  Divider,
  Link,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { CustomInput } from "../../components/FormComponents/CustomInput";
import { useForm } from "react-hook-form";
import CustomAlert from "../../components/CustomAlert";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../contexts/AuthProvider";
import { api } from "../../api/Api";
import useAlert from "../../hooks/useAlert";
import { AppRegistration } from "@mui/icons-material";

const LoginForm = ({ loginOnly }) => {
  //initialize api url
  const LOGIN_URL = `/api/auth/login`;
  // React Hook Form / auth context / react-router declarations
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const { setAuth, persist, setPersist } = useContext(AuthContext);
  const { control, handleSubmit } = useForm();

  const { open, severity, alertMsg, showAlert, hideAlert } = useAlert();

  // Function for handling login after clicking login button
  const handleLogin = async (data) => {
    const { email, password } = data;
    const payload = {
      email,
      password,
    };

    api
      .post(LOGIN_URL, payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("Login Response:", response);
        //pass the ff to AuthContext
        const accessToken = response?.data?.accessToken;
        const roles = response?.data.roles;
        const userID = response?.data.userID;
        const shopID = response?.data.shopID;
        const employeePriviledges = response?.data.employeePriviledges;
        console.log(userID);
        setAuth({
          email,
          password,
          roles,
          userID,
          shopID,
          accessToken,
          employeePriviledges,
        });
        console.log("Logged In", {
          payload,
          roles,
          userID,
          shopID,
          accessToken,
          employeePriviledges,
        });

        // navigate(from, { replace: true });
        !loginOnly || userID ? navigate("/") : navigate("/shop/register");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          showAlert("warning", "Incorrect Username or Password");
        } else if (error.response && error.response.status === 404) {
          showAlert("warning", "User does not Exist");
        } else {
          showAlert("error", "Server Error. Please Try Again Later");
        }
      });
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <Container sx={{ bgcolor: "#ffffff", p: 3, borderRadius: 5 }}>
      <Stack spacing={3} sx={{ p: 2 }}>
        {/*Welcome */}
        <Box
          sx={{
            fontWeight: "medium",
            fontSize: !loginOnly ? 48 : 36,
            textAlign: "left",
          }}
        >
          {!loginOnly ? "Welcome" : "Login to your Account"}
        </Box>

        {/*Login Form */}
        <form onSubmit={handleSubmit(handleLogin)}>
          {/*Email /Password /Remember Me*/}
          <Stack spacing={2}>
            {/*Email*/}
            <CustomInput
              control={control}
              name="email"
              label="Email"
              rules={{
                required: "Email Is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid Email Address",
                },
                maxLength: {
                  value: 255,
                  message: "Max Length of Email is 255 Characters",
                },
              }}
            />

            {/*Password*/}
            <CustomInput
              control={control}
              name="password"
              label="Password"
              secureTextEntry
              rules={{
                required: "Password Is Required",
                minLength: {
                  value: 8,
                  message: "Password Should Have at least 8 Characters",
                },
                pattern: {
                  value: /^\S*$/,
                  message: "Spaces are Not Allowed ",
                },
                maxLength: {
                  value: 30,
                  message: "Max Length of Password is 30 Characters",
                },
              }}
            />

            {/*Remember Me/Forgot Password */}
            {!loginOnly && (
              <Stack
                direction="row"
                spacing={{ xs: 3, md: 12.5 }}
                sx={{ width: "400" }}
              >
                {/*Remember Me*/}
                <FormControlLabel
                  control={
                    <Checkbox onChange={togglePersist} checked={persist} />
                  }
                  label="Remember Me"
                />

                {/*Forgot Password */}
                <Link component="button" variant="body2" onClick={() => {}}>
                  Forgot Password
                </Link>
              </Stack>
            )}

            {/*Button*/}
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "primary",
                height: 57,
                fontWeight: "medium",
                fontSize: 20,
              }}
            >
              Log In
            </Button>
          </Stack>
        </form>

        {/*Or/ Google */}
        {!loginOnly && (
          <Stack spacing={2}>
            {/*Or */}
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Divider style={{ flexGrow: 1 }} />
              <Typography
                variant="body1"
                style={{ margin: "0 10px", fontSize: 17, color: "#8F8F8F" }}
              >
                Or
              </Typography>
              <Divider style={{ flexGrow: 1 }} />
            </Box>

            <Button
              variant="outlined"
              sx={{ backgroundColor: "#ffffff" }}
              startIcon={<AppRegistration />}
              onClick={() => navigate("/shop/register/login")}
            >
              Register A Shop
            </Button>
          </Stack>
        )}

        {loginOnly && (
          <Stack spacing={2} sx={{ textAlign: "left" }}>
            <Alert severity="info">
              Only <b> Registered Accounts</b> Can Apply for a Shop
            </Alert>
            <Alert severity="warning">
              A User can only own <b>1 Shop</b>
            </Alert>
          </Stack>
        )}

        {/*Alert */}
        <CustomAlert
          open={open}
          setOpen={hideAlert}
          severity={severity}
          alertMsg={alertMsg}
        />
      </Stack>
    </Container>
  );
};

export default LoginForm;
