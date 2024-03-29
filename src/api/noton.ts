import { ArticleInfo } from "@/store/type";
import Http from "./base";

export async function getNotionCMSBlogs(): Promise<{
  tabBlogs: {
    [tab: string]: (
      | ArticleInfo
      | { collection: string; articles: ArticleInfo[] }
    )[];
  };
} | null> {
  try {
    const res = await Http._get("/api/getNotionBlogs");
    //@ts-ignore
    return res;
  } catch (err) {
    __DEV__ && console.error("getNotionCMSBlogs error:", err);
    return null;
  }
}

export async function getNotionArticleRecordMaps(articleId: string) {
  try {
    const res = await Http._get("/api/getNotionArticleContent", {
      articleId,
    });
    return res;
  } catch (err) {
    __DEV__ && console.error("getNotionArticleContent error:", err);
    return null;
  }
}
