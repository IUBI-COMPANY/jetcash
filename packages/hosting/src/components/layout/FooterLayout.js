import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { mediaQuery } from "../../styles";

const { Footer } = Layout;

export const FooterLayout = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      <Container>
        <div>
          JetCash.pe ©2025 Created by <strong>IUBI Company</strong>
        </div>
      </Container>
    </Footer>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;

  ${mediaQuery.minTablet} {
    justify-content: space-between;
  }
`;
