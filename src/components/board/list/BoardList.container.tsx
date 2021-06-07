import { useQuery } from "@apollo/client";
import BoardListUI from "./BoardList.presenter2";
import { FETCH_BOARDS } from "./BoardList.queries";
import { useState } from "react";

const BoardList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useQuery(FETCH_BOARDS, { variables: { page: 2 } });

  const onClickPage = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  return (
    <BoardListUI
      data={data}
      onClickPage={onClickPage}
      currentPage={currentPage}
    />
  );
};

export default BoardList;
