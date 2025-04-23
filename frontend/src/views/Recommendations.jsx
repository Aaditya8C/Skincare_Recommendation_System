import React from "react";
import { useLocation } from "react-router";

// mui components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ProductCard from "./Components/ProductCard";

// color theme
const colors = {
  background: "#fff7f0", // light gray background
  sectionBg: "#ffffff", // white section cards
  title: "#2c3e50", // dark blue-gray title
  border: "#e0e0e0", // subtle borders
};

// reusable product section component
const ProductSection = ({ title, products }) => {
  if (!products || products.length === 0) return null; // avoid rendering empty sections

  return (
    <Box
      sx={{
        mb: 6,
        p: 3,
        backgroundColor: colors.sectionBg,
        borderRadius: 2,
        boxShadow: 1,
        border: `1px solid ${colors.border}`,
      }}
    >
      <Typography
        variant="h5"
        mb={3}
        sx={{
          color: colors.title,
          textTransform: "capitalize",
          fontWeight: 600,
        }}
      >
        {title.replace(/-/g, " ")}
      </Typography>
      <Grid container spacing={3}>
        {products.slice(0, 4).map((prod, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ProductCard
              name={prod.name}
              brand={prod.brand}
              image={prod.img}
              price={prod.price}
              url={prod.url}
              concern={prod.concern}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const Recommendations = () => {
  const { state } = useLocation();
  const { data } = state || {};
  const { general, makeup } = data || {};

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
        backgroundColor: colors.background,
        minHeight: "100vh",
      }}
    >
      {/* skin care section */}
      <Typography
        variant="h4"
        textAlign="center"
        mb={4}
        sx={{ fontWeight: "bold", color: colors.title }}
      >
        Skin Care Recommendations
      </Typography>

      {general &&
        Object.keys(general).map((type) => (
          <ProductSection key={type} title={type} products={general[type]} />
        ))}

      <Divider sx={{ my: 6, borderColor: colors.border }} />

      {/* makeup section */}
      <Typography
        variant="h4"
        textAlign="center"
        mb={4}
        sx={{ fontWeight: "bold", color: colors.title }}
      >
        Makeup Recommendations
      </Typography>

      <ProductSection title="Makeup" products={makeup} />
    </Container>
  );
};

export default Recommendations;
