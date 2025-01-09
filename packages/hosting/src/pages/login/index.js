import React, { useMemo } from "react";
import { Button, Form, Input, InputPassword } from "../../components";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../hooks";
import styled from "styled-components";
import { useAuthentication } from "../../providers";
import { LogoPrimary } from "../../images";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const LoginIntegration = () => {
  const navigate = useNavigate();
  const { authUser, loginLoading, loginWithEmailAndPassword } =
    useAuthentication();

  const onNavigateToHomePage = () => navigate("/");

  console.log("authUser: ", authUser);

  useMemo(() => {
    authUser && navigate(authUser?.role?.initialPathname || "/");
  }, [authUser]);

  const onSubmit = async ({ email, password }) =>
    loginWithEmailAndPassword(email, password);

  return (
    <Login
      loading={loginLoading}
      onSubmit={onSubmit}
      onNavigateToHomePage={onNavigateToHomePage}
    />
  );
};

const Login = ({ loading, onSubmit, onNavigateToHomePage }) => {
  const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  return (
    <Container>
      <CardStyled>
        <div className="logo">
          <img
            onClick={onNavigateToHomePage}
            src={LogoPrimary}
            alt="Practice system logo"
          />
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Email"
                onChange={onChange}
                value={value}
                error={error(name)}
                helperText={errorMessage(name)}
                required={required(name)}
              />
            )}
          />
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <InputPassword
                label="Password"
                onChange={onChange}
                value={value}
                name={name}
                error={error(name)}
                helperText={errorMessage(name)}
                required={required(name)}
              />
            )}
          />
          <Button
            loading={loading}
            type="primary"
            size="large"
            block
            htmlType="submit"
          >
            INGRESAR
          </Button>
          <span className="link">
            ¿No tienes una cuenta? <Link to="/register">Registrarme</Link>
          </span>
          {/*<span>*/}
          {/*  ¿Olvidaste tu contraseña?{" "}*/}
          {/*  <Link to="/recovery">Recupérala aquí</Link>*/}
          {/*</span>*/}
        </Form>
      </CardStyled>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100svh;
  height: auto;
  position: relative;
  display: grid;
  place-items: center;
  background: linear-gradient(#06125b, #000);
  padding: 2em;
`;

const CardStyled = styled.div`
  width: 90%;
  margin: auto;

  .logo {
    width: 100%;
    height: auto;
    object-fit: contain;
    cursor: pointer;
    display: grid;
    place-items: center;
    margin-bottom: 3em;
    img {
      width: 20em;
      margin: auto;
    }
  }
  .link {
    color: #fff;
  }
`;
