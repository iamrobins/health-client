import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MediatorService } from "services/apis";
import { User } from "interfaces";

function ListHospitals() {
  const [hospitals, setHospitals] = useState<User[]>([]);
  const mediator = MediatorService.getInstance();

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await mediator.getGroup("hospitals");
        if (!data) return;
        setHospitals(data);
      } catch (error) {
        console.log(error);
        setHospitals([]);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <TableContainer w="100%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Manager</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody fontSize={"14"}>
          {hospitals.map((hospital) => (
            <Tr>
              <Td>{hospital.hospital_name}</Td>
              <Td>{hospital.first_name + " " + hospital.last_name}</Td>
              <Td>{hospital.email}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ListHospitals;
