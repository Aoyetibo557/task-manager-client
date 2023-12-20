"use client";
import React from "react";
import store from "./store.ts";
import { Provider } from "react-redux";

type props = {
  children: React.ReactNode;
};

export const ReduxProvider: React.FC<props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
