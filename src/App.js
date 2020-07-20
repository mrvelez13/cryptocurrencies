import React, {useState, useEffect} from 'react';
import styled from "@emotion/styled";
import image from './cryptomonedas.png';
import Form from "./components/Form";
import axios from 'axios';
import Quote from "./components/Quote";
import Spinner from "./components/Spinner";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }  
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  
  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;


function App(){
    const [currency, saveCurrency] = useState('');
    const [cryptoCurrency, saveCryptoCurrency] = useState('');
    const [result, saveResult] = useState({});
    const [loading, saveLoading] = useState(false);

    useEffect(() => {
        const quoteCryptoCurrency = async () => {
            if(currency === '') return;

            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`;
            const result = await axios.get(url);
            saveLoading(true);
            setTimeout(() => {
                saveLoading(false)
                saveResult(result.data.DISPLAY[cryptoCurrency][currency]);
            }, 5000);
        }
        quoteCryptoCurrency();

    }, [currency, cryptoCurrency]);

    const Component = (loading) ? <Spinner/> : <Quote result={result}/>

  return(
      <Container>
        <div>
            <Image
                src={image}
                alt={"crypto image"}
            />
        </div>
        <div>
            <Heading>Quote cryptocurrencies instantly</Heading>
            <Form
                saveCurrency={saveCurrency}
                saveCryptoCurrency={saveCryptoCurrency}
            ></Form>
            {Component}
        </div>
      </Container>
  );
}

export default App;
