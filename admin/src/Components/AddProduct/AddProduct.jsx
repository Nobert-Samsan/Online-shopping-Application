import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  // State hooks should be inside the function, but outside the return statement
  const [image, setImage] = useState(null); // Initial value should be null for files
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',
  });

  // Handler for image file input
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // Handler for text inputs and select element
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  // Function to handle product addition
  const addProduct = async () => {
    console.log(productDetails);
    let responseData;
    const product = { ...productDetails }; // Make a copy of productDetails

    const formData = new FormData();
    formData.append('product', image);

    try {
      // Upload the image
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      responseData = await response.json();

      if (responseData.success) {
        product.image = responseData.image_url; // Update the product with the image URL
        console.log(product);

        // Add the product
        const addProductResponse = await fetch('http://localhost:5000/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        const addProductData = await addProductResponse.json();
        addProductData.success
          ? alert('Product Added')
          : alert('Failed to add product');
      } else {
        alert(responseData.errors || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the product');
    }
  };

  // Render the JSX
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type='text'
          name='name'
          placeholder='Type here'
        />
      </div>
      <div className="addproduct-price">
        <div className='addproduct-itemfield'>
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type='text'
            name='old_price'
            placeholder='Type here'
          />
        </div>
        <div className='addproduct-itemfield'>
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type='text'
            name='new_price'
            placeholder='Type here'
          />
        </div>
      </div>
      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name='category'
          className='add-product-selector'
        >
          <option value='women'>Women</option>
          <option value='men'>Men</option>
          <option value='kid'>Kid</option>
        </select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt="Upload Area"
            className="addproduct-thumbnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type='file'
          name='image'
          id='file-input'
          hidden
        />
      </div>
      <button onClick={addProduct} className='addproduct-btn'>
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
