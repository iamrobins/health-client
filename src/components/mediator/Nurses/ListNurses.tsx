import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useState } from "react";
import { MediatorService } from "services/apis";
import { User } from "interfaces";
import { useQuery } from "react-query";

function ListNurses() {
  const [nurses, setNureses] = useState<User[]>([]);
  const mediator = MediatorService.getInstance();
  useQuery("nurses", async () => {
    try {
      const data = await mediator.getGroup("nurses");
      if (!data) return;
      setNureses(data);
    } catch (error) {
      console.log(error);
      setNureses([]);
    }
  });

  // useEffect(() => {
  //   const fetchHospitals = async () => {
  //     try {
  //       const data = await mediator.getGroup("nurses");
  //       if (!data) return;
  //       setNureses(data);
  //     } catch (error) {
  //       console.log(error);
  //       setNureses([]);
  //     }
  //   };

  //   fetchHospitals();
  // }, []);

  return (
    <TableContainer w="100%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody fontSize={"14"}>
          {nurses.map((nurse) => (
            <Tr>
              <Td>{nurse.first_name + " " + nurse.last_name}</Td>
              <Td>{nurse.email}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ListNurses;
