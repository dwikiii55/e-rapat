import {
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import React, { useState } from "react";
import {
  FiCalendar,
  FiFilePlus,
  FiHome,
  FiLogOut,
  FiMenu,
  FiSettings,
} from "react-icons/fi";
import ColorModeToggle from "../ui/ColorModeToggle";
import DialogKonfirmasi from "../ui/DialogKonfirmasi";
import Footer from "./Footer";

const LinkItems = [
  { name: "Beranda", icon: FiHome, route: "/dashboard" },
  { name: "Semua Rapat", icon: FiCalendar, route: "/dashboard/semua-rapat" },
  { name: "Tambah Rapat", icon: FiFilePlus, route: "/dashboard/tambah" },
  { name: "Jadwal", icon: FiCalendar, route: "/jadwal" },

  { name: "Pengaturan", icon: FiSettings, route: "/dashboard/pengaturan" },
];

export default function SetMenu({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
        <Box px={{ base: 2, sm: 2, md: 5, lg: 7, xl: 9 }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const router = useRouter();
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="lg" fontFamily="monospace" fontWeight="bold">
          <Link onClick={() => router.push("/dashboard")}>????e-rapat</Link>
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} route={link.route}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, route, ...rest }) => {
  const router = useRouter();
  return (
    <Link onClick={() => router.push(route)} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#FD6F96",
          color: "white",
          shadow: "lg",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const onLogOut = () => {
    destroyCookie(null, "token");
    router.replace("/user/login");
    setIsOpen(false);
  };
  return (
    <>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="lg"
          fontFamily="monospace"
          fontWeight="bold"
          onClick={() => router.push("/dashboard")}
        >
          <Link>???? e-rapat</Link>
        </Text>

        <HStack spacing={{ base: "1", md: "6" }}>
          <ColorModeToggle />
          <IconButton
            variant="ghost"
            aria-label="log out button"
            onClick={() => setIsOpen(true)}
            icon={<FiLogOut />}
          />
          <Flex alignItems={"center"}></Flex>
        </HStack>
      </Flex>
      <DialogKonfirmasi
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleAksi={onLogOut}
        title={`Log out dari aplikasi`}
      />
    </>
  );
};
