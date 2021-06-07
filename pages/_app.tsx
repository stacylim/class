import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";

import { createUploadLink } from "apollo-upload-client";
import GlobalStyles from "../src/commons/styles/globalStyles";
import Layout from "../src/components/commons/layout";
import { createContext, useState } from "react";
import Link from "next/link";

export const GlobalContext = createContext({
  accessToken: "",
  setAccessToken: (_: any) => {},

  //있는데 안 쓰는 데이터 _ 언더바처리
});

function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState("");

  const uploadLink = createUploadLink({
    uri: "http://backend.codebootcamp.co.kr/graphql",
    headers: {
      authorization: "Bearer ${accessToken}",
    },
  });

  const client = new ApolloClient({
    // uri: "http://example.codebootcamp.co.kr/graphql",

    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
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
