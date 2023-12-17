import React from 'react';


const convertPointEstimate = (estimate) => {
  const pointEstimates = {
    ZERO:0,
    TWO: 2,
    ONE:1,
    FOUR: 4,
    EIGHT: 8
  };

  return pointEstimates[estimate] || estimate;
};

export default function Convert ({ task })  {
  const pointEstimateNumber = convertPointEstimate(task);

  return (
    <div variant="" sx={{color:'#f1f1f1' }}>
      {pointEstimateNumber} Points
    </div>
  );
};
