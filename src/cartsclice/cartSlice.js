import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const initialState = {
    //cartItems: [],
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity:0,
    cartTotalAmount:0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart(state, action){
            //state.cartItems.push(action.payload)
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if(itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info("increased to cart quantity", {
                    position:"top-right",
                });
            }else{
                const temProduct = {...action.payload, cartQuantity: 1};
                state.cartItems.push(temProduct);
                toast.success(`added product to cart`,{
                    position: "bottom-left",
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        //decreased cart
        DecreasedMycart(state,action){
            const itemIndex = state.cartItems.findIndex(
                cartItem =>cartItem.id == action.payload.id
            )
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -=1
                toast.error(`Decreased cart quantity`,{
                    position:"top-right",
                });
            }else if(state.cartItems[itemIndex].cartQuantity == 1){
                const nextCartItems = state.cartItems.filter(
                    (cartItem)=> cartItem.id !==action.payload.id
                );
                state.cartItems = nextCartItems;
                toast.error(`removed from cart`,{
                    position:"top-right",
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        //the end
        clearallcart(state,action){
            state.cartItems =[];
            toast.error("All cart deleted successfully",{
                position:"top-left",
            });
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
        },
        RemoveFromCart(state,action){
            const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem.id !== action.payload.id
            );
            state.cartItems =nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error("Item removed successfully from the cart",{
                position:"top-center",
            });
        },
        gettingTotal(state,action){
            let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem)=>{
                const {price, cartQuantity} = cartItem;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;

                return cartTotal;
            }, {
                total:0,
                quantity:0,
            });
            state.cartTotalQuantity= quantity;
            state.cartTotalAmount = total;
        },
    },
});

export const {addToCart,DecreasedMycart,clearallcart,RemoveFromCart,gettingTotal} = cartSlice.actions;
export default cartSlice.reducer;