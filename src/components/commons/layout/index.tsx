import { createContext, useState } from "react";
import { useRouter } from "next/router";
import LayoutFooter from "./footer/LayoutFooter.container";
import LayoutHeader from "./header/LayoutHeader.container";
import LayoutNavigation from "./navigation/LayoutNavigation.container";
import React from "react";
import { Wrapper, Body } from "./Layout.styles";
// export const Wrapper = styled.div`
//   width: 100%;
//   height: 100px;
// `;

// export const Body = styled.div`
//   height: 500px;
//   padding-left: 50px;
//   padding-right: 50px;
// `;

const withoutNavigation = ["/board", "/query"];

export const LayoutContext = createContext({
  test: "",
});
const Layout = ({ children }) => {
  const router = useRouter();
  const isNavigation = !withoutNavigation.includes(router.pathname);

  const [test, setTest] = useState("이것은 테스트입니다.");

  const value = {
    test,
  };

  return (
    <LayoutContext.Provider value={value}>
      <Wrapper>
        <LayoutHeader test={test} />
        {isNavigation && <LayoutNavigation />}
        <Body>{children}</Body>
        <LayoutFooter />
      </Wrapper>
    </LayoutContext.Provider>
  );
};

export default Layout;
