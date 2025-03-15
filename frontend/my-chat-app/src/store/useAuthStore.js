import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
const TOKEN_KEY = "chatty_auth_token";

// Fonction pour configurer le token d'authentification dans les en-têtes axios
const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    
    // Récupérer le token depuis localStorage
    const token = localStorage.getItem(TOKEN_KEY);
    
    // Si pas de token, l'utilisateur n'est pas authentifié
    if (!token) {
      set({ authUser: null, isCheckingAuth: false });
      return;
    }
    
    // Configurer le token dans les en-têtes
    setAuthToken(token);
    
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      // En cas d'erreur (token invalide ou expiré), supprimer le token
      setAuthToken(null);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      
      // Stocker le token et configurer axios
      if (res.data.token) {
        setAuthToken(res.data.token);
        // Si l'API renvoie l'utilisateur et le token séparément
        set({ authUser: res.data.user || res.data });
      } else {
        // Si l'API renvoie directement l'utilisateur
        set({ authUser: res.data });
      }
      
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to sign up");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      
      // Stocker le token et configurer axios
      if (res.data.token) {
        setAuthToken(res.data.token);
        // Si l'API renvoie l'utilisateur et le token séparément
        set({ authUser: res.data.user || res.data });
      } else {
        // Si l'API renvoie directement l'utilisateur
        set({ authUser: res.data });
      }
      
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log in");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      // Supprimer le token et réinitialiser les en-têtes
      setAuthToken(null);
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      // Même en cas d'erreur, on déconnecte l'utilisateur côté client
      setAuthToken(null);
      set({ authUser: null });
      toast.error(error.response?.data?.message || "An error occurred during logout");
      get().disconnectSocket();
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
      // Envoyer le token dans la connexion socket
      auth: {
        token: localStorage.getItem(TOKEN_KEY)
      }
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

// Initialiser la vérification d'authentification au démarrage
// Cette ligne permet de charger le token lors de l'importation du module
setTimeout(() => {
  useAuthStore.getState().checkAuth();
}, 0);