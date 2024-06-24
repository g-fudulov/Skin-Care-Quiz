import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ProgressBar(props) {
  const percentage = (props.currentQuestionId / props.totalQuestions) * 100;

  return (
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar
        value={percentage}
        text={`${props.currentQuestionId}/${props.totalQuestions}`}
        styles={buildStyles({
          textSize: '16px',
          pathColor: "#AADDF3",
          textColor: '#000',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      />
    </div>
  );

}

export default ProgressBar;