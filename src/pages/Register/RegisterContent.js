import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/FormComponents/CustomInput";
import { useForm } from "react-hook-form";
import { CustomPhoneNumberPicker } from "../../components/FormComponents/CustomPhoneNumberPicker";
import { useRequestProcessor } from "../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { api } from "../../api/Api";
import { LoadingCircle } from "../../components/Loading/Loading";
import useAlert from "../../hooks/useAlert";
import CustomAlert from "../../components/CustomAlert";

function RegisterContent() {
  const navigate = useNavigate();
  const { control, handleSubmit, trigger, watch } = useForm();
  // Handle Alert Click
  const {
    open: openAlert,
    severity,
    alertMsg,
    showAlert,
    hideAlert,
  } = useAlert();

  const password = React.useRef({});
  password.current = watch("password", "");

  //API CALL REGISTER USER
  const { useCustomMutate } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { mutate } = useCustomMutate(
    "registerUser",
    async (data) => {
      await api.post(`api/auth/register`, data);
    },
    [],
    {
      onError: (error) => {
        showAlert("error", error.response.data.error);
      },
      onMutate: () => {
        <LoadingCircle />;
      },
      onSuccess: () => {
        navigate("/login");
      },
    }
  );

  const handleRegister = (data) => {
    console.log("REG DAT", data);
    const requestData = {
      email: data.email,
      username: data.username,
      mobile_num: data.phoneNumber,
      password: data.password,
    };

    mutate(requestData);
  };

  return (
    <div>
      <Container sx={{ bgcolor: "#ffffff", p: 3, borderRadius: 5 }}>
        <Stack spacing={3} sx={{ p: 2 }}>
          {/*SignUp */}
          <Box
            sx={{
              fontWeight: "medium",
              fontSize: 36,
              textAlign: "left",
            }}
          >
            Create An Account
          </Box>

          {/*Registration Form */}
          <form onSubmit={handleSubmit(handleRegister)}>
            <Stack spacing={3}>
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

                <CustomPhoneNumberPicker
                  control={control}
                  name="phoneNumber"
                  label="Phone Number"
                  width="100%"
                  trigger={trigger}
                  rules={{
                    required: "Phone Number Is Required",
                    pattern: {
                      value: /^(09|\+639|\+63 9)\d{9}$/,
                      message:
                        "Invalid Phone Number Format Must Be +63 966 123 4565",
                    },
                  }}
                />

                {/*Username*/}
                <CustomInput
                  control={control}
                  name="username"
                  label="Username"
                  rules={{
                    required: "Username Is Required",
                    maxLength: {
                      value: 60,
                      message: "Max Length of Email is 60 Characters",
                    },
                    validate: (value) => {
                      // Use a regular expression to check for non-whitespace characters
                      const isValid = /\S/.test(value);
                      return isValid || "Username cannot be blank";
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

                {/*Confirm Password*/}
                <CustomInput
                  control={control}
                  name="confirm_password"
                  label="Confirm Password"
                  secureTextEntry
                  rules={{
                    required: "Confirm Password Is Required",
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
                    validate: (value) =>
                      value === password.current || "Passwords do not match",
                  }}
                />
              </Stack>

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
                Sign Up
              </Button>
            </Stack>
          </form>
        </Stack>
      </Container>

      {/*Display Alert */}
      <CustomAlert
        open={openAlert}
        setOpen={hideAlert}
        severity={severity}
        alertMsg={alertMsg}
      />
    </div>
  );
}

export default RegisterContent;
