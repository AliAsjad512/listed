import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Rating from "@mui/material/Rating";
import Modal from "@mui/material/Modal";
import { CgClose } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const SearchBar = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const cart = useSelector((state) => state.cart);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleAddToCart = () => {
    setCount(count + 1);
    dispatch(addToCart(selectedProduct));
  };

  const handleButtonClick = () => {
    handleAddToCart();
    handleClick();
  };
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const checkCartForItem = (item) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].key === item.key) {
        return (
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
            Item is in Cart
          </button>
        );
      } else {
        return (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={() => {
              dispatch(addToCart(selectedProduct));
            }}
          >
            Add To Cart
          </button>
        );
      }
    }
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={() => {
          dispatch(addToCart(selectedProduct));
        }}
      >
        Add To Cart
      </button>
    );
  };

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 400,
          mb: 3,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search products"
          inputProps={{ "aria-label": "search products" }}
          value={searchTerm}
          onChange={handleSearch}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {count} Item(s) added to the cart!
        </Alert>
      </Snackbar>
      <div className="grid gap-6 grid-cols-1 mobileM:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]">
        {filteredProducts.map((product, idx) => (
          <div
            key={idx}
            className="grid border border-zinc-300 rounded p-3 shadow"
          >
            <img
              src={product.image}
              alt={`Product #${idx + 1}'s image`}
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
            <button
              className="flex justify-center items-end"
              onClick={() => handleProductClick(product)}
            >
              <a
                href="#_"
                className="relative inline-flex items-center justify-center my-3 px-5 py-2 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-500 rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                  View Product
                </span>
                <span className="relative invisible">View Product</span>
              </a>
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <Modal
          open={Boolean(selectedProduct)}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="flex items-center justify-center h-screen">
            <div className="bg-white w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] p-5 rounded shadow-lg">
              <div className="flex justify-between items-center pb-3 border-b-2">
                <h1 className="text-lg font-bold">{selectedProduct.title}</h1>
                <button onClick={handleCloseModal}>
                  <CgClose className="text-red-500 text-xl stroke-1" />
                </button>
              </div>
              <div className="flex justify-between pt-3">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-52 h-52 object-scale-down mr-5"
                />
                <div>
                  <p className="text-gray-700 mb-2">
                    <strong>Description: </strong>
                    {selectedProduct.description}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Price: </strong>${selectedProduct.price.toFixed(2)}
                  </p>
                  <div className="flex items-center mb-2">
                    <strong className="text-gray-700 pr-1">Rating:</strong>
                    <span className="pr-1">{selectedProduct.rating.rate}</span>
                    <Rating
                      name="read-only"
                      value={selectedProduct.rating.rate}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <span className="pl-1">
                      ({selectedProduct.rating.count})
                    </span>
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={handleButtonClick}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
export default SearchBar;
