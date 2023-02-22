import {
  Popover,
  PopoverTrigger,
  Portal,
  PopoverHeader,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  Button,
  HStack,
  Stack,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { MediatorService } from "services/apis";
import { useQueryClient } from "react-query";

function AddHospital() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [username, setUsername] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mediator = MediatorService.getInstance();
  const queryClient = useQueryClient();

  const addHospital = async () => {
    if (!fName || !lName || !username || !email || !password || !hospitalName)
      return alert("Please fill all fields");
    const payload = {
      first_name: fName,
      last_name: lName,
      hospital_name: hospitalName,
      username,
      email,
      password,
    };
    await mediator.createGroup("hospital", payload);
    queryClient.invalidateQueries("hospitals");
    setFName("");
    setLName("");
    setUsername("");
    setEmail("");
    setHospitalName("");
    setPassword("");
  };
  const addHospitalBtnColor = useColorModeValue("blue.400", "blue.200");
  return (
    <Popover closeOnBlur={false} placement="left">
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button bg={addHospitalBtnColor}>Add Hospital</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverHeader>Fill the form to add a hospital</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Stack spacing={4} my="6">
                  <FormControl id="first_name">
                    <FormLabel>First Name</FormLabel>
                    <Input
                      value={fName}
                      onChange={(e) => setFName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="last_name">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      value={lName}
                      onChange={(e) => setLName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="hospital">
                    <FormLabel>Hospital</FormLabel>
                    <Input
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="username">
                    <FormLabel>Username</FormLabel>
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormControl>
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
                </Stack>
                <HStack my="1">
                  <Button colorScheme="blue" onClick={addHospital}>
                    Add
                  </Button>
                  <Button colorScheme="blue" onClick={onClose}>
                    Close
                  </Button>
                </HStack>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}

export default AddHospital;
