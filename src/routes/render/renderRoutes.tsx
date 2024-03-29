import { useMemo, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import { RouteItem } from "../types";

interface Props {
  isRoot?: boolean;
  routes?: RouteItem[];
}
export function useRenderRouteContent({ isRoot, routes }: Props) {
  const content = useMemo(() => {
    if (!routes) {
      return null;
    }
    const routesContent = (
      <Switch>
        <Redirect exact from="/" to="/home" />
        {routes.map(({ path, component, exact }, index) => {
          return (
            <Route
              exact={exact}
              path={path}
              children={component}
              key={path + index}
            />
          );
        })}
        {/* <Route path='*' component={()  => <>not found</>}/> */}
      </Switch>
    );

    if (isRoot) {
      return <Router>{routesContent}</Router>;
    } else {
      return routesContent;
    }
  }, [routes]);

  return useMemo(
    () => ({
      content,
    }),
    [content]
  );
}
