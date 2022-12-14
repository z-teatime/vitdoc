import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useComponentInfo, useRouteMap } from "./utils/loaders";
import { ProLayout } from "@ant-design/pro-layout";
import { LinkCopy } from "./components/link-copy";
import ReadmePane from "./pages/readme-pane";
import { useBoolean } from "ahooks";
import classNames from "classnames";

import "./global.scss";

export function App() {
  const { tree: menuData, routes } = useRouteMap() || {};

  menuData?.forEach((item) => (item.icon = <span>📦</span>));

  const { push } = useHistory();

  const { npmLink } = useComponentInfo() || ({} as any);

  const [collapsed, { toggle }] = useBoolean(false);

  const { pathname } = useLocation();

  if (!routes) {
    return null;
  }

  return (
    <ProLayout
      siderMenuType="group"
      title={false}
      hide={routes.length < 2}
      collapsed={collapsed}
      onCollapse={toggle}
      breakpoint="lg"
      location={{ pathname }}
      className={classNames(
        "vitdoc-layout",
        collapsed && "vitdoc-layout-collapsed"
      )}
      logo={
        <a className="vitdoc-logo" href={npmLink}>
          <img
            alt="Vite Docs"
            src={
              // @ts-ignore
              window.pageConfig?.logo ||
              "//vitdocjs.github.io/logo-with-word.svg"
            }
            style={{ minHeight: 30 }}
          />
        </a>
      }
      route={{ routes: menuData }}
      pageTitleRender={(props, defaultPageTitle) => {
        return `${defaultPageTitle} - Vitdoc`;
      }}
      menu={{
        defaultOpenAll: true,
        hideMenuWhenCollapsed: true,
        ignoreFlatMenu: true,
      }}
      menuItemRender={(item, dom: ReactElement, { collapsed }) => {
        if (collapsed) {
          return "";
        }
        return React.cloneElement(dom, {
          onClick: () => push(item.path!),
          children: <LinkCopy route={item.path}>{item.name}</LinkCopy>,
        });
      }}
    >
      <Switch>
        {routes.map((route) => {
          return (
            <Route path={route}>
              <div style={{ display: "flex" }} className="code-box-demo">
                <ReadmePane key={`${route}_readme_pane`} />
              </div>
            </Route>
          );
        })}
        <Redirect to={routes[0]} />
      </Switch>
    </ProLayout>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#component-root")
);
