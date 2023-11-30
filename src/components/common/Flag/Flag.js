import React from 'react';

const Flag = ({country, width = 20, style}) => {
    return (
        <img
            className="country-flag"
            loading="lazy"
            width={width}
            style={style}
            srcSet={`https://flagcdn.com/w40/${country.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w40/${country.toLowerCase()}.png`}
            alt=""
        />
    );
};

export default Flag;