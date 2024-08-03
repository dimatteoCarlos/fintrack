import DisplayScreenNumber from '../../components/header/displayScreen/displayScreenNumber/DisplayScreenNumber';
import { currencyFormat } from '../../helpers/functions';
import {
  BigBoxResult,
  BoxRow,
  BudgetCardTitle,
  BudgetPresentation,
  CardTilePocket,
  OpenAddEditBtn,
  PocketLeftTile,
  PocketRightTile,
  StatusBoxContainer,
  StatusSquare,
  TitleHeader,
} from './budgetComponents/BudgetComponents';

function BudgetLayout() {
  //temporary values------------
  const currencyOptions = { usd: 'en-US', cop: 'cop-CO', eur: 'en-US' };
  const defaultCurrency = 'usd';
  const formatNumberCountry = currencyOptions[defaultCurrency];
  const resultAmount = 0;
  const remaining = 0;

  //Temporarily Dummy data
  const categories = [
    {
      categoryName: 'Category Name',
      spent: 'spent',
      statusTitle: 'status',
      budget: 'budget',
    },
    {
      categoryName: 'Category Name',
      spent: 'spent',
      statusTitle: 'status',
      budget: 'budget',
    },
    {
      categoryName: 'Category Name',
      spent: 'spent',
      statusTitle: 'status',
      budget: 'budget',
    },
    {
      categoryName: 'Category Name',
      spent: 'spent',
      statusTitle: 'status',
      budget: 'budget',
    },
  ];

  const { categoryName, spent, statusTitle, budget } = categories[0];

  const pockets = [
    {
      name: 'Name',
      description: 'Description',
      saved: 'Saved',
      goal: '/Goal',
    },
    {
      name: 'Name',
      description: 'Description',
      saved: 'Saved',
      goal: '/Goal',
    },
    {
      name: 'Name',
      description: 'Description',
      saved: 'Saved',
      goal: '/Goal',
    },
    {
      name: 'Name',
      description: 'Description',
      saved: 'Saved',
      goal: '/Goal',
    },
  ];

  const { name, description, saved, goal } = pockets[0];

  return (
    <>
      <div className='budgetLayout'>
        <div className='layout__header'>
          <div className='headerContent__container'>
            <TitleHeader></TitleHeader>
          </div>
        </div>
        <BigBoxResult>
          <div className='total__amount'>
            {currencyFormat(defaultCurrency, resultAmount, formatNumberCountry)}
            {}
          </div>

          <DisplayScreenNumber
            amount={remaining}
            chosenCurrency={defaultCurrency}
            countryCurrency={formatNumberCountry}
            titleConcept='Remaining'
          />
        </BigBoxResult>
        {/*  */}

        <BudgetPresentation>
        <BudgetCardTitle>Category List</BudgetCardTitle>
        {/*  */}
        <StatusBoxContainer>
          <BoxRow>
            <div className='box__title'>{categoryName} </div>
            <div className='box__title'>{spent} </div>
          </BoxRow>
          <BoxRow>
            <BoxRow>
              <div className='row-flx-sb'>
                <StatusSquare />
                <div className='box__subtitle'>{statusTitle} </div>
              </div>
            </BoxRow>
            <div className='box__subtitle'>{budget} </div>
          </BoxRow>
        </StatusBoxContainer>

        <OpenAddEditBtn>
          <div className='open__btn__label'>New Category</div>
        </OpenAddEditBtn>

        <BudgetCardTitle>Pockets</BudgetCardTitle>

        <CardTilePocket>
          <PocketLeftTile>
            <div className='tile__title'>{name}</div>
            <div className='tile__subtitle'>{description}</div>
          </PocketLeftTile>

          <PocketRightTile>
            <div className='tile__title'>{saved}</div>
            <div className='tile__subtitle row-flx-sb'>
              {goal} <StatusSquare />
            </div>
          </PocketRightTile>
        </CardTilePocket>

        <OpenAddEditBtn>
          <div className='open__btn__label'>New Pocket</div>
        </OpenAddEditBtn>
        </BudgetPresentation>

      </div>
    </>
  );
}

export default BudgetLayout;
