import {
  BoxRow,
  StatusSquare,
} from '../../../general_components/boxComponents.tsx';
import { currencyFormat } from '../../../helpers/functions.ts';
import { CurrencyType, StatusType } from '../../../types/types.ts';
// import { useFetch } from '../../../hooks/useFetch.tsx';

export type CategoriesToRenderType = {
  categoryName: string;
  spent: number;
  status: number;
  budget: number;
  currency?: CurrencyType;
  category_id?: number;
};

const defaultCategoryBudget: CategoriesToRenderType[] = [
  {
    categoryName: 'Category Name 1',
    spent: Math.random() * 100,
    status: Math.floor((Math.random() - 0.5) * 100),
    budget: Math.random() * 100,
    currency: 'usd',
    category_id: Math.round(Math.floor(Math.random() * 100)),
  },
  {
    categoryName: 'Category Name 2',
    spent: Math.random() * 100,
    status: Math.floor((Math.random() - 0.5) * 100),
    budget: Math.random() * 100,
    currency: 'cop',
    category_id: Math.round(Math.floor(Math.random() * 100)),
  },
  {
    categoryName: 'Category Name 3',
    spent: Math.random() * 100,
    status: Math.floor((Math.random() - 0.5) * 100),
    budget: Math.random() * 100,
    currency: 'eur',
    category_id: Math.round(Math.floor(Math.random() * 100)),
  },
  {
    categoryName: 'Category Name 4',
    spent: Math.random() * 100,
    status: Math.floor((Math.random() - 0.5) * 100),
    budget: Math.random() * 100,
    currency: 'cop',
    category_id: Math.round(Math.floor(Math.random() * 100)),
  },
];

function ListCategory() {
  //List Category
  //DATA FETCHING
  //const{ data, isLoading, error } = useFetch<BudgetsType>(url_categories_budget);//Data Fetching //Este endpoint no existe
  let data: CategoriesToRenderType[] = [],
    isLoading = false,
    error = null;
  // en el backend: generar la data segun estructura de los datos a renderizar, es decir,
  //agrupar para cada caategoria los expense y el budget, la sumatoria de los expense se refleja en el spent, y la sumatoria de los budget de c/cat seria el budget por categoria,  y el status seria el resultado de la resta entre el budget - expense de cada categoria, o si se prefiere reflejar el status de una vez.
  //no se esta claro, si los valores o informacion se obtendra de los movimientos de expense realizados en cada categoria.

  const budgetList: CategoriesToRenderType[] =
    data && !isLoading && !error && data.length>0
      ? data.map((catBudget) => {
          const { categoryName, spent, status, budget } = catBudget;

          return {
            categoryName,
            spent,
            status,
            budget,
          };
        })
      : defaultCategoryBudget;

  //functions
  function onCategoryHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();

    console.log('budget and category movements', e.currentTarget); // creo que deberia incluir la fecha en el reporte
  }

  return (
    <>
      {/*LIST CATEGORY  */}

      <article className='list__main__container'>
        {budgetList.map((category, indx) => {
          const { categoryName, spent, budget, currency } = category;

          return (
            <div className='box__container .flx-row-sb' key={indx}>
              <BoxRow>
                <div
                  id={categoryName} //or category_id taken from data base
                  className='box__title box__title--category__name '
                  onClick={(e) => onCategoryHandler(e)}
                >
                  {categoryName}{' '}
                </div>

                <div className='box__title--spent'>
                  spent: {currencyFormat(currency, spent, 'en-US')}{' '}
                </div>
              </BoxRow>

              <BoxRow>
                <BoxRow>
                  <div className='flx-row-sb'>
                    <StatusSquare alert={budget - spent <= 0 ? 'alert' : ''} />
                    <div className='box__subtitle'>
                      {/* {'status:'} {status}{' '} */}
                      &nbsp;{'status:'}{' '}
                      {currencyFormat(currency, budget - spent, 'en-US')}{' '}
                    </div>
                  </div>
                </BoxRow>
                <div className='box__subtitle'>
                  budget: {currencyFormat(currency, budget, 'en-US')}{' '}
                </div>
              </BoxRow>
            </div>
          );
        })}
      </article>
    </>
  );
}

export default ListCategory;
