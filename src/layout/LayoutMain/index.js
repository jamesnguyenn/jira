import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    UnorderedListOutlined,
    FolderAddOutlined,
    LogoutOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { ACCESSTOKEN } from '../../axios';
import { logOut } from '../../redux/reducer/userSlice';
import { getUserInfo } from '../../redux/selectors';

const { Header, Sider, Content } = Layout;

function LayoutMain({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { avatar } = useSelector(getUserInfo);

    const handleSignOut = useCallback(() => {
        dispatch(logOut());
        localStorage.removeItem(ACCESSTOKEN);
    }, [dispatch]);
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                trigger={null}
                onBreakpoint={(broken) => {}}
                collapsible
                collapsed={collapsed}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo">JIRA</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={location.pathname}
                    defaultSelectedKeys={location.pathname}
                    items={[
                        {
                            key: '/',
                            icon: <UnorderedListOutlined />,
                            label: 'Project Management',
                            onClick: () => {
                                navigate('/');
                            },
                        },
                        {
                            key: '/create-project',
                            icon: <FolderAddOutlined />,
                            label: 'Create Project',
                            onClick: () => {
                                navigate('/create-project');
                            },
                        },
                        {
                            key: '/user-management',
                            icon: <UserOutlined />,
                            label: 'User Management',
                            onClick: () => {
                                navigate('/user-management');
                            },
                        },
                        {
                            key: '/setting',
                            icon: <SettingOutlined />,
                            label: 'Setting',
                        },
                        {
                            key: '5',
                            icon: (
                                <img
                                    src={avatar}
                                    alt="user-avatar"
                                    style={{
                                        width: '10%',
                                        borderRadius: '100%',
                                    }}
                                />
                            ),
                            label: 'Logout',
                            onClick: () => {
                                handleSignOut();
                            },
                        },
                    ]}
                />
            </Sider>
            <Layout
                className="site-layout"
                style={{
                    padding: 0,
                    marginLeft: `${collapsed ? '0px' : '200px'}`,
                }}
            >
                <Header
                    className="site-layout-background"
                    style={{
                        padding: '10px',
                        fontSize: '30px',
                    }}
                >
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        }
                    )}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: '24px 16px ',
                        minHeight: '600px',
                        overflow: 'initial',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default memo(LayoutMain);
