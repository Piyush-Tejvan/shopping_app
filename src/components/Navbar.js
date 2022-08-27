import React, {useState} from "react";
import '../index.css';
import './styles.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { CartState } from "../Context/Context";
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button  from "@mui/material/Button";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

const Navbar = () => {

    const [open, setOpen] = useState(false);

    const { state: { cart }, dispatch, productDispatch, } = CartState();

    const handleDialog = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return(
        <div className="whole">
            <div className="nav">
                <div className="navitem1">
                    <StorefrontIcon />INSTA SHOP
                </div>
                <div className="navitem2">
                    <input type="search" placeholder="  Search"  onChange={(e) => {productDispatch({
                        type: "FILTER_BY_SEARCH",
                        payload: e.target.value,
                        });
                    }} className="search" />
 
                </div>
                <div className="btn3">
                    <button type="button" className="btn-3" onClick={handleDialog} ><ShoppingCartIcon />Cart ({cart.length})</button>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth={true}>
                <DialogTitle sx={{textAlign:"center", fontSize: "30px", fontWeight: "600"}}>
                    <span>Items in Your Cart</span>
                    
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {cart.length > 0 ? (
                            <>
                            {cart.map((prod) => (
                                <span className="cartitem" key={prod.id}>
                                    <img
                                        src={prod.img}
                                        className="cartItemImg"
                                        alt={prod.name}
                                    />
                                    <span className="cartItemDetail">
                                        <span>{prod.name}</span>
                                        <span>₹ {prod.price}</span>
                                    </span>
                                    <Button
                                        onClick={() =>
                                        dispatch({
                                            type: "REMOVE_FROM_CART",
                                            payload: prod,
                                        })
                                        }
                                    >
                                        <DeleteIcon />
                                    </ Button>
                                </span>
                            ))}
                            <Link to="/cart">
                                <Button onClick={handleClose} variant="contained" sx={{ width: "80%", marginX: "10%" }}>
                                Go To Cart
                                </Button>
                            </Link>
                            </>
                        ) : (
                            <span style={{ padding: 10, display: "flex", justifyContent: "center" }}>Cart is Empty!</span>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color='error' onClick={handleClose} sx={{ marginX: "40%"}}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            
        </div>
    );

}

export default Navbar;