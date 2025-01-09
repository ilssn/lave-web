"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { cn } from "@/lib/utils";

type TaskConsumerProps = {
  className?: string;
};

const TaskConsumer = ({ className }: TaskConsumerProps) => {
  return (
    <div className={cn("overflow-y-scroll scroll-smooth", className)}>
      <div className="flex w-full flex-col gap-4">
        {/* <Card className="w-full rounded-none">
          <CardHeader className="flex-row items-center justify-between ">
            <div className="flex-1">
              <CardTitle className="flex items-center justify-between">
                任务状态
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="max-h-[calc(100vh-24.5rem)] justify-end overflow-y-auto">
          </CardContent>
        </Card> */}

        <Card className="relative w-full rounded-none">
          <CardHeader className="flex-row items-center justify-between ">
            <div className="flex-1">
              <CardTitle className="flex items-center justify-between">
                界面预览
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="max-h-[calc(100vh-24.5rem)] justify-end overflow-y-auto">
            <Tabs defaultValue="screenshot">
              <div className="flex w-full justify-end">
                <TabsList className="absolute top-8 flex justify-start">
                  <TabsTrigger value="screenshot">截图</TabsTrigger>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="md">MD</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="screenshot" className="h-[404px] overflow-y-scroll">
                <div className="flex min-h-full w-full items-center justify-center bg-gray-100">
                  {/* 截图内容 */}
                  <span className="text-gray-400">截图内容</span>
                </div>
              </TabsContent>
              <TabsContent value="html" className="h-[404px] overflow-y-scroll">
                <div className="flex min-h-full w-full items-center justify-center bg-gray-100">
                  {/* HTML 内容 */}
                  <span className="text-gray-400">HTML 内容</span>
                </div>
              </TabsContent>
              <TabsContent value="md" className="h-[404px] overflow-y-scroll">
                <div className="flex min-h-full w-full items-center justify-center bg-gray-100">
                  {/* MD 内容 */}
                  <span className="text-gray-400">MD 内容</span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="relative w-full rounded-none">
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex-1 space-y-1">
              <CardTitle className="flex items-center justify-between">
                数据预览
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="max-h-[calc(100vh-24.5rem)] justify-end overflow-y-auto">
            <Tabs defaultValue="card">
              <div className="flex w-full justify-end">
                <TabsList className="absolute top-8 flex justify-start">
                  <TabsTrigger value="card">卡片模式</TabsTrigger>
                  <TabsTrigger value="json">JSON模式</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="card">
                <div className="flex h-[380px] w-full items-center justify-center bg-gray-100">
                  {/* 卡片内容 */}
                  <span className="text-gray-400">卡片数据</span>
                </div>
              </TabsContent>
              <TabsContent value="json">
                <div className="flex h-[380px] w-full items-center justify-center bg-gray-100">
                  {/* JSON 内容 */}
                  <span className="text-gray-400">JSON数据</span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div >
  );
};

export default TaskConsumer;
