import React, {Fragment, useState} from 'react';
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const SelectList = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
`;

const useCryptoCurrency = (label, initialState, options) => {

    const [state, updateState] = useState(initialState);

    const SelectCrypto = () => (
        <Fragment>
            <Label>{label}</Label>
            <SelectList
                onChange={e=>updateState(e.target.value)}
                value={state}
            >
                <option value={""}>-- Select --</option>
                {options.map(option => (
                    <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>{option.CoinInfo.FullName}</option>
                ))}
            </SelectList>
        </Fragment>
    );

    return [state, SelectCrypto, updateState];
}

export default useCryptoCurrency;