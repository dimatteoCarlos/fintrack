//-------DebtsBigBoxResult---------
//Parent:DebtsLayout.tsx

type BigBoxResultPropType = {
  bigScreenInfo: { title: string; amount: number }[];
};

import { currencyFormat } from '../../../helpers/functions';
export function DebtsBigBoxResult({ bigScreenInfo }: BigBoxResultPropType) {
  return (
    <div className='bigBox__container flex-col-sb'>
      <div className='bigBox__mainInfo'>
        {bigScreenInfo[0].title.toUpperCase()}
      </div>

      <div className='displayScreen dark flex-row-sb'>
        <div className='displayScreen--concept light'>{'total'}</div>
        <div className='displayScreen--result light'>
          {currencyFormat('usd', bigScreenInfo[0].amount, 'en-US')}
        </div>
      </div>
    </div>
  );
}

//------------------

export default DebtsBigBoxResult;
