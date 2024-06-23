import React, { useState } from "react";
// import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

export default function Product ({ object }) {
  const [isFavored, setIsFavourted] = useState(false);

  return(
    <div className='item-conatiner'>
      <div className='image-container'>
        <img src={object.images[0].src} alt={object.title} />
      </div>
      <p>{object.title}</p>
      <span>${object.variants[0].price}</span> <br/>
      <span>Tags:{object.tags.join(", ")}</span>
      <div className="heart-container" 
      onClick={
        () => (isFavored ? setIsFavourted(f => (f = false)) : setIsFavourted(f => (f = true)))
      }>
        {isFavored ? <FontAwesomeIcon icon={solidHeart} /> : <FontAwesomeIcon icon={regularHeart} /> }
      </div>
    </div>
  );
}