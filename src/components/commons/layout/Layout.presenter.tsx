import {Body, Footer, Header, Wrapper} from "./Layout.styles"
const LayoutUI = ({children}) => {
    return (
        <div>
            <div>헤더영역</div>
            <div>{children}</div>
            <div>푸터영역</div>

        </div>
    )
}

export default LayoutUI 
