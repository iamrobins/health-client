import { VStack, Heading } from "@chakra-ui/react";
import AddNurse from "./AddNurse";
import ListNurses from "./ListNurses";

function Hospitals() {
  return (
    <VStack p="8">
      <Heading as="h2" fontSize={"3xl"}>
        Nurses
      </Heading>
      <ListNurses />
      <AddNurse />
    </VStack>
  );
}

export default Hospitals;
