import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    UnorderedListOutlined,
    FolderAddOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { ACCESSTOKEN } from '../../axios';
import { logOut } from '../../redux/reducer/userSlice';
import { getUserInfo, getViewPort } from '../../redux/selectors';

const { Header, Sider, Content } = Layout;

function LayoutMain({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    console.log('🚀 ~ collapsed', collapsed);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const viewPort = useSelector(getViewPort);
    const { width, height } = viewPort.data;

    const { avatar } = useSelector(getUserInfo);

    const handleSignOut = useCallback(() => {
        dispatch(logOut());
        localStorage.removeItem(ACCESSTOKEN);
    }, [dispatch]);
    let body;
    if (width <= 1023) {
        body = (
            <Layout>
                <Sider
                    breakpoint="xl"
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => {
                        setCollapsed(collapsed);
                    }}
                    style={{
                        position: 'fixed',
                        zIndex: '99',
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
                <Layout>
                    {!collapsed && (
                        <div
                            style={{
                                backgroundColor: '#000',
                                opacity: '0.5',
                                inset: 0,
                                position: 'fixed',
                                zIndex: 50,
                            }}
                        ></div>
                    )}
                    <Header
                        className="site-layout-sub-header-background"
                        style={{
                            padding: 0,
                            marginBottom: '30px',
                        }}
                    />
                    <Content
                        style={{
                            margin: '20px 10px ',
                        }}
                    >
                        <div
                            style={{
                                overflow: 'scroll',
                                backgroundColor: '#fff',
                                padding: '20px 15px',
                                borderRadius: '10px',
                            }}
                        >
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    } else {
        body = (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsedWidth="0"
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
                        transition: 'all 0.2s ease-in-out',
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
                            borderRadius: '10px',
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        );
    }
    return body;
}

export default memo(LayoutMain);
