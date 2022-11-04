import { combineClassNames } from "@/utils/style";
import React from "react";
import "./style.less";

interface Props {
  showSkeleton: boolean;
  className?: string;
}
export default function Skeleton({ showSkeleton = false, className }: Props) {
  if (showSkeleton) {
    return (
      <div
        className={combineClassNames(className ?? "", "skelletonContainer")}
      ></div>
    );
  } else {
    return null;
  }
}
