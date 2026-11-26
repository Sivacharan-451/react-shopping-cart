
import React, { useState, useEffect } from 'react'
import "./App.css"
import axios from "axios"

const App = () => {

  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);

      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();

  }, []);
  const showMore=()=>{
    setVisibleCount((prev)=>prev+5)
  }
  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className='main'>

      <h1 className='shop-title'>REACT-CART</h1>

      {error && <p>{error}</p>}

      <div className='product-container'>

        {visibleProducts.map((product) => (

          <div className='product-card' key={product.id}>

            <img src={product.image} alt={product.title} />

            <h3>{product.title}</h3>
            <p className='category'>{product.category}</p>
            <p className='price'>${product.price}</p>

            <button>Add to Cart</button>

          </div>

        ))}

      </div>
      {visibleCount <products.length && (
        <button onClick={showMore} className='show-more'>SHOW MORE</button>
      )}

    </div>
  )
}

export default App
