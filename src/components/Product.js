import React, { useState } from "react";
// import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/productpage.css'

export default function Product ({ object }) {
  const [isFavored, setIsFavourted] = useState(false);

  return(
    <div className='item-container'>
      <div className='image-container'>
        <img src={object.images[0].src} alt={object.title} />
      </div>
        <div className="item-details">
          <p className="title">{object.title}</p>
          <p className="price">${object.variants[0].price}</p>
        </div>
      <div className="heart-container" 
        onClick={
          () => (isFavored ? setIsFavourted(f => (f = false)) : setIsFavourted(f => (f = true)))
        }>
        {isFavored ? <FontAwesomeIcon icon={solidHeart} /> : <FontAwesomeIcon icon={regularHeart} /> }
      </div>
    </div>
  );
}