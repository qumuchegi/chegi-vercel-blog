import React, {
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./style.less";

export enum AnimType {
  Jump = "jump",
  Pop = "pop",
  Flip = "flip",
  Blink = "blink",
}

export default forwardRef(Loading);
function Loading(
  {
    animType,
    text,
    infinite = true,
    autoOnce = true,
  }: {
    animType?: AnimType;
    text: string;
    infinite?: boolean;
    autoOnce?: boolean;
  },
  ref: any
) {
  const h1TextRef = useRef<any>();
  const animDuration = text.length * 0.1 * 1000;
  const playAnim = useCallback((animType: AnimType) => {
    if (!h1TextRef.current) return;
    h1TextRef.current.innerHTML = h1TextRef.current.textContent.replace(
      /\S/g,
      "<span>$&</span>"
    );
    document.querySelectorAll("span").forEach((span, index) => {
      span.style.setProperty("--delay", `${index * 0.1}s`);
    });
    h1TextRef.current.style.setProperty("--animation", animType);

    h1TextRef.current.classList.remove("animate");
    void h1TextRef.current.offsetWidth;
    h1TextRef.current.classList.add("animate");
  }, []);
  const loopAnim = useCallback(() => {
    setInterval(() => playAnim(animType || AnimType.Jump), animDuration);
  }, [playAnim, animDuration]);

  useEffect(() => {
    if (infinite) {
      loopAnim();
    } else if (autoOnce) {
      playAnim(animType || AnimType.Jump);
    }
  }, [loopAnim, infinite, playAnim]);

  useImperativeHandle(ref, () => ({
    playAnim,
  }));
  return (
    <h1 ref={h1TextRef} id="anim-h1">
      {text}
    </h1>
  );
}
