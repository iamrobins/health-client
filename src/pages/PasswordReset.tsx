import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
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
import { useSelector } from "react-redux";
import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import { AuthService } from "services/apis";

export default function SimpleCard() {
  const boxBg = useColorModeValue("white", "gray.700");
  const { user: authUser } = useSelector((x: any) => x.user);
  const [password, setPassword] = useState("");
  const toast = useToast();
  const auth = AuthService.getInstance();
  const { resetToken } = useParams();
  useVerify();

  const handlePasswordReset = async () => {
    if (!password || !resetToken)
      return toast({
        title: "Invalid Input",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

    const data = await auth.passwordReset(resetToken, password);
    if (data) {
      return window.location.replace("/");
    }
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
            <Heading fontSize={"4xl"}>Password Reset</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Don't worry <Link color={"blue.400"}>we've got you!</Link> ✌️
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={boxBg} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id="password">
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handlePasswordReset}
                >
                  Reset Password
                </Button>
                <Stack>
                  <Text align={"center"}>
                    New User?{" "}
                    <Text color="blue.400" as="span">
                      <RouterLink to="/signup">Sign Up</RouterLink>
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
