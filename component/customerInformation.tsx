import {
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
} from "@chakra-ui/react";
import { ProvinceSelector, BranchesSelector } from "./selects";
import { SecretDataUser } from "@/pages/form";
import { EmailIcon, PhoneIcon, RepeatIcon } from "@chakra-ui/icons";

export const CustomerInfo = (props: {
  claimData: SecretDataUser;
  setClaimData: (s: SecretDataUser) => void;
  applicationId: number;
  deviceIdentifier: string;
  taxId: string;
}) => {
  const brandImeiRegxp = new RegExp(/^[a-zA-Z0-9]+$/);

  // const handleInputPhone = (e: any) => {
  //   const value = e.target.value;
  //   const format = /^[0-9]*$/;
  //   if (value.match(format)) {
  //     const newClaimData = { ...props.claimData };
  //     newClaimData.document.phoneNumber = value;
  //     props.setClaimData(newClaimData);
  //   }
  // };

  // const handleBrandImei = (e: any) => {
  //   const value = e.target.value;
  //   const format = /^[a-zA-Z0-9]+$/;
  //   if (value.match(format)) {
  //     const newClaimData = { ...props.claimData };
  //     newClaimData.document.brandImei = value;
  //     props.setClaimData(newClaimData);
  //   }
  // };

  return (
    <Container>
      <Stack direction={["column", "row"]}>
        <FormControl pt={2}>
          <FormLabel>เบอร์ติดต่อ</FormLabel>
          <InputGroup>
            <InputLeftAddon hideBelow="md" bgColor="teal">
              <PhoneIcon color="white" />
            </InputLeftAddon>
            <Input
              type="tel"
              // onChange={(e) => {
              //   const newClaimData = {
              //     ...props.claimData,
              //   };

              //   newClaimData.document.phoneNumber = e.target.value;

              //   props.setClaimData(newClaimData);
              // }}
              onChange={(e) => {
                const value = e.target.value;
                const format = /^[0-9]*$/;
                if (value.match(format)) {
                  const newClaimData = { ...props.claimData };
                  newClaimData.document.phoneNumber = value;
                  props.setClaimData(newClaimData);
                }
              }}
              value={props.claimData.document.phoneNumber}
              maxLength={10}
              minLength={10}
              required
            />
          </InputGroup>
        </FormControl>
      </Stack>

      <FormControl pt={2}>
        <FormLabel>E-mail</FormLabel>
        <InputGroup>
          <InputLeftAddon bgColor="teal" hideBelow="md">
            <EmailIcon color="white" />
          </InputLeftAddon>
          <Input
            type="email"
            onChange={(e) => {
              const newClaimData = { ...props.claimData };
              newClaimData.document.email = e.target.value;
              props.setClaimData(newClaimData);
            }}
            value={props.claimData.document.email}
            required
          ></Input>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel pt={2}>จังหวัดที่ส่งเคลม</FormLabel>
        <ProvinceSelector {...props} />
      </FormControl>

      <FormControl>
        <FormLabel pt={2}>สาขาที่แจ้งเคลม</FormLabel>
        <BranchesSelector {...props} />
      </FormControl>

      <FormControl pt={2}>
        <FormLabel>
          กรณีเคยเปลี่ยนเครื่อง DOA / Brand ให้กรอก IMEI ตามใบเสร็จ
        </FormLabel>
        <InputGroup>
          <InputLeftAddon bgColor="teal" hideBelow="md">
            <RepeatIcon color="white" />
          </InputLeftAddon>
          <Input
            type="text"
            isInvalid={!brandImeiRegxp.test(props.claimData.document.brandImei)}
            onChange={(e) => {
              const newClaimData = { ...props.claimData };
              newClaimData.document.brandImei = e.target.value;
              props.setClaimData(newClaimData);
            }}
            value={props.claimData.document.brandImei}
            maxLength={15}
          />
        </InputGroup>
      </FormControl>
    </Container>
  );
};
