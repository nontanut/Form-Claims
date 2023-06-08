import { SecretDataUser } from "@/pages/form";
import {
  Box,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

export const Consent = (props: {
  claimData: SecretDataUser;
  setClaimData: (s: SecretDataUser) => void;
  applicationId: number;
  deviceIdentifier: string;
  taxId: string;
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <Container height="100%">
      <FormControl>
        <Stack direction={["column", "row"]}>
          <Box w={["full", "full"]}>
            <FormLabel>IMEI/SN</FormLabel>
            <Box
              border="1px solid gray"
              p={2}
              borderRadius="5px"
              textAlign="start"
              textColor="teal"
              fontWeight="bold"
            >
              <span>{props.deviceIdentifier}</span>
            </Box>
          </Box>
          <Box w={["full", "full"]}>
            <FormLabel>เลขบัตรราชการ</FormLabel>
            <Box
              border="1px solid gray"
              p={2}
              borderRadius="5px"
              textAlign="start"
              textColor="teal"
              fontWeight="bold"
            >
              <span>{props.taxId}</span>
            </Box>
          </Box>
          <Box w={["full", "full"]}>
            <FormLabel>ID</FormLabel>
            <Box
              border="1px solid gray"
              p={2}
              borderRadius="5px"
              textAlign="start"
              textColor="teal"
              fontWeight="bold"
            >
              <span>{props.applicationId}</span>
            </Box>
          </Box>
        </Stack>
        <FormLabel
          mt={2}
          display={[
            "ยินยอมให้ User & Password",
            "การยินยอมเปิดเผยข้อมูล User & Password ให้แก่บริษัทเพื่อให้ทางทีมช่างตรวจเช็คได้มากขึ้น",
          ]}
        >
          {/* การยินยอมเปิดเผยข้อมูล User & Password
          ให้แก่บริษัทเพื่อให้ทางทีมช่างตรวจเช็คได้มากขึ้น */}
        </FormLabel>
        <RadioGroup defaultValue="hide">
          <Stack>
            <Radio
              name="show"
              value="show"
              colorScheme="teal"
              onChange={handleShow}
            >
              ยินยอม
            </Radio>
            <Radio
              name="hide"
              value="hide"
              colorScheme="teal"
              onChange={handleShow}
            >
              ไม่ยินยอม
            </Radio>
          </Stack>
        </RadioGroup>

        <Divider pb={2} />
        {show ? (
          <FormControl mt={2}>
            <FormControl isRequired>
              <FormLabel>User</FormLabel>
              <Input
                name="user"
                type="text"
                onChange={(e) => {
                  const newClaimData = {
                    ...props.claimData,
                  };
                  newClaimData.document.username = e.target.value;
                  props.setClaimData(newClaimData);
                }}
                value={props.claimData.document.username}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                onChange={(e) => {
                  const newClaimData = {
                    ...props.claimData,
                  };
                  newClaimData.document.password = e.target.value;
                  props.setClaimData(newClaimData);
                }}
                value={props.claimData.document.password}
              />
            </FormControl>
          </FormControl>
        ) : null}
      </FormControl>
    </Container>
  );
};
