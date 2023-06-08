import { Verify } from "@/component/verify";
import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <ChakraProvider>
      <Verify />
    </ChakraProvider>
  );
}
