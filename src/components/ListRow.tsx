import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useContext,
  CSSProperties
} from "react";
import cx from "classnames";
import { DynamicListContext } from "./List";

interface Props {
  index: number;
  width: number;
  data: Array<string>;
  style: CSSProperties;
  onExpand: Function;
}

const ListRow = ({ index, width, data, style, onExpand }: Props) => {
  const { setSize } = useContext(DynamicListContext);

  const rowRoot = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (rowRoot.current) {
      // console.info(`Updated ListRow @index: ${index}`);
      setSize && setSize(index, rowRoot.current.getBoundingClientRect().height);
    }
  }, [index, setSize, width]);

  return (
    <div style={style}>
      <div
        ref={rowRoot}
        className={cx(
          index % 2 ? "bg-white" : "bg-gray-200",
          "py-4 text-sm leading-5 font-medium text-gray-900"
        )}
        style={{ display: "flex" }}
      >
        <span style={{ display: "block", marginLeft: "15px" }}>
          {data[index]}
        </span>
        <button style={{ display: "block" }} onClick={() => onExpand(index)}>
          展開...
        </button>
      </div>
    </div>
  );
};

export default ListRow;
