import { useRouter } from "next/router";

//회원 비회원 둘다 볼수 있는 페이지
const TokenTest1Page = () => {
  const router = useRouter();

  const onClickMove = () => {
    router.push("/tokentest/tokentest2");
  };
  return <button onClick={onClickMove}>회원전용 페이지로 이동하기</button>;
};

export default TokenTest1Page;

//로그아웃은 액세스 토큰을 없애주면 된다.
