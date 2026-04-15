export function getTagSimilarity(tags1: string[], tags2: string[]): number {
  const set1 = new Set(tags1);
  const set2 = new Set(tags2);
  const intersection = [...set1].filter(tag => set2.has(tag));
  const union = new Set([...set1, ...set2]);
  if (union.size === 0) return 0;
  return intersection.length / union.size;
}

export function getRelatedItems<T extends { data: { tags: string[] } }>(
  currentItem: T,
  allItems: T[],
  limit: number = 10
): T[] {
  const scored = allItems
    .filter(item => item.id !== currentItem.id)
    .map(item => ({
      item,
      similarity: getTagSimilarity(currentItem.data.tags, item.data.tags)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .reverse();
  
  return scored.map(s => s.item);
}
