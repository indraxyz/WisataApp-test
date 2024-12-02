"use client";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import { Tab, Tabs } from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";

import Logo from "../public/logo.png";
import ImgSquare from "../public/img-square.jpg";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  // initial

  // MODAL sign in
  const _tes = () => {
    console.log("tes function");
  };

  // MODAL search

  return (
    <Container maxWidth="lg" disableGutters>
      {/* top nav */}
      <Grid container sx={{ paddingX: 2, paddingY: 2 }}>
        <Grid size={{ xs: 2, sm: 3, md: 3 }}>
          <Image src={Logo} alt="WisataApp" className="logo" />
          {/* logo TEXT OR LOGO */}
        </Grid>
        <Grid size={{ xs: 8, sm: 7, md: 6 }} sx={{ paddingX: 1 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ bgcolor: grey[200], color: "black" }}
          >
            Search
          </Button>
        </Grid>
        <Grid size={{ xs: 2, sm: 2, md: 3 }} sx={{ textAlign: "center" }}>
          <Button variant="contained" onClick={() => _tes()}>
            Sign_in
          </Button>
        </Grid>
      </Grid>

      {/* selected place OR property
       */}
      <Grid container>
        <Grid size={{ xs: 3, sm: 4 }} sx={{ textAlign: "center", paddingY: 2 }}>
          <Image src={ImgSquare} alt="photo" className="img-property" />
        </Grid>
        <Grid size={{ xs: 9, sm: 8 }} sx={{ alignContent: "center" }}>
          <Box component={"div"} sx={{ display: "flex" }}>
            <Typography>Nama Hotel</Typography>
            <Box component={"div"} sx={{ marginX: 1, color: "orange" }}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </Box>
          </Box>
          <Typography>Type</Typography>
          <Typography>Address</Typography>
          <Typography>Review</Typography>
        </Grid>
      </Grid>
      <Divider />

      {/* list offer 
        	place : tab menu (stay) 
          OR
          property : tab menu (Deals, Photos, Info)
      */}
      <Tabs
        value={1}
        // onChange={handleChange}
        TabIndicatorProps={{ sx: { top: 0 } }}
        centered
      >
        <Tab label="Active" {...a11yProps(0)} />
        <Tab label="Disabled" {...a11yProps(1)} />
        <Tab label="Active" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={1} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={1} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={1} index={2}>
        Item Three
      </TabPanel>
    </Container>
  );
}
