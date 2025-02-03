//pages/tracker/debts/debts.tsx
import { useCallback, useEffect, useState } from 'react';

import CardSeparator from '../components/CardSeparator.tsx';

import SelectComponent from '../components/SelectComponent.tsx';

import { capitalize, validationData } from '../../../helpers/functions.ts';
import CurrencyBadge from '../../../general_components/currencyBadge/CurrencyBadge.tsx';
import { useFetch } from '../../../hooks/useFetch.tsx';
import { url_debtors } from '../../../endpoints.ts';
import FormPlusBtn from '../../../general_components/formSubmitBtn/FormPlusBtn.tsx';
import { useLocation } from 'react-router-dom';
import Datepicker from '../../../general_components/datepicker/Datepicker.tsx';

import {
  CurrencyType,
  DebtorsListType,
  DebtsTrackerDataType,
  DebtsTypeMovementType,
} from '../../../types/types.ts';
import { numberFormat } from '../../../helpers/functions.ts';
import {
  CURRENCY_OPTIONS,
  DEBTOR_OPTIONS_DEFAULT,
  DEFAULT_CURRENCY,
} from '../../../helpers/constants.ts';

//temporary values
const defaultCurrency: CurrencyType = DEFAULT_CURRENCY;
const formatNumberCountry = CURRENCY_OPTIONS[defaultCurrency];
console.log('🚀 ~ Debts ~ formatNumberCountry:', formatNumberCountry);

//input debts datatrack variables
const initialTrackerData: DebtsTrackerDataType = {
  amount: '',
  debtor: '',
  currency: defaultCurrency,
  type: 'lend',
  date: new Date(),
  note: '',
};

function Debts() {
  const trackerState = useLocation().pathname.split('/')[2];
  //----Debtors Options----------
  //debtors
  const {
    data: dataDebtors,
    error: fetchedError,
    isLoading,
  } = useFetch<DebtorsListType>(url_debtors); //apply deboune

  // console.log('debtors datatrack:', dataDebtors);

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
    options: debtors ?? DEBTOR_OPTIONS_DEFAULT,
  };
  //-----------------
  //---states------
  const [currency, setCurrency] = useState<CurrencyType>(defaultCurrency);
  const [type, setType] = useState<DebtsTypeMovementType>('lend');
  const [datatrack, setDataTrack] =
    useState<DebtsTrackerDataType>(initialTrackerData);
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
      e.target.name === 'amount' ? parseFloat(e.target.value) : e.target.value;

    setDataTrack((prev) => ({ ...prev, [e.target.name]: valueToSave }));
  }
  //---
  const updateDataCurrency = useCallback(
    (currency: CurrencyType) => {
      setCurrency(currency);
      setDataTrack((prev) => ({ ...prev, currency: currency }));
    },
    [currency]
  );
  //---
  const toggleType = useCallback(() => {
    setType((prev: DebtsTypeMovementType) =>
      prev === 'lend' ? 'borrow' : 'lend'
    );
  }, [type]);

  function changeDateFn(selectedDate: Date): void {
    setDataTrack((prev) => ({ ...prev, date: selectedDate }));
  }

  function onSaveHandler() {
    console.log('On Save Handler');
    const formattedNumber = numberFormat(datatrack.amount || 0);
    console.log(
      'formatted amount as a string:',
      { formattedNumber },
      typeof formattedNumber
    );
    //-------entered datatrack validation messages --------
    const newValidationMessages = validationData(datatrack);
    if (Object.values(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }
    //----------------------------
    //do the post to the endpoint api
    //ENDPOINT HERE FOR POSTING
    //----------------------------
    //reset values

    setIsReset(true);
    setDataTrack({
      ...initialTrackerData,
      date: new Date(),
      currency: defaultCurrency,
    });
    setValidationMessages({});
    setType('lend');
    updateDataCurrency(defaultCurrency);

    setTimeout(() => {
      setIsReset(false);
    }, 500);
  }

  //-----useEffect--------
  useEffect(() => {
    updateDataCurrency(currency);

    setDataTrack((prev) => ({ ...prev, currency: currency }));
    setDataTrack((prev) => ({ ...prev, type: type }));
  }, [currency, type]);

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
              name='amount'
              className='inputNumber'
              type='number'
              step='any'
              placeholder={trackerState}
              onChange={updateTrackerData}
              value={datatrack.amount}
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
            setSelectState={setDataTrack}
            isReset={isReset}
            setIsReset={setIsReset}
            optionKeySelected='debtor'
            selectedValue={datatrack['debtor']}
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
                  date={datatrack.date}
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
                value={datatrack.note}
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
