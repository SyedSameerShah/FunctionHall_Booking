interface Props extends React.PropsWithChildren {
  display: number | String;
  date?:String;
  disabled: boolean;
  classname?:string;
  setmodal?: React.Dispatch<React.SetStateAction<boolean>>
  setbookingDate?: React.Dispatch<React.SetStateAction<String>>
  onClick?: () => void;
}

const CalenderCell : React.FC<Props> = ({
    display,
    disabled,
    setbookingDate,
    setmodal,
    date
  }) => 
  { 
  
  return (
    <>
    <button  type="button" className={ disabled ? " btn btn-secondary m-1 rounded-2": "btn btn-outline-dark m-1  rounded-2" } disabled={disabled} 
     onClick={()=>{
      setbookingDate && setbookingDate( date || "" );
      setmodal && setmodal(true);
     }} >
      {display}
    </button>
    
    </>
  )

}

export default CalenderCell;