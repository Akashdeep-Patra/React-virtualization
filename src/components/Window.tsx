import { throttle } from "lodash";
import React from "react";
import useElementSize from "../hooks/useElementSize";
import "./styles.scss";
export interface WindowProps {
  rowHeight: number;
  children: Array<JSX.Element>;
  gap?: number;
  isVirtualizationEnabled?: boolean;
}
const bufferedItems = 2;

const Window: React.FC<WindowProps> = ({
  rowHeight,
  children,
  gap = 10,
  isVirtualizationEnabled = true
}) => {
  const [containerRef, { height: containerHeight }] = useElementSize<
    HTMLUListElement
  >();
  const [scrollPosition, setScrollPosition] = React.useState(0);

  // get the children to be renderd
  const visibleChildren = React.useMemo(() => {
    if (!isVirtualizationEnabled)
      return children.map((child, index) =>
        React.cloneElement(child, {
          style: {
            position: "absolute",
            top: index * rowHeight + index * gap,
            height: rowHeight,
            left: 0,
            right: 0,
            lineHeight: `${rowHeight}px`
          }
        })
      );
    const startIndex = Math.max(
      Math.floor(scrollPosition / rowHeight) - bufferedItems,
      0
    );
    const endIndex = Math.min(
      Math.ceil((scrollPosition + containerHeight) / rowHeight - 1) +
        bufferedItems,
      children.length - 1
    );

    return children.slice(startIndex, endIndex + 1).map((child, index) =>
      React.cloneElement(child, {
        style: {
          position: "absolute",
          top: (startIndex + index) * rowHeight + index * gap,
          height: rowHeight,
          left: 0,
          right: 0,
          lineHeight: `${rowHeight}px`
        }
      })
    );
  }, [
    children,
    containerHeight,
    rowHeight,
    scrollPosition,
    gap,
    isVirtualizationEnabled
  ]);

  const onScroll = React.useMemo(
    () =>
      throttle(
        function (e: any) {
          setScrollPosition(e.target.scrollTop);
        },
        50,
        { leading: false }
      ),
    []
  );

  return (
    <ul
      onScroll={onScroll}
      style={{
        overflowY: "scroll",
        position: "relative"
      }}
      ref={containerRef}
      className="container"
    >
      {visibleChildren}
    </ul>
  );
};

export default Window;
