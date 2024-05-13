import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit';
import { addProduct, resetProducts, fetchProducts } from '../redux/slices/productsSlice';


export const ReduxTest = () => {
  const items = useSelector(state => state.products.items);
  console.log(items)

  const [name, setName] = useState('')
  const [type, setType] = useState('')

  const dispatch = useDispatch();

  const fetchProductStatus = useSelector(state => state.products.status)

  useEffect(() => {
    console.log('here')
    if (fetchProductStatus === 'idle'){
        dispatch(fetchProducts())
    }
  }, [fetchProductStatus, dispatch])
  

  const onSaveProductClicked = () => {
    if (name && type) {
      dispatch(
        addProduct({
          id: nanoid(),
          name,
          type
        })
      );
      setName('');
      setType('');
    }
  }

  const onNameChanged = e => setName(e.target.value)
  const onTypeChanged = e => setType(e.target.value)

  function renderedProducts (){ 
    if(items){items.map(item => (
    <article className="product-excerpt" key={item.id}>
      <h3>{item.type}</h3>
      <p className="product-name">{item.name.substring(0, 100)}</p>
    </article>
  ))}}

  return (
    <Fragment>
        <section className="product-list">
            <h2>Products</h2>
            {renderedProducts}
        </section>
        <section>
      <h2>Add a New Product</h2>
      <form>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={name}
          onChange={onNameChanged}
        />
        <label htmlFor="postType">Type:</label>
        <textarea
          id="postType"
          name="postType"
          value={type}
          onChange={onTypeChanged}
        />
        <button type="button" onClick={onSaveProductClicked}>Save Product</button>
      </form>
    </section>
    </Fragment>

  )
}