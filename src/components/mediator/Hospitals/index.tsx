import { VStack, Heading } from "@chakra-ui/react";
import AddHospital from "./AddHospital";
import ListHospitals from "./ListHospitals";

function Hospitals() {
  return (
    <VStack p="8">
      <Heading as="h2" fontSize={"3xl"}>
        Hospitals
      </Heading>
      <ListHospitals />
      <AddHospital />
    </VStack>
  );
}

export default Hospitals;
