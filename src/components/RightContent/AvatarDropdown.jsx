import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Image, Menu, Spin } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';
import { PhotoUrl } from '../Photo';

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  // await outLogin();
  localStorage.removeItem('auth');
  const { query = {}, pathname } = history.location;
  const { redirect } = query; // Note: There may be security issues, please note

  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};

const AvatarDropdown = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { auth, setAuthentication } = useModel('getAuthState');
  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;
      if (key === 'logout') {
        // setInitialState((s) => ({ ...s, currentUser: undefined }));
        setInitialState((oldInitialState) => {
          const data = { userInfo: null, token: null, isAuthenticated: false };
          setAuthentication(data);
          initialState?.initialize?.(data);
          return {
            ...oldInitialState,
            currentUser: null,
            data: { value: new Date().toDateString(), key: 'X' },
          };
        });
        loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      ></Spin>
    </span>
  );

  // if (!initialState) {
  //   return loading;
  // }
  // if (!auth) {
  //   return loading;
  // }

  console.log(auth);

  const { currentUser } = initialState;

  // if (!currentUser || !currentUser.name) {
  //   return loading;
  // }

  if (!auth.userInfo || !auth?.userInfo?.firstName) {
    return loading;
  }
  console.log(currentUser);
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="settings">
          <UserOutlined />
          Profile
        </Menu.Item>
      )}
      {/* {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          Setting
        </Menu.Item>
      )} */}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );
  console.log(currentUser);
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        {/* <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" /> */}
        <img
          src={`${PhotoUrl}/${currentUser.image}`}
          width={30}
          height={30}
          style={{ borderRadius: '50%', marginRight: '4px' }}
        />
        {/* <span className={`${styles.name} anticon`}>{currentUser.name}</span> */}
        <span className={`${styles.name} anticon`}>
          {auth?.userInfo?.firstName} {auth?.userInfo?.lastName}
        </span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
