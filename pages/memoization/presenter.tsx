import { memo } from "react";
const PresenterPage = ({ onClickCountState }) => {
  console.log("프레젠터(자식) 렌더링됨");
  return <div>프레젠터(자식) 입니다</div>;
};

export default memo(PresenterPage);
//다시 렌더링 될 필요가 없는 애들은 감싸주는 중
