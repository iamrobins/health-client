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
} from "@chakra-ui/react";
import { useState } from "react";
import { HospitalService } from "services/apis";
import { Shift } from "interfaces";
import { useQuery, useQueryClient } from "react-query";

function ListHospitals() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const shift = HospitalService.getInstance();
  const [nurseIdForShift, setNurseIdForShift] = useState("");
  const queryClient = useQueryClient();

  useQuery("shifts", async () => {
    try {
      const data = await shift.getShifts();
      if (!data) return;
      console.log(data);
      setShifts(data);
    } catch (error) {
      console.log(error);
      setShifts([]);
    }
  });

  const assignShift = async (shiftId: number) => {
    if (!nurseIdForShift || !shiftId) return;
    await shift.assignShift(shiftId, nurseIdForShift);
    queryClient.invalidateQueries("shifts");
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
            <Th>Select Nurse</Th>
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
              {shift.requested_shifts.length > 0 && !shift.nurse ? (
                <Td>
                  <Select
                    placeholder="Select Nurse"
                    onChange={(e) => {
                      setNurseIdForShift(e.target.value);
                      assignShift(shift.id);
                    }}
                  >
                    {shift.requested_shifts.map((nurse) => (
                      <option key={nurse.id} value={nurse.id}>
                        {nurse.username}
                      </option>
                    ))}
                  </Select>
                </Td>
              ) : (
                <Td>{!shift.nurse ? "No Requests Yet" : "Already Assigned"}</Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ListHospitals;
