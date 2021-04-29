import React from 'react';
import { Layout as RaLayout, LayoutProps } from 'react-admin';
import { AppBar } from './Appbar';
import Menu from './Menu';

export const Layout = (props: LayoutProps) => (
    <RaLayout {...props} appBar={AppBar} menu={Menu} />
);
