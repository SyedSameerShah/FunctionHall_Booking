interface props extends React.PropsWithChildren {
  display: String;
  grid?: object;
  disabled?: boolean;
  onclick?: () => void;
}

const CalenderHeader: React.FC<props> = ({
  display,
  disabled,
  grid,
  onclick,
}) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-dark text-center m-1 px-0"
        disabled={disabled || false}
        style={grid}
        onClick={() => {
          onclick &&  onclick();
        }}
      >
        {display}
      </button>
    </>
  );
};

export default CalenderHeader;
