import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// const items = [];
// const items = [
//   // getItem('Option 1', '1', <PieChartOutlined />),
//   // getItem('Option 2', '2', <DesktopOutlined />),
//   // getItem('Option 3', '3', <ContainerOutlined />),
//   getItem('Navigation One', 'sub1', <MailOutlined />, [
//     getItem('Option 5', '5'),
//     getItem('Option 6', '6'),
//     getItem('Option 7', '7'),
//     getItem('Option 8', '8'),
//   ]),
//   // getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
//   //   getItem('Option 9', '9'),
//   //   getItem('Option 10', '10'),
//   //   getItem('Submenu', 'sub3', null, [
//   //     getItem('Option 11', '11'),
//   //     getItem('Option 12', '12'),
//   //   ]),
//   // ]),
// ];

const NavLeft = () => {
  // const [collapsed, setCollapsed] = useState(false);

  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const [menuItems, setMenuItems] = useState([]);
  const createMenu = menuArr => {
    const menuItems = [];
    menuArr.forEach((el, index, arr) => {
      if (el.children) {
        menuItems.push(
          getItem(
            <a
              href="https://ant.design"
              target="_blank"
              rel="noopener noreferrer"
            >
              {el.title}
            </a>,
            `sub${index}`,
            null,
            createMenu(el.children)
          )
        );
      } else {
        menuItems.push(
          getItem(
            <a
              href="https://ant.design"
              target="_blank"
              rel="noopener noreferrer"
            >
              {el.title}
            </a>,
            el.id
          )
        );
      }
    });
    console.log(menuItems);
    return menuItems;
  };

  const loadMenu = () => {
    axios
      .get('./menus')
      .then(res => {
        // pass the menu data to component
        setMenuItems(createMenu(res.data));
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <div
    // style={{
    //   width: 256,
    // }}
    >
      {/* <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */}
      <Menu
        defaultSelectedKeys={['0']}
        defaultOpenKeys={['sub0', 'sub1']}
        mode="inline"
        theme="light"
        // inlineCollapsed={collapsed}
        items={menuItems}
      />
    </div>
  );
};
export default NavLeft;
