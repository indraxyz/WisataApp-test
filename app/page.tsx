"use client";
import { useState } from "react";

import {
  Tab,
  Tabs,
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  Input,
  Autocomplete,
} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// ICON
import StarIcon from "@mui/icons-material/Star";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CollectionsIcon from "@mui/icons-material/Collections";
import InfoIcon from "@mui/icons-material/Info";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ClearIcon from "@mui/icons-material/Clear";

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
  const [dialogSignin, setDialogSignin] = useState(false);
  const [dialogSearchBar, setDialogSearchBar] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const theme = useTheme();
  const smallUP = useMediaQuery(theme.breakpoints.up("sm"));

  // MODAL sign in
  // const handleOpen = () => setOpen(true);
  const _tes = () => {
    console.log("tes function");
  };

  // MODAL search

  return (
    <Container maxWidth="lg" disableGutters className="px-2 md:px-16">
      {/* top nav */}
      <Grid container sx={{ paddingY: 1, paddingX: 0, alignItems: "center" }}>
        <Grid
          size={{ xs: 2, sm: 3, md: 3 }}
          sx={{
            textAlign: {
              xs: "center",
              sm: "start",
            },
          }}
        >
          {/* logo OR back */}
          {smallUP ? (
            <Image src={Logo} alt="WisataApp" className="logo" />
          ) : (
            <IconButton sx={{ padding: 0 }} disableRipple color="primary">
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
          )}
        </Grid>
        <Grid size={{ xs: 8, sm: 7, md: 6 }} sx={{ paddingX: 0 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ bgcolor: grey[100], color: "black" }}
            onClick={() => setDialogSearchBar(true)}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Grid>
        <Grid
          size={{ xs: 2, sm: 2, md: 3 }}
          sx={{
            textAlign: {
              xs: "center",
              sm: "end",
            },
          }}
        >
          {smallUP ? (
            <Button variant="contained" onClick={() => setDialogSignin(true)}>
              Sign in
            </Button>
          ) : (
            <IconButton
              sx={{ padding: 0 }}
              disableRipple
              onClick={() => setDialogSignin(true)}
              color="primary"
            >
              <AssignmentIndIcon fontSize="large" />
            </IconButton>
          )}
        </Grid>
      </Grid>

      {/* selected place OR property
       */}
      <Grid container>
        <Grid size={{ xs: 4, md: 3 }} sx={{ textAlign: "center", paddingY: 4 }}>
          <Image
            src={ImgSquare}
            alt="photo"
            className="img-property"
            priority
          />
        </Grid>
        <Grid size={{ xs: 8, md: 9 }} sx={{ alignContent: "center" }}>
          <Box
            component={"div"}
            className="space-y-1 sm:space-y-2 pl-2 sm:pl-0"
          >
            <Box
              component={"div"}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography className="font-bold text-lg sm:text-xl ">
                Nama Hotel
              </Typography>
              {/* star_rating */}
              <Box component={"div"} sx={{ marginX: 1, color: "orange" }}>
                <StarIcon className="text-xl sm:text-2xl" />
                <StarIcon className="text-xl sm:text-2xl" />
                <StarIcon className="text-xl sm:text-2xl" />
                <StarIcon className="text-xl sm:text-2xl" />
              </Box>
            </Box>
            <Typography className="text-gray-500 text-sm sm:text-lg">
              Hotel
            </Typography>
            <Typography className="text-sm sm:text-lg">
              Jl. Rungkut Industri Raya No.4, Kutisari, Kec. Tenggilis Mejoyo,
              Surabaya, Jawa Timur 60292
            </Typography>
            <Typography className="text-sm sm:text-lg">
              review_rating . review_count
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider />

      {/* list offer 
        	place : tab menu (stay) 
          OR
          property : tab menu (Deals, Photos, Info)
      */}
      <Tabs
        value={selectedTab}
        onChange={(e, v) => setSelectedTab(v)}
        TabIndicatorProps={{ sx: { top: 0 } }}
        centered
      >
        <Tab
          icon={<LocalOfferIcon />}
          iconPosition="start"
          label="Deals"
          {...a11yProps(0)}
        />
        <Tab
          icon={<CollectionsIcon />}
          iconPosition="start"
          label="Photos"
          {...a11yProps(1)}
        />
        <Tab
          icon={<InfoIcon />}
          iconPosition="start"
          label="Info"
          {...a11yProps(2)}
        />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        Item Three
      </TabPanel>

      {/* DIALOG SIGN IN */}
      <Dialog
        maxWidth="xs"
        open={dialogSignin}
        onClose={() => setDialogSignin(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {/* sign in form or sosmed acc */}
          <Box component={"div"} className="space-y-4">
            <Typography className="text-lg text-center">
              Sign in to Wisata App
            </Typography>
            <TextField fullWidth label="Username or Email" variant="standard" />
            <Button fullWidth variant="contained">
              Continue
            </Button>
          </Box>

          <Divider variant="fullWidth" className="my-4">
            <Typography className="text-sm">or continue with</Typography>
          </Divider>
          <Box component="div" className="pb-4 text-center space-x-4">
            <IconButton color="inherit">
              <GoogleIcon />
            </IconButton>
            <IconButton color="inherit">
              <AppleIcon />
            </IconButton>
            <IconButton color="inherit">
              <WhatsAppIcon />
            </IconButton>
          </Box>
          <Divider>
            <Typography className="text-sm">don't have an account ?</Typography>
          </Divider>
          {/* create new acc */}
          <Button variant="outlined" fullWidth className="mt-4">
            Create Account
          </Button>
        </DialogContent>
      </Dialog>

      {/* DIALOG SEARCH */}
      <Dialog
        fullWidth
        maxWidth={"xs"}
        open={dialogSearchBar}
        onClose={() => setDialogSearchBar(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography className="mb-4 text-lg">
            Choose your beautiful trip 🌈
          </Typography>
          {/* responsive grid column */}
          <Grid container spacing={2} columns={{ xs: 4 }}>
            {/* location */}
            <Grid size={{ xs: 4 }}>
              <Autocomplete
                className="w-full"
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Where are you going ?"
                    placeholder="Search hotels, apartments, villas"
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
                value={""}
                options={[]}
                // onKeyUp={suggestSearch}
                // onKeyDown={enterSearch}
                // onInputChange={(e, v) => console.log("")}
                // onChange={() => console.log()}
              />
            </Grid>
            {/* date in, out,*/}
            <Grid container spacing={{ xs: 2, sm: 4 }}>
              <Grid size={{ xs: 4, sm: 2 }}>
                <TextField
                  fullWidth
                  label="Where are you going ?"
                  variant="standard"
                />
              </Grid>
              <Grid size={{ xs: 4, sm: 2 }}>
                <TextField
                  fullWidth
                  label="Where are you going ?"
                  variant="standard"
                />
              </Grid>
            </Grid>

            {/* guest room */}
            <Grid container spacing={{ xs: 2, sm: 4 }}>
              <Grid size={{ xs: 4, sm: 2 }}>
                <TextField fullWidth label="Guest ?" variant="standard" />
              </Grid>
              <Grid size={{ xs: 4, sm: 2 }}>
                <TextField fullWidth label="Room ?" variant="standard" />
              </Grid>
            </Grid>
            {/* submit */}
            <Grid size={{ xs: 4 }}>
              <Button fullWidth variant="contained" startIcon={<SearchIcon />}>
                Search
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
