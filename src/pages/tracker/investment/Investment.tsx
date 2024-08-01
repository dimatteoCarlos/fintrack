import { useEffect, useState } from 'react';
import { changeCurrency } from '../../../helpers/functions.ts';
import { numberFormat } from '../../../helpers/functions.ts';

import {
  AmountInputScreen,
  CardDateScreen,
  CardSeparator,
  CardTitle,
  CardType,
  CardTypeAndDateContainer,
  CardTypeScreen,
} from '../trackerComponents/TrackerComponents.tsx';

import SelectComponent from '../trackerComponents/SelectComponent.tsx';
import FormSubmitBtn from '../../../components/formComponents/FormSubmitBtn.tsx';
import { CardDate } from '../trackerComponents/TrackerComponents';

//------------------------------

function Investment() {
  //temporary values
  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  const formatNumberCountry = currencyOptions[defaultCurrency];

  //----Investment Options Temporary values----------
  const accountOptions = {
    title: 'Available Account',
    options: [
      { value: 'account_01', label: 'Account_01' },
      { value: 'account_02', label: 'Account_02' },
      { value: 'account_03', label: 'Account_03' },
    ],
  };
  //--------

  //-----------------
  //input investment data state variables
  const initialInvestmentData = {
    amount: '0,000.00',
    account: '',
    currency: 'usd',
    type: 'deposit',
    note: '',
  };
  //---states------
  const [investmentData, setInvestmentData] = useState(initialInvestmentData);

  const [currency, setCurrency] = useState<'usd' | 'cop'>(defaultCurrency);

  const [typeInv, setTypeInv] = useState<'deposit' | 'withdraw'>('deposit');

  //-----useEffect--------
  useEffect(() => {
    setInvestmentData((prev) => ({ ...prev, currency: currency }));

    setInvestmentData((prev) => ({ ...prev, type: typeInv }));

    //shows previous state data
    // console.log(investmentData);
  }, [currency, typeInv]);

  //----functions--------
  function toggleCurrency() {
    setCurrency((prev) => changeCurrency(prev));
  }

  function inputTrackDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setInvestmentData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function textareaTrackDataHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setInvestmentData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(investmentData);
  }

  function toggleTypeInv() {
    const current = (type: 'deposit' | 'withdraw') => {
      if (typeInv == 'deposit') {
        return 'withdraw';
      } else if (typeInv == 'withdraw') {
        return 'deposit';
      } else {
        return 'deposit';
      }
    };
    setTypeInv((prev) => current(prev));

    // console.log('current:', current, typeof current);
  }

  function onSaveHandler() {
    console.log('On Save Handler');
  }

  //--------------------------

  return (
    <>
      <article className='investment' style={{ color: 'inherit' }}>
        <CardTitle>Amount</CardTitle>

        <AmountInputScreen>
          <input
            className='inputNumber'
            type='text'
            placeholder={'0,000.00'}
            onChange={inputTrackDataHandler}
            name='amount'
            value={`${investmentData.amount}`}
            // value={`${numberFormat(Number.parseFloat(investmentData.amount), formatNumberCountry)}`}
          />

          <div className='icon-currency' onClick={toggleCurrency}>
            {currency.toUpperCase()}
          </div>
        </AmountInputScreen>

        <CardTitle>Account</CardTitle>
        <SelectComponent dropDownOptions={accountOptions} />

        <CardSeparator />

        {/* APLICAR DEBOUNCE A INPUT Y TEXTAREA*/}

        <CardTypeAndDateContainer>
          <CardType>
            <CardTitle>Type</CardTitle>
            <CardTypeScreen>
              <div className='screen--concept' onClick={toggleTypeInv}>
                {typeInv}
              </div>
            </CardTypeScreen>
          </CardType>

          <CardDate>
            <CardTitle>Date</CardTitle>
            <CardDateScreen>
              <div className='screen--concept' onClick={toggleTypeInv}>
                {'MM/DD/YYYY'}
              </div>
            </CardDateScreen>
          </CardDate>

        </CardTypeAndDateContainer>

        
        <CardTitle>Note</CardTitle>
        <AmountInputScreen>
          <textarea
            className='input__note__description'
            placeholder='Description'
            onChange={textareaTrackDataHandler}
            name='note'
            rows={3}
            maxLength={150}
            value={investmentData.note}
          />
        </AmountInputScreen>

        <FormSubmitBtn
          btnTitle={'save'}
          onClickHandler={onSaveHandler}
        ></FormSubmitBtn>
      </article>
    </>
  );
}

export default Investment;
