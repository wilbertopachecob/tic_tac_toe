import css from "./Square.module.scss";
import { boundClassNames } from "utilities";

const Square = ({ value, onChange }) => {
  return (
    <div
      className={boundClassNames("col-4", css["square"])}
      onClick={() => onChange()}
    >
      {value}
    </div>
  );
};

export default Square;
