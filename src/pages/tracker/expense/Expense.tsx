import { useEffect, useState } from 'react';
import CardSeparator from '../components/CardSeparator.tsx';
import SelectComponent from '../components/SelectComponent.tsx';
import CurrencyBadge from '../../../general_components/currencyBadge/CurrencyBadge.tsx';
import { useFetch } from '../../../hooks/useFetch.tsx';
import {
  CategoriesType,
  CategoryType,
  ExpenseAccountsType,
} from '../../../types/types.ts';
import { url_accounts, url_categories } from '../../../endpoints.ts';
import FormPlusBtn from '../../../general_components/formSubmitBtn/FormPlusBtn.tsx';
import { useLocation } from 'react-router-dom';
import { currencyFormat, numberFormat } from '../../../helpers/functions.ts';

// import CardNote from '../components/CardNote.tsx';
// import FormSubmitBtn from '../../../general_components/formSubmitBtn/FormSubmitBtn.tsx';

// import { numberFormat } from '../../../helpers/functions.ts';

//------------------------------

function Expense() {
  //temporary values

  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  const formatNumberCountry = currencyOptions[defaultCurrency];
  console.log('', { formatNumberCountry });

  //----Expense account Options Temporary values----------
  const router = useLocation();
  const trackerState = router.pathname.split('/')[2];
  console.log({ trackerState });

  //account options
  const { data, error: fetchedError } =
    useFetch<ExpenseAccountsType>(url_accounts);

  const optionsExpenseAccounts = data?.accounts?.length
    ? data.accounts.map((acc, _) => ({
        value: acc.name,
        label: acc.name,
      }))
    : [
        { value: 'acc.name_01', label: 'acc.name_01' },
        { value: 'acc.name_02', label: 'acc.name_02' },
        { value: 'acc.name_03', label: 'acc.name_03' },
      ];

  const accountOptions = {
    title: 'Available Account',
    options: optionsExpenseAccounts,
  };

  //--------
  const { data: categories } = useFetch<CategoriesType>(url_categories);

  const optionsExpenseCategories = !fetchedError
    ? categories?.categories?.map((cat: CategoryType) => ({
        value: cat.name,
        label: cat.name,
      }))
    : null;

  const categoryOptions = {
    title:
      optionsExpenseCategories && !fetchedError
        ? 'Category / Subategory'
        : 'No Categories available',
    options: optionsExpenseCategories ?? [
      { value: 'category_01', label: 'Category_01 / SubCategory X' },
      { value: 'category_02', label: 'Category_02 / SubCategory X' },
      { value: 'category_03', label: 'Category_03 / SubCategory X' },
    ],
  };

  //-----------------
  //input expense data state variables
  type ExpenseDataType = {
    amount: number | string | undefined;
    account: string;
    category: string;
    note: string;
    currency: string;
  };

  const initialExpenseData: ExpenseDataType = {
    amount: undefined,
    account: '',
    category: '',
    note: '',
    currency: 'usd',
  };

  //---states-------------
  const [expenseData, setExpenseData] = useState(initialExpenseData);
  const [currency, setCurrency] = useState<'usd' | 'cop'>(defaultCurrency);

  // const [validationMessages, setValidationMessages] = useState<{
  //   [key: string]: string;
  // }>({});

  //-----useEffect--------
  useEffect(() => {
    setExpenseData((prev) => ({ ...prev, currency: currency }));
  }, [currency]);

  //----functions--------

  function updateDataCurrency(currency: string) {
    setExpenseData((prev) => ({ ...prev, currency: currency }));
  }

  function updateTrackerData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.preventDefault();

    setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(
      'updateTrackerData:',
      { [e.target.name]: e.target.value },
      currency
    );
  }

  // function inputTrackDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
  //   e.preventDefault();
  //   setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // }

  // function textareaTrackDataHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
  //   e.preventDefault();
  //   setExpenseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // }

  function onSaveHandler() {
    console.log('On Save Handler');

    console.log({ expenseData }); //aqui amount esta como numero

    const formattedNumber = numberFormat(expenseData.amount || 0);
    setExpenseData((prev) => ({ ...prev, amount: formattedNumber })); //se carga en state como string, obedeciendo el formato, pero error de typescript

    console.log(
      'num formato string:',
      { formattedNumber },
      typeof formattedNumber
    );

    //do the POST to the endpoint:

    //reset
    setExpenseData(initialExpenseData);
    setCurrency(defaultCurrency);
  }

  //--------------------------

  return (
    <>
      <article className='expense' style={{ color: 'inherit' }}>
        {/* start of top */}
        <div className='state__card--top'>
          <div className='card--title'>Amount</div>

          <div className='card__screen'>
            <input
              className='inputNumber'
              name='amount'
              type='number'
              placeholder={`${trackerState}s`}
              // value={numberFormat(
              //   Number(expenseData?.amount) || 0
              // )}

              value={Number(expenseData?.amount) || ''}
              onChange={updateTrackerData}
            />

            <CurrencyBadge
              variant={'tracker'}
              updateOutsideCurrencyData={updateDataCurrency}
            />
          </div>

          <div className='card--title'>Account</div>
          <SelectComponent
            dropDownOptions={accountOptions}
            setSelectState={setExpenseData}
            optionKeySelected='account'
          />
        </div>
        {/* end of top */}

        <CardSeparator />

        {/*start of bottom */}
        <div className='state__card--bottom'>
          <div className='card--title card--title--top'>Category</div>
          <SelectComponent
            dropDownOptions={categoryOptions}
            setSelectState={setExpenseData}
            optionKeySelected='category'
          />

          {/* APLICAR DEBOUNCE A INPUT Y TEXTAREA*/}

          <div className='card--title'>Note</div>
          {/* <CardNote dataHandler={textareaTrackDataHandler} note={expenseData.note}/> */}

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
                value={expenseData.note}
              />
            </div>

            <FormPlusBtn onClickHandler={onSaveHandler} />
          </div>
          {/* end of bottom */}
        </div>

        {/* <FormSubmitBtn
          // btnTitle={'save'}
          onClickHandler={onSaveHandler}
        >
          {'save'}
        </FormSubmitBtn> */}
      </article>
    </>
  );
}

export default Expense;
