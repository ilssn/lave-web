"use client";

import { useHistoryStore } from "@/stores";
import { HistoryType } from "@/stores/slices/history-slice";

export const useCrawlerHistory = () => {
  const historys = useHistoryStore((state) => state.historys);
  const crawlerAllHistorys = historys.filter(
    (it) => it.type === HistoryType.DATA_EXTRACT
  );
  // boolean
  const isEmpty = crawlerAllHistorys.length < 1;

  return {
    allHistorys: crawlerAllHistorys,
    isEmpty,
  };
};
