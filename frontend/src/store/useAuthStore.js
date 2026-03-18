import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigninUp: false,

  signUp: async (userData) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", userData);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Error in signup auth:\n", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUp: false });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in check auth:\n", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

export default useAuthStore;
