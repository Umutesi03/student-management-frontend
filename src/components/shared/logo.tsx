// components/shared/Logo.tsx
"use client";
// import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export const Logo = () => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-center mb-6">
      <Image
        src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
        alt="Logo"
        width={80}
        height={80}
      />
    </div>
  );
};
