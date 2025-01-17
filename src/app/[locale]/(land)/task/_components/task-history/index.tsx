"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useClientTranslation } from "@/hooks/global";

import { HistoryContent } from "./history-content";

export function HistoryModal({ setTaskResult, setTaskData }: any) {
  const { t } = useClientTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="w-full">
          {/* <HistoryIcon size={16} /> */}
          历史记录
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("global:history.title")}</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <HistoryContent
          setTaskResult={setTaskResult}
          setTaskData={setTaskData}
        />
      </DialogContent>
    </Dialog>
  );
}
