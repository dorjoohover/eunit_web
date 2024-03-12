import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

const MainContainer = ({
  children,
  py,
}: {
  children: ReactNode;
  py?: number | string;
}) => {
  return (
    <Container
      maxW={{ base: "100%", lg: "90%", xl: "85%" }}
      py={py}
      paddingInlineStart={{ base: 0, md: 4 }}
      paddingInlineEnd={{ base: 0, md: 4 }}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
