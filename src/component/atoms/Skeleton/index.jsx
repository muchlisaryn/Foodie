import Skeletons from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Skeleton({
  height,
  style,
  width,
  count,
  className,
  wrapper,
}) {
  return (
    <Skeletons
      height={height}
      style={style}
      width={width}
      count={count}
      className={className}
      wrapper={wrapper}
    />
  );
}
