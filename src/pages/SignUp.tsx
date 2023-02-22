import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Layout from "components/Layout";
import { AuthService } from "services/apis";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link as RouterLink } from "react-router-dom";
import { userEnum } from "state";
import useVerify from "hooks/useVerify";

export default function SignupCard() {
  const boxBg = useColorModeValue("white", "gray.700");
  const [showPassword, setShowPassword] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const toast = useToast();
  useVerify();

  const auth = AuthService.getInstance();
  const { user: authUser } = useSelector((x: any) => x.user);
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    if (!fName || !lName || !email || !password || !passwordConfirm)
      return toast({
        title: "Incomplete Fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

    if (password !== passwordConfirm)
      return toast({
        title: "Passwords Not Match",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

    const data = await auth.register({
      firstName: fName,
      lastName: lName,
      email,
      password,
    });
    if (!data.success)
      return toast({
        title: "Opps! Unable to SignUp",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

    dispatch({
      type: userEnum.USER_PROFILE_SUCCESS,
      payload: { firstName: fName, lastName: lName, email },
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
        // bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={boxBg} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={fName}
                      onChange={(e) => setFName(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={lName}
                      onChange={(e) => setLName(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="password-confirm" isRequired>
                <FormLabel>Password Confirm</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleSignUp}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Text color="blue.400" as="span">
                    <RouterLink to="/">Sign In</RouterLink>
                  </Text>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
}
