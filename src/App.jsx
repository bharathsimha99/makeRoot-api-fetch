import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [productData, setProductData] = useState([])
  const [serachData, setSearchData] = useState('')

  function fetchApi() {
    fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setProductData(data)
      })
  }

  useEffect(() => {
    fetchApi()
  }, [])

  const handleChange = (e) => {
    setSearchData(e.target.value)
  }

  const filterData = productData.filter((product) => {
   return product.title.toLowerCase().includes(serachData.toLowerCase())
  })

  return (
    <div className="App">
      <input type="text"
        placeholder='search product...'
        value={serachData}
        onChange={handleChange}
      />
     <div className='product-container'>
     {
        (filterData.length) ? 
          filterData.map((product, index) => {
            return (
              <div key={index} className='product'>
                <img src={product.image} alt="" />
                <h2>{product.title}</h2>
                <p>Price : ${product.price}</p>
               
              </div>
            )
          })
     
        : (
          <p>No products found</p>
        )
      }
     </div>
    </div>
  );
}

export default App;
