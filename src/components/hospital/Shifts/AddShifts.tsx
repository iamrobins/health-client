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
import { HospitalService } from "services/apis";
import { useQueryClient } from "react-query";

function AddNurse() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [payPerHour, setPayPerHour] = useState("");
  const hospital = HospitalService.getInstance();
  const queryClient = useQueryClient();

  const addShift = async () => {
    if (!name || !location || !startTime || !payPerHour)
      return alert("Please fill all fields");
    const payload = {
      name: name,
      location: location,
      start_time: startTime,
      pay_per_hour: payPerHour,
    };
    await hospital.addShift(payload);
    queryClient.invalidateQueries("shifts");
    setName("");
    setLocation("");
    setStartTime("");
    setPayPerHour("");
  };
  const addNurselBtnColor = useColorModeValue("blue.400", "blue.200");
  return (
    <Popover closeOnBlur={false} placement="left">
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button bg={addNurselBtnColor}>Add Shift</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverHeader>Fill the form to add a shift</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Stack spacing={4} my="6">
                  <FormControl id="Name">
                    <FormLabel>Name</FormLabel>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="Location">
                    <FormLabel>Location</FormLabel>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="Start Time">
                    <FormLabel>Start Time</FormLabel>
                    <Input
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="Pay">
                    <FormLabel>Pay Per Hour</FormLabel>
                    <Input
                      value={payPerHour}
                      onChange={(e) => setPayPerHour(e.target.value)}
                    />
                  </FormControl>
                </Stack>
                <HStack my="1">
                  <Button colorScheme="blue" onClick={addShift}>
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

export default AddNurse;
