import {Global, css} from '@emotion/react'

const reset = css`
*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

@font-face {
    font-family: 'aaa';
    src: url('/fonts/scifibit.ttf');
}


/* input {
    border: 0px; 
} */

`

const GlobalStyles = () => {

    return <Global styles={reset}/>

}

export default GlobalStyles
