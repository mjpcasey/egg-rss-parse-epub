import React from 'react';
// 引入scss
import './style/app.scss';
//导入组件
import { Home } from "./router";
//路由切换
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// 引入redux
// 根组件
/**
 * 渲染路由组件(根据需要修改)
 * history路由模式Router的参数
 * 1.basename  类型string, 如果你的项目在服务器上的一个子目录那么这个basename就是目录的名称
 * 2.forceRefresh:bool 如果为true在页面导航的时候后采用整个页面刷新的形式.
 * 3.keyLength location.key(表示当前位置的唯一字符串)的长度。默认为6。
 * 4.children:node 要渲染的子元素。
 * Route的参数(可传函数或组件, 值为函数时都会接受所有由route传入的所有参数):
 * 1.component: 使用React.createElement创建组件, 每次更新和渲染都会重新创建新组件, 卸载旧组件, 挂载新组件
 * 2.render: 当路由的路径匹配时调用(推荐).
 * 3.children: 当children的值是一个函数时，无论当前地址和path路径匹不匹配，都将会执行children对应的函数
 */
class App extends React.Component {
  constructor(props: any) {
    super(props);
  };
  state = {
    isError: false
  };
  componentDidMount() {

  };
  componentWillUnmount() {
  };
  // 当suspense组件加载组件出错时通过此静态方法
  static getDerivedStateFromError(error:any) {
    return { isError: true };
  }
  render() {
    if (this.state.isError) {
      // return (<NotFound />)
    }
    return (
        <div className="AppCss">
          {/* <header>头部</header> */}
          <React.Suspense fallback={null}>
            <Router >
              <Switch>
                <Route  path="/" component= {Home} />
                <Route exact path="/home" component= {Home} />
              </Switch>
            </Router>
          </React.Suspense >
          {/* <footer>尾部</footer> */}
        </div>
    );
  };
};

export default App;
