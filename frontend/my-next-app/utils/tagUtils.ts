import { TAGS } from "@/constants"; 

/**
 * タグ名の配列からIDの配列に変換
 * @param tagNames タグ名の配列
 * @returns IDの配列（1始まり）
 */
export const tagNamesToIds = (tagNames: string[]): number[] => {
  return tagNames
    .map(name => {
      const index = TAGS.indexOf(name as typeof TAGS[number]);
      return index !== -1 ? index + 1 : null;
    })
    .filter((id): id is number => id !== null);
};
