import { useState, useRef } from "react";
import {
  InstantSearch,
  Hits,
  Highlight,
  Configure,
  Stats,
  useSearchBox,
} from "react-instantsearch";
import type { Hit } from "instantsearch.js";
import { useNavigate } from "react-router-dom";
import { searchClient, ALGOLIA_INDEX_NAME } from "@/config/algolia";
import { HeaderLayout } from "@/components/templetes/HeaderLayout";

type DestinationRecord = {
  name: string;
  nameEn: string;
  region: string;
  tags: string[];
  description: string;
  packingListPath: string | null;
};

type DestinationHit = Hit<DestinationRecord>;

const CustomSearchBox = () => {
  const { refine } = useSearchBox();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refine(inputValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border rounded-lg overflow-hidden shadow-sm mb-4"
    >
      <input
        ref={inputRef}
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="検索キーワードを入力..."
        className="flex-1 px-4 py-2 outline-none text-base"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        検索
      </button>
    </form>
  );
};

const HitComponent = ({ hit }: { hit: DestinationHit }) => {
  const navigate = useNavigate();

  return (
    <div
      className="border rounded-lg p-4 mb-3 hover:bg-blue-50 cursor-pointer transition"
      onClick={() => hit.packingListPath && navigate(hit.packingListPath)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            <Highlight attribute="name" hit={hit} />
            <span className="ml-2 text-sm text-gray-500 font-normal">
              <Highlight attribute="nameEn" hit={hit} />
            </span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            <Highlight attribute="description" hit={hit} />
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {hit.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="text-xs text-gray-400 ml-4 whitespace-nowrap">
          {hit.region}
        </span>
      </div>
      {hit.packingListPath && (
        <p className="text-xs text-blue-500 mt-2">持ち物リストを見る →</p>
      )}
    </div>
  );
};

export const SearchPage = () => {
  return (
    <HeaderLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">旅行先を検索</h1>
        <InstantSearch
          searchClient={searchClient}
          indexName={ALGOLIA_INDEX_NAME}
        >
          <Configure hitsPerPage={10} />
          <CustomSearchBox />

          <Stats
            classNames={{
              root: "text-xs text-gray-400 mb-3",
            }}
          />
          <Hits<DestinationHit> hitComponent={HitComponent} />
        </InstantSearch>
      </div>
    </HeaderLayout>
  );
};
