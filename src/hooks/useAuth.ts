"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { clearAuth, setAuthUser, setAuthLoading } from "@/lib/store/authSlice";
import { axiosInstance } from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { IUser } from "@/types/auth/auth.types";

export function useAuth() {
  const dispatch = useDispatch();
  const { user, accessToken, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  const logout = async () => {
    try {
      dispatch(setAuthLoading(true));
      await axiosInstance.post(API_ROUTES.AUTH.LOGOUT);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      dispatch(clearAuth());
      dispatch(setAuthLoading(false));
    }
  };

  const updateUser = (updatedUser: Partial<IUser>) => {
    if (user) {
      dispatch(
        setAuthUser({
          user: { ...user, ...updatedUser },
          accessToken: accessToken!,
        }),
      );
    }
  };

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    logout,
    updateUser,
  };
}
