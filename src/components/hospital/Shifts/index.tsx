import { VStack, Heading } from "@chakra-ui/react";
import ListShifts from "./ListShifts";
import AddShifts from "./AddShifts";

function Shifts() {
  return (
    <VStack p="8">
      <Heading as="h2" fontSize={"3xl"}>
        Shifts
      </Heading>
      <ListShifts />
      <AddShifts />
    </VStack>
  );
}

export default Shifts;
