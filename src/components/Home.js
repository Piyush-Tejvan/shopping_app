import { CartState } from "../Context/Context";
import SingleItem from "./SingleItem";
import Filters from "./Filter";
import React from "react";

const Home = () => {
    const {state: { product }, productState: { sort, byRating, searchQuery }, } = CartState();


    const transformProducts = () => {
        let sortedProducts = product;

        if (sort) {
            sortedProducts = sortedProducts.sort((a, b) =>
            sort === "lowToHigh" ? a.price - b.price : b.price - a.price
            );
        }

        if (byRating) {
            sortedProducts = sortedProducts.filter(
            (prod) => prod.rating >= byRating
            
            );
        }

        if (searchQuery) {
            sortedProducts = sortedProducts.filter((prod) =>
            prod.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return sortedProducts;
    };

    

  return (
    <div className="home">
      <Filters />
          <div className="productContainer">
            {transformProducts().map((prod) => (
                <SingleItem prod={prod} key={prod.id} />
              ))}
        </div>
    </div>
  );
};

export default Home;

