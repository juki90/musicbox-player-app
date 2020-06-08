import React, { Ref, RefObject, MutableRefObject } from "react";

interface DividerProps {
  className: string;
  id: string;
}

const Divider: React.FC<DividerProps> = ({ id, className }) => {
  return <div id={id} className={className}></div>;
};

export default Divider;
