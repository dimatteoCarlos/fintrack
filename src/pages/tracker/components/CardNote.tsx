import { ChangeEvent } from 'react';

type CardNotePropType = {
  note: string;
  dataHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

function CardNote({ dataHandler, note }: CardNotePropType) {
  return (
    <>
      <div className='card--title'>{'Note'}</div>
      <div className='card__screen'>
        <textarea
          className='input__note__description'
          placeholder='Description'
          onChange={dataHandler}
          name='note'
          rows={3}
          maxLength={150}
          value={note}
        />
      </div>
    </>
  );
}

export default CardNote;
