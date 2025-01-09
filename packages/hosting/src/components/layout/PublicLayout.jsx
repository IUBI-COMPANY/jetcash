import React from "react";
import styled from "styled-components";
import { Layout } from "../ui";

export const PublicLayout = ({ children }) => {
  return (
    <LayoutContainer>
      <div className="site-layout-background">{children}</div>
    </LayoutContainer>
  );
};

const LayoutContainer = styled(Layout)`
  max-width: 770px;
  width: 100%;
  min-height: 100svh;
  background: #fff;
  margin: auto;
`;
