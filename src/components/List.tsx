import React, {
  useState,
  useMemo,
  useRef,
  createContext,
  useEffect
} from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList } from "react-window";
import ListRow from "./ListRow";
import faker from "faker";

export const DynamicListContext = createContext<
  Partial<{ setSize: (index: number, size: number) => void }>
>({});

const genItems = (size: number) => {
  return [
    "001 123",
    "002 Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic 002Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic",
    "003 Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic",
    "004 Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar hapticFreeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar hapticFreeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic",
    "005Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic",
    "006Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic",
    "007Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic",
    "008Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic",
    "009Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic",
    "010Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic",
    "011Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic",
    "012Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic",
    "013Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic",
    "014Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic",
    "015Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic",
    "016Freeway Innovative Extended cyan Riyal Account Islands open-source Movies auxiliary AI Exclusive Dollar haptic"
  ];
};

const List = () => {
  const [expanded, setExpanded] = useState<Array<number>>([]);

  const mockListItems = genItems(100);

  const listRef = useRef<VariableSizeList | null>(null);

  const sizeMap = React.useRef<{ [key: string]: number }>({});

  const setSize = React.useCallback((index: number, size: number) => {
    // Performance: Only update the sizeMap and reset cache if an actual value changed
    if (sizeMap.current[index] !== size) {
      sizeMap.current = { ...sizeMap.current, [index]: size };
      if (listRef.current) {
        // Clear cached data and rerender
        listRef.current.resetAfterIndex(0);
      }
    }
  }, []);

  useEffect(() => {
    if (listRef.current) {
      // Clear cached data and rerender
      listRef.current.resetAfterIndex(0);
    }
  }, [expanded]);

  const getMemorizedGetSize = useMemo(() => {
    const func = (index: number): number => {
      return expanded.some((expandIdx) => expandIdx === index)
        ? sizeMap.current[index]
        : 36;
    };
    return func;
  }, [expanded]);

  // Increases accuracy by calculating an average row height
  // Fixes the scrollbar behaviour described here: https://github.com/bvaughn/react-window/issues/408
  const calcEstimatedSize = React.useCallback(() => {
    const keys = Object.keys(sizeMap.current);
    const estimatedHeight = keys.reduce((p, i) => p + sizeMap.current[i], 0);
    return estimatedHeight / keys.length;
  }, []);

  return (
    <DynamicListContext.Provider value={{ setSize }}>
      <VariableSizeList
        ref={listRef}
        width={500}
        height={600}
        itemData={mockListItems}
        itemCount={mockListItems.length}
        itemSize={getMemorizedGetSize}
        overscanCount={4}
        // See notes at calcEstimatedSize
        estimatedItemSize={calcEstimatedSize()}
      >
        {({ ...props }) => (
          <ListRow
            {...props}
            width={500}
            onExpand={(idx: number) => {
              const newExpanded = [...expanded];
              const isExist = newExpanded.some(
                (expandIdx) => expandIdx === idx
              );
              if (!isExist) {
                setExpanded(newExpanded.concat([idx]));
              } else {
                newExpanded.splice(
                  newExpanded.findIndex((nExpandIdx) => nExpandIdx === idx),
                  1
                );
                setExpanded(newExpanded);
              }
            }}
          />
        )}
      </VariableSizeList>
    </DynamicListContext.Provider>
  );
};

export default List;
