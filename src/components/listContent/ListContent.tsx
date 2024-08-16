import { BoxContainer, BoxRow } from '../boxComponents';

export type ListContenPropType = {
  lastMovements: {
    categoryName: string;
    record: string;
    description: string;
    date: Date;
  }[];
  // lastMovements: { [key: string]: string | number | Date }[];
};

function ListContent({ lastMovements }: ListContenPropType) {
  return (
    <>
      <div className='list__main__container'>
        {lastMovements.map((movement, indx) => {
          const { categoryName, record, description, date } = movement;
          console.log(typeof date);

          return (
            <BoxContainer key={indx}>
              <BoxRow>
                <div className='box__title'>{`${categoryName}`} </div>
                <div className='box__title'>
                  {`${record}`}
                  {/* {currencyFormat(
                        defaultCurrency,
                        amount,
                        formatNumberCountry
                      )} */}
                </div>
              </BoxRow>
              <BoxRow>
                <BoxRow>
                  <div className='flx-row-sb'>
                    <div className='box__subtitle'> {`${description}`} </div>
                  </div>
                </BoxRow>
                <div className='box__subtitle'>
                  {/* {new Date(date).toDateString()} */}
                  {`${new Intl.DateTimeFormat('es-ES').format(new Date(date))}`}
                </div>
              </BoxRow>
            </BoxContainer>
          );
        })}
      </div>
    </>
  );
}

export default ListContent;
