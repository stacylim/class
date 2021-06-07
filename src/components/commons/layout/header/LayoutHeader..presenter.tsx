import { useContext } from "react";
import { LayoutContext } from "../index";
const LayoutHeaderUI = () => {
  const { text } = useContext(LayoutContext);
  useContext(Layout);

  return <div>헤더영역:{test}</div>;
};

export default LayoutHeaderUI;
