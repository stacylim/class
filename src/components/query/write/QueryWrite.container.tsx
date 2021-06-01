import { useMutation } from "@apollo/client"
import { useEffect, useRef, useState, } from "react"
import QueryWriteUI from './QueryWrite.presenter'
import {useRouter} from 'next/router'
import { CREATE_PROFILE } from './QueryWrite.queries'
import { IMutation, IMutationCreateProfileArgs } from "../../../commons/types/generated/types"

interface IProfile {
    [key: string]: string
}

// function Query() {
const QueryWrite = () => {
    const router = useRouter()
    const [createProfile, {data}] = useMutation<IMutation, IMutationCreateProfileArgs>(CREATE_PROFILE)
    const [profile, setProfile] = useState<IProfile>({
        name: "",
        age: "",
        school: ""
    })

    const [aaa, setAaa] = useState(false)
   

    const onChangeInput = (event) => {
        const newProfile: IProfile = { ...profile, [event.target.name]: event.target.value }
        if(newProfile.name && newProfile.age && newProfile.school) setAaa(true)
        setProfile(newProfile)

        // profile.aaa.bbb.ccc => "철수"

        // const profile = {
        //     aaa: {
        //         bbb: {
        //             ccc: "철수"
        //         }
        //     }
        // }
    }

    // async function aaa(){

    // }

    const onClickSubmit = async () => {
        try {
            const result = await createProfile({
                variables: {
                    ...profile,
                    age: Number(profile.age)
                }
            })
            alert(result.data.createProfile.message)
            router.push(`/query/${profile.name}`)
        } catch(error){
            alert(error.message)
        }
    }

    const [open, setOpen] = useState(true)
    
    const handleClose = () => {
        setOpen(false)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    const [testState, setTestState] = useState('aaa')
    const [ccc, setCcc] = useState(123)

    const handleChangeCcc = () => {
        setCcc(456)
    }
    

    useEffect( () => {
        inputRef.current.focus()

        setTestState('useEffect가 실행되었습니다.')

        // console.log('aaa')
    }, [ccc])

    console.log('11111111')

    return (
        <QueryWriteUI 
        handleChangeCcc={handleChangeCcc}
            inputRef={inputRef} 
            onClickSubmit={onClickSubmit}
            onChangeInput={onChangeInput}
            handleClose={handleClose}
            open={open}
            aaa={aaa}
        />
    )
}

export default QueryWrite