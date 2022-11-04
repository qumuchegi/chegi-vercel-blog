import { combineClassNames } from "@/utils/style";
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useRef,
  useEffect,
} from "react";
import styles from "./style.module.less";

interface IProps {
  header?: JSX.Element;
  children?: JSX.Element;
}
export type BottomSheetHandle = {
  open: () => void;
  close: () => void;
};
export default forwardRef(BottomSheet);

function BottomSheet({ header, children }: IProps, ref: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerStyleClassName, toogleContainerStyleClassName] =
    useState<string>(styles.close);
  const [bgStyleClassName, toogleBgStyleClassName] = useState<string>(
    styles.closeBg
  );
  const onRequestClose = useCallback(() => {
    toogleContainerStyleClassName(styles.close);
    toogleBgStyleClassName(styles.openBg);
  }, []);
  const onRequestOpen = useCallback(() => {
    toogleContainerStyleClassName(styles.open);
    toogleBgStyleClassName(styles.closeBg);
  }, []);

  useImperativeHandle(ref, () => ({
    open: onRequestOpen,
    close: onRequestClose,
  }));

  return (
    <div
      className={combineClassNames(
        styles.outerContainer,
        containerStyleClassName
      )}
      ref={containerRef}
    >
      <div className={styles.container}>
        <div
          className={combineClassNames(styles.background, bgStyleClassName)}
          onClick={onRequestClose}
        />
        <div className={styles.bottomSheet}>
          <div className={styles.header} onClick={onRequestClose}>
            {header ?? <div className={styles.line} onClick={() => {}}></div>}
          </div>
          <div className={combineClassNames(styles.content)}>{children}</div>
        </div>
      </div>
    </div>
  );
}
