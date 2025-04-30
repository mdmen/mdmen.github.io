import { type CollectionKey, getCollection } from "astro:content";

export async function getSortedPosts(key: CollectionKey) {
  const entries = await getCollection(key);

  return entries.toSorted((a, b) => {
    const aPubDate = a.data.datePublish;
    const bPubDate = b.data.datePublish;

    if (!aPubDate && !bPubDate) return 0;
    if (!aPubDate) return -1;
    if (!bPubDate) return 1;

    return bPubDate.getTime() - aPubDate.getTime();
  });
}
