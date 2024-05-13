import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from 'react-redux'
import { addProduct, resetProducts, fetchProducts } from '../redux/slices/productsSlice';

  
const ProductsList = () => {
  // const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const products = useSelector(state => state.products.items);

  const dispatch = useDispatch();

  const fetchProductStatus = useSelector(state => state.products.status)

  useEffect(() => {
    if (fetchProductStatus === 'idle'){
        dispatch(fetchProducts())
    }
  }, [fetchProductStatus, dispatch])

  useEffect(() => {
    const newFilteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(newFilteredProducts);
  }, [searchQuery, products]);

  return <SearchBar onSearch={(query) => setSearchQuery(query)} />;
};

export default ProductsList;
