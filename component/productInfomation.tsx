import {
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { AccessoriesSelector, BrandSelector, ModelSelector } from "./selects";
import { useState } from "react";
import { SecretDataUser } from "@/pages/form";

export const ProductInfo = (props: {
  claimData: SecretDataUser;
  setClaimData: (s: SecretDataUser) => void;
  applicationId: number;
  deviceIdentifier: string;
  taxId: string;
}) => {
  const [access, setAccess] = useState(false);
  const [other, setOther] = useState(false);

  const checkboxAccess = () => {
    setAccess(!access);
  };

  const checkOther = () => {
    setOther(!other);
  };

  return (
    <Container>
      <FormControl>
        <FormLabel>ยี่ห้อ / แบรนด์</FormLabel>
        <BrandSelector {...props} />
      </FormControl>

      <FormControl>
        <FormLabel>รุ่นมือถือ</FormLabel>
        <ModelSelector {...props} />
      </FormControl>

      <FormControl>
        <FormLabel>หมายเลขเครื่อง (IMEI)</FormLabel>
        <Input
          type="text"
          maxLength={15}
          onChange={(e) => {
            const value = e.target.value;
            const format = /^[a-zA-Z0-9]+$/;
            if (value.match(format)) {
              const newClaimData = { ...props.claimData };
              newClaimData.document.imei = value;
              props.setClaimData(newClaimData);
            }
          }}
          value={props.claimData.document.imei}
          required
        />
      </FormControl>

      <FormControl>
        <FormLabel>อุปกรณ์ที่นำมา</FormLabel>
        <AccessoriesSelector {...props} />
      </FormControl>
      <Stack>
        <Checkbox
          isChecked={access}
          onChange={checkboxAccess}
          pt={2}
          colorScheme="teal"
        >
          เอซี อะแดปเตอร์ ระบุ S/N
        </Checkbox>
      </Stack>
      {access && (
        <Input
          type="text"
          onChange={(e) => {
            const value = e.target.value;
            const format = /^[a-zA-Z0-9]+$/;
            if (value.match(format)) {
              const newClaimData = { ...props.claimData };
              newClaimData.document.adapter = value;
              props.setClaimData(newClaimData);
            }
          }}
          value={props.claimData.document.adapter}
        />
      )}

      <Stack>
        <Checkbox
          isChecked={other}
          onChange={checkOther}
          pt={2}
          colorScheme="teal"
        >
          อื่นๆระบุ
        </Checkbox>
      </Stack>
      {other && (
        <Input
          type="text"
          onChange={(e) => {
            const value = e.target.value;
            const format = /^[ก-๙a-zA-Z0-9]+$/;
            if (value.match(format)) {
              const newClaimData = { ...props.claimData };
              newClaimData.document.more = value;
              props.setClaimData(newClaimData);
            }
          }}
          value={props.claimData.document.more}
        />
      )}
      {/* </FormControl> */}
    </Container>
  );
};
