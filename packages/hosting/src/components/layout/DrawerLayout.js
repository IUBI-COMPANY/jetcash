import React from "react";
import { Drawer, Menu } from "../../components";
import styled from "styled-components";
import { version } from "../../firebase";
import { faHome, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DrawerLayout = ({
  isVisibleDrawer,
  onSetIsVisibleDrawer,
  onNavigateTo,
  onLogout,
}) => {
  const onClickHome = () => {
    onSetIsVisibleDrawer(false);
    onNavigateTo("/");
  };

  const items = [
    {
      label: "Home",
      key: "home",
      icon: <FontAwesomeIcon icon={faHome} size="lg" />,
      isVisible: true,
      onClick: () => onClickHome(),
    },
    {
      label: "Cerrar sesión",
      key: "sign-out",
      icon: <FontAwesomeIcon icon={faSignOut} size="lg" />,
      isVisible: true,
      onClick: () => onLogout(),
    },
  ];

  const filterByRoleCode = (items) => {
    return items.filter((item) => {
      if (item?.children) {
        item.children = (item?.children || []).filter(
          (_children) => _children.isVisible,
        );
      }

      return item.isVisible;
    });
  };

  return (
    <DrawerContainer
      key="right"
      title={
        <div style={{ width: "100%", textAlign: "right" }}>
          <h5 style={{ color: "#fff" }}>version: {version}</h5>
        </div>
      }
      placement="left"
      width={330}
      closable={true}
      onClose={() => onSetIsVisibleDrawer(!isVisibleDrawer)}
      open={isVisibleDrawer}
      className="drawer-content"
      bodyStyle={{ padding: "0" }}
    >
      <div className="logo" />
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={filterByRoleCode(items)}
      />
    </DrawerContainer>
  );
};

const DrawerContainer = styled(Drawer)`
  .drawer-content {
    color: #fff;
  }
`;
