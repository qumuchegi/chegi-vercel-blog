import React, { Suspense } from 'react';
import { RouteItem } from '../types';
import { useRenderRouteContent } from './renderRoutes';
import styles from '../style/loadable.module.less'
import Loading from '@/Components/Loading';

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
  return <Suspense fallback={
    <Loading infinite text='loading... ...'/>
  }>
    <div className={childrenLayout === 'horzontal' ? styles.horzontalLayout : styles.verticleLayout}>
      <LazyComponent />
      {/* <div>{renderChildRoutes?.navs}</div> */}
      {renderChildRoutes?.content}
    </div>
  </Suspense>
}