import { gql, useMutation, useApolloClient } from "@apollo/client";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "../_app";

const LOGIN_USER_EXAMPLE = gql`
  mutation loginUserExample($email: String!, $password: String!) {
    loginUserExample(email: $email, password: $password) {
      accessToken
    }
  }
`;

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
      userPoint {
        amount
      }
    }
  }
`;

const LoginPage = () => {
  const router = useRouter();
  const { setAccessToken } = useContext(GlobalContext);

  const [loginUserExample] = useMutation(LOGIN_USER_EXAMPLE);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const client = useApolloClient();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onClickLogin = async (event) => {
    event.preventDefault();
    //위에서 중요한 $를 찾아서 넣어준다.
    try {
      const { data } = await loginUserExample({
        variables: { email, password },
      });
      setAccessToken(data?.loginUserExample.accessToken);

      const userInfo = await client.query({
        query: FETCH_USER_LOGGED_IN,
        context: {
          headers: { authorization: data?.loginUserExample.accessToken },
        },
      });

      setUserInfo(userInfo.data.fetchUserLoggedIn);

      // router.push("/tokentest/tokentest2");
      // console.log(data?.loginUserExample.accessToken);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form>
      이메일: <input type="text" onChange={onChangeEmail} /> <br />
      비밀번호:{" "}
      <input
        type="password"
        autoComplete="on"
        onChange={onChangePassword}
      />{" "}
      <br />
      <button onClick={onClickLogin}>로그인하기</button>
    </form>
  );
};

export default LoginPage;
