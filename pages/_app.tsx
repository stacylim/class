import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";
import GlobalStyles from "../src/commons/styles/globalStyles";
import Layout from "../src/components/commons/layout";
import { createContext, forwardRef, useState } from "react";
import Link from "next/link";
import { GraphQLError } from "graphql";
import axios from "axios";
import Operation from "antd/lib/transfer/operation";
import Head from "next/head"; //이 안에 코드를 작성하면, 실제 html 안에서 헤드로 만들어준다.

//1
// const { data } = useQuery(FETCH_USER); //컴포넌트가 그려질때 자동실행

// //2
// const [aaa, { data }] = useLazyQuery(FETCH_USER); //내가 요청하고 싶을때 aaa() 이걸로 실행
// aaa();

// // //3
// const client = useApolloClient(); //내가 요청하고 싶을때

// const result = await client.query({ query: FETCH_USER }); // 이걸로 실행
// result.data.fetchUser; //유저정보 들어옴

export const GlobalContext = createContext({
  accessToken: "",
  setAccessToken: (_: string) => {},
  setUserInfo: (_: string) => {},
  userInfo: {},

  //   //있는데 안 쓰는 데이터 _ 언더바처리
  //   //여기에 넣어주면 어느 페이지에서든 정보를 뽑아서 쓸수있다.
});

function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState("");

  const [userInfo, setUserInfo] = useState({});

  //Apollo 세팅
  const uploadLink = createUploadLink({
    uri: "https://backend.codebootcamp/graphql",
    headers: { authorization: "Bearer ${accessToken}" },
    credentials: "include",
  });
  // // @ts-ignore
  //   const errorLink = onError(async ({graphQLErros, operation, forward})) => {
  //     if(graphQLErrors){
  //       for(let err of graphQLErrors) {
  //         if(err.extensions.code == "UNAUTHENTICATED"){
  //           //Unauthenticated 에러 (만료에러 )일때 토큰 재발급

  //           //Axios
  //           const response = axios.post(
  //             // "http://backend.codebootcamp.co.kr/graphql"
  //             "http://localhost:4000/graphql",
  //             {
  //            query: `
  //            mutation restoreAccessToken{
  //              restoreAccessToken{
  //               accessToken
  //              }
  //             }
  //            `
  //            {
  //               headers:{"Content-Type": 'application/json'},
  //               withCredentials: true
  // //Postman 에서도 실제 Builder - Post - Body 영역에서 실제로 날릴수 있다?
  // //쿠키를 백엔드 컴퓨터로 날려줘야함.
  //            }
  //           )
  //           const newAccessToken = response.data.data.restoreAccessToken.accessToken
  //           setAccessToken(newAccessToken)

  //           //재발급 받은 토큰으로 실패했떤 쿼리 다시 날리기
  //           //기존에 만료된 쿼리를 새쿼리로
  //           operation.setContext({
  //             headers: {
  //               ...operation.getcontext().headers,
  //               authorization: `Bearer ${newAccessToken}`
  //             }
  //           })
  //           return forwardRef(operation)
  //         }
  //      }
  //     }
  //    })

  const client = new ApolloClient({
    // @ts-ignore
    // uri: "http://example.codebootcamp.co.kr/graphql",
    //Apollo 독스와 거의 일치하나 다만, 토큰을 가져오는 과정을 함수로 표현

    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  });

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>

        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
        ></script>
      </Head>
      <GlobalContext.Provider
        value={{ accessToken, setAccessToken, setUserInfo, userInfo }}
      >
        {/* <Link href={}>버튼클릭</Link> */}
        <ApolloProvider client={client}>
          <Layout>
            <GlobalStyles />
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </GlobalContext.Provider>
    </>
  );
}

export default MyApp;
