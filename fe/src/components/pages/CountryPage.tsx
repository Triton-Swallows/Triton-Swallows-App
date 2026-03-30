import { Link } from "react-router-dom";
import { useState } from "react";
import { HeaderLayout } from "../templetes/HeaderLayout";
import { HeaderNav } from "../molecules/HeaderNav";
import { RequireLoginDialog } from "../organisms/dialogs/requireLoginDialog";
import { Button } from "../ui/button";
import apiClient from "@/config/apiClient";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

type Country = {
  name: string;
  path: string;
  cheered_by_me: boolean;
  available: boolean;
};

const initialCountries: Country[] = [
  {
    name: "アメリカ（米国）",
    path: "/usa/packing-list",
    cheered_by_me: false,
    available: true,
  },
  {
    name: "韓国",
    path: "/korea/packing-list",
    cheered_by_me: false,
    available: false,
  },
  {
    name: "台湾",
    path: "/taiwan/packing-list",
    cheered_by_me: false,
    available: false,
  },
  {
    name: "タイ",
    path: "/thailand/packing-list",
    cheered_by_me: false,
    available: false,
  },
  {
    name: "ベトナム",
    path: "/vietnam/packing-list",
    cheered_by_me: false,
    available: false,
  },
];

export const CountryPage = () => {
  const authContext = AuthContextConsumer();
  const [countries, setCountries] = useState<Country[]>(initialCountries);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleToggleCheer = async (
    countryPath: string,
    cheered_by_me: boolean,
  ) => {
    // ログインしてねダイアログ
    if (!authContext.loginUser) {
      setDialogOpen(true);
      return;
    }

    setCountries((prev) =>
      prev.map((country) =>
        country.path === countryPath
          ? { ...country, cheered_by_me: !cheered_by_me }
          : country,
      ),
    );

    try {
      // APIをコール
      if (cheered_by_me) {
        // 既に応援済みなら取り消し
        await apiClient.delete(`/cheer/${countryPath}`);
      } else {
        // 応援を追加
        await apiClient.post("/cheer", { country_path: countryPath });
      }
    } catch (error) {
      // 失敗時はロールバック
      setCountries((prev) =>
        prev.map((country) =>
          country.path === countryPath
            ? { ...country, cheered_by_me }
            : country,
        ),
      );
      console.error("Cheer request failed:", error);
    }
  };

  return (
    <HeaderLayout>
      <HeaderNav path={"/"} label="トップページ" title="国リスト" />
      <div className="grid grid-cols-2 gap-4 px-4 pb-6">
        {countries.map((country) => (
          <div
            key={country.path}
            className="relative flex min-h-[168px] flex-col justify-between rounded-xl bg-[#A8C9DE] p-3"
          >
            {country.available && (
              <Link
                to={country.path}
                className="absolute inset-0 rounded-xl"
                aria-label={`${country.name}の持ち物一覧へ`}
              />
            )}
            <p className="relative z-10 rounded-md px-1 py-1 text-center text-[16px] font-medium text-[#002B45]">
              {country.name}
            </p>
            {!country.available && (
              <>
                <p className="relative z-10 px-1 text-center text-[12px] font-medium text-[#0F3A56]">
                  追加してほしい人は応援してね！
                </p>
                <Button
                  onClick={() =>
                    handleToggleCheer(country.path, country.cheered_by_me)
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
      <RequireLoginDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </HeaderLayout>
  );
};
