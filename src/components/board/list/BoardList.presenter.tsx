import { getDate } from '../../../commons/libraries/utils'
import {RowHeaderWrapper, RowWrapper, Checkbox, No, Title, Date, Page} from './BoardList.styles'
import {useState} from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { FETCH_BOARDS } from './BoardList.queries';
const BoardListUI = () => {
    const [currentPage, setCurrentPage] = useState()
    const {data, fetchMore} = useQuery(FETCH_BOARDS) 
        variables: {page: currentPage}

    const [checkedAll, setCheckedAll] = useState(false)

    const [checked, setChecked] = useState({
        // 각 버튼들의 체크상태 기록
        // 318: true
        // 320: true
        // ... 10개 모두 true
    })

    const handleCheck = (event) => {
        /////////////////////////////////////////////////
        // 1. 현재 내 자신의 체크상태 변경
        /////////////////////////////////////////////////
        const newChecked = { ...checked, [event.target.id]: event.target.checked }
        setChecked(newChecked)

        /////////////////////////////////////////////////
        // 2. 전체선택버튼 체크상태 변경
        // ----------------------------------------------
        // if( 모두 체크되었는지 확인 ){
        //      전체선택버튼도 체크해줌 setCheckedAll(true) 
        // } else {
        //      전체선택버튼도 체크해줌 setCheckedAll(false) 
        // }
        /////////////////////////////////////////////////
        const values = []
        for(let i=0; i<data?.fetchBoards.length; i++){
            values.push(newChecked[data?.fetchBoards[i].number])    // [true, false, true, false, false, true, false, ...]
        }
        const filteredValues = values.filter(data => data === true) // [true, true, true, true ...]
        if(data?.fetchBoards.length === filteredValues.length){
            setCheckedAll(true)
        } else {
            setCheckedAll(false)
        }
    }

    const handleCheckAll = (event) => {
        const newCheckAll = event.target.checked

        // 전체선택
        if(newCheckAll){
            let newCheck = {}
            for(let i=0; i<data?.fetchBoards.length; i++){
                newCheck[data?.fetchBoards[i].number] = true
            }
            console.log(newCheck) // { 318: true, 320: true }

            // {
            //     ...profile,
            //     [event.target.name]: event.target.value
            // }


            setChecked(newCheck)
            setCheckedAll(true)

        // 전체선택 취소
        } else {
            let newCheck = {}
            for(let i=0; i<data?.fetchBoards.length; i++){
                newCheck[data?.fetchBoards[i].number] = false 
            }
            setChecked(newCheck)
            setCheckedAll(false)
        }
    }

    return (
        <div>
            <RowHeaderWrapper>
                <Checkbox type="checkbox" onClick={handleCheckAll} checked={checkedAll} />
                <No>번호</No>
                <Title>제목</Title>
                <Date>작성일</Date>
            </RowHeaderWrapper>
            <div style={{ height:300, overflow:'auto'}}>
            
                pageStart={0}
                loadMore={() => { const temp=fetchMore({
                    variables:{
                        page: currentPage +1, 
                    }
                },
                updateQuery: (pv, {res})=> {
                    return [res, fetchBoards]
                }); console.log(temp)}}
                hasMore={true}
                threshold={250}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >

                {data?.fetchBoards.map((board, index) => (
                <>
                <RowWrapper key={index}>
                    <Checkbox type="checkbox" id="318" onClick={handleCheck} checked={checked[board.number]} />
                    <No>{board.number}</No>
                    <Title>{board.title}</Title>
                    <Date>{getDate(board.createdAt)}</Date>
                    <div> 현재 인덱스: {index} </div>
                    <button id={board.number} onClick={onClickDelete}>삭제</button>
                </RowWrapper>

          
            </div>
            {data?.fetchBoards.map((board, index) => (
                <>
                <RowWrapper key={index}>
                    <Checkbox type="checkbox" id="318" onClick={handleCheck} checked={checked[board.number]} />
                    <No>{board.number}</No>
                    <Title>{board.title}</Title>
                    <Date>{getDate(board.createdAt)}</Date>
                    <div> 현재 인덱스: {index} </div>
                    <button id={board.number} onClick={onClickDelete}>삭제</button>
                </RowWrapper>
                <RowWrapper>
                    <Checkbox type="checkbox" id={321} onClick={handleCheck} checked={checked[board.number]} />
                    <No>{board.number}</No>
                    <Title>{board.title}</Title>
                    <Date>{getDate(board.createdAt)}</Date>
                </RowWrapper>
                <RowWrapper>
                    <Checkbox type="checkbox" id={316} onClick={handleCheck} checked={checked[board.number]} />
                    <No>{board.number}</No>
                    <Title>{board.title}</Title>
                    <Date>{getDate(board.createdAt)}</Date>
                </RowWrapper>
                </>
            ))}
            {new Array(10).fill(1).map(((_,index) => (
                <Page
                id={String(index +1)}
                onClick={onClickPage}
                isActive={currentPage === index +1}
                >
                    {index+1}
                </Page>

            


                // <span 
                //     id={String(index +1)}
                //     style={{
                //     paddingLeft:15, 
                //     paddingRight: 15,
                //     cursor: 'pointer',



                // }}
                // >
                //     {index+1}
                // </span>
            )))}
        </div>
    )
}

export default BoardListUI