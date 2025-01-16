"use client";

import dayjs from "dayjs";
import { RefreshCcw, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCrawlerHistory } from "@/hooks/crawler/use-crawler-history";
import { useClientTranslation } from "@/hooks/global";
import { useHistoryStore } from "@/stores";
import { HistoryType } from "@/stores/slices/history-slice";

export function HistoryContent({ setTaskResult, setTaskData }: any) {
  const { t } = useClientTranslation();
  const clearHistorysByType = useHistoryStore(
    (state) => state.clearHistorysByType
  );
  const crawlerHistory = useCrawlerHistory();

  if (crawlerHistory.isEmpty) return <>{t("global:history.empty")}</>;

  const handleRefresh = (history: any) => {
    console.log(history.payload);
    setTaskResult(history.payload.result);
    setTaskData(history.payload.taskData);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="left flex-1 text-sm text-slate-500">
          {t("global:history.total", {
            count: crawlerHistory.allHistorys.length,
          })}
        </div>
        <div className="">
          <Button
            size={"icon"}
            variant="outline"
            className="hover:border-red-500 hover:text-red-500"
            onClick={() => clearHistorysByType(HistoryType.DATA_EXTRACT)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      <ScrollArea className="mt-2 h-[300px] w-full rounded-md border p-4 md:h-[500px]">
        <ul className="space-y-4 text-sm">
          {crawlerHistory.allHistorys.reverse().map((history) => {
            return (
              <li key={history.id}>
                <div className="flex w-full flex-col items-center space-y-2 rounded-md bg-slate-200 p-4 dark:bg-slate-900">
                  <div className="flex w-full items-start justify-between space-x-2">
                    <div className="flex w-full flex-col space-y-1">
                      <div className="h-[20px] text-base font-medium text-primary">
                        {history.payload.taskData.taskDescription}
                      </div>
                      <div className="text-xs italic text-slate-500">
                        {dayjs(history.payload.timestamp).format(
                          "YYYY-MM-DD hh:mm:ss"
                        )}
                      </div>
                    </div>
                    {history.payload.result && (
                      <Button
                        size={"icon"}
                        onClick={() => {
                          handleRefresh(history);
                        }}
                      >
                        <RefreshCcw size={16} />
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
}
