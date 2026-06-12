import { DictionaryMeta } from "../types/Dictionary";
import { LangPair } from "../types/Langs";
import { createDictionary, addPair, removePair, getDictionary, getAllDictionaries } from "./dictionariesStore";
import { getMetaItem, setMetaItem } from "./userMetaStore";

const DEFAULT_NAME = "Favorites"

export async function ensureFavoritesDictionary() {
  const favDictId = await getMetaItem("favoriteDictionaryId");
  if (favDictId) {
    const existingFavDict = await getDictionary(favDictId);
    if (existingFavDict)
      return;
  }
  const allDicts = await getAllDictionaries();
  const existingFavDict = allDicts.find(dict => dict.meta.isFavorites);
  if (existingFavDict) {
    await setMetaItem('favoriteDictionaryId', existingFavDict.meta.id);
    return;
  }
  const newFavDict = await createDictionary({
    name: DEFAULT_NAME
  }, true);
  await setMetaItem('favoriteDictionaryId', newFavDict.meta.id);
}
export async function addFavoriteTranslation(source: string, target: string, langPair: LangPair) { }
export async function isTranslationFavorite(source: string, target: string, langPair: LangPair) { }
export async function removeFavoriteTranslationByContent(source: string, target: string, langPair: LangPair) { }
