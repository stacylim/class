import PresenterPage from "./presenter";
import { useCallback, useMemo, useState } from "react";

const ContainerPage = () => {
  console.log("컨테이너(부모) 렌더링됨");

  //   let useMemoTest = useMemo(() => Math.random(), []);
  //   console.log("useMemoTest:", useMemoTest);

  let countLet = 0;

  const onClickCountLet = () => {
    console.log(countLet);
    countLet += 1;
  };

  const [countState, setCountState] = useState(0);
  const [aaa, setAaa] = useState("qq");

  const onClickCountState = useCallback(() => {
    setCountState((prev) => prev + 1);
  }, []);

  //   const onClickMove = useCallback(() => {
  //     router.push("./login");
  //   }, []);

  //   const onClickCountState = () => {
  //     console.log(countState);
  //     setCountState((prev) => prev + 1);
  //   };

  return (
    <>
      <div>countLet: {countLet} </div>
      <button onClick={onClickCountLet}> countLet + 1</button>
      <div> countState: {countState}</div>
      <button> onClick={onClickCountState}countState +1 </button>
      <div> 컨테이너(부모) 입니다</div>;
      <PresenterPage onClickCountState={onClickCountState} />
    </>
  );
};

export default ContainerPage;
