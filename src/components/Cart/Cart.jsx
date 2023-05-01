import "./Cart.scss";
import {MdClose} from "react-icons/md"; 
import {ShoppingCartIcon} from '@heroicons/react/24/outline';
import CartItem from "./CartItem/CartItem";
import React from "react";
import { useContext } from "react";
import { Context } from "../../utils/context";
import {loadStripe} from "@stripe/stripe-js"
import { makePaymentRequest } from "../../utils/api";
const Cart = () => {
    const {cartItems,setShowCart, cartSubTotal} = useContext(Context);

    const stripePromise = loadStripe(
        // process.env.REACT_APP_PUBLISHABLE_KEY
        "pk_test_51N1lVbSJGhSW9JJWpSMuXWxp1xRNhONGIsYGpaEqWNlK4vK9uMeVkyY9FyidwNF4jCPlVthvozTlxTO7Ewqa0icn005pfvdMkn"
    );

  
    
    const handlePayment = async () => {
      try {
          const stripe = await stripePromise;
          const res = await makePaymentRequest.post("/api/orders", {
              products: cartItems,
          });
          await stripe.redirectToCheckout({
              sessionId: res.data.stripeSession.id,
          });
      } catch (err) {
          console.log(err);
      }
  };

    return (
        <div className="cart-panel">
            <div className="opac-layer"></div>
            <div className="cart-content">
                <div className="cart-header">
                    <span className="heading">Shopping Cart</span>
                    <span className="close-btn" onClick={()=> setShowCart(false)}>
                        <MdClose />
                        <span className="text">close</span>
                    </span>
                </div>

                {!cartItems?.length && <div className="empty-cart">
               <ShoppingCartIcon className='svg' />
                    <span>No Products in the Cart.</span>
                    <button className="return-cta">RETURN TO THE SHOP</button>
                </div>}
                
                {!!cartItems.length && <>
                <CartItem />
                    <div className="cart-footer">
                        <div className="subtotal">
                            <span className="text">SubTotal :</span>
                            <span className="text total">&#8377; {cartSubTotal}</span>
                        </div>
                        <div className="button">
                            <button className="checkout-cta" onClick={handlePayment}>CHECKOUT</button>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    )
};

export default Cart;
