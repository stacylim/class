import { getDate } from '../../../commons/libraries/utils'
import {RowHeaderWrapper, RowWrapper, Checkbox, No, Title, Date} from './BoardList.styles'
import {useState} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { FETCH_BOARDS } from './BoardList.queries'

const BoardListUI = ({data}) => {

    console.log(data?.fetchBoards)

    const DELETE_BOARD = gql`
    mutation{
     mutation deleteBoard($number:Int!){
         deleteBoard(number: $number){
             message
         }
    

    }
    `
#     const profile = [10,20]
#     profile[0] //10
#     profile[1] //20

#     const aaa = profile[0] //10
#     const bbb = profile[1] //20

#     const profile2 = [10,20]
#     const aaa2 = profile2[0] //10
#     const bbb2 = profile2[1] //20

# //배열 비구조화할당 
#     const [,aaa4] = [10, 20]

#     // 객체 비구조화할당 위치가 중요
#     const profile4 = {
#         name:"철수",
#         age: 13,
#         school: "다람쥐초등학교"
#     }

#     const name2 = profile5.name 
#     const age2 = profile5.age
#     const school2 = profile5.school 

#     // 객체 구조화 이름이 중요 
#     const { school, name, age} = {
#         name:"철수",
#         age: 13,
#         school: "다람쥐초등학교"
#     }
  
# useMutation() => // []형태
#   const result = useMutation(임의의 뮤테이션)
# #   const [asdfasdf] = [뮤테이션실행하는함수, ] 
#     result[0]({
#         variables: {
#             number:360

#         }
#     })

# deleteBoard({
#     variables: {
#         number:360
#     }
# })

#   useQuery() => // {} 형태
#   const result2 = useQuery(임의의쿼리)
#   result2.data

#   const {data} = useQuery(임의의쿼리)

# #  {
# #     data:dksldkf,
# #     loading: askdk

# #  }

  





    //비구조화할당 = 구조문 
    const [deleteBoard] = useMutation(DELETE_BOARD)


    const conClickDelete = async(event) => {
        const result = await deleteBoard({
            variables: {
            number: Number(event.target.id)
        },
        refetchQueries: [{query: FETCH_BOARDS }]
        
        })

        alert(result.data.deleteBoard.message)

    }

    # 삭제를 하게되면 뮤테이션이 일어나고,
    # 변경이된 데이터를 서버로 부터 받아오고, 
    # 맵으로 다시 그리고, 동일하게 인덱스를 그리는 것? 
    # 인덱스를 넘버가 아닌(고정값) 키(비고정값)로 주면, 삭제는 됐는데, 체크가 사라지고 있지 않다. 
    # 맵이 생각하기에 인덱스4는 계속 살아있다고 생각하기 때문, 인덱스를 키로 주면 안되는 이유이다. 

const onClickCheckbox =() ={

}


    return (
        <div>
            <RowHeaderWrapper>
                <Checkbox type="checkbox" />
                <No>번호</No>
                <Title>제목</Title>
                <Date>작성일</Date>
            </RowHeaderWrapper>
            {data?.fetchBoards.map((board) => (
                <RowWrapper>
                    <Checkbox id={data} type="checkbox" onClick={handleCheck} checked={checked[board.number]}/>
                    <No>{board.number}</No>
                    <Title>{board.title}</Title>
                    <Date>{getDate(board.createdAt)}</Date>
                    <div>현재 인덱스: {index} </div>
                    <button id={board.number} onClick={onClickDelete}>삭제</button>
                </RowWrapper>
            ))}
        </div>
    )
}

export default BoardListUI