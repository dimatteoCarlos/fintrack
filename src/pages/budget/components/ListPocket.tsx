//ListPocket.tsx

import { StatusSquare } from '../../../general_components/boxComponents';
import { DEFAULT_CURRENCY } from '../../../helpers/constants';
import {
  currencyFormat,
  numberFormatCurrency,
} from '../../../helpers/functions';
import { CurrencyType } from '../../../types/types';

// import { useFetch } from '../../../hooks/useFetch.tsx';

export type PocketsToRenderType = {
  pocketName: string;
  description: string;
  saved: number;
  goal: number;
  currency?: CurrencyType;
  status?: number;
};

const defaultPocketList: PocketsToRenderType[] = [
  {
    pocketName: 'Name Pocket 01',
    description: 'Description 01',
    saved: Math.random() * 100,
    goal: Math.random() * 100,
    status: Math.floor((Math.random() - 0.5) * 100),
  },
  {
    pocketName: 'Name Pocket 02',
    description: 'Description 02',
    saved: 99,
    goal: 100,
    currency: 'cop',
  },
  {
    pocketName: 'Name Pocket 03',
    description: 'Description 03',
    saved: 500,
    goal: 98,
    currency: 'eur',
  },
  {
    pocketName: 'Name Pocket 04',
    description: 'Description 04',
    saved: Math.random() * 100,
    goal: Math.random() * 100,
    currency: 'eur',
  },
];

function ListPocket() {
  //List Pocket
  //DATA FETCHING
  //const{ data, isLoading, error } = useFetch<PokcketsType>(url_budget_pocket);//Data Fetching //Este endpoint no existe

  //temporary values
  let data: PocketsToRenderType[] = [],
    isLoading = false,
    error = null;

  const pocketList: PocketsToRenderType[] =
    !isLoading && !error && data?.length
      ? data.map(({ pocketName, description, saved, goal, currency }) => ({
          pocketName,
          description,
          saved,
          goal,
          currency,
        }))
      : defaultPocketList;

  // en el backend: generar la data segun estructura de los datos a renderizar, es decir,
  //agrupar para cada pocket el saved y el goal, de cada uno de los movimientos almacenados, la sumatoria de saved se refleja en el saved, ,  y el status seria el resultado de la resta entre el budget - expense de cada categoria, o si se prefiere reflejar el status de una vez, haciendo calculo en backend.
  //no estoy claro, si los valores o informacion se obtendra de los movimientos de expense realizados en cada categoria, seria desde backend.

  return (
    <article className='list__main__container'>
      {pocketList.map((pocket, indx) => {
        const { pocketName, description, saved, goal, currency } = pocket;
        return (
          <div
            className='card__tile__pocket line__container '
            key={`pockect-${indx}`}
          >
            {/* <PocketLeftTile> */}
            <div className='tile__left'>
              <div className='tile__title'>{pocketName}</div>
              <div className='tile__subtitle'>{description}</div>
            </div>

            {/* <PocketRightTile> */}
            <div className='tile__right'>
              <div className='tile__title'>
                saved:{' '}
                {currencyFormat(currency ?? DEFAULT_CURRENCY, saved, 'en-US')}
              </div>
              <div className='tile__subtitle flx-row-sb'>
                <span className='tile__subtitle tile__subtitle--opc'>
                  goal:{' '}
                  {/* {currencyFormat(currency ?? DEFAULT_CURRENCY, goal, 'en-US')}{' '} */}
                  {numberFormatCurrency(
                    goal,
                    0,
                    currency ?? DEFAULT_CURRENCY,
                    'en-US'
                  )}
                  &nbsp;
                </span>

                {/* {'definir regla de negocio, creo que lo ideal es que no haya diferencia entre los montos saved y goal'} */}
                <StatusSquare alert={saved - goal <= 0 ? 'alert' : ''} />
              </div>
            </div>
          </div>
        );
      })}
    </article>
  );
}

export default ListPocket;
