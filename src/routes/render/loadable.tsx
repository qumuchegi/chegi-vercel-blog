import React, { Suspense, lazy, useMemo, useCallback } from 'react';
import { RouteItem } from '../types';
import { useRenderRouteContent } from './renderRoutes';
import styles from '../style/loadable.module.less'

interface Props {
  LazyComponent: React.LazyExoticComponent<() => JSX.Element>,
  childRoutes?: RouteItem[],
  childrenLayout?: 'horzontal' | 'verticle'
}
export function Loadable({
  LazyComponent,
  childRoutes,
  childrenLayout
}: Props) {
  const renderChildRoutes = useRenderRouteContent({
    routes: childRoutes
  })
  return <Suspense fallback={<div>loading ...</div>}>
    <div className={childrenLayout === 'horzontal' ? styles.horzontalLayout : styles.verticleLayout}>
      <LazyComponent />
      {/* <div>{renderChildRoutes?.navs}</div> */}
      {renderChildRoutes?.content}
    </div>
  </Suspense>
}