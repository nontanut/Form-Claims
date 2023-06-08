import { InfoIcon } from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Tooltip,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const Verify = () => {
  const [show, setShow] = useState(false);
  const [identifier, setidentifier] = useState("");
  const [taxId, setpersonalId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    const err = router.query["error"];

    if (err) {
      Swal.fire({ title: "ข้อมูลผิดพลาด", text: err as string });
    }
  }, [router.query]);

  const handleInputidentifier = (e: any) => {
    const value = e.target.value;
    const format = /^[a-zA-Z0-9]+$/;
    if (value.match(format) || value === "") {
      setidentifier(value);
    }
  };

  const handleInputpersonalId = (e: any) => setpersonalId(e.target.value);

  const handleClick = () => setShow(!show);

  const handleSubmit = () => {
    router.push(`/form?deviceIdentifier=${identifier}&taxId=${taxId}`);
  };

  return (
    <Box position="relative" h="100vh">
      <AbsoluteCenter p="0" color="white" axis="both" w="100%">
        <Box
          width="70%"
          borderRadius={20}
          p={0}
          display="flex"
          flexDirection="row-reverse"
          alignItems="center"
          m="auto"
          h="450px"
        >
          {/* right side box */}
          <Box
            width={["100%", "50%"]}
            h="100%"
            m={0}
            p={3}
            bg="gray.100"
            color="teal"
            justifyContent="center"
            display="flex"
            flexDirection="column"
            borderRadius={["20px", "0 20px 20px 0"]}
          >
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Image
                  src="https://drive.google.com/uc?export=view&id=1elvqrsgFyVPNB-AFjuAOcMdwl2wa398f"
                  alt="Logo iCare"
                  display={["show", "none"]}
                  w="50%"
                  m="auto auto 20px auto"
                />
                <FormLabel fontSize="sm">
                  กรอก IMEI/SN
                  <span>
                    <Tooltip
                      placement="right-end"
                      label="กรอก IMEI หรือ S/N เครื่องที่ต้องการซ่อม"
                      textAlign="center"
                    >
                      <Icon
                        as={InfoIcon}
                        color="tomato"
                        boxSize={2.5}
                        ml={2}
                      ></Icon>
                    </Tooltip>
                  </span>
                </FormLabel>

                <Input
                  type="text"
                  bg="white"
                  size="md"
                  placeholder="351386509321312"
                  value={identifier}
                  onChange={handleInputidentifier}
                  maxLength={15}
                  isRequired
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="sm" pr={2} pt={2}>
                  เลขผู้เสียภาษี 5 ตัวสุดท้าย
                  <span>
                    <Tooltip
                      placement="right-end"
                      label="5 ตัวสุดท้ายของเลขผู้เสียภาษี/เลขบัตรประชาชน"
                      textAlign="center"
                    >
                      <Icon as={InfoIcon} color="tomato" boxSize={2.5} ml={2} />
                    </Tooltip>
                  </span>
                </FormLabel>
                <InputGroup size="md">
                  <NumberInput w="100%" isRequired>
                    <NumberInputField
                      type={show ? "text" : "password"}
                      bg="white"
                      placeholder="ตัวเลขเท่านั้น"
                      pr="4.5rem"
                      value={taxId}
                      onChange={handleInputpersonalId}
                      maxLength={5}
                      minLength={5}
                      pattern="[0-9]"
                    />
                    <InputRightElement w="4.5rem">
                      <Button
                        size="sm"
                        h="1.75rem"
                        colorScheme="blackAlpha"
                        onClick={handleClick}
                      >
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </NumberInput>
                </InputGroup>
              </FormControl>

              {/* button */}
              {/* <FormControl> */}
              <Box
                w="100%"
                display="flex"
                textAlign="center"
                justifyContent="center"
              >
                <Input
                  type="submit"
                  size="md"
                  mt={3}
                  w="50%"
                  cursor="pointer"
                  fontWeight="bold"
                  _hover={{ bgGradient: "linear(to-r, red.500, yellow.500)" }}
                  onClick={handleSubmit}
                  bgColor="teal"
                  color="white"
                />
                {/* {router.query.error} */}
              </Box>
            </form>
          </Box>

          {/* left side box */}
          <Box
            h="100%"
            w={[0, "50%"]}
            borderRadius="20px 0 0 20px"
            bgGradient="linear(to-b, teal.500, green.200)"
            bg="url(https://cdn.pixabay.com/photo/2023/04/27/03/28/ocean-7953612_1280.jpg)"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
          ></Box>
        </Box>
      </AbsoluteCenter>
    </Box>
  );
};
