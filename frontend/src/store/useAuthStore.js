import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: {name: "nikhil", _id: 123, age: 19},
    isLoggedIn: false,

    login: () => {
        set({isLoggedIn: true})
        console.log("We just logged in.");
    }
}))