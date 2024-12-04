import { Box } from "@mantine/core";
import { DownloadIcon, Dashboard, Apartment, ZoomOut } from "../icons";

export const Icon = ({
  name,
  size = 25,
  color = "white",
}: {
  name?: string;
  size?: number;
  color?: string;
}) => {
  return (
    <Box w={size} h={size}>
      {name == "download" && <DownloadIcon color={color} size={size} />}
      {name == "dashboard" && <Dashboard color={color} size={size} />}
      {name == "apartment" && <Apartment color={color} size={size} />}
      {name == "zoomOut" && <ZoomOut color={color} size={size} />}
    </Box>
  );
};
