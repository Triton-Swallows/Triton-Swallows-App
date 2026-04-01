import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "@/config/apiClient";
import { AuthContextConsumer } from "@/contexts/AuthContexts";

export type CurrentUserProfile = {
  ud: string;
  user_name: string;
  email: string;
  icon_url: string;
  count: number;
  total_like_count: number;
  total_point: number;
};

type UserProfileContextType = {
  userProfile: CurrentUserProfile | null;
  loadingProfile: boolean;
  refreshProfile: () => Promise<void>;
};

const UserProfileContext = createContext<UserProfileContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const fetchCurrentUserProfile = async (): Promise<CurrentUserProfile> => {
  const response = await apiClient.get("/users/me");
  return response.data.data;
};

export const UserProfileContextProvider: React.FC<Props> = ({ children }) => {
  const { loginUser } = AuthContextConsumer();
  const [userProfile, setUserProfile] = useState<CurrentUserProfile | null>(
    null,
  );
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  const refreshProfile = async (): Promise<void> => {
    if (!loginUser) {
      setUserProfile(null);
      setLoadingProfile(false);
      return;
    }

    try {
      setLoadingProfile(true);
      const profile = await fetchCurrentUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error("ユーザー情報の取得に失敗しました。", error);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    void refreshProfile();
  }, [loginUser]);

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        loadingProfile,
        refreshProfile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const UserProfileContextConsumer = (): UserProfileContextType => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("UserProfileContextProviderの外で使われています");
  }
  return context;
};
