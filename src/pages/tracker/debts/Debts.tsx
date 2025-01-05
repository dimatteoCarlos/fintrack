import { useEffect, useState } from 'react';

import CardSeparator from '../components/CardSeparator.tsx';

import SelectComponent from '../components/SelectComponent.tsx';
import FormSubmitBtn from '../../../general_components/formSubmitBtn/FormSubmitBtn.tsx';

import { capitalize, changeCurrency } from '../../../helpers/functions.ts';
import TrackerDatepicker from '../../../general_components/datepicker/Datepicker.tsx';
import CurrencyBadge from '../../../general_components/currencyBadge/CurrencyBadge.tsx';
import { useFetch } from '../../../hooks/useFetch.tsx';
import { DebtorsListType } from '../../../types/types.ts';
import { url_debtors } from '../../../endpoints.ts';
import FormPlusBtn from '../../../general_components/formSubmitBtn/FormPlusBtn.tsx';
// import { numberFormat } from '../../../helpers/functions.ts';

//------------------------------

function Debts() {
  //temporary values
  // const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  // const formatNumberCountry = currencyOptions[defaultCurrency];
  // console.log('🚀 ~ Debts ~ formatNumberCountry:', formatNumberCountry);

  //----Debts Options Temporary values----------
  //debtors

  const { data, error: fetchedError } = useFetch<DebtorsListType>(url_debtors);
  console.log('data debtors:', data);

  //define what to do when error
  const debtors =
    !fetchedError &&
    data?.debtors?.map((debtor) => ({
      value: debtor.first_name + debtor.last_name,
      label: `${capitalize(debtor.first_name)}, ${capitalize(
        debtor.last_name
      )}`,
    }));

  const debtorOptions = {
    title: 'Debtors',
    options: debtors ?? [
      { value: 'debtor_01', label: 'debtor_01' },
      { value: 'debtor_02', label: 'debtor_02' },
      { value: 'debtor_03', label: 'debtor_03' },
    ],
  };
  //-----------------
  //input debts data state variables
  const initialData = {
    amount: 0,
    account: '',
    currency: 'usd',
    type: 'deposit',
    date: new Date(),
    note: '',
  };
  //---states------
  const [Data, setData] = useState(initialData);

  const [type, setType] = useState<'lend' | 'borrow'>('lend');

  const [currency, setCurrency] = useState<'usd' | 'cop'>(defaultCurrency);

  //-----useEffect--------
  useEffect(() => {
    setData((prev) => ({ ...prev, currency: currency }));

    setData((prev) => ({ ...prev, type: type }));
  }, [currency, type]);

  //----functions--------

  function inputTrackDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function textareaTrackDataHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(Data);
  }

  function toggleType() {
    const current = (type: 'lend' | 'borrow') => {
      if (type == 'lend') {
        return 'borrow';
      } else if (type == 'borrow') {
        return 'lend';
      } else {
        return 'lend';
      }
    };
    setType((prev) => current(prev));
  }

  function updateDataCurrency(currency: string) {
    setData((data) => ({ ...data, currency: currency }));
    // setCurrency(currency);
    console.log('selected starting point:', currency);
  }

  function toggleCurrency() {
    setCurrency((prev) => changeCurrency(prev));
  }

  function onSaveHandler() {
    console.log('On Save Handler');
  }

  function changeDate(selectedDate: Date): void {
    setData((prev) => ({ ...prev, date: selectedDate }));
    // console.log(Data);
  }

  //--------------------------

  return (
    <>
      <article className='debts' style={{ color: 'inherit' }}>
        <div className='state__card--top'>
          <div className='card--title'>Amount</div>

          <div className='card__screen'>
            <input
              className='inputNumber'
              type='number'
              placeholder='0,000.00'
              onChange={inputTrackDataHandler}
              name='amount'
              value={`${Data.amount}`}
            />

            {/* <div className='icon-currency' onClick={toggleCurrency}>
              {currency.toUpperCase()}
            </div> */}

            <div className='account__currency'>
              <CurrencyBadge
                updateOutsideCurrencyData={updateDataCurrency}
                variant='tracker'
              ></CurrencyBadge>
            </div>
          </div>

          <div className='card--title'>Debtor</div>
          <SelectComponent dropDownOptions={debtorOptions} />
        </div>

        <div className='state__card--bottom'>
          <CardSeparator />

          {/* IS NECESARY TO APPLY DEBOUNCE TO INPUT AND TEXTAREA?*/}

          <div className='card__typeDate__container'>
            <div className='card__typeDate--type'>
              <div className='card--title'>Type</div>
              <button className='card__screen--type' onClick={toggleType}>
                <div className='screen--concept'>{type}</div>
              </button>
            </div>

            <div className='card__typeDate--date'>
              <div className='card--title'>Date</div>
              <div className='card__screen--date'>
                <TrackerDatepicker
                  changeDate={changeDate}
                  date={Data.date}
                  variant='tracker'
                ></TrackerDatepicker>
              </div>
            </div>
          </div>

          <div className='card--title'>Note</div>

          <div
            className='note--expense'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className='card__screen ' style={{ flex: 0.9 }}>
              <textarea
                className='input__note__description'
                placeholder='Description'
                onChange={textareaTrackDataHandler}
                name='note'
                rows={3}
                maxLength={150}
                value={Data.note}
              />
            </div>

            <FormPlusBtn onClickHandler={onSaveHandler} />
          </div>
          {/* <FormSubmitBtn onClickHandler={onSaveHandler}>{'save'}</FormSubmitBtn> */}
        </div>
      </article>
    </>
  );
}

export default Debts;
