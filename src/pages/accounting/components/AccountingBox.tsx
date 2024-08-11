//-------AccountingBox---------
//Parent:

import { currencyFormat } from '../../../helpers/functions';

// import { currencyFormat } from '../../../helpers/functions';
type AccountingBoxPropType = {
  title: string;
  amount: number;
};

export function AccountingBox({ title, amount }: AccountingBoxPropType) {
  return (
    <div className='accountingBox__container flex-col-sb'>
      {/* <input type="text" className="balance" /> */}
      <div className='accountingBox__title'>{title}</div>

      <div className='bubble light  '>
        <div className='bubble--result dark'>
          {currencyFormat('usd', amount, 'en-US')}
        </div>
      </div>
    </div>
  );
}

//------------------

export default AccountingBox;
