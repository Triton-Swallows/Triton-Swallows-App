import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { RequireLoginDialog } from "../organisms/dialogs/requireLoginDialog";
import { Button } from "../ui/button";
import apiClient from "@/config/apiClient";
import { AuthContextConsumer } from "@/contexts/AuthContexts";
import cheerAnimation from "@/assets/animation/Yellow Thumbs Up.json";

const countryImageModules = import.meta.glob(
  "../../assets/country_images/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const countryImages = Object.fromEntries(
  Object.entries(countryImageModules).map(([path, url]) => {
    const fileName = path.split("/").pop() ?? "";
    const baseName = fileName.replace(/\.[^.]+$/, "").toLowerCase();

    return [baseName, url];
  }),
);

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
  const lottieInstancesRef = useRef<Record<number, any>>({});

  const [countries, setCountries] = useState<Country[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [animatingCountryId, setAnimatingCountryId] = useState<number | null>(
    null,
  );

  const syncCheerFrame = (countryId: number, cheeredByMe: boolean) => {
    const instance = lottieInstancesRef.current[countryId];

    if (!instance || animatingCountryId === countryId) {
      return;
    }

    const totalFrames = Math.max(1, Math.floor(instance.totalFrames ?? 1));
    // 未応援は先頭フレーム、応援済みは最終フレームに止める。
    const targetFrame = cheeredByMe ? totalFrames - 1 : 0;

    instance.goToAndStop(targetFrame, true);
  };

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

  useEffect(() => {
    countries.forEach((country) => {
      syncCheerFrame(country.country_id, !!country.cheered_by_me);
    });
  }, [countries, animatingCountryId]);

  const handleToggleCheer = async (countryId: number, cheeredByMe: boolean) => {
    // ログインしてねダイアログ
    if (!isLoggedIn) {
      setDialogOpen(true);
      return;
    }

    if (!cheeredByMe) {
      setAnimatingCountryId(countryId);
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
      setAnimatingCountryId((currentId) =>
        currentId === countryId ? null : currentId,
      );
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
    <HeaderLayout transparent={false} showBackButton title="国リスト" path="/">
      {isFetching ? (
        <div>読み込み中...</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 px-4 pb-6 pt-[10px]">
          {countries.map((country) => (
            <div
              key={country.country_id}
              className="relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-3xl p-3"
              style={
                countryImages[country.name_en.toLowerCase()]
                  ? {
                      backgroundImage: `url(${countryImages[country.name_en.toLowerCase()]})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }
                  : undefined
              }
            >
              {country.available && (
                <>
                  <Link
                    to={`/${country.name_en}/packing-list`}
                    className="absolute inset-0 rounded-xl"
                    aria-label={`${country.name}の持ち物一覧へ`}
                  />
                  <p className="absolute bottom-3 left-3 z-10 text-left text-[16px] font-medium text-white">
                    {country.name}
                  </p>
                </>
              )}
              {/* availableでない国には応援ボタンを表示 */}
              {!country.available && (
                <>
                  <p className="relative z-10 px-1 text-center text-[12px] font-medium text-[#FAFAFA]">
                    追加してほしい人は応援してね！
                  </p>
                  <div className="relative z-10 flex items-center justify-center">
                    <Button
                      onClick={() =>
                        handleToggleCheer(
                          country.country_id,
                          !!country.cheered_by_me,
                        )
                      }
                      className={`relative z-10 size-20 rounded-full border-2 p-0 transition-colors ${
                        country.cheered_by_me
                          ? "border-white bg-black/50 hover:bg-white/15"
                          : "border-white bg-transparent hover:bg-white/15"
                      }`}
                    >
                      {/* idle/animating/cheeredをkeyで切り替えてLottieを再初期化*/}
                      <Player
                        key={`${country.country_id}-${
                          animatingCountryId === country.country_id
                            ? "animating"
                            : country.cheered_by_me
                              ? "cheered"
                              : "idle"
                        }`}
                        // 押した直後だけ再生し、それ以外は静止フレームとして扱う
                        autoplay={animatingCountryId === country.country_id}
                        keepLastFrame={!!country.cheered_by_me}
                        loop={false}
                        lottieRef={(instance) => {
                          if (instance) {
                            lottieInstancesRef.current[country.country_id] =
                              instance;
                            syncCheerFrame(
                              country.country_id,
                              !!country.cheered_by_me,
                            );
                            return;
                          }

                          delete lottieInstancesRef.current[country.country_id];
                        }}
                        src={cheerAnimation}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-47%, -54%)",
                          height: "120px",
                          width: "120px",
                          pointerEvents: "none",
                        }}
                        onEvent={(event) => {
                          if (event === "ready") {
                            syncCheerFrame(
                              country.country_id,
                              !!country.cheered_by_me,
                            );
                          }

                          if (event === "complete") {
                            setAnimatingCountryId((currentId) =>
                              currentId === country.country_id
                                ? null
                                : currentId,
                            );
                          }
                        }}
                      />
                    </Button>
                  </div>
                  <p className="relative z-10 text-left text-[16px] font-medium text-white">
                    {country.name}
                  </p>
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
