import React, { useState } from "react";
import styled from "styled-components";
import { DrawerLayout } from "./DrawerLayout";
import { FooterLayout } from "./FooterLayout";
import { useNavigate } from "react-router";
import { Layout, Spin } from "../ui";
import { HeaderLayout } from "./HeaderLayout";
import { useAuthentication } from "../../providers";

export const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthentication();

  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);

  const onNavigateTo = (url) => navigate(url);

  return (
    <Spin tip="Cargando..." spinning={false} className="spin-item">
      <LayoutContainer>
        <Layout className="site-layout">
          <DrawerLayout
            isVisibleDrawer={isVisibleDrawer}
            onSetIsVisibleDrawer={setIsVisibleDrawer}
            onNavigateTo={onNavigateTo}
            onLogout={logout}
          />
          <HeaderLayout
            user={authUser}
            onNavigateTo={onNavigateTo}
            isVisibleDrawer={isVisibleDrawer}
            setIsVisibleDrawer={setIsVisibleDrawer}
            onLogout={logout}
          />
          <div className="site-layout-background">{children}</div>
          <FooterLayout />
        </Layout>
      </LayoutContainer>
    </Spin>
  );
};

const LayoutContainer = styled(Layout)`
  max-width: 770px;
  min-height: 100svh;
  width: 100%;
  margin: auto;
  .site-layout-background {
    background: #fff;
  }
`;
