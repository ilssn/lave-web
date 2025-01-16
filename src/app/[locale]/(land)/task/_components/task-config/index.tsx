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
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useClientTranslation } from "@/hooks/global";
import { RotateCcw, StarsIcon } from "lucide-react";
import BrowserForm from "./browser-from";
import DynamicForm from "./dynamic-form";
import LinkTabs from "./link-tabs";
import ModelForm from "./model-form";
import ProxyForm from "./proxy-form";

const TaskConfig = ({ taskData, onTaskDataChange, onTaskResult, taskResult, loading, onResetTaskData }: any) => {
  const [showAdvancedConfig, setShowAdvancedConfig] = React.useState(true);
  const { t } = useClientTranslation();

  return (
    <div className="w-full space-y-4">
      <Card className="w-full rounded-none">
        <CardHeader className="flex-row items-center justify-between">
          <div className="flex-1 space-y-1">
            <CardTitle className="flex items-center justify-between">
              <div className="text-lg font-bold">{t("基础设置")}</div>
              <div className="flex items-center justify-end space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="" size="icon" variant="ghost" onClick={() => onResetTaskData("test")}>
                        <StarsIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      快速测试
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="" size="icon" variant="ghost" onClick={() => onResetTaskData("default")}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      重置表单
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

            </CardTitle>
            <CardDescription>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="max-h-[calc(100vh-24.5rem)] space-y-4 overflow-y-auto">
          {/* <div className="w-full">
            <Label htmlFor="start-url">起始链接</Label>
            <Input id="start-url" placeholder="起始链接" className="w-full" value={taskData.startUrl} onChange={(e) => onTaskDataChange("startUrl", e.target.value)} />
          </div> */}

          <div className="w-full">
            <Label htmlFor="task-description">任务描述</Label>
            <Textarea id="task-description" rows={4} placeholder="任务描述" className="w-full" value={taskData.taskDescription} onChange={(e) => onTaskDataChange("taskDescription", e.target.value)} />
          </div>
          <div className="w-full">
            <LinkTabs
              links={taskData.startUrls}
              setLinks={(links: string[]) => {
                onTaskDataChange("startUrls", links);
                onTaskDataChange("maxLinks", Math.max(taskData.maxLinks, links.length));
              }}
            />
          </div>

        </CardContent>
        <CardFooter className="flex justify-between space-x-4">
          <Button variant="outline" className="w-full">历史记录</Button>
          <Button
            className="w-full"
            disabled={loading || taskData.startUrls.length === 0}
            onClick={() => onTaskResult(taskData)}
          >
            {loading ? `任务进行中... ${taskResult?.length || 0}/${taskData.maxLinks}` : "开始任务"}
          </Button>
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
              <Tabs defaultValue="data-config" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="data-config" className="data-[state=active]:text-primary">数据设置</TabsTrigger>
                  <TabsTrigger value="model-config" className="data-[state=active]:text-primary">模式设置</TabsTrigger>
                  <TabsTrigger value="proxy-config" className="data-[state=active]:text-primary">代理设置</TabsTrigger>
                  <TabsTrigger value="browser-config" className="data-[state=active]:text-primary">浏览器设置</TabsTrigger>
                </TabsList>
                <TabsContent value="data-config">
                  <DynamicForm taskData={taskData} onTaskDataChange={onTaskDataChange} />
                </TabsContent>
                <TabsContent value="model-config">
                  <ModelForm taskData={taskData} onTaskDataChange={onTaskDataChange} />
                </TabsContent>
                <TabsContent value="proxy-config">
                  <ProxyForm taskData={taskData} onTaskDataChange={onTaskDataChange} />
                </TabsContent>
                <TabsContent value="browser-config">
                  <BrowserForm taskData={taskData} onTaskDataChange={onTaskDataChange} />
                </TabsContent>
              </Tabs>
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
