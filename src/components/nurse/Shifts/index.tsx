import { VStack, Heading } from "@chakra-ui/react";
import ListNurseShifts from "./ListNurseShifts";

function Shifts() {
  return (
    <VStack p="8">
      <Heading as="h2" fontSize={"3xl"}>
        Shifts
      </Heading>
      <ListNurseShifts />
    </VStack>
  );
}

export default Shifts;
