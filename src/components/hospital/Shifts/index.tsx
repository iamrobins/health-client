import { VStack, Heading } from "@chakra-ui/react";
import ListShifts from "./ListShifts";

function Shifts() {
  return (
    <VStack p="8">
      <Heading as="h2" fontSize={"3xl"}>
        Shifts
      </Heading>
      <ListShifts />
    </VStack>
  );
}

export default Shifts;
