import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const RatingContainer = styled.div`
color: white;
border-radius: 5px;
font-size: 15px;
width: fit-content;
height: 25px;
padding: 0 15px;
display: flex;
justify-content: center;
align-items: center;
`;

const colors = {
  POOR: '#f3722c',
  POOR_TO_FAIR: '#f8961e',
  FAIR: '#f9c74f',
  FAIR_TO_GOOD: '#90be6d',
  GOOD: '#43aa8b',
}

const mapRating = (rating) => {
  if (rating === null) {
    return 'NULL';
  }
  return rating.replaceAll('_', ' ');
}

const RatingTag = ({ rating }) => {
  return (
    <RatingContainer style={{backgroundColor: `${rating === null ? '#bbb' :colors[rating]}`}}>
    {mapRating(rating)}
    </RatingContainer >
  )
};

export default RatingTag;