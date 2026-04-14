"use client";

import { useAuth } from "@clerk/nextjs";
import React from "react";

type ShowWhen = "signed-in" | "signed-out";

interface ShowProps {
  when: ShowWhen;
  children: React.ReactNode;
}

export function Show({ when, children }: ShowProps) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  const shouldShow = when === "signed-in" ? isSignedIn : !isSignedIn;

  return shouldShow ? <>{children}</> : null;
}
