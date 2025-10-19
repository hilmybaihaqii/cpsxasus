import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

// Definisikan tipe untuk konteks
type AuthContextType = {
  user: any;
  signIn: () => void;
  signOut: () => void;
};

// Buat konteks
const AuthContext = createContext<AuthContextType | null>(null);

// Buat hook untuk menggunakan konteks ini di komponen lain
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Buat Provider yang akan membungkus aplikasi
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (segments.length < 1) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";

    // [GEMINI] INI SATU-SATUNYA LOGIKA YANG KITA BUTUHKAN
    // Jika user TIDAK login DAN dia TIDAK di halaman auth
    // (misal: mencoba buka /home), paksa kembali ke login.
    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    }

    // [GEMINI] BLOK INI DIHAPUS
    // if (user && inAuthGroup) {
    //   router.replace("/(tabs)/home");
    // }
  }, [user, segments, router]);

  const signIn = () => {
    // Fungsi ini HANYA mengubah status, tidak menavigasi.
    setUser({ name: "Hilmy Baihaqi" });
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
