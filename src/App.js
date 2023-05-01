import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category1 from "./components/Category1/Category1";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from "./utils/context";
import React from "react";

function App() {
    const name = 'deep'
    return (
        <BrowserRouter>
        <AppContext >

        <Header />
            <Routes>
                <Route path="/" element={< Home/>} />
                <Route path="/category/:id" element={<Category1 />} />
                <Route path="/product/:id" element={<SingleProduct />} />
                home
            </Routes>
            <Newsletter />
            <Footer />
        </AppContext>
        </BrowserRouter>
    )
}

export default App;
