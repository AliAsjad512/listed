import { useSelector, useDispatch } from "react-redux";
import { useState} from "react"
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { emptyCart, removeProductFromCart } from "../redux/slices/cartSlice";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [count, setCount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const handleDelete = () => {
    setOpen(true);
    setCount(count + 1); 
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleEmptyCart = () => {
    setEmpty(true);
  };

  const handleCloseEmptyCart = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setEmpty(false);
  };

  const getSubTotal = () => {
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
      subtotal += cart[i].price * cart[i].quantity;
    }
    return subtotal.toFixed(2);
  };
  return (
    <div className="grid grid-cols-[1fr,260px] gap-4 ">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="warning"
          sx={{ width: "100%" }}
          icon={<CheckCircleOutlineIcon color="white" />}
        >
          {count} Item(s) deleted from the cart!
        </Alert>
      </Snackbar>
      <Snackbar
        open={empty}
        autoHideDuration={6000}
        onClose={handleCloseEmptyCart}
      >
        <Alert
          onClose={handleCloseEmptyCart}
          severity="error"
          sx={{ width: "100%" }}
         icon={<CheckCircleOutlineIcon color="white" />}
        >
          Cart is empty!
        </Alert>
      </Snackbar>
      <div className="grid grid-cols-1 mobileM:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-4">
        {cart.map((product, id) => (
          <div
            key={id}
            className="grid border border-zinc-300 rounded p-3 shadow max-w-[20rem]"
          >
            <img
              src={product.image}
              alt={`Product #${id + 1}'s image`}
              className="w-52 h-52 object-scale-down mx-auto mb-3"
            />
            <h1 className="font-semibold mb-2">{product.title}</h1>
            <p className="flex mb-2">
              <span className="text-sm">$</span>
              <span className="text-2xl pl-[2px]">
                {product.price.toFixed(2)}
              </span>
            </p>
            <p className="flex items-center">
              <span className="pr-1">{product.rating.rate}</span>
              <Rating
                name="read-only"
                value={product.rating.rate}
                precision={0.1}
                size="small"
                readOnly
              />
              <span className="pl-1">({product.rating.count})</span>
            </p>
            <p className="flex my-2">Quantity: {product.quantity}</p>
            <button
              className="bg-orange-500 hover:bg-orange-700 py-2 mt-auto rounded-md text-white"
              onClick={() => {
                dispatch(removeProductFromCart(cart[id]));
                handleDelete();
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="w-max h-max grid">
        <div className="w-max border border-zinc-300 rounded max-w-sm shadow-[0_0_5px_rgba(0,0,0,0.2)] justify-self-center md:justify-self-end order-1 md:order-2">
          <h2 className="text-lg font-semibold p-3 border-b">
            Subtotal ({cart.length} {cart.length > 1 ? "items" : "item"}): $
            {getSubTotal()}
          </h2>
          <div className="m-3 text-center">
            {cart.length > 0 ? (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    navigate(user.email ? "/checkout" : "/login");
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={cart.length === 0}
                >
                  Proceed To Checkout
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    dispatch(emptyCart());
                    handleEmptyCart();
                  }}
                >
                  Empty Cart
                </button>
              </div>
            ) : (
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-80 cursor-not-allowed">
                No items in cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
