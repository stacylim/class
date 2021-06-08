//회원만 볼 수 있는 페이지
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../_app";
import { useQuery } from "@apollo/client";

const TokenTest2Page = () => {
  const { data } = useQuery(FETCH_USEDITEMS);
  console.log("data", data);

  //권한체크, 액세스토큰없으면 로그인페이지로 보내버림

  const onClickMove = () => {
    router.push("/tokentest/tokentest1");
  };

  return <button onClick={onClickMove}>전체공개 페이지로 이동하기</button>;
};

export default withAuth(TokenTest2Page);
