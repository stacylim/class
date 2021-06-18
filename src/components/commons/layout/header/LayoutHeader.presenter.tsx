import { useContext } from "react";
import Layout, { LayoutContext } from "../index";
// import { GlobalContext } from "../index";
const LayoutHeaderUI = () => {
  const { test } = useContext(LayoutContext);

  // const { userInfo } = useContext(GlobalContext);
  //글로벌 컨텍스트이기에 이 한줄이면 어디서든 정보를 뽑아쓸수있다.

  // useContext(Layout);

  return (
    <div>
      {/* <div>이메일: {userInfo.email}</div>
      <div>이름:{userInfo.name}</div>;
      <div>포인트:{userInfo.usePoint.amount} </div> */}
    </div>
  );
};

export default LayoutHeaderUI;
