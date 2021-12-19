import React from "react"

export type RouteItem = {
  title: string
  path: string
  exact?: boolean
  component?: JSX.Element
}