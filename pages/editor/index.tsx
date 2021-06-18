import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  //ssr = 서버사이드 렌더링
  //브라우저가 없는 서버환경이면, ReactQull을 그려라 라는 뜻
});

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

const FETCH_BOARD = gql`
  query fetchBoard($boardID: ID!) {
    fetchBoard(boardId: $boardID) {
      contents
    }
  }
`;

const EditorPage = () => {
  const [createBoard] = useMutation(CREATE_BOARD);
  const [contents, setContents] = useState("");
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: "60cc3749d110d9002b0f5ed5" },
  });

  const onChangeEditor = (contents) => {
    setContents(contents);
  };
  const onClickSubmit = async () => {
    setIssubmitting(true);
    try {
      await createBoard({
        variables: {
          createBoardInput: {
            writer: "철수",
            password: "1234",
            title: "제목입니다",
            contents,
          },
        },
      });
      alert("등록이 성공적으로 완료되었습니다.");
      Router.push("/상세보기주소");
    } catch (error) {
      alert(error.message);
    }
    setIssubmitting(false);
  };
  const [isSubmitting, setIssubmitting] = useState(false);

  return (
    <>
      <ReactQuill onChange={onChangeEditor} />;
      <button onClick={onClickSubmit} disabled={isSubmitting}>
        등록하기{" "}
      </button>
      <div>{data?.fetchBoard.contents}</div>
      {/* <div>
        dangerouslySetInnerHTML = {{ __html: data?.fetchBoard.contents }}
      </div> */}
    </>
  );
};

export default EditorPage;
