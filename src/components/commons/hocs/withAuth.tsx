import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../../../pages/_app";

export default function withAuth(Component) {
  //컴포넌트

  return function aaa() {
    const router = useRouter();
    const { accessToken } = useContext(GlobalContext);

    //토큰체크;
    useEffect(() => {
      if (!accessToken) router.push("/login");
    }, []);

    if (!accessToken) return <></>;
    return <Component {...props} />; //컴포넌트 리턴
  };
}
