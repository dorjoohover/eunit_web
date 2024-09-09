import { Container } from "@mantine/core";
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
      maw={{ base: "100%", lg: "90%", xl: "85%" }}
      py={py}
      ps={{ base: 0, md: 4 }}
      pe={{ base: 0, md: 4 }}
    >
      {children}
    </Container>
  );
};

export default MainContainer;
