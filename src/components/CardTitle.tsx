

//applied styles : generalStyles.css
type ChildrenPropType = { children: React.ReactNode };

//-----CardTitle---------------
export function CardTitle({ children }: ChildrenPropType) {
  return <div className='presentation__card--title'>{children} </div>;
}