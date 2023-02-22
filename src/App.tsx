import * as React from "react";
import { ChakraProvider, Box, theme, Text } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import PrivateRoute from "components/PrivateRoute";
import ForgotPassword from "pages/ForgotPassword";
import PasswordReset from "pages/PasswordReset";
import Dashboard from "pages/dashboard";
import Hospitals from "components/mediator/Hospitals";
import Nurses from "components/mediator/Nurses";
import Shifts from "components/hospital/Shifts";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard">
            <Route
              index={true}
              element={
                <PrivateRoute>
                  <Dashboard>
                    <Text>Dashboard Main Area</Text>
                  </Dashboard>
                </PrivateRoute>
              }
            />
            {/* Mediator */}
            <Route
              path="mediator/hospitals"
              element={
                <PrivateRoute>
                  <Dashboard>
                    <Hospitals />
                  </Dashboard>
                </PrivateRoute>
              }
            />
            <Route
              path="mediator/nurses"
              element={
                <PrivateRoute>
                  <Dashboard>
                    <Nurses />
                  </Dashboard>
                </PrivateRoute>
              }
            />
            {/* Hospital */}
            <Route
              path="hospital/shifts"
              element={
                <PrivateRoute>
                  <Dashboard>
                    <Shifts />
                  </Dashboard>
                </PrivateRoute>
              }
            />
            {/* Nurses */}
            <Route
              path="nurse/shifts"
              element={
                <PrivateRoute>
                  <Dashboard>
                    <div>Available Shifts</div>
                  </Dashboard>
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Box>
    </ChakraProvider>
  );
};
