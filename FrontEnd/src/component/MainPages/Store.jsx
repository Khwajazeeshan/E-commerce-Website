import React from "react";
import StoreNavbar from "../SectionPages/StoreNavbar";
import ProductCard from "../SectionPages/ProductCard";
import StoreFooter from "../SectionPages/StoreFooter";

const Store = () => {

    return (
        <div >
            <StoreNavbar />
            <ProductCard />
            <StoreFooter />
        </div>
    );
};

export default Store;