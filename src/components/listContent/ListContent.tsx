import { BoxContainer, BoxRow } from '../boxComponents';

export type ListContenPropType = {
  listOfItems: {
    categoryName: string;
    record: string;
    description: string;
    date: Date | string | number | undefined | null;
  }[];
  // listOfItems: { [key: string]: string | number | Date }[];
};

function ListContent({ listOfItems }: ListContenPropType) {
  function isDateValid(dateStr: any) {
    return !isNaN(new Date(dateStr));
  }
  return (
    <>
      <div className='list__main__container'>
        {listOfItems.map((item, indx) => {
          const { categoryName, record, description, date } = item;

          return (
            <BoxContainer key={indx}>
              <BoxRow>
                <div className='box__title'>{`${categoryName}`} </div>
                <div className='box__title'>{`${record}`}</div>
              </BoxRow>
              <BoxRow>
                <BoxRow>
                  <div className='flx-row-sb'>
                    <div className='box__subtitle'> {`${description}`} </div>
                  </div>
                </BoxRow>

                {!!date && isDateValid(date) && (
                  <div className='box__subtitle'>
                    {`${new Intl.DateTimeFormat('es-ES').format(
                      new Date(date)
                    )}`}
                  </div>
                )}
              </BoxRow>
            </BoxContainer>
          );
        })}
      </div>
    </>
  );
}

export default ListContent;
