import React from "react";
import Card from "@mui/material/Card";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function BookDetails() {
  return (
    <Card sx={{}}>
      <CardMedia
        sx={{ height: 140 }}
        image="/src/assets/images/Book_Banner.png"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default BookDetails;
