import AAA from "./Presenter"; //AAA => withAuth(Presenter)

const Container = () => {
  return (
    <>
      <div>컨테이너 입니다.</div>
      {AAA({ aaa: "aaaProps" })}
    </>
  );
};
export default Container;

// function 이름은 상관없음 (props) {
//     권한체크, 인증 다른화면으로 넘기기 등의 로직이 사용가능
//     return <Presenter {

//     }

//   (withAuth(Presenter)) ({aaa: 'aaaProps'}) ===> (이름은상관없음)({aaa: 'aaaProps'})
// ===> <Presenter { ...props} />
