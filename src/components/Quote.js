import React from 'react';
import styled from "@emotion/styled";

const ResultDiv = styled.div`
  color: #FFF;
  font-family: Arial, Helvetica, sans-serif;  
`;

const Paragraph = styled.p`
  font-size: 18px;
  
  span{
    font-weight: bold;
  }
`;

const Price = styled.p`
  font-size: 30px;
  
  span{
    font-weight: bold;
  };
`;

const Quote = ({result}) => {
    if(Object.keys(result).length === 0) return null;
    return (
        <ResultDiv>
            <Price>The price is <span>{result.PRICE}</span></Price>
            <Paragraph>The highest price in the day was <span>{result.HIGHDAY}</span></Paragraph>
            <Paragraph>The lowest price in the day was <span>{result.LOWDAY}</span></Paragraph>
            <Paragraph>The last 24 hours variation was %<span>{result.CHANGEPCT24HOUR}</span></Paragraph>
            <Paragraph>Last update <span>{result.LASTUPDATE}</span></Paragraph>
        </ResultDiv>
    );
}

export default Quote;