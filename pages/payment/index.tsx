import { useState } from "react";
import Head from "next/head";
import { Router } from "next/router";

import { gql, useMutation } from "@apollo/client";

const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      impUid
      status
    }
  }
`;

const PaymentPage = () => {
  //스테이트로 결제금액만들기
  const [amount, setAmount] = useState(200);

  const [createPoint] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING);
  const onClickPayment = () => {
    // @ts-ignore;
    //가맹점 식별하기 아임포트에서 독스 스텝2 가맹점 식별하기 가져옴
    const IMP = window.IMP; // 생략해도 괜찮습니다.
    IMP.init("imp89386405"); // "imp00000000" 대신 발급받은 "가맹점 식별코드"를 사용합니다.
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card",
        // merchant_uid: "ORD20180131-0000011",
        name: "노르웨이 회전 의자",
        amount: 200,
        buyer_email: "test1@gmail.com",
        buyer_name: "테스트",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        m_redirect_url: "/paymentok",
      },
      async (rsp) => {
        // callback
        if (rsp.success) {
          await createPoint({
            variables: {
              impUid:rsp.imp_uid;
            }
          });
        alert("결제에 성공했습니다.");
          
        } else {
          alert("결제에 실패했습니다.");
        }
      }
    );
  };

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>

        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
        ></script>
      </Head>
      <div>결제금액: {amount} </div>
      <button onClick={onClickPayment}>결제하기 </button>
    </>
  );
};

export default PaymentPage;
