

import {ApolloClient, ApolloProvider, InMemoryCache, ApolloLink} from '@apollo/client'

import {createUploadLink} from 'apollo-upload-client'
function MyApp({ Component, pageProps }) {

  const uploadLink =  createUploadLink({
    uri:"http://backend.codebootcamp.co.kr/graphql"
  });

  
  const client = new ApolloClient ({
    // uri: "http://example.codebootcamp.co.kr/graphql",
    
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    cache: new InMemoryCache(),
  });

  return(
    <ApolloProvider client={client}>
     
        
 
      <Component {...pageProps} />
      
    </ApolloProvider>

  ); 
}

export default MyApp;
