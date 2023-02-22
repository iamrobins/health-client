import { VStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "ColorModeSwitcher";

export default Layout;

function Layout({ children }: { children: JSX.Element }) {
  return (
    <VStack>
      <ColorModeSwitcher justifySelf="flex-end" />
      {children}
    </VStack>
  );
}
