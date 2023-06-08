import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { useState } from "react";
import { CustomerInfo } from "./customerInformation";
import { ProductInfo } from "./productInfomation";
import { Failure } from "./failure";
import { Consent } from "./consent";
import { SecretDataUser } from "@/pages/form";

export default function TabControl(props: {
  claimData: SecretDataUser;
  setClaimData: (s: SecretDataUser) => void;
  applicationId: number;
  deviceIdentifier: string;
  taxId: string;
}) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const back = (e: any) => {
    if (tabIndex > 0 && tabIndex <= 3) {
      return setTabIndex(parseInt(e.target.value) - 1);
    } else {
      return setTabIndex(parseInt(e.target.value) - 0);
    }
  };

  const next = (e: any) => {
    if (tabIndex >= 0 && tabIndex < 3) {
      return setTabIndex(parseInt(e.target.value) + 1);
    } else {
      return setTabIndex(parseInt(e.target.value) + 0);
    }
  };

  const btnBack = () => {
    if (tabIndex > 0 && tabIndex <= 3) {
      return (
        <Button
          value={tabIndex}
          onClick={back}
          colorScheme="teal"
          size={["sm", "md"]}
        >
          Back
        </Button>
      );
    }
  };

  const btnNext = () => {
    if (tabIndex >= 0 && tabIndex < 3) {
      return (
        <Button
          value={tabIndex}
          onClick={next}
          colorScheme="teal"
          size={["sm", "md"]}
        >
          Next
        </Button>
      );
    }
  };

  return (
    <>
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
        colorScheme="teal"
        align="center"
        variant="enclosed"
        width="100%"
        // isFitted
      >
        <TabList border={0} bgGradient="linear(to-bl, yellow, teal)">
          <Tab _selected={{ color: "teal", bg: "white" }} color="white">
            การยินยอม
          </Tab>
          <Tab _selected={{ color: "teal", bg: "white" }} color="white">
            ข้อมูลลูกค้า
          </Tab>
          <Tab _selected={{ color: "teal", bg: "white" }} color="white">
            ข้อมูลสินค้า
          </Tab>
          <Tab _selected={{ color: "teal", bg: "white" }} color="white">
            อาการเสีย
          </Tab>
        </TabList>
        <TabPanels border="1px solid teal" minH="80vh">
          <TabPanel>
            <Consent {...props} />
          </TabPanel>

          <TabPanel>
            <CustomerInfo {...props} />
          </TabPanel>

          <TabPanel>
            <ProductInfo {...props} />
          </TabPanel>

          <TabPanel>
            <Failure {...props} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <Button value={tabIndex} onClick={back}></Button>
      <Button value={tabIndex} onClick={next}></Button> */}
      <Flex align="center" justify="space-between" p={2}>
        <Box>{btnBack()}</Box>
        <Box>{btnNext()}</Box>
      </Flex>
    </>
  );
}
