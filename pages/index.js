import {
  Center,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import AllRapat from "../components/landing/AllRapat";
import CustomRadio from "../components/landing/CustomRadio";
import Hero from "../components/landing/Hero";
import Upcoming from "../components/landing/Upcoming";
import Footer from "../components/layout/Footer";

export default function Home() {
  const [tabVal, setTabVal] = useState("new");

  return (
    <>
      <Head>
        <title>Selamat Datang</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW={"5xl"} minHeight="80vh">
        <Hero />
      </Container>
      <Container maxW={"5xl"}>
        <Footer />
      </Container>
    </>
  );
}
