"use client";

import { env } from "@/env";

import { apiAuth } from "../lib/api";

interface LoginResult {
  success: boolean;
  data?: {
    code: string;
    info: string;
    apiKey: string;
    modelName: string;
    region: string;
    showBrand: string;
  };
}

export const login = async (code?: string): Promise<LoginResult> => {
  const hostname = window.location.host.split(".")[0];

  const res = await apiAuth(`bot/v1/${hostname}${code ? `?pwd=${code}` : ""}`);
  let errorMessage = "global:error.unknow_error";

  if (res.status !== 200) {
    errorMessage = "global:error.network_error";
  }

  const data = await res.json();

  if (data.code === 0) {
    return {
      success: true,
      data: {
        code: code || "",
        info: data.data.info,
        apiKey: data.data.api_key,
        modelName: data.data.model_name || env.NEXT_PUBLIC_DEFAULT_MODEL_NAME!,
        region: data.data.region,
        showBrand: data.data.settings.hideBrand ? "false" : "true",
      },
    };
  }

  if (data.code === -101) {
    errorMessage = "global:error.tool_deleted";
  } else if (data.code === -100) {
    errorMessage = "global:error.tool_disabled";
  } else if (data.code === -99) {
    errorMessage = "global:error.code_invalid";
  }
  throw new Error(errorMessage);
};
