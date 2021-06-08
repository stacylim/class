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

export const GlobalContext = createContext({
  accessToken: "",
  setAccessToken: (_: any) => {},

  //있는데 안 쓰는 데이터 _ 언더바처리
});

function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState("");

  //Apollo 세팅 
  const uploadLink = createUploadLink({
    uri: "http://localhost:4000/graphql",
    headers: {authorization: "Bearer ${accessToken}"},
    credentials: 'include'
  
  });
// @ts-ignore
  const errorLink = onError(async ({graphQLErros, operation, forward})) => {
    if(graphQLErrors){
      for(let err of graphQLErrors) {
        if(err.extensions.code == "UNAUTHENTICATED"){
          //Unauthenticated 에러 (만료에러 )일때 토큰 재발급 

          //Axios
          const response = axios.post( 
            // "http://backend.codebootcamp.co.kr/graphql"
            "http://localhost:4000/graphql",
            {
           query: `
           mutation restoreAccessToken{
             restoreAccessToken{
              accessToken
             }
            }
           `
           {
              headers:{"Content-Type": 'application/json'},
              withCredentials: true
//Postman 에서도 실제 Builder - Post - Body 영역에서 실제로 날릴수 있다? 
//쿠키를 백엔드 컴퓨터로 날려줘야함.
           }  
          ) 
          const newAccessToken = response.data.data.restoreAccessToken.accessToken
          setAccessToken(newAccessToken)

          //재발급 받은 토큰으로 실패했떤 쿼리 다시 날리기 
          //기존에 만료된 쿼리를 새쿼리로 
          operation.setContext({
            headers: {
              ...operation.getcontext().headers,
              authorization: `Bearer ${newAccessToken}`
            }
          })
          return forwardRef(operation)
        }
     }
    }
   })



  const client = new ApolloClient({
    // @ts-ignore
    // uri: "http://example.codebootcamp.co.kr/graphql",
    //Apollo 독스와 거의 일치하나 다만, 토큰을 가져오는 과정을 함수로 표현 

    link: ApolloLink.from([errorLink, uploadLink]),
    cache: new InMemoryCache(),
  });

  return (
    <GlobalContext.Provider value={{ accessToken, setAccessToken }}>
      {/* <Link href={}>버튼클릭</Link> */}
      <ApolloProvider client={client}>
        <Layout>
          <GlobalStyles />
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </GlobalContext.Provider>
  );
}

export default MyApp;
