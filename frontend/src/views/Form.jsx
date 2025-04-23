import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slider } from "@mui/material";

// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// controllers
import { putForm } from "../controllers/actions";
import { useLocation } from "react-router";

const skinToneValues = [1, 2, 3, 4, 5, 6];
const skinToneColors = [
  "rgb(33, 28, 40)",
  "rgb(105, 59, 41)",
  "rgb(206, 172, 104)",
  "rgb(240, 227, 171)",
  "rgb(250, 245, 234)",
  "rgb(249, 245, 236)",
];
let data = {
  tone: 5,
  type: "Oily",
  acne: "Moderate",
};
const skinTypes = ["All", "Oily", "Normal", "Dry"];
const acnes = ["Low", "Moderate", "Severe"];
const otherConcerns = [
  "sensitive",
  "fine lines",
  "wrinkles",
  "redness",
  "pore",
  "pigmentation",
  "blackheads",
  "whiteheads",
  "blemishes",
  "dark circles",
  "eye bags",
  "dark spots",
];

// reverse mapping function
const reverseAcneLevel = (level) => {
  switch (level.toLowerCase()) {
    case "low":
      return "Severe";
    case "severe":
      return "Low";
    default:
      return "Moderate";
  }
};

// ... existing imports
const Form = () => {
  const { state } = useLocation();
  if (state !== null) {
    data = state.data;
    if (data.type === "Oil") data.type = "Oily";
    data.acne = reverseAcneLevel(data.acne);
    console.log("Modified from backend: ", data);
  }
  console.log("Datttta", data);

  const { type, tone, acne, other_concerns = {} } = data;

  const [currType, setCurrType] = useState(type);
  const [currTone, setCurrTone] = useState(parseInt(tone));
  const [currAcne, setAcne] = useState(acne);
  const [currBlackheads, setBlackheads] = useState(
    other_concerns?.Blackheads || 0
  );
  const [currDarkspots, setDarkspots] = useState(
    other_concerns?.Darkspots || 0
  );
  const [currWrinkles, setWrinkles] = useState(other_concerns?.Wrinkles || 0);

  const [features, setFeatures] = useState({
    normal: false,
    dry: false,
    oily: false,
    combination: false,
    acne: false,
    sensitive: false,
    "fine lines": false,
    redness: false,
    dull: false,
    pore: false,
    pigmentation: false,
    whiteheads: false,
    blemishes: false,
    "dark circles": false,
    "eye bags": false,
  });

  const handleChange = (event) => {
    setFeatures({
      ...features,
      [event.target.name]: event.target.checked,
    });
  };

  const handleTone = (e) => setCurrTone(e.target.value);
  const handleType = (e) => setCurrType(e.target.value);
  const handleAcne = (e) => setAcne(e.target.value);
  const handleBlackheads = (e) => setBlackheads(e.target.value);
  const handleDarkspots = (e) => setDarkspots(e.target.value);
  const handleWrinkles = (e) => setWrinkles(e.target.value);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const acneToSubmit = reverseAcneLevel(currAcne);

    if (currType === "All") {
      features["normal"] = true;
      features["dry"] = true;
      features["oily"] = true;
      features["combination"] = true;
    } else {
      features[currType.toLowerCase()] = true;
    }

    // convert slider values to boolean (presence or absence)
    features["blackheads"] = currBlackheads > 0;
    features["dark spots"] = currDarkspots > 0;
    features["wrinkles"] = currWrinkles > 0;

    // convert all booleans to 1 or 0 for backend
    for (const [key, value] of Object.entries(features)) {
      features[key] = value ? 1 : 0;
    }

    putForm(features, currType, currTone, navigate);
  };

  return (
    <>
      <Container maxWidth="xs" sx={{ marginTop: "2vh" }} alignitems="center">
        <Typography variant="h5" textAlign="center">
          Results
        </Typography>

        <FormControl sx={{ marginTop: "3vh" }}>
          {/* Tone selection */}
          <Grid container>
            <Grid item xs={9}>
              <InputLabel>Tone</InputLabel>
              <Select value={currTone} onChange={handleTone} fullWidth>
                {skinToneValues.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  height: "3rem",
                  width: "3rem",
                  backgroundColor: skinToneColors[currTone - 1],
                  margin: "0 auto",
                  borderRadius: "10%",
                }}
              />
            </Grid>
          </Grid>

          {/* Type selection */}
          <Grid marginTop="2vh">
            <FormLabel>Type</FormLabel>
            <RadioGroup row value={currType} onChange={handleType}>
              <Grid container>
                {skinTypes.map((type) => (
                  <Grid item xs={6} key={type}>
                    <FormControlLabel
                      value={type}
                      control={<Radio />}
                      label={type}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </Grid>

          {/* Acne */}
          <Grid marginTop="2vh">
            <FormLabel>Acne</FormLabel>
            <RadioGroup row value={currAcne} onChange={handleAcne}>
              <Grid container>
                {acnes.map((ac) => (
                  <Grid item key={ac}>
                    <FormControlLabel
                      value={reverseAcneLevel(ac)}
                      control={<Radio />}
                      label={ac}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </Grid>

          {/* Blackheads Slider */}
          <Grid marginTop="2vh">
            <FormLabel>Blackheads</FormLabel>
            <Slider
              value={currBlackheads}
              onChange={(e, val) => setBlackheads(val)}
              step={1}
              marks
              min={0}
              max={10}
              valueLabelDisplay="auto"
            />
          </Grid>

          {/* Dark Spots Slider */}
          <Grid marginTop="2vh">
            <FormLabel>Dark Spots</FormLabel>
            <Slider
              value={currDarkspots}
              onChange={(e, val) => setDarkspots(val)}
              step={1}
              marks
              min={0}
              max={10}
              valueLabelDisplay="auto"
            />
          </Grid>

          {/* Wrinkles Slider */}
          <Grid marginTop="2vh">
            <FormLabel>Wrinkles</FormLabel>
            <Slider
              value={currWrinkles}
              onChange={(e, val) => setWrinkles(val)}
              step={1}
              marks
              min={0}
              max={10}
              valueLabelDisplay="auto"
            />
          </Grid>

          {/* Remaining concerns */}
          <Grid marginTop="2vh">
            <FormLabel>Specify other skin concerns</FormLabel>
            <Grid container>
              {otherConcerns
                .filter(
                  (concern) =>
                    !["wrinkles", "blackheads", "dark spots"].includes(concern)
                )
                .map((concern) => (
                  <Grid item xs={6} key={concern}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={features[concern]}
                          onChange={handleChange}
                          name={concern}
                        />
                      }
                      label={concern.charAt(0).toUpperCase() + concern.slice(1)}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>

          {/* Most Significant Problem */}
          <Grid marginTop="2vh">
            <Typography variant="body1" fontWeight="bold">
              Most Significant Concern:{" "}
              {other_concerns?.Most_significant_problem || "None"}
            </Typography>
          </Grid>

          {/* Submit */}
          <Grid marginTop="2vh" item xs={12}>
            <Button onClick={handleSubmit} variant="contained" fullWidth>
              Submit
            </Button>
          </Grid>
        </FormControl>
      </Container>
    </>
  );
};

// export default Form;

export default Form;
