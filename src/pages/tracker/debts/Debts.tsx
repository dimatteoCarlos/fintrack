//pages/tracker/debts/debts.tsx
import { useEffect, useState } from 'react';

import CardSeparator from '../components/CardSeparator.tsx';

import SelectComponent from '../components/SelectComponent.tsx';

import { capitalize, validationData } from '../../../helpers/functions.ts';
import CurrencyBadge from '../../../general_components/currencyBadge/CurrencyBadge.tsx';
import { useFetch } from '../../../hooks/useFetch.tsx';
import { url_debtors } from '../../../endpoints.ts';
import FormPlusBtn from '../../../general_components/formSubmitBtn/FormPlusBtn.tsx';
import { useLocation } from 'react-router-dom';
import { CURRENCY_OPTIONS } from '../../../helpers/functions.ts';
import Datepicker from '../../../general_components/datepicker/Datepicker.tsx';
// import { , changeCurrency } from '../../../helpers/functions.ts';
import {
  CurrencyType,
  DebtorsListType,
  DebtsTrackerDataType,
  DebtsTypeMovementType,
} from '../../../types/types.ts';
import { numberFormat } from '../../../helpers/functions.ts';

//temporary values
const defaultCurrency: CurrencyType = 'usd';
const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];
console.log('🚀 ~ Debts ~ formatNumberCountry:', formatNumberCountry);

//------------------------------

function Debts() {
  const trackerState = useLocation().pathname.split('/')[2];
  //----Debtors Options----------
  //debtors
  const {
    data: dataDebtors,
    error: fetchedError,
    isLoading,
  } = useFetch<DebtorsListType>(url_debtors);

  //define what to do when error
  const debtors =
    !fetchedError &&
    !isLoading &&
    dataDebtors?.debtors?.length &&
    dataDebtors?.debtors?.map((debtor) => ({
      value: debtor.first_name + debtor.last_name,
      label: `${capitalize(debtor.first_name)}, ${capitalize(
        debtor.last_name
      )}`,
    }));

  const debtorOptions = {
    title: debtors ? 'Debtors' : 'No info. available',
    options: debtors ?? [
      { value: 'debtor_01', label: 'debtor_01' },
      { value: 'debtor_02', label: 'debtor_02' },
      { value: 'debtor_03', label: 'debtor_03' },
    ],
  };
  //-----------------
  //input debts data state variables

  const initialTrackerData: DebtsTrackerDataType = {
    amount: undefined,
    debtor: '',
    currency: defaultCurrency,
    type: 'lend',
    date: new Date(),
    note: '',
  };

  //---states------
  const [currency, setCurrency] = useState<CurrencyType>(defaultCurrency);
  const [type, setType] = useState<DebtsTypeMovementType>('lend');
  const [data, setData] = useState<DebtsTrackerDataType>(initialTrackerData);
  const [validationMessages, setValidationMessages] = useState<{
    [key: string]: string;
  }>({});
  const [isReset, setIsReset] = useState<boolean>(false);

  //----Functions ------

  function updateTrackerData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.preventDefault();
    const valueToSave =
      e.target.name === 'amount' ? Number(e.target.value) : e.target.value;

    setData((prev) => ({ ...prev, [e.target.name]: valueToSave }));
  }

  function updateDataCurrency(currency: CurrencyType) {
    setCurrency(currency);
    setData((prev) => ({ ...prev, currency: currency }));
    // console.log('selected updateDataCurrency point:', currency);
  }

  function toggleType() {
    setType((prev: DebtsTypeMovementType) =>
      prev === 'lend' ? 'borrow' : 'lend'
    );
  }

  function changeDateFn(selectedDate: Date): void {
    setData((prev) => ({ ...prev, date: selectedDate }));
    // console.log(Data);
  }

  function onSaveHandler() {
    console.log('On Save Handler');
    const formattedNumber = numberFormat(data.amount || 0);
    console.log(
      'formatted amount as a string:',
      { formattedNumber },
      typeof formattedNumber
    );

    //-------entered data validation messages -----------
    const newValidationMessages = validationData(data);

    if (Object.values(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }
    //----------------------------
    //do the post to the endpoint api

    //----------------------------
    //reset values

    setIsReset(true);
    setData(initialTrackerData);
    updateDataCurrency(defaultCurrency);
    setValidationMessages({});
    setType('lend');
    setData((prev) => ({ ...prev, date: new Date() }));

    setTimeout(() => {
      setIsReset(false);
    }, 1000);
  }

  //-----useEffect--------
  useEffect(() => {
    updateDataCurrency(currency);

    setData((prev) => ({ ...prev, currency: currency }));
    setData((prev) => ({ ...prev, type: type }));
  }, [currency, type]);

  //------------
  //--------------------------

  return (
    <>
      <article className='debts' style={{ color: 'inherit' }}>
        <div className='state__card--top'>
          <div className='card--title'>
            Amount
            <span className='validation__errMsg'>
              {validationMessages['amount']}
            </span>
          </div>

          <div className='card__screen'>
            <input
              className='inputNumber'
              type='number'
              placeholder={trackerState}
              onChange={updateTrackerData}
              name='amount'
              value={data.amount || ''}
            />

            <div className='account__currency'>
              <CurrencyBadge
                updateOutsideCurrencyData={updateDataCurrency}
                variant='tracker'
                currency={currency}
              ></CurrencyBadge>
            </div>
          </div>

          <div className='card--title'>
            Debtor
            <span className='validation__errMsg'>
              {validationMessages['debtor']}
            </span>
          </div>
          <SelectComponent
            dropDownOptions={debtorOptions}
            setSelectState={setData}
            isReset={isReset}
            setIsReset={setIsReset}
            optionKeySelected='debtor'
            selectedValue={data['debtor']}
          />
        </div>

        <div className='state__card--bottom'>
          <CardSeparator />

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
                <Datepicker
                  changeDate={changeDateFn}
                  date={data.date}
                  variant='tracker'
                  isReset={isReset}
                ></Datepicker>
              </div>
            </div>
          </div>

          <div className='card--title'>
            Note
            <span className='validation__errMsg'>
              {validationMessages['note']}
            </span>
          </div>

          <div
            className='note--expense'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className='card__screen ' style={{ flex: 0.9 }}>
              <textarea
                className='input__note__description'
                placeholder='Description'
                onChange={updateTrackerData}
                name='note'
                rows={3}
                maxLength={150}
                value={data.note}
              />
            </div>

            <FormPlusBtn onClickHandler={onSaveHandler} />
          </div>
        </div>
      </article>
    </>
  );
}

export default Debts;
