import React from 'react';
import CircleProgressbar from '../CircleProgressbar/CircleProgressbar';

const CircularProgressbarsContainer = () => {
    return (
        <div className="w-[540px] flex justify-between mt-10">
            <CircleProgressbar percentage={57} description="Weekly achievements completed" />
            <CircleProgressbar percentage={72} description="Monthly achievements completed" />
            <CircleProgressbar percentage={34} description="Yearly achievements completed" />
        </div>
    );
};

export default CircularProgressbarsContainer;
