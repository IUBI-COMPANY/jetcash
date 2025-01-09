import React from "react";
import styled from "styled-components";
import { useAuthentication } from "../../providers";
import { userFullName } from "../../utils";

export const HomeIntegration = () => {
  const { authUser } = useAuthentication();

  return (
    <Container>
      <span className="title">
        Bienvenido a tu wallet <strong>{userFullName(authUser)}</strong>
      </span>
    </Container>
  );
};

const Container = styled.section`
  text-align: center;
  .title {
    font-size: 1.8em;
    font-weight: 500;
    text-transform: uppercase;
  }
`;
