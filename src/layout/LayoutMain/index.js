import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    UnorderedListOutlined,
    FolderAddOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { ACCESSTOKEN } from '../../axios';
import { logOut } from '../../redux/reducer/userSlice';
import { getUserInfo, getViewPort } from '../../redux/selectors';

const { Header, Sider, Content } = Layout;

function LayoutMain() {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [welcomeText, setWelcomeText] = useState('Good Morning!');

    const viewPort = useSelector(getViewPort);
    const { width } = viewPort.data;

    const { avatar, name } = useSelector(getUserInfo);

    // Update Welcome Text
    useEffect(() => {
        const today = new Date();
        const curHr = today.getHours();
        if (curHr < 12) {
            setWelcomeText('Good morning! ');
        } else if (curHr < 18) {
            setWelcomeText('Good afternoon! ');
        } else {
            setWelcomeText('Good evening! ');
        }
    }, []);

    const handleSignOut = useCallback(() => {
        dispatch(logOut());
        localStorage.removeItem(ACCESSTOKEN);
    }, [dispatch]);
    let body;
    if (width <= 1023) {
        body = (
            <Layout>
                <Sider
                    width="250px"
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
                                key: '/profile-setting',
                                icon: <SettingOutlined />,
                                label: 'Setting',
                                onClick: () => {
                                    navigate('/profile-setting');
                                },
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
                        className="site-layout-background"
                        style={{
                            padding: '10px 20px',
                            fontSize: '30px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                }}
                            >
                                <span>
                                    {welcomeText.toUpperCase()}, {name}
                                </span>
                                <img
                                    style={{
                                        width: '30px',
                                        borderRadius: '100%',
                                        cursor: 'pointer',
                                    }}
                                    src={avatar}
                                    alt="user-avatar"
                                    onClick={() => navigate('/profile-setting')}
                                />
                            </div>
                        </div>
                    </Header>
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
                    width="230px"
                    trigger={null}
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
                                key: '/profile-setting',
                                icon: <SettingOutlined />,
                                label: 'Setting',
                                onClick: () => {
                                    navigate('/profile-setting');
                                },
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
                        marginLeft: `${collapsed ? '80px' : '230px'}`,
                    }}
                >
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: '10px 20px',
                            fontSize: '30px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            {React.createElement(
                                collapsed
                                    ? MenuUnfoldOutlined
                                    : MenuFoldOutlined,
                                {
                                    className: 'trigger',
                                    onClick: () => setCollapsed(!collapsed),
                                }
                            )}
                            <div
                                style={{
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                }}
                            >
                                <span>
                                    {welcomeText.toUpperCase()}, {name}
                                </span>
                                <img
                                    style={{
                                        width: '30px',
                                        borderRadius: '100%',
                                        cursor: 'pointer',
                                    }}
                                    src={avatar}
                                    alt="user-avatar"
                                    onClick={() => navigate('/profile-setting')}
                                />
                            </div>
                        </div>
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
