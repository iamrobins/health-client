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
                    <Text>Scroll Check For Sidebar</Text>
                    {[...Array(50)].map((_, i) => (
                      <div key={i}>Some Content {i + 1}</div>
                    ))}
                  </Dashboard>
                </PrivateRoute>
              }
            />
            <Route
              path="hospitals"
              element={
                <PrivateRoute>
                  <Dashboard>
                    <Hospitals />
                  </Dashboard>
                </PrivateRoute>
              }
            />
            <Route
              path="nurses"
              element={
                <PrivateRoute>
                  <Dashboard>
                    <Nurses />
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
