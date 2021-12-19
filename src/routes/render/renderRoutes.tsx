import { useMemo, Suspense } from 'react'
import {  BrowserRouter as Router, Route, Switch, NavLink, useRouteMatch } from 'react-router-dom'
import { Transition, TransitionGroup } from 'react-transition-group'
import { RouteItem } from '../types'

interface Props {
  isRoot?: boolean,
  routes?: RouteItem[]
}
export function useRenderRouteContent(
  {
    isRoot,
    routes
  }: Props
) {
  const content = useMemo(() => {
    if (!routes) {
      return null
    }
    const routesContent = <TransitionGroup component={null}>
        <Transition
          appear={true}
          timeout={{enter: 750, exit: 150}}
        >
          <Switch>
            {
              routes.map(
                ({
                  path,
                  component,
                  exact
                }, index) => {
                  return <Route exact={exact} path={path} children={component} key={path + index}/>
                })
             }
            {/* <Route path='*' component={()  => <>not found</>}/> */}
          </Switch>
        </Transition>
    </TransitionGroup>
    
    if (isRoot) {
      return <Router>
        {routesContent}
      </Router>
    } else {
      return routesContent
    }
  },
    [routes]
  ) 
  
  return useMemo(() => ({
    content
  }), [content])
}