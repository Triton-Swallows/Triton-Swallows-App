import { liteClient as algoliasearch } from "algoliasearch/lite";

const appId = import.meta.env.VITE_ALGOLIA_APP_ID as string;
const searchApiKey = import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY as string;

export const searchClient = algoliasearch(appId, searchApiKey);
export const ALGOLIA_INDEX_NAME = "destinations";
