import { IconButton, useColorMode } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="theme toggle"
      icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
      onClick={toggleColorMode}
    />
  );
};

export default ColorModeToggle;