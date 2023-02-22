import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Layout from "components/Layout";
import useVerify from "hooks/useVerify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { AuthService } from "services/apis";
import { userEnum } from "state/enums";

export default function SimpleCard() {
  const boxBg = useColorModeValue("white", "gray.700");
  const { user: authUser } = useSelector((x: any) => x.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const auth = AuthService.getInstance();
  useVerify();

  const handleSignIn = async () => {
    if (!email || !password || password.length < 6)
      return toast({
        title: "Invalid Input",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

    const data = await auth.login({ email, password });
    dispatch({
      type: userEnum.USER_PROFILE_SUCCESS,
      payload: {
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email,
      },
    });
    localStorage.setItem("token", JSON.stringify(data.token));
    return <Navigate to="/dashboard" />;
  };

  if (authUser) return <Navigate to="/dashboard" />;
  return (
    <Layout>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        //   bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={boxBg} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleSignIn}
                >
                  Sign in
                </Button>
                <Stack>
                  <Text align={"center"}>
                    New User?{" "}
                    <Text color="blue.400" as="span">
                      <RouterLink to="/signup">Sign Up</RouterLink>
                    </Text>
                  </Text>
                </Stack>
                <Stack>
                  <Text align={"center"}>
                    <Text color="blue.400" as="span">
                      <RouterLink to="/forgotpassword">
                        Forgot Password
                      </RouterLink>
                    </Text>
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
}
