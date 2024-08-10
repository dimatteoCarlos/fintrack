//
import '../../styles/generalStyles.css';
import { useEffect, useState } from 'react';
import { changeCurrency } from '../../../helpers/functions.ts';
import {
  AmountInputScreen,
  CardSeparator,
  CardTitle,
} from '../trackerComponents/TrackerComponents.tsx';
import SelectComponent from '../trackerComponents/SelectComponent.tsx';
import FormSubmitBtn from '../../../components/formComponents/FormSubmitBtn.tsx';

function Income() {
  //temporary values
  // const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  // const formatNumberCountry = currencyOptions[defaultCurrency];
  // console.log(formatNumberCountry);

  //----Income Options Temporary values----------
  const accountOptions = {
    title: 'Available Account',
    options: [
      { value: 'account_01', label: 'Account_01' },
      { value: 'account_02', label: 'Account_02' },
      { value: 'account_03', label: 'Account_03' },
      { value: 'account_04', label: 'Account_04' },
    ],
  };
  //--------
  const sourceOptions = {
    title: 'Source of income',
    options: [
      { value: 'source_01', label: 'source_01' },
      { value: 'source_02', label: 'source_02' },
      { value: 'source_03', label: 'source_03' },
      { value: 'source_04', label: 'source_04' },
    ],
  };

  //-----------------
  //input income data state variables
  const initialIncomeData = {
    amount: '0,000.00',
    account: '',
    source: '',
    note: '',
    currency: 'usd',
  };
  //---states------
  const [incomeData, setIncomeData] = useState(initialIncomeData);
  const [currency, setCurrency] = useState<'usd' | 'cop'>(defaultCurrency);

  //-----useEffect--------
  useEffect(() => {
    setIncomeData((prev) => ({ ...prev, currency: currency }));
    //shows previous state data
    // console.log(incomeData);
  }, [currency]);

  //----functions--------
  function toggleCurrency() {
    setCurrency((prev) => changeCurrency(prev));
  }

  function inputTrackDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setIncomeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function textareaTrackDataHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setIncomeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(incomeData);
  }

  function onSaveHandler() {
    console.log('On Save Handler');
  }

  //--------------------------

  return (
    <>
      <article className='income' style={{ color: 'inherit' }}>
        <CardTitle>Amount</CardTitle>

        <AmountInputScreen>
          <input
            className='inputNumber'
            type='text'
            placeholder={'0,000.00'}
            onChange={inputTrackDataHandler}
            name='amount'
            value={`${incomeData.amount}`}
          />

          <div className='icon-currency' onClick={toggleCurrency}>
            {currency.toUpperCase()}
          </div>
        </AmountInputScreen>

        <CardTitle>Account</CardTitle>
        <SelectComponent dropDownOptions={accountOptions} />

        {/* <CardSeparator /> */}

        <CardTitle>Source</CardTitle>
        <SelectComponent dropDownOptions={sourceOptions} />

        {/* APLICAR DEBOUNCE A INPUT Y TEXTAREA*/}

        <CardTitle>Note</CardTitle>
        <AmountInputScreen>
          <textarea
            className='input__note__description'
            placeholder='Description'
            onChange={textareaTrackDataHandler}
            name='note'
            rows={3}
            maxLength={150}
            value={incomeData.note}
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

export default Income;
