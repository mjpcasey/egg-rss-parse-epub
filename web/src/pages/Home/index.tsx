import React, { Component, useState} from 'react';
import PropTypes from "prop-types";
import { Layout, Menu, Breadcrumb} from 'antd';
import {BrowserRouter as Router, Route , Link} from "react-router-dom";
import {ROUTES} from "../../router";
import _ from "lodash";
import 'antd/dist/antd.css';
// 引用阿里巴巴的图片 https://www.iconfont.cn/
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
const routes = ROUTES;
const { Header, Content, Sider , Footer} = Layout;
class Home extends React.Component {
    public props:any;
    public state:any;
    static contextTypes: any;
    constructor(props:any) {
        super(props);
        this.state = {
            current: "rssAdd",
            activeKey: "rssAdd"
        }
    }
    componentWillMount() {
        let pathname = this.props.location.pathname;
        let index = _.findIndex(routes, route => route.link === pathname);
        if (index === -1) {
            index = 0;
        }
        this.setState({activeKey: routes[index]['key']});
        this.updateActive(routes[index]['key']);
    }
    handleClick(e:any){
        this.setState({activeKey: e.key});
        this.updateActive(e.key);
    };
    updateActive(key: string){
        let index = _.findIndex(routes, route => route.key === key);
        this.setState({current: routes[index]['text']});
    }
    // 路由切换内容
    render() {
        return (
            <Router>
                    <Layout>
                        {/*侧边栏*/}
                        <Header >
                            {/*<div className="logo" />*/}
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                selectedKeys={[this.state.activeKey]}
                                style={{ lineHeight: '64px' }}
                                onClick={this.handleClick.bind(this)}
                            >
                                {
                                    routes.map((route) =>
                                        <Menu.Item key={route.key}>
                                            <Link to={route.link}><IconFont type={route.iconType} /><b>{route.text}</b></Link>
                                        </Menu.Item>
                                    )
                                }
                            </Menu>
                        </Header>
                        <Content style={{ padding: '0 50px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.state.current}</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                                {
                                    routes.map((route) =>
                                        <Route exact key={route.key} path={route.link} component={route.component}/>)
                                }
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Marker ©2019 Created by mjp</Footer>
                    </Layout>
            </Router>
        )
    }
}
Home.contextTypes = {
    router: PropTypes.object
};
export default Home;
