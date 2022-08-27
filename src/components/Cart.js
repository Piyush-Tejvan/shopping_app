import React, {useState,useEffect} from "react";
import styled from "@emotion/styled";
import { CartState } from "../Context/Context";
import { Link } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import {Rating} from "@mui/material";
import {Stack} from "@mui/material";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
 
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid black;
  background-color: white;
  color: black;
`;

const TopTexts = styled.div`
  
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Info = styled.div`
  flex: 3;
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  @media (max-width: 768px) {
    margin-top: 20px;
    width: 30%;
    height: 50%;
  }
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
    font-size: 20px;
    @media (max-width: 768px) {
      font-size: 10px;
    }
`;

const ProductId = styled.span`
    font-size: 20px;
    @media (max-width: 768px) {
      font-size: 10px;
    }
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;


const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: red;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 15px;
  margin-right: 20px;
  height: 50vh;
  @media (max-width: 768px) {
    height: 38vh;
    margin-right: 0px;
  }
`;

const Offer = styled.div`
  height: 30px;
  background-color: purple;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px

`;

const SummaryTitle = styled.h1`
  display: flex;
  font-weight: 600;
  justify-content: center;
  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
const Empty = styled.div`
  margin-top: 40px;
  display: flex;
  font-weight: 600;
  font-size: 40px;
  justify-content: center;
  @media (max-width: 768px) {
    font-size: 30px;
  }
 
`;

const SummaryItemText = styled.span`
`;

const SummaryItemPrice = styled.span``;


const Cart = () => {

    const { state: { cart }, dispatch,} = CartState();
    let totalprice = 0;

    const [total, setTotal] = useState();
 
    if(total<=499 && total!==0){
      totalprice = total+40;
    }
    if(total>499){
      totalprice = total;
    }
    if(total===0){
      totalprice = total;
    }


    useEffect(() => {
        setTotal(
          cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
        );
    }, [cart]);
    return(
        <Container>
            <Offer>Get Free Shipping on Orders Over ₹499 </Offer>
            <Wrapper>
                <Title>YOUR CART</Title>
                <Top>
                <Link to="/"><TopButton>CONTINUE SHOPPING</TopButton></Link>
                
                <TopTexts>
                </TopTexts>
                <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                <Info>
                {cart.length > 0 ? (  
                <>
                  {cart.map((prod) => (
                    <div key={prod.id}>
                        <Product>
                        <ProductDetail>
                            <Image src={prod.img} />
                            <Details>
                                <ProductName>
                                    <b>Product:</b> {prod.name}
                                </ProductName>
                                <ProductId>
                                    <b>ID:</b> {prod.id}
                                </ProductId>
                                <Stack spacing={1}>
                                  <Rating name="half-rating-read" defaultValue={prod.rating} precision={0.5} size="small" readOnly />
                                </Stack>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                            <Box sx={{ minWidth: 80}}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Quantity"
                                        value={prod.qty}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "CHANGE_CART_QTY",
                                                payload: {
                                                id: prod.id,
                                                qty: e.target.value,
                                                },
                                            })
                                        }
                                    >
                                    <MenuItem value={0}>0 (Delete)</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    
                                    </Select>
                                </FormControl>
                            </Box>
                            </ProductAmountContainer>
                            <ProductPrice>₹ {prod.price}</ProductPrice>
                        </PriceDetail>
                        </Product>
                        <Hr />
                    </div>
                  ))}
                </>
                ) : (
                  <Empty >Cart is Empty!</Empty>
                )}
                </Info>
                {cart.length === 0 ? "" :
                <Summary>
                  <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                  <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>₹ {total}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>{total===0 ? `₹ ${0}`: `₹ ${40}`}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>{total>499 ? `- ₹ ${40}`: `- ₹ ${0}`}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>₹ {totalprice}</SummaryItemPrice>
                  </SummaryItem>
                  <Button sx={{width: '100%', padding: '10px', fontSize: "18px"}} type="button" variant='contained' color='primary' disabled={cart.length === 0}>Proceed to buy</Button>
                </Summary> }
                
                </Bottom>
            </Wrapper>
        </Container>
    );
}

export default Cart;