import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useColorModeValue,
  Select,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { NurseService } from "services/apis";
import { Shift } from "interfaces";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

function ListNurseShifts() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const shift = NurseService.getInstance();
  const { user: authUser } = useSelector((x: any) => x.user);
  const queryClient = useQueryClient();

  useQuery("nurse-shifts", async () => {
    try {
      const data = await shift.getShifts();
      if (!data) return;
      setShifts(data);
    } catch (error) {
      console.log(error);
      setShifts([]);
    }
  });

  const requestShift = async (shiftId: number) => {
    if (!shiftId) return;
    await shift.requestShift(shiftId);
    queryClient.invalidateQueries("nurse-shifts");
  };

  // useEffect(() => {
  //   const fetchHospitals = async () => {
  //     try {
  //       const data = await shift.getShifts("shifts");
  //       if (!data) return;
  //       setShifts(data);
  //     } catch (error) {
  //       console.log(error);
  //       setShifts([]);
  //     }
  //   };

  //   fetchHospitals();
  // }, []);

  return (
    <TableContainer w="100%">
      <Table variant="simple" bg={useColorModeValue("gray.300", "gray.800")}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Location</Th>
            <Th>Start Time</Th>
            <Th>Pay/H</Th>
            <Th>Duration</Th>
            <Th>Nurse Assigned</Th>
            <Th>Request</Th>
          </Tr>
        </Thead>
        <Tbody fontSize={"14"}>
          {shifts.map((shift) => (
            <Tr key={shift.id}>
              <Td>{shift.name}</Td>
              <Td>{shift.location}</Td>
              <Td>{shift.start_time}</Td>
              <Td>{shift.pay_per_hour}</Td>
              <Td>{shift.duration_in_hour}</Td>
              <Td>{shift.nurse ? shift.nurse.username : "None"}</Td>
              <Td>
                {shift.requested_shifts.find(
                  (shift) => shift.email === authUser.email
                ) ? (
                  "Already Requested"
                ) : (
                  <Button onClick={() => requestShift(shift.id)}>
                    Request
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ListNurseShifts;
