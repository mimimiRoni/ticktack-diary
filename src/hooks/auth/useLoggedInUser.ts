"use client";

import { auth } from "@/configs/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useLoggedInUser = () => {
  const [loginUser, setUser] = useState<User | null>(null);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && path !== "/login") {
        sessionStorage.setItem("redirectPathFromLogin", path);
        router.push("/login");
      } else if (
        user &&
        user.emailVerified === false &&
        path !== "/verify-email"
      ) {
        sessionStorage.setItem("redirectPathFromLogin", path);
        router.push("/verify-email");
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [path, router]);

  return { loginUser };
};
