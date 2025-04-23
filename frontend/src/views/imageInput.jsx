import React, { useState } from "react";
import { UploadImage } from "../controllers/actions";
import { useNavigate } from "react-router-dom";

import WebcamCapture from "./Components/webCam";

// MUI
import {
  Grid,
  Container,
  Button,
  Typography,
  Box,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ImageInput() {
  const [landingPage, setLandingPage] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (imageSrc !== null) {
    console.log("we got an image");
    UploadImage(imageSrc, navigate);
  }

  return (
    <Container
      maxWidth="xs"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {landingPage ? (
          <Grid item xs={12} textAlign="center">
            <PhotoCameraIcon
              sx={{ fontSize: "6rem", color: theme.palette.primary.main }}
            />
            <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
              Choose Image Source
            </Typography>
            <Stack spacing={2}>
              <Button
                variant="contained"
                startIcon={<PhotoCameraIcon />}
                onClick={() => setLandingPage(false)}
              >
                Take a Photo
              </Button>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadFileIcon />}
              >
                Upload from Device
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
            </Stack>
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <IconButton onClick={() => setLandingPage(true)}>
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <WebcamCapture setImageSrc={setImageSrc} />
            </Grid>
          </>
        )}

        {preview && (
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1" sx={{ mt: 2 }}>
              Image Preview
            </Typography>
            <Box
              component="img"
              src={preview}
              alt="preview"
              sx={{ width: "100%", borderRadius: 2, mt: 1 }}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default ImageInput;
