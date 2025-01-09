"use client";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TaskConsumerProps = {
  className?: string;
};
const TaskConsumer = ({ className }: TaskConsumerProps) => {

  return (
    <div
      className={cn("overflow-y-scroll scroll-smooth", className)}
    >
      <div className="flex w-full flex-col gap-4">
        <Card className="w-full rounded-none">
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex-1 space-y-1">
              <CardTitle>界面预览</CardTitle>
              <CardDescription></CardDescription>
            </div>
          </CardHeader>
          <CardContent className="max-h-[calc(100vh-24.5rem)] overflow-y-auto">
            <div className="h-[410px] w-full bg-gray-100">
              {/* 这里可以添加任务预览的内容 */}
              <div className="flex h-full w-full items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v-2a4 4 0 014-4h1a4 4 0 014 4v2m-7 4h6m-6-4h6m-6-4h6m-6-4h6m-6-4h6M5 7h.01M5 11h.01M5 15h.01M5 19h.01"
                  />
                </svg>
                <span className="ml-2 text-gray-400">暂无数据</span>
              </div>
            </div>
          </CardContent>
          {/* <CardFooter className="flex justify-between"></CardFooter> */}
        </Card>

        <Card className="w-full rounded-none">
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex-1 space-y-1">
              <CardTitle>数据预览</CardTitle>


              <CardDescription></CardDescription>
            </div>
          </CardHeader>
          <CardContent className="max-h-[calc(100vh-24.5rem)] overflow-y-auto">
            <div className="h-[380px] w-full bg-gray-100">
              {/* 这里可以添加任务预览的内容 */}
              <div className="flex h-full w-full items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v-2a4 4 0 014-4h1a4 4 0 014 4v2m-7 4h6m-6-4h6m-6-4h6m-6-4h6m-6-4h6M5 7h.01M5 11h.01M5 15h.01M5 19h.01"
                  />
                </svg>
                <span className="ml-2 text-gray-400">暂无数据</span>
              </div>
            </div>
          </CardContent>
          {/* <CardFooter className="flex justify-between"></CardFooter> */}
        </Card>
      </div>
    </div>
  );
};

export default TaskConsumer;
