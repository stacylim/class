import {gql, useMutation} from "@apollo/client";
import {checkImage} from "../../src/commons/libraries/validations"
import { IMutation, IMutationUploadFileArg } from "../../src/commons/types/generated/types";
import { useState } from "react"

const UPLOAD_FILE = gql`
    mutation uploadFile($file:Upload!){
        uploadFile(file: $file){
            url
       }
    }
    `

    

const Image2Page = () => {
    const[fileUrl, setFileUrl] = useState<string>();
    const [uploadFile] 
    = useMutation<IMutation>(UPLOAD_FILE);

    const aaaRef = useRef<HTMLInputElement>();
    // function getStorageUrl(url: any): import("react").SetStateAction<string> {
    //     throw new Error("Function not implemented.");
    // }
    
    const onChangeFile= async (event) =>{
        const file = event.target.files[0];
       
        // if (!checkImage(file)) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            setFileUrl(String(event.target.result));
        };

        // try {
        //     const {data} = await uploadFile({ variables: { file } });
        //     setFileUrl(data.uploadFile.url); //스테이트에 저장
    
        // } catch (error) {
        // alert(error.message);
    // }
};

  
    
    const onClickUpload = () => {
        aaaRef.current?.click();

    };

    return (
        <>
        <button onClick={onClickUpload}>업로드!!</button>
        <input ref={aaaRef} type="file" onChange={onChangeFile} 
        style={{display:'none'}}
        />
        <LazyLoad height={300} offsetVertical={300}>
            <img 
            src="https://s.pstatic.net/static/newsstand/up/2020/0610/nsd151458769.png"
            height={300} width={300}
            />
        </LazyLoad>
        <img src={fileUrl} height={300} width={300}/>
        <img src={fileUrl} height={300} width={300}/>
        <img src={fileUrl} height={300} width={300}/>
        <img src={fileUrl} height={300} width={300}/>
        <img src={fileUrl} height={300} width={300}/>
        <img src={fileUrl} height={300} width={300}/>
        <img src={fileUrl} height={300} width={300}/>
        <img src={fileUrl} height={300} width={300}/>
        <img src={fileUrl} height={300} width={300}/>



    
    </>
    );
};

export default Image2Page ;

