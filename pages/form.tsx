import TabControl from "@/component/tabControl";
import { Box, ChakraProvider, Container, Input, Text } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { useState } from "react";
import { z } from "zod";
import { formSchema } from "./api/schema";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export type SecretDataUser = z.infer<typeof formSchema>;

export default function FormClaims(props: {
  applicationId: number;
  deviceIdentifier: string;
  taxId: string;
}) {
  console.log(props.applicationId);
  const [claimData, setClaimData] = useState<SecretDataUser>({
    applicationId: props.applicationId,
    document: {
      username: "",
      password: "",
      phoneNumber: "",
      email: "",
      brandImei: "",
      imei: "",
      accessories: [],
      adapter: "",
      more: "",
      failure: [],
      accident: "",
      moreAccident: "",
      deductible: "",
      paymentBill: "",
      branches: "",
      province: "",
      brand: "",
      model: "",
    },
    isClosed: false,
    lossAmount: "0",
    memo: "",
  });

  const handleClaimData = (s: SecretDataUser) => {
    setClaimData(s);
  };

  const router = useRouter();

  const submitClaimData = async (e: any) => {
    e.preventDefault();
    if (claimData) {
      try {
        let res = await fetch("/api/form", {
          method: "POST",
          body: JSON.stringify(claimData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        res = await res.json();

        setClaimData({
          applicationId: 0,
          document: {
            username: "",
            password: "",
            phoneNumber: "",
            email: "",
            brandImei: "",
            imei: "",
            accessories: [],
            adapter: "",
            more: "",
            failure: [],
            accident: "",
            moreAccident: "",
            deductible: "",
            paymentBill: "",
            branches: "",
            province: "",
            brand: "",
            model: "",
          },
          isClosed: false,
          lossAmount: "0",
          memo: "",
        });

        Swal.fire({
          icon: "success",
          title: "บันทึกเรียบร้อย",
          text: "ทางบริษัทจะรีบดำเนินการโดยเร็วที่สุด",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/");
          }
        });
      } catch (e: any) {
        console.log(e);
      }
    }
  };

  const btnSubmit = () => {
    if (
      claimData.document.paymentBill !== null &&
      claimData.document.paymentBill !== ""
    ) {
      return (
        <Input
          type="submit"
          bgColor="teal"
          color="white"
          fontWeight="bold"
          cursor="pointer"
          onClick={submitClaimData}
        />
      );
    }
  };

  return (
    <ChakraProvider>
      <Container m="auto" bg="white" p="0" height="100%" minH="100vh">
        <Text
          fontSize="3xl"
          align="center"
          fontWeight="bold"
          bgGradient="linear(to-br, teal, yellow)"
          color="white"
        >
          <Box>ใบแจ้งเคลม</Box>
          <Box>Claim form Moblie / iPad</Box>
        </Text>

        <TabControl
          claimData={claimData}
          setClaimData={handleClaimData}
          {...props}
        />
        {btnSubmit()}
      </Container>
    </ChakraProvider>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const [deviceIdentifier, suffixTaxId] = [
    ctx.query.deviceIdentifier,
    ctx.query.taxId,
  ];

  const filter = JSON.stringify({
    deviceIdentifier,
  });

  // fiter by api
  const dataVerify = (await fetch(
    `http://192.168.100.120:3001/applications?document=${filter}&limit=1`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eUlkIjoxfQ.kd8mh1yBNMRcF4kQC7DOHI8_yYBb_0DcHq5uqpk2V3s",
      },
    }
  ).then((res) => res.json())) as any[];

  if (dataVerify.length !== 1) {
    return {
      redirect: { permanent: false, destination: "/?error=not_found" },
      props: {},
    };
  }

  const identificationId =
    dataVerify[0].latestSubmission.mandatory.insured.identificationId;
  const juristicId =
    dataVerify[0].latestSubmission.mandatory.insured.juristicId;
  const taxId = dataVerify[0].latestSubmission.mandatory.insured.taxId;

  const matches: (string | null)[] = [
    identificationId?.slice(-5) === suffixTaxId ? identificationId : null,
    juristicId?.slice(-5) === suffixTaxId ? juristicId : null,
    taxId?.slice(-5) === suffixTaxId ? taxId : null,
  ];

  for (let match of matches) {
    if (match) {
      return {
        props: {
          deviceIdentifier,
          taxId: match,
          applicationId: dataVerify[0].id,
        },
      };
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: "/?error=unauthorized",
    },
  };
}
