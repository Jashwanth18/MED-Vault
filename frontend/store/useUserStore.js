import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useUserStore = create(
  devtools(
    persist((set) => ({
      userName: null,
      isAdmin: null,
      accessToken: null,
      refreshToken: null,
      login: (userName, isAdmin, accessToken, refreshToken) =>
        set({
          userName,
          isAdmin,
          accessToken,
          refreshToken,
        }),
      logout: () =>
        set({
          userName: null,
          isAdmin: null,
          accessToken: null,
          refreshToken: null,
        }),
    })),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
