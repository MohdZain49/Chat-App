import { create } from "zustand";

const useAuthStore = create((set) => ({
  authUser: { _id: "2a3238kse134", name: "Mohd Zain", age: 24 },
  isLoding: true,
  isLoggedIn: false,

  login: () => {
    console.log("user logged in successfully");
    set({ isLoggedIn: true, isLoding: false });
  },
}));

export default useAuthStore;
