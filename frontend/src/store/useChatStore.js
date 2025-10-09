import { axiosInstance } from "../lib/axios";
import { create } from 'zustand';
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create(
    persist(
        (set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true" ? true : false,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled.toString());
        set({isSoundEnabled: !get().isSoundEnabled});
    },

    setActiveTab: (tab) => set({activeTab: tab}),
    setSelectedUser: (selectedUser) => set({selectedUser}),

    getAllContacts: async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({allContacts: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUsersLoading: false});
        }
    },

    getMyChatPartners: async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({chats: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUsersLoading: false});
        }
    },

    getMessagesByUserId: async (userId) => {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({isMessagesLoading: false});
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();

        if (!selectedUser) return toast.error("No user selected!");

        try {
            // Send message to backend
            const res = await axiosInstance.post(
            `/messages/send/${selectedUser._id}`,
            messageData
            );

            const authUser = useAuthStore.getState().authUser;

            // Optimistically update UI instantly
            const newMessage = {
            ...res.data, // include backend response (like _id, timestamps)
            senderId: authUser?._id,
            receiverId: selectedUser._id,
            createdAt: new Date().toISOString(),
            };

            set({ messages: [...messages, newMessage] });
        } catch (error) {
            set({messages: messages})
            console.error("Error sending message:", error);
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },
    }),
    {
        name: "auth-storage", // storage key
        getStorage: () => localStorage, // persist in localStorage
    }
    )
)