import {
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FailureSelector } from "./selects";
import { SecretDataUser } from "@/pages/form";

export const Failure = (props: {
  claimData: SecretDataUser;
  setClaimData: (s: SecretDataUser) => void;
  applicationId: number;
  deviceIdentifier: string;
  taxId: string;
}) => {
  const [checkedAccident, setCheckedAccident] = useState(false);
  const [checkedAdditional, setCheckedAdditional] = useState(false);

  const handleCheckedAccident = () => {
    setCheckedAccident(!checkedAccident);
  };

  const handleCheckedAdditional = () => {
    setCheckedAdditional(!checkedAdditional);
  };

  return (
    <Container>
      <FormControl>
        <FormLabel>อาการเสียของเครื่อง</FormLabel>
        <FailureSelector {...props} />

        <CheckboxGroup>
          <Stack>
            <Checkbox
              isChecked={checkedAccident}
              onChange={handleCheckedAccident}
              height="45px"
              colorScheme="teal"
            >
              เครื่องเกิดอุบัติเหตุ ระบุ
            </Checkbox>
            {checkedAccident && (
              <Input
                type="text"
                onChange={(e) => {
                  const newClaimData = {
                    ...props.claimData,
                  };
                  newClaimData.document.accident = e.target.value;
                  props.setClaimData(newClaimData);
                }}
                value={props.claimData.document.accident}
              />
            )}

            <Checkbox
              isChecked={checkedAdditional}
              onChange={handleCheckedAdditional}
              height="45px"
              colorScheme="teal"
            >
              อาการเสียหายเพิ่มเติม
            </Checkbox>
            {checkedAdditional && (
              <Input
                type="text"
                onChange={(e) => {
                  const newClaimData = {
                    ...props.claimData,
                  };
                  newClaimData.document.moreAccident = e.target.value;
                  props.setClaimData(newClaimData);
                }}
                value={props.claimData.document.moreAccident}
              />
            )}
          </Stack>
        </CheckboxGroup>

        <hr />
        <FormControl mt={2}>
          <FormLabel>ลูกค้าชำระค่าความเสียหายส่วนแรก</FormLabel>
          <Input
            type="text"
            onChange={(e) => {
              const newClaimData = {
                ...props.claimData,
              };
              newClaimData.document.deductible = e.target.value;
              props.setClaimData(newClaimData);
            }}
            value={props.claimData.document.deductible}
          />
        </FormControl>
        <FormControl mt={2}>
          <FormLabel>อ้างอิงเลขที่ใบเสร็จ</FormLabel>
          <Input
            type="text"
            onChange={(e) => {
              const newClaimData = {
                ...props.claimData,
              };
              newClaimData.document.paymentBill = e.target.value;
              props.setClaimData(newClaimData);
            }}
            value={props.claimData.document.paymentBill}
          />
        </FormControl>
      </FormControl>
    </Container>
  );
};
