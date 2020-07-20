import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import useCurrency from "../hooks/useCurrency";
import useCryptoCurrency from "../hooks/useCryptoCurrency";
import axios from "axios";
import Error from "./Error";

const Button = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66A2FE;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #FFF;
  transition: background-color .3s ease;
  
  &:hover{
    background-color: #326AC0;
    cursor: pointer;
  }
`;

const Form = ({saveCurrency, saveCryptoCurrency}) => {

    const [cryptocurrencies, saveCryptoCurrencies] = useState([]);
    const [error, saveError] = useState(false);

    const CURRENCIES = [
        {code: 'USD', desc: 'United States dollar'},
        {code: 'MXN', desc: 'Mexican peso'},
        {code: 'EUR', desc: 'Euro'},
        {code: 'GBP', desc: 'Sterling'},
        {code: 'COP', desc: 'Colombian peso'}
    ];

    const [currency, SelectCurrencies] = useCurrency('Select a currency', '', CURRENCIES);
    const [crypto, SelectCrypto] = useCryptoCurrency('Select your Crypto Currency', '', cryptocurrencies)

    useEffect(() => {
        const queryApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const result = await axios.get(url);
            saveCryptoCurrencies(result.data.Data);
        }
        queryApi();

    }, []);

    const quoteCurrency = e => {
        e.preventDefault();

        //validate if both fields are filled.
        if(currency === '' || crypto === ''){
            saveError(true);
            return;
        }
        saveError(false);

        saveCurrency(currency);
        saveCryptoCurrency(crypto);
    }

    return(
        <form
            onSubmit={quoteCurrency}
        >
            {error && <Error message={'There was an error. All fields are mandatory.'}/>}
            <SelectCurrencies></SelectCurrencies>
            <SelectCrypto></SelectCrypto>
            <Button
                type={"submit"}
                value={"calculate"}
            ></Button>
        </form>
    );
}

export default Form;