import React from 'react';
import { StatusSquare } from './VariousComponents';

function ListPocket() {
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

  return (
    <article className='list__main__container'>
      {pockets.map((pocket, indx) => {
        const { name, description, saved, goal } = pocket;
        return (
          <div
            className='card__tile__pocket line__container '
            key={`pockect-${indx}`}
          >
            {/* <CardTilePocket key={`pockect-${indx}`}> */}
            {/* <PocketLeftTile> */}
            <div className='tile__left'>
              <div className='tile__title'>{name}</div>
              <div className='tile__subtitle'>{description}</div>
            </div>
            {/* </PocketLeftTile> */}

            {/* <PocketRightTile> */}
            <div className='tile__right'>
              <div className='tile__title'>{saved}</div>
              <div className='tile__subtitle flx-row-sb'>
                {goal} <StatusSquare />
              </div>
            </div>
            {/* </PocketRightTile> */}
            {/* </CardTilePocket> */}
          </div>
        );
      })}
    </article>
  );
}

export default ListPocket;
