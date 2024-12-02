// import Image from "next/image";
"use client";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import { grey } from "@mui/material/colors";

export default function Home() {
  // MODAL sign in
  const _tes = () => {
    console.log("tes function");
  };

  // MODAL search

  return (
    <Container maxWidth="lg" disableGutters>
      {/* top nav */}
      <Grid container spacing={1} sx={{ paddingX: 2, paddingY: 2 }}>
        <Grid size={{ xs: 2, sm: 3 }}>logo</Grid>
        <Grid size={{ xs: 8, sm: 7 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ bgcolor: grey[200], color: "black" }}
          >
            Search{" "}
          </Button>
        </Grid>
        <Grid size={{ xs: 2, sm: 2 }}>
          <Button variant="contained" onClick={() => _tes()}>
            Sign in
          </Button>
        </Grid>
      </Grid>

      {/* selected place
            OR
          property 
      */}
      <Grid container spacing={1}>
        <Grid size={{ xs: 3, sm: 4 }}>Foto</Grid>
        <Grid size={{ xs: 9, sm: 8 }}>Info</Grid>
      </Grid>
      <Divider />

      {/* list offer 
        	place : tab menu (stay) 
          OR
          property : tab menu (Deals, Photos, Info)
      */}
    </Container>
  );
}
