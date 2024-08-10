type ChildrenPropType = { children: React.ReactNode };

//--------------------------------------------------------
export function SeeMore({ children }: ChildrenPropType) {
  function onClickHandler() {
    console.log('A button was clicked');
  }

  return (
    <div className='see_more'>
      <button onClick={onClickHandler}>{children}</button>
    </div>
  );
}
