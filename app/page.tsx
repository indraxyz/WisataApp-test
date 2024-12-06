"use client";
import { useState, useEffect, useLayoutEffect } from "react";

import {
  Tab,
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
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
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DoorBackIcon from "@mui/icons-material/DoorBack";

import Logo from "../public/logo.png";
// import ImgSquare from "../public/img-square.jpg";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { content, offers } from "../lib/mock-data";

const today = new Date();
const nextDay = new Date().setDate(today.getDate() + 1);

function regroupJsonBy(jsonArray: [{}]) {
  const grouped = {};

  // Iterate over the array
  jsonArray.forEach((item) => {
    if (!grouped[item.room_data.id]) {
      grouped[item.room_data.id] = [];
    }

    // Push the item into the array
    grouped[item.room_data.id].push(item);
  });

  return grouped;
}

function remapDeals(offer: {}) {
  let rebuild = {};
  console.log(offer);

  Object.keys(offer).forEach((v, k) => {
    // let key = v[0];
    // rebuild = v[0];
    console.log(v[0]);
  });

  // Object.entries(offer).forEach((v, k) => {
  //   rebuild[v[0]]["images"] = v[1][0].room_images;
  // });
  console.log(rebuild);
}

export default function Home() {
  // initial
  const [dialogSignin, setDialogSignin] = useState(false);
  const [dialogSearchBar, setDialogSearchBar] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  const [snackbarChildren, setSnackbarChildren] = useState(false);

  // form search bar
  const [guestRoomField, setGuestRoomField] = useState(1);
  const [roomField, setRoomField] = useState(1);
  const [checkIn, setCheckIn] = useState(today.toISOString().slice(0, 10));
  const [checkOut, setCheckOut] = useState(
    new Date(nextDay).toISOString().slice(0, 10)
  );

  // rest data
  const [contentData, setContentData] = useState({});
  const [photos, setPhotos] = useState([{}]);
  const [language, setLanguage] = useState({});
  const [deals, setDeals] = useState({});

  const theme = useTheme();
  const smallUP = useMediaQuery(theme.breakpoints.up("sm"));

  // comp did mount
  useEffect(() => {
    // let resDeals = regroupJsonBy(offers.offer_list);
    // console.log(resDeals);
    // setDeals(resDeals);
    remapDeals(regroupJsonBy(offers.offer_list));
    setContentData(content);
    setLanguage(content.general_info.spoken_languages);
    setPhotos(content.image.slice(0, 15));
  }, []);

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
            sx={{ bgcolor: grey[100], color: grey[600] }}
            onClick={() => setDialogSearchBar(true)}
            startIcon={<SearchIcon />}
          >
            Choose your beautiful trip 🌈
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

      {/* HERO place*/}

      {/* HOTEL NAME + STAR */}
      {Object.keys(contentData).length > 0 && !smallUP && (
        <Box
          component={"div"}
          sx={{ display: "flex", alignItems: "center" }}
          className="ml-2 mt-4"
        >
          <Typography className="font-bold text-base sm:text-xl ">
            {contentData.name}
          </Typography>
          {/* star_rating */}
          <Box className="mx-1 text-orange-500">
            {new Array(contentData.catalog.star_rating)
              .fill(null)
              .map((v, i) => (
                <StarIcon key={i} className="text-xl sm:text-2xl" />
              ))}
          </Box>
        </Box>
      )}
      {/* HERO PROPERTY */}
      {Object.keys(contentData).length > 0 && (
        <Grid container>
          <Grid
            size={{ xs: 3, sm: 4, md: 3 }}
            sx={{
              textAlign: "center",
              paddingBottom: 4,
              paddingTop: 2,
            }}
          >
            <img
              src={contentData.catalog.hero_image_url.md}
              alt="photo"
              className="img-property"
              loading="lazy"
            />
          </Grid>
          <Grid size={{ xs: 9, sm: 8, md: 9 }} sx={{ alignContent: "center" }}>
            <Box
              component={"div"}
              className="space-y-0 sm:space-y-2 pl-2 sm:pl-0"
            >
              {smallUP && (
                <Box
                  component={"div"}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography className="font-bold text-base sm:text-xl ">
                    {contentData.name}
                  </Typography>
                  {/* star_rating */}
                  <Box className="mx-1 text-orange-500">
                    {new Array(contentData.catalog.star_rating)
                      .fill(null)
                      .map((v, i) => (
                        <StarIcon key={i} className="text-xl sm:text-2xl" />
                      ))}
                  </Box>
                </Box>
              )}

              <Typography className="text-gray-500 text-sm sm:text-lg capitalize">
                {contentData.type}
              </Typography>
              <Typography className="text-sm sm:text-lg">
                {`${contentData.address_line}, ${contentData.name_suffix} ${contentData.catalog.postal_code}`}
              </Typography>
              <div className="flex items-center space-x-2">
                <CircularProgressbar
                  className="font-bold !w-8 sm:!w-10 h-10 flex-initial"
                  styles={buildStyles({
                    textSize: "40px",
                  })}
                  value={contentData.catalog.review_rating}
                  text={`${contentData.catalog.review_rating}`}
                />
                <Typography className="text-sm sm:text-lg">Rating .</Typography>
                <Typography className="text-sm sm:text-lg">
                  {contentData.catalog.review_count} Reviews
                </Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
      )}
      <Divider />

      {/* list offer 
        	place : tab menu (stay) 
          OR
          property : tab menu (Deals, Photos, Info)
      */}
      {Object.keys(contentData).length > 0 && (
        <TabContext value={selectedTab}>
          <Box>
            <TabList
              onChange={(e, v) => setSelectedTab(v)}
              TabIndicatorProps={{ sx: { top: 0 } }}
              centered
              variant={smallUP ? "standard" : "fullWidth"}
            >
              <Tab
                icon={<LocalOfferIcon />}
                iconPosition="start"
                label="Deals"
                value={1}
              />
              <Tab
                icon={<CollectionsIcon />}
                iconPosition="start"
                label="Photos"
                value={2}
              />
              <Tab
                icon={<InfoIcon />}
                iconPosition="start"
                label="Info"
                value={3}
              />
            </TabList>
          </Box>
          <TabPanel value={1} sx={{ padding: 0 }} keepMounted>
            {/* draw DEALS */}
            {/* image */}
          </TabPanel>
          <TabPanel value={2} sx={{ padding: 0 }} keepMounted>
            {/* PHOTOS TAB */}
            <InfiniteScroll
              dataLength={photos.length}
              next={() =>
                setPhotos(
                  photos.concat(
                    contentData.image.slice(photos.length, photos.length + 9)
                  )
                )
              }
              hasMore={photos.length < contentData.image.length ? true : false}
              loader={""}
            >
              <div className="grid grid-cols-3 gap-1 sm:gap-4">
                {Object.keys(photos[0]).length !== 0 &&
                  photos.map((el, i) => (
                    <img
                      key={i}
                      src={el.url.md}
                      alt={el.caption}
                      className="w-full h-auto object-cover aspect-square"
                      loading="lazy"
                    />
                  ))}
              </div>
            </InfiniteScroll>
          </TabPanel>
          <TabPanel value={3} sx={{ padding: 0 }} keepMounted>
            {/* INFO TAB: 
        about (desc, language), 
        policies(check in, check out, additional information, others), 
        important information(optional charge)*/}
            <Box component={"div"}>
              <div className="mb-2">
                <Typography className="text-xl font-medium mb-2">
                  About the property
                </Typography>
                <Typography>
                  {contentData.general_info.descriptions.location}
                </Typography>
                <Typography>
                  {contentData.general_info.descriptions.dining}
                </Typography>
                <Typography>
                  {contentData.general_info.descriptions.amenities}
                </Typography>
              </div>

              <Typography className="text-lg">Languages</Typography>
              <Typography>
                {(Object.keys(language) as Array<keyof typeof language>).map(
                  (v, i) =>
                    language[v].name +
                    (i + 1 < Object.keys(language).length ? "," : "")
                )}
              </Typography>

              <br />

              <Typography className="text-xl font-medium mb-2">
                Policies
              </Typography>
              <Typography>
                Check in {contentData.important_info.checkin.begin_time} -{" "}
                {contentData.important_info.checkin.end_time}
              </Typography>
              <Typography>
                Check out at {contentData.important_info.checkout.time}
              </Typography>

              <Typography className="text-lg mt-2">
                Additional check-in information
              </Typography>
              <div
                className="font-sans"
                dangerouslySetInnerHTML={{
                  __html: contentData.important_info.checkin.instructions,
                }}
              />
              <Typography className="text-lg">others</Typography>
              <div
                className="font-sans"
                dangerouslySetInnerHTML={{
                  __html:
                    contentData.important_info.policies.know_before_you_go,
                }}
              />
              <br />
              <br />

              <Typography className="text-xl font-medium mb-2">
                Important information
              </Typography>
              <Typography className="text-lg">optional charges</Typography>
              <div
                className="font-sans"
                dangerouslySetInnerHTML={{
                  __html: contentData.important_info.fees.optional,
                }}
              />
              <br />
            </Box>
          </TabPanel>
        </TabContext>
      )}

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
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <DoorBackIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
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
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <MeetingRoomIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
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
        className="w-full"
      >
        <Alert
          onClose={() => setSnackbarChildren(false)}
          severity="info"
          variant="standard"
          // sx={{ width: "100%" }}
          className="mr-4 sm:mr-10 w-full"
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
