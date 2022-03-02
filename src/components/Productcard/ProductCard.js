import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    padding: "1rem",
    margin: " 3rem 1rem",
  },
  media: {
    height: 140,
  },
});

export default function ProductCard({ product }) {
  const classes = useStyles();
  return (
    <Card className={classes.root} id="product-card">
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            ₹{product.name}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="h3">
            {product.price} Rs
          </Typography>
          <Typography gutterBottom variant="caption" component="h5">
            Description: {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className="card-btn-div">
        <CardActions>
          <Button size="small" color="primary">
            ADD to Cart
          </Button>
          <Button size="small" color="primary">
            Add to Wishlist
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}
