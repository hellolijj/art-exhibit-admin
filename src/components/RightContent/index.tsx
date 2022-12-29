import { FilterOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { SelectLang, useModel } from '@umijs/max';
import { Space } from 'antd';
import React from 'react';
import HeaderSearch from '../HeaderSearch';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import NoticeIconView from '../NoticeIcon'
import ShoppingCarIconView from '../ShoppingCar'

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'realDark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
