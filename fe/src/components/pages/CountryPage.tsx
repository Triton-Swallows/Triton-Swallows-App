import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { HeaderNav } from "../molecules/HeaderNav";
import { RequireLoginDialog } from "../organisms/dialogs/requireLoginDialog";
import { Button } from "../ui/button";
import apiClient from "@/config/apiClient";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

type Country = {
  country_id: number;
  name: string;
  name_en: string; //パス表示用に国の英語名を取得
  cheer_count: number;
  available: boolean; //運営側が掲載準備できているかどうか
  cheered_by_me?: boolean; //ゲストユーザーには存在しない。
};

type CountriesResponse = {
  data: Country[];
};

export const CountryPage = () => {
  const authContext = AuthContextConsumer();
  const isLoggedIn = !!authContext.loginUser;

  const [countries, setCountries] = useState<Country[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const endpoint = isLoggedIn ? "/countries" : "/guest/countries";
        const response = await apiClient.get<CountriesResponse>(endpoint);
        setCountries(response.data.data);
      } catch (error) {
        console.error("国一覧の取得に失敗しました", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [isLoggedIn]);
  const handleToggleCheer = async (countryId: number, cheeredByMe: boolean) => {
    // ログインしてねダイアログ
    if (!isLoggedIn) {
      setDialogOpen(true);
      return;
    }

    // 楽観的UI更新
    setCountries((prev) =>
      prev.map((country) =>
        country.country_id === countryId
          ? { ...country, cheered_by_me: !cheeredByMe }
          : country,
      ),
    );

    try {
      // APIをコール
      if (cheeredByMe) {
        // 既に応援済みなら取り消し
        await apiClient.delete(`/country_cheers/${countryId}`);
      } else {
        // 応援を追加
        await apiClient.post("/country_cheers", { country_id: countryId });
      }
    } catch (error) {
      // 失敗時はロールバック
      setCountries((prev) =>
        prev.map((country) =>
          country.country_id === countryId
            ? { ...country, cheered_by_me: cheeredByMe }
            : country,
        ),
      );
      console.error("応援の更新に失敗しました:", error);
    }
  };

  return (
    <HeaderLayout>
      <HeaderNav path={"/"} label="トップページ" title="国リスト" />
      {isFetching ? (
        <div>読み込み中...</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 px-4 pb-6">
          {countries.map((country) => (
            <div
              key={country.country_id}
              className="relative flex min-h-[168px] flex-col justify-between rounded-xl bg-[#A8C9DE] p-3"
            >
              {country.available && (
                <Link
                  to={`/${country.name_en}/packing-list`}
                  className="absolute inset-0 rounded-xl"
                  aria-label={`${country.name}の持ち物一覧へ`}
                />
              )}
              <p className="relative z-10 rounded-md px-1 py-1 text-center text-[16px] font-medium text-[#002B45]">
                {country.name}
              </p>
              {/* availableでない国には応援ボタンを表示 */}
              {!country.available && (
                <>
                  <p className="relative z-10 px-1 text-center text-[12px] font-medium text-[#0F3A56]">
                    追加してほしい人は応援してね！
                  </p>
                  <Button
                    onClick={() =>
                      handleToggleCheer(
                        country.country_id,
                        !!country.cheered_by_me,
                      )
                    }
                    className={`relative z-10 h-9 rounded-lg text-[14px] font-bold transition-colors ${
                      country.cheered_by_me
                        ? "bg-[#00588C] text-[#FAF6F0] hover:bg-[#004B77]"
                        : "border border-[#00588C] bg-white text-[#00588C] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    応援
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <RequireLoginDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </HeaderLayout>
  );
};
