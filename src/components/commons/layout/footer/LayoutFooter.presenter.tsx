import { Body, Footer, Header, Wrapper}
import { useContext } from "react"
import { GlobalContext } from "../../../../../pages/_app"


 const LayoutFooterUI=()=> {

    const {userInfo} = useContext(GlobalContext)
    return <div>푸터영역 : {userInfo?.email} </div>
    
}

export default LayoutFooterUI 