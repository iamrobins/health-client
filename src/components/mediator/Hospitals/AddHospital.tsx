import { useRef } from "react";
import {
  Popover,
  PopoverTrigger,
  Portal,
  PopoverHeader,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Button,
  Box,
  HStack,
} from "@chakra-ui/react";

function AddHospital() {
  return (
    <Popover closeOnBlur={false} placement="left">
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button>Add Hospital</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverHeader>Fill the form to add a hospital</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Box>
                  Hello. Nice to meet you! This is the body of the popover
                </Box>
                <HStack my="1">
                  <Button colorScheme="blue">Add</Button>
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
