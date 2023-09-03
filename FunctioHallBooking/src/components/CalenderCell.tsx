import { add, formatISO, getTime } from "date-fns";

interface Props extends React.PropsWithChildren {
  display: number | String;
  disabled?: boolean;
  startdate: Date;
  booking?: Array<String>;
  setmodal?: React.Dispatch<React.SetStateAction<boolean>>;
  setbookingDate?: React.Dispatch<React.SetStateAction<string>>;
  index: number;
}

const CalenderCell: React.FC<Props> = ({
  display,
  setbookingDate,
  setmodal,
  disabled,
  index,
  startdate,
  booking,
}) => {
  let classname:string = "";
  let date:Date = add(startdate, { days: index });
  let timeStamp:String = getTime(date).toString();
  if (disabled === undefined)
    if (date > new Date()) {
      if (booking && booking.includes(timeStamp)) {
        classname = "btn btn-danger m-1 rounded-2";
        disabled = true;
      } else {
        classname = "btn btn-outline-dark m-1 rounded-2";
        disabled = false;
      }
    } else {
      classname = " btn btn-secondary m-1 rounded-2";
      disabled = true;
    }

  return (
    <>
      <button
        type="button"
        className={classname == "" ? "btn btn-dark rounded-2 m-1" : classname}
        disabled={disabled}
        onClick={() => {
          setbookingDate && setbookingDate(formatISO(date) || "");
          setmodal && setmodal(true);
        }}
      >
        {display}
      </button>
    </>
  );
};

export default CalenderCell;
