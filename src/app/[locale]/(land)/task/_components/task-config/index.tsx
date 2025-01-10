"use client";

import * as React from "react";

import { CaretSortIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useClientTranslation } from "@/hooks/global";
import DynamicForm from "./dynamic-form";

const TaskConfig = ({ taskData, onTaskDataChange, onTaskResult }: any) => {
  const [showAdvancedConfig, setShowAdvancedConfig] = React.useState(false);
  const { t } = useClientTranslation();

  return (
    <div className="w-full space-y-4">
      <Card className="w-full rounded-none">
        <CardHeader className="flex-row items-center justify-between">
          <div className="flex-1 space-y-1">
            <CardTitle>{t("基础设置")}</CardTitle>
            <CardDescription>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="max-h-[calc(100vh-24.5rem)] space-y-4 overflow-y-auto">
          <div className="w-full">
            <Label htmlFor="start-url">起始链接</Label>
            <Input id="start-url" placeholder="起始链接" className="w-full" value={taskData.startUrl} onChange={(e) => onTaskDataChange("startUrl", e.target.value)} />
          </div>

          <div className="w-full">
            <Label htmlFor="task-description">任务描述</Label>
            <Textarea id="task-description" rows={4} placeholder="任务描述" className="w-full" value={taskData.taskDescription} onChange={(e) => onTaskDataChange("taskDescription", e.target.value)} />
          </div>
          <div className="w-full">
            <Label htmlFor="max-depth">最大爬取深度</Label>
            <Input type="number" min={1} id="max-depth" placeholder="最大爬取深度" className="w-full" value={taskData.maxDepth} onChange={(e) => onTaskDataChange("maxDepth", Number(e.target.value))} />
          </div>
          <div className="w-full">
            <Label htmlFor="max-links">最大链接数量</Label>
            <Input type="number" min={1} id="max-links" placeholder="最大链接数量" className="w-full" value={taskData.maxLinks} onChange={(e) => onTaskDataChange("maxLinks", Number(e.target.value))} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full" onClick={() => onTaskResult(taskData)}>开始任务</Button>
        </CardFooter>
      </Card>

      <Card className="w-full rounded-none">
        <Collapsible open={showAdvancedConfig} onOpenChange={setShowAdvancedConfig}>
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex-1 space-y-1">
              <CardTitle>{t("高级设置")}</CardTitle>
              <CardDescription>
              </CardDescription>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="max-h-[calc(100vh-24.5rem)] overflow-y-auto">
              <DynamicForm taskData={taskData} onTaskDataChange={onTaskDataChange} />
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
        {/* <CardFooter className="flex justify-between">
        </CardFooter> */}
      </Card>

    </div>

  );
};



export default TaskConfig;
