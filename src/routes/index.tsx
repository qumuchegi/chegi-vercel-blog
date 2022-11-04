import { useRenderRouteContent } from "./render/index";
import rootRoutes from "./category/index";
import headerStyles from "./style/header.module.less";
import { useCallback, useEffect, useMemo } from "react";
import { getNotionCMSBlogs } from "@/api";
import ConnectStore, { useStore } from "@/store";

export default () => {
  return (
    <ConnectStore>
      <RoutesContent />
    </ConnectStore>
  );
};
function RoutesContent() {
  const { content } = useRenderRouteContent({
    isRoot: true,
    routes: rootRoutes,
  });
  const recordTabBlogs = useStore(
    (state) => state.articles.actions.recordTabBlogs
  );
  const fetchTabArticles = useCallback(async () => {
    try {
      const res = await getNotionCMSBlogs();
      // 过滤掉无效的文章
      const filtered: any = {};
      Object.entries(res?.tabBlogs ?? {}).forEach(
        ([tabName, articlesOrCollection]) => {
          filtered[tabName] = articlesOrCollection;
          // .map(item => {
          //   if (!item.collection) {
          //     return item
          //   } else {
          //     console.log({
          //       articlesOrCollection
          //     });
          //     // collection
          //     // @ts-ignore
          //     const {collection, articles } = articlesOrCollection
          //     return {
          //       type: 'collection',
          //       collection,
          //       articles
          //     }
          //   }
          // })
        }
      );
      recordTabBlogs(filtered);
    } catch (err) {
      __DEV__ && console.error(err);
    }
  }, []);
  useEffect(() => {
    fetchTabArticles();
  }, []);
  const toHome = useCallback(() => {
    window.location.pathname = "/";
  }, []);
  return (
    <div>
      <div className={headerStyles.container}>
        <div className={headerStyles.header}>
          <div className={headerStyles.title} onClick={toHome}>
            Chegi's space
          </div>
        </div>
        <div className={headerStyles.links}>
          <a
            href="https://github.com/qumuchegi"
            target="_blank"
            title="qumuchegi github"
          >
            <img
              src="https://img.shields.io/github/stars/qumuchegi?style=social"
              alt="Github"
            />
          </a>
        </div>
      </div>
      {content}
    </div>
  );
}
