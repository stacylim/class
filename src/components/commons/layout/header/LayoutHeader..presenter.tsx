import { useContext } from "react";
import Layout, { LayoutContext } from "../index";
const LayoutHeaderUI = () => {
  const { test } = useContext(LayoutContext);
  useContext(Layout);

  return <div>헤더영역:{test}</div>;
};

export default LayoutHeaderUI;
