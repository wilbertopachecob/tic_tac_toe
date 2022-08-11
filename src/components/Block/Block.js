import css from "./Block.module.scss";
import { boundClassNames } from "utilities";

const Block = ({ value, onChange }) => {
  return (
    <div
      className={boundClassNames("col-4", css["block"])}
      onClick={() => onChange()}
    >
      {value}
    </div>
  );
};

export default Block;
