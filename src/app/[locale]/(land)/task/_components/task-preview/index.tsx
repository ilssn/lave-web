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
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import CodeBlock from "./code-block";
import { PageTab } from "./page-tab";

type TaskPreviewProps = {
  className?: string;
  results: any[];
};

const TaskPreview = ({ className, results = [] }: TaskPreviewProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentResult, setCurrentResult] = useState(results[0] || null);

  useEffect(() => {
    setCurrentResult(results[selectedIndex]);
  }, [selectedIndex, results.length]);

  return (
    <div className={cn("overflow-y-scroll scroll-smooth", className)}>
      <div className="flex w-full flex-col gap-4">
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
              <TabsList className="absolute right-6 top-8 flex justify-start">
                <TabsTrigger value="screenshot">截图</TabsTrigger>
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="md">MD</TabsTrigger>
              </TabsList>
              <div className="relative mt-2 h-[404px] w-full pt-10 p-1 bg-gray-100 rounded-t-md">
                {/* {currentResult ? (
                  <div className="absolute top-0 left-0 w-full p-4 flex justify-between bg-black bg-opacity-50">
                    <p className="text-lg font-bold">{currentResult.metadata.title}</p>
                    <a href={currentResult.url} className="text-blue-500 underline">{currentResult.url}</a>
                  </div>
                ) : (
                  <span className="text-gray-400">暂无数据</span>
                )} */}
                <div className="absolute top-0 left-0 w-full">
                  <PageTab pages={results} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                </div>
                <TabsContent value="screenshot" className="mt-0 h-full w-full overflow-y-scroll">
                  <div className="flex min-h-full w-full justify-center bg-gray-100">
                    {currentResult ? (
                      <Image src={currentResult.screenshot} alt={`Screenshot ${selectedIndex + 1}`} width={1000} height={1000} style={{ width: "100%", height: "auto" }} />
                    ) : (
                      <span className="text-gray-400">暂无数据</span>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="html" className="mt-0 h-full w-full overflow-y-scroll">
                  <div className="flex min-h-full w-full justify-center bg-gray-100">
                    {currentResult ? (
                      <div className="w-full overflow-hidden relative">
                        <CodeBlock language="html" value={currentResult.html} />
                      </div>
                    ) : (
                      <span className="text-gray-400">暂无数据</span>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="md" className="mt-0 h-full w-full overflow-y-scroll">
                  <div className="flex min-h-full w-full justify-center bg-gray-100">
                    {currentResult ? (
                      <div className="w-full overflow-hidden relative">
                        <CodeBlock language="markdown" value={currentResult.markdown} />
                      </div>
                    ) : (
                      <span className="text-gray-400">暂无数据</span>
                    )}
                  </div>
                </TabsContent>
              </div>
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
              <TabsContent value="card" className="w-full overflow-y-hidden h-[380px] p-2 bg-gray-100">
                <div className=" w-full h-full overflow-scroll items-center flex flex-wrap justify-center">
                  {currentResult ? (
                    currentResult.data?.map((item: any, idx: number) => (
                      <div key={idx} className="p-4 bg-white shadow rounded mb-4 w-full">
                        <h3 className="text-lg font-bold mb-2">数据 {idx + 1}</h3>
                        <div className="space-y-2">
                          {Object.entries(item).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                              <span className="font-semibold text-gray-700">{key}:</span>
                              <span className="text-gray-600">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">暂无数据</span>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="json">
                <div className="h-full w-full bg-gray-100 overflow-auto">
                  {currentResult ? (
                    <Textarea
                      rows={18}
                      className="w-full h-full p-2"
                      value={JSON.stringify(currentResult.data, null, 2)}
                      readOnly
                    />
                  ) : (
                    <span className="text-gray-400">暂无数据</span>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default TaskPreview;
