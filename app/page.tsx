"use client";
import { useState } from "react";

import {
  Tab,
  Tabs,
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  // Input,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  FormHelperText,
  Snackbar,
  Alert,
  AlertTitle,
  ImageList,
  ImageListItem,
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
// import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import Logo from "../public/logo.png";
import ImgSquare from "../public/img-square.jpg";

const dataImageList = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

const today = new Date();
const nextDay = new Date().setDate(today.getDate() + 1);

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
  const [snackbarChildren, setSnackbarChildren] = useState(false);

  // form search bar
  const [guestRoomField, setGuestRoomField] = useState(1);
  const [roomField, setRoomField] = useState(1);
  const [checkIn, setCheckIn] = useState(today.toISOString().slice(0, 10));
  const [checkOut, setCheckOut] = useState(
    new Date(nextDay).toISOString().slice(0, 10)
  );

  const theme = useTheme();
  const smallUP = useMediaQuery(theme.breakpoints.up("sm"));

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
        {/* PHOTOS TAB */}
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        {/* INFO TAB: 
        about (desc, language), 
        policies(check in, check out, additional information, others), 
        important information(optional charge)*/}
        <Box component={"div"}>
          <Typography className="text-xl font-medium">
            About the property
          </Typography>
          <Typography>....</Typography>
          <Typography className="text-lg">Languages</Typography>
          <Typography>....</Typography>
          <br />
          <br />

          <Typography className="text-xl font-medium">Policies</Typography>
          <Typography className="text-lg">Check in - check out</Typography>
          <Typography>....</Typography>
          <Typography className="text-lg">
            Additional check-in information
          </Typography>
          <Typography>....</Typography>
          <Typography className="text-lg">others</Typography>
          <Typography>....</Typography>
          <br />
          <br />

          <Typography className="text-xl font-medium">
            Important information
          </Typography>
          <Typography className="text-lg">optional charges</Typography>
          <Typography>....</Typography>
          <br />
        </Box>
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
                  className="sm:w-[182px] w-[395px]"
                  // sx={{ width: 182 }}
                  fullWidth
                  label="Check in"
                  variant="standard"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 4, sm: 2 }}>
                <TextField
                  // sx={{ width: 182 }}
                  className="sm:w-[182px]"
                  fullWidth
                  label="Check Out"
                  variant="standard"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </Grid>
            </Grid>

            {/* guest room */}
            <Grid container spacing={{ xs: 2, sm: 4 }}>
              <Grid size={{ xs: 4, sm: 2 }}>
                <FormControl fullWidth variant="standard">
                  <InputLabel id="demo-simple-select-label">
                    Guests/Room
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // defaultValue={1}
                    value={guestRoomField}
                    label="Age"
                    onChange={(e) => {
                      setGuestRoomField(Number(e.target.value));
                    }}
                  >
                    <MenuItem value={1}>Single Room</MenuItem>
                    <MenuItem value={2}>Double Room</MenuItem>
                    <MenuItem value={3}>Triple Room</MenuItem>
                    <MenuItem value={4}>Group of 4</MenuItem>
                    <MenuItem value={5}>Group of 5</MenuItem>
                    <MenuItem value={6}>Group of 6</MenuItem>
                    <MenuItem value={7}>Group of 7</MenuItem>
                    <MenuItem value={8}>Group of 8</MenuItem>
                    <MenuItem value={9}>Group of 9</MenuItem>
                    <MenuItem value={10}>Group of 10</MenuItem>
                  </Select>
                  <FormHelperText>
                    <Link
                      component={"button"}
                      underline="hover"
                      // variant="body2"
                      color="textSecondary"
                      onClick={() => setSnackbarChildren(true)}
                    >
                      🧒 How about children ?
                    </Link>
                  </FormHelperText>
                  {/* <Link
                    component={"button"}
                    variant="body2"
                    onclick={() => console.log("info children")}
                  >
                    How about children ?
                  </Link> */}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 4, sm: 2 }}>
                <TextField
                  fullWidth
                  // defaultValue={1}
                  value={roomField}
                  variant="standard"
                  label="Rooms"
                  placeholder=""
                  type="number"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            onClick={() =>
                              roomField < 10 && setRoomField(roomField + 1)
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              roomField > 1 && setRoomField(roomField - 1)
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
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

      {/* children info */}
      <Snackbar
        open={snackbarChildren}
        onClose={() => setSnackbarChildren(false)}
      >
        <Alert
          onClose={() => setSnackbarChildren(false)}
          severity="info"
          variant="standard"
          sx={{ width: "100%" }}
          className="sm:mr-4"
        >
          <AlertTitle>🧒 How about children ? </AlertTitle>
          Most hotels permit children to use existing bedding when sharing the
          room with parent or guardian. Rules may vary, be sure to check each
          hotel occupancy policy.
        </Alert>
      </Snackbar>
    </Container>
  );
}
