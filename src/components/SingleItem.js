import React from "react";
import { CartState } from "../Context/Context";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './styles.css';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


const SingleItem = ({ prod }) => {
  const {state: { cart }, dispatch, } = CartState();

  return (
    <div className="products">
      <Card sx={{border: "2px solid grey", minHeight: "100%"}}>
        <CardMedia component="img" height="80%" image={prod.img} alt={prod.name} />
        <CardContent>
            <Typography gutterBottom variant="h4" component="h5" sx= {{fontSize: "20px", fontWeight: "600"}}>
                {prod.name}
            </Typography>
          
            <div className="price">₹ {prod.price}</div>
            <Stack spacing={1}>
              <Rating name="half-rating-read" defaultValue={prod.rating} precision={0.5} readOnly />
            </Stack>
            
        </CardContent>
        <CardActions sx={{display: "flex", justifyContent: "center"}}>
        {cart.some((p) => p.id === prod.id) ? (
            <Button color="error"
              variant="contained"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              Remove from Cart
            </Button>
            ) : (
            <Button variant="contained" color="primary"
              
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
            >
              Add to Cart
            </Button>
        )}
        </CardActions>
      </Card>
    </div>
  );
};

export default SingleItem;
