"use client";

import { useEffect, useState } from "react";

import { ExpandIcon, SaveIcon, ShrinkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileManager from "@/lib/file";
import { cn } from "@/lib/utils";

import CodeBlock from "./code-block";
import JsonEditor from "./json-editor";
import MarkdownRenderer from "./md-renderer";
import { PageTab } from "./page-tab";
import ScreenshotRenderer from "./screenshot-renderer";

type TaskPreviewProps = {
  className?: string;
  results: any[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
};

const handleDownload = (data: string, filename: string, type: string) => {
  FileManager.saveDataToFile(data, filename, type);
};

const TaskPreview = ({
  className,
  results = [],
  currentIndex,
  setCurrentIndex,
}: TaskPreviewProps) => {
  const [currentResult, setCurrentResult] = useState(results[0] || null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDataFullScreen, setIsDataFullScreen] = useState(false);
  useEffect(() => {
    setCurrentResult(results[currentIndex]);
  }, [currentIndex, results]);

  return (
    <div
      className={cn(
        "flex h-full flex-col space-y-4 overflow-y-scroll scroll-smooth",
        className
      )}
    >
      <Tabs
        defaultValue="screenshot"
        className={`w-full overflow-hidden ${isFullScreen ? "fixed left-0 top-0 z-50 h-full w-full bg-white" : "h-[40vh]"}`}
      >
        <Card className={"relative flex h-full w-full flex-col rounded-none"}>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="flex w-full items-center justify-between">
              <div className="text-lg font-bold">界面预览</div>
              <div className="flex items-center justify-end space-x-2">
                <TabsList className="">
                  <TabsTrigger
                    value="screenshot"
                    className="data-[state=active]:text-primary"
                  >
                    截图
                  </TabsTrigger>
                  <TabsTrigger
                    value="html"
                    className="data-[state=active]:text-primary"
                  >
                    HTML
                  </TabsTrigger>
                  <TabsTrigger
                    value="md"
                    className="data-[state=active]:text-primary"
                  >
                    MD
                  </TabsTrigger>
                </TabsList>
                <Button
                  size={"icon"}
                  variant="ghost"
                  onClick={() => setIsFullScreen(!isFullScreen)}
                >
                  {isFullScreen ? (
                    <ShrinkIcon className="h-4 w-4" />
                  ) : (
                    <ExpandIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex-1 overflow-hidden">
            <div className="relative flex h-full w-full flex-col rounded-md border-8 border-gray-200 bg-gray-200">
              <PageTab
                pages={results}
                selectedIndex={currentIndex}
                setSelectedIndex={setCurrentIndex}
              />
              <div className="w-full flex-1 overflow-scroll">
                <TabsContent value="screenshot" className="h-full w-full">
                  {currentResult ? (
                    <>
                      <ScreenshotRenderer
                        src={currentResult.screenshot}
                        alt={`Screenshot ${currentIndex + 1}`}
                      />

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          handleDownload(
                            currentResult.screenshot,
                            "screenshot.png",
                            "image/png"
                          )
                        }
                        className="absolute bottom-2 right-2 rounded-md bg-gray-100 text-gray-400"
                      >
                        <SaveIcon className="h-4 w-4 hover:scale-110 hover:text-primary" />
                      </Button>
                    </>
                  ) : (
                    <p className="text-center text-sm text-gray-400">
                      暂无数据
                    </p>
                  )}
                </TabsContent>

                <TabsContent value="html" className="h-full w-full">
                  {currentResult ? (
                    <>
                      <CodeBlock code={currentResult.html} language="html" />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          handleDownload(
                            currentResult.html,
                            "preview.html",
                            "text/html"
                          )
                        }
                        className="absolute bottom-2 right-2 rounded-md bg-gray-100 text-gray-400"
                      >
                        <SaveIcon className="h-4 w-4 hover:scale-110 hover:text-primary" />
                      </Button>
                    </>
                  ) : (
                    <p className="text-center text-sm text-gray-400">
                      暂无数据
                    </p>
                  )}
                </TabsContent>
                <TabsContent value="md" className="h-full w-full">
                  {currentResult ? (
                    <>
                      <MarkdownRenderer content={currentResult.markdown} />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          handleDownload(
                            currentResult.markdown,
                            "preview.md",
                            "text/markdown"
                          )
                        }
                        className="absolute bottom-2 right-2 rounded-md bg-gray-100 text-gray-400"
                      >
                        <SaveIcon className="h-4 w-4 hover:scale-110 hover:text-primary" />
                      </Button>
                    </>
                  ) : (
                    <p className="text-center text-sm text-gray-400">
                      暂无数据
                    </p>
                  )}
                </TabsContent>
              </div>
            </div>
          </CardContent>
        </Card>
      </Tabs>

      <Tabs
        defaultValue="card"
        className={`w-full overflow-hidden ${isDataFullScreen ? "fixed left-0 top-0 z-50 h-full w-full bg-white" : "h-[40vh]"}`}
      >
        <Card className={"flex h-full w-full flex-col rounded-none"}>
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex-1 space-y-1">
              <CardTitle className="flex items-center justify-between">
                <div className="text-lg font-bold">数据预览</div>
                <div className="flex items-center justify-end space-x-2">
                  <TabsList className="">
                    <TabsTrigger
                      value="card"
                      className="data-[state=active]:text-primary"
                    >
                      卡片模式
                    </TabsTrigger>
                    <TabsTrigger
                      value="json"
                      className="data-[state=active]:text-primary"
                    >
                      JSON模式
                    </TabsTrigger>
                  </TabsList>
                  <Button
                    size={"icon"}
                    variant="ghost"
                    onClick={() => setIsDataFullScreen(!isDataFullScreen)}
                  >
                    {isDataFullScreen ? (
                      <ShrinkIcon className="h-4 w-4" />
                    ) : (
                      <ExpandIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="w-full flex-1 overflow-hidden">
            <div className="h-full w-full overflow-scroll rounded-md border-8 border-gray-200 bg-gray-200">
              <TabsContent value="card" className="mt-0 h-full w-full">
                {results.length > 0 ? (
                  results.map((result: any, resultIdx: number) =>
                    result.data?.map((item: any, idx: number) => (
                      <div
                        key={`${resultIdx}-${idx}`}
                        className="mb-4 w-full rounded-lg bg-white p-4 shadow-lg"
                      >
                        <h3 className="mb-2 text-lg font-bold text-primary">
                          数据 {resultIdx + 1}-{idx + 1}
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(item).map(
                            ([key, value]) =>
                              key !== "error" && (
                                <div
                                  key={key}
                                  className="flex flex-col rounded-md bg-gray-50 p-2"
                                >
                                  <span className="font-semibold text-gray-800">
                                    {key}:
                                  </span>
                                  <span className="text-sm text-gray-700">
                                    {String(value)}
                                  </span>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  <p className="mt-8 text-center text-sm text-gray-400">
                    暂无数据
                  </p>
                )}
              </TabsContent>

              <TabsContent value="json" className="mt-0 h-full w-full">
                {currentResult ? (
                  <JsonEditor initialData={results} />
                ) : (
                  <p className="mt-8 text-center text-sm text-gray-400">
                    暂无数据
                  </p>
                )}
              </TabsContent>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default TaskPreview;
