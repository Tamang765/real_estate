import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import BaseView from './components/base';
import BindingView from './components/binding';
import NotificationView from './components/notification';
import SecurityView from './components/security';
import styles from './style.less';
import UpdateUser from './components/security';
import { getLoggedInUser } from './service';

const { Item } = Menu;

const Settings = () => {
  const [data, setData] = useState();

  const menuMap = {
    Profile: 'Profile',
    Update_Profile: 'Update Profile',
    Change_Password: 'Change Password',
  };
  const [initConfig, setInitConfig] = useState({
    mode: 'inline',
    selectKey: 'Profile',
  });
  const dom = useRef();

  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return;
      }

      let mode = 'inline';
      const { offsetWidth } = dom.current;

      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      setInitConfig({ ...initConfig, mode });
    });
  };

  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize);
      resize();
    }

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [dom.current]);

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };
  const loggedInUser = async () => {
    const response = await getLoggedInUser();
    setData(response);
  };
  useEffect(() => {
    loggedInUser();
  }, []);

  const renderChildren = () => {
    const { selectKey } = initConfig;

    switch (selectKey) {
      case 'Profile':
        return <BaseView data={data} />;

      case 'Update_Profile':
        return <UpdateUser data={data} />;

      case 'Change_Password':
        return <BindingView data={data}/>;

      default:
        return null;
    }
  };

  return (
    <GridContent>
      <div
        className={styles.main}
        ref={(ref) => {
          if (ref) {
            dom.current = ref;
          }
        }}
      >
        <div className={styles.leftMenu}>
          <Menu
            mode={initConfig.mode}
            selectedKeys={[initConfig.selectKey]}
            onClick={({ key }) => {
              setInitConfig({ ...initConfig, selectKey: key });
            }}
          >
            {getMenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{menuMap[initConfig.selectKey]}</div>
          {renderChildren()}
        </div>
      </div>
    </GridContent>
  );
};

export default Settings;
