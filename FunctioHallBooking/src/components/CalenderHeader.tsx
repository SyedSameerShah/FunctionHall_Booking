interface props extends React.PropsWithChildren{
    display:String;
    grid?:object;
    disabled?:boolean;
    onclick:() => void;
}

const CalenderHeader: React.FC<props> = (
    {
        display,
        disabled,
        grid,
        onclick
    }
) => {

    return (
        <>
        <button  type="button" className="btn btn-outline-dark text-center m-1" disabled={disabled || false}  style={grid} onClick={()=>{onclick();console.log("next")}}>
            {display}
        </button>
        </>
      )
}

export default CalenderHeader;