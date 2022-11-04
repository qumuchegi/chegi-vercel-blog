import React, { useCallback, useEffect, useRef } from "react";
import styles from "./styles.module.less";
import Loading, { AnimType } from "@/Components/Loading";
import Card from "@/Components/Card";
import enterIc from "@/assets/img/enter.png";

// const PRJ = [
//   {
//     name: "Blog Comment",
//     avatar: "https://blog-comment-doc-site.vercel.app/img/logo.png",
//     desc: "一个开箱即用的评论组件",
//     url: "https://blog-comment-doc-site.vercel.app/",
//     githubFork:
//       "https://img.shields.io/github/forks/qumuchegi/blog-comment?style=social",
//   },
// ];

export default function Welcome() {
  // const toPrjDetails = useCallback((url) => {
  //   window.open(url)
  // }, [])
  return (
    <div className={styles.container}>
      <div className={styles.hello}>
        <Loading
          text="welcome to chegi's space"
          infinite={true}
          animType={AnimType.Pop}
        />
      </div>
      {/* <div className={styles['prj-list']}>
      {
        PRJ.map(({
          name, avatar, desc, url, githubFork
        }) => {
          return <Card key={name}>
            <div className={styles.item} onClick={() => toPrjDetails(url)}>
              <img src={enterIc} className={styles['enter-prj']}/>
              <img src={avatar} className='prj-avatar'/>
              <img src={githubFork} alt='Github'/>
              <h4>{name}</h4>
              <p className={styles['prj-desc']}>{desc}</p>
            </div>
          </Card>
        })
      }
    </div> */}
    </div>
  );
}
