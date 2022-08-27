import { db } from '../Firebase/firebase';
import {useState, useEffect} from 'react';
import {ref, onValue,} from 'firebase/database';
import React, { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer } from "../state/Reducers/Reducer";
import "../Firebase/firebase";


const Cart = createContext();


const Context = ({ children }) => {


    const [state, dispatch] = useReducer(cartReducer, {
        product: [],
        cart: [],
    
    });

    
    const [productState, productDispatch] = useReducer(productReducer, {
        byRating: 0,
        searchQuery: "",
    });


    const dataRef = ref(db, 'userdata');


    useEffect(() => {
        onValue(dataRef, (snapshot)=> {
            let records = [];
            snapshot.forEach(childSnapshot => {

                let data = childSnapshot.val();
                records.push(
                    data
                );
            });
            dispatch({
                type: "ADD_Products",
                payload: records,
            })
        });
    }, [])



    return(
        <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
            {children}
        </Cart.Provider>
    );

};

export const CartState = () => {
    return useContext(Cart);
};

export default Context;