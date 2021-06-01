import {useRef, useState} from "react";
import { useMutation, gql } from "@apollo/client";
import { IMutation, IMutationUploadfileArgs } from "../../src/commons/types/generated/types";
const ImagePage = () => {
    const [myImage, setMyImage] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState();

        const UPLOAD_FILE = gql`
        mutation uploadFile($file:Upload!) { 
            uploadFile(file: $file) {
                _id
                url
                size
                isUsed 
            }
        }
        `;
  
        //얼리엑시트 로직
        // const isValid = checkValidation(input)
        // if(!isValid) return;
        // //login 뮤테이션날리기 
        // if(isValid){
        
        // }else`

        // if(!로그인이메일에 골뱅이 확인) { 
        //     골뱅이 넣어주세요
        //     return 
        // }

        //    console.log(file);
    const [uploadFileMutation] = 
    useMutation<IMutation, IMutationUploadFileArg>(UPLOAD_FILE);

    const onChangeFile =  async (event) => {
        const file = event.target.files[0];
        
        if(file.size >5 *1024 * 1024){
            alert("파일이 너무 큽니다(5MB 제한!");
            return;
        }

        if (!file.type.includes("png")){
            alert("png 파일만 업로드 가능합니다!");
            return;
        }


    const result = await uploadFileMutation({
            variables: { file: file },
        });
        console.log(result);
    };

    const onClickImage = () => {
        fileRef.current.click();
     };
        
     async function onClickSubmit() {
                
     }

    
        // const reader = new FileReader();
        // // 실제파일

        // reader.readAsDataURL(file); 
        // // 웹브라우저에 우리파일을 올리고 화면에 보여주기 위한 임시 주소를 만들어 주는 것. 
        // reader.onload = (event) => { 
        //     setMyImage(String(event.target.result)); 
        //     //읽고있는 것들에 대한 과정 
        // };

        // console.log(result);

    // }

    return (
    <div>
        <button onClick={onClickImage}>이미지 업로드 버튼 </button>
        <input 
        type="file" 
        ref={fileRef} 
        onChange={onChangeFile} 
        style={{ display: "none"}}
        /> 
        <img src = {myImage} />

        {/* {myImage && <img src = {myImage} style={{ width: 500, height: 500}}/> */}
        {/* 주소값 : 이미지를 바꾸면 바뀌는 값이라 스테이트를 활용 */}

        <button onClick={onClickSubmit}>서버에 파일 전송하기</button>
        </div>
    
    );
};

export default ImagePage;
