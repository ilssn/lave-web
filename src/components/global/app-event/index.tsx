"use client";

import { initializeMonitor } from "@/lib/event";
import { useEffect } from "react";

const AppEvent = () => {
  useEffect(() => {
    initializeMonitor()
  }, []);
  return null;
};

export default AppEvent;
