import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

export default function ProductCard({
  name = "cream",
  price = "₹2000",
  brand = "brand",
  url = "https://www.myntra.com/",
  concern = [],
  image = "",
}) {
  const redirectProduct = () => {
    window.open(url, "_blank");
  };

  concern = [...new Set(concern)];

  return (
    <Box
      onClick={redirectProduct}
      sx={{
        cursor: "pointer",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      <Card
        sx={{
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 3,
          bgcolor: "#fafafa",
        }}
        elevation={4}
      >
        <CardMedia
          component="img"
          height="220"
          image={image || "/unavailable.png"}
          alt="Product image"
          sx={{
            objectFit: "cover",
            backgroundColor: "#e0e0e0",
          }}
        />

        <CardContent sx={{ padding: 2 }}>
          {/* Brand and Price */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              {brand}
            </Typography>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              {price}
            </Typography>
          </Box>

          {/* Product Name */}
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            sx={{ fontWeight: 600, color: "#333" }}
          >
            {name.length > 50 ? name.substring(0, 50) + "..." : name}
          </Typography>

          {/* Concerns as Chips */}
          <Grid container spacing={1} sx={{ mt: 1 }}>
            {concern
              .filter((c) => c)
              .map((c, index) => (
                <Grid item key={index}>
                  <Chip
                    label={c}
                    size="small"
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      fontWeight: 500,
                    }}
                  />
                </Grid>
              ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
