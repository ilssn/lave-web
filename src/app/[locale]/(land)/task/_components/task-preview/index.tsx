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
import { useState } from 'react';

import { Button } from "@/components/ui/button";
import FileManager from '@/lib/file';
import { cn } from "@/lib/utils";
import { ExpandIcon, SaveIcon, ShrinkIcon } from "lucide-react";
import { useEffect } from "react";
import CodeBlock from "./code-block";
import JsonEditor from "./json-editor";
import MarkdownRenderer from "./md-renderer";
import { PageTab } from "./page-tab";
import ScreenshotRenderer from './screenshot-renderer';

type TaskPreviewProps = {
  className?: string;
  results: any[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
};

const handleDownload = (data: string, filename: string, type: string) => {
  FileManager.saveDataToFile(data, filename, type);
};

const TaskPreview = ({ className, results = [], currentIndex, setCurrentIndex }: TaskPreviewProps) => {
  const [currentResult, setCurrentResult] = useState(results[0] || null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDataFullScreen, setIsDataFullScreen] = useState(false);
  useEffect(() => {
    setCurrentResult(results[currentIndex]);
  }, [currentIndex, results.length]);

  return (
    <div className={cn("overflow-y-scroll scroll-smooth h-full flex flex-col space-y-4", className)}>

      <Tabs defaultValue="screenshot" className={`w-full overflow-hidden ${isFullScreen ? 'fixed top-0 left-0 w-full h-full z-50 bg-white' : 'h-[40vh]'}`}>
        <Card className={"relative w-full h-full rounded-none flex flex-col"}>
          <CardHeader className="flex-row items-center justify-between ">
            <CardTitle className="flex items-center justify-between w-full">
              <div className="text-lg font-bold">界面预览</div>
              <div className="flex items-center justify-end space-x-2">
                <TabsList className="">
                  <TabsTrigger value="screenshot" className="data-[state=active]:text-primary">截图</TabsTrigger>
                  <TabsTrigger value="html" className="data-[state=active]:text-primary">HTML</TabsTrigger>
                  <TabsTrigger value="md" className="data-[state=active]:text-primary">MD</TabsTrigger>
                </TabsList>
                <Button size={"icon"} variant="ghost" onClick={() => setIsFullScreen(!isFullScreen)}>
                  {isFullScreen ? <ShrinkIcon className="w-4 h-4" /> : <ExpandIcon className="w-4 h-4" />}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-hidden w-full flex-1">
            <div className="w-full h-full flex flex-col bg-gray-200 border-8 border-gray-200 rounded-md relative">
              <PageTab pages={results} selectedIndex={currentIndex} setSelectedIndex={setCurrentIndex} />
              <div className="w-full flex-1 overflow-scroll">
                <TabsContent value="screenshot" className="w-full h-full">
                  {currentResult ? (
                    <>
                      <ScreenshotRenderer
                        src={currentResult.screenshot}
                        alt={`Screenshot ${currentIndex + 1}`}
                      />

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDownload(currentResult.screenshot, 'screenshot.png', 'image/png')}
                        className="text-gray-400 bg-gray-100 rounded-md absolute bottom-2 right-2">
                        <SaveIcon className="w-4 h-4 hover:text-primary hover:scale-110" />
                      </Button>
                    </>
                  ) : (
                    <p className="text-sm text-gray-400 text-center">暂无数据</p>
                  )}
                </TabsContent>

                <TabsContent value="html" className="w-full h-full">
                  {currentResult ? (
                    <>
                      <CodeBlock code={currentResult.html} language="html" />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDownload(currentResult.html, 'preview.html', 'text/html')}
                        className="text-gray-400 bg-gray-100 rounded-md absolute bottom-2 right-2">
                        <SaveIcon className="w-4 h-4 hover:text-primary hover:scale-110" />
                      </Button>
                    </>
                  ) : (
                    <p className="text-sm text-gray-400 text-center">暂无数据</p>
                  )}
                </TabsContent>
                <TabsContent value="md" className="w-full h-full">
                  {currentResult ? (
                    <>
                      <MarkdownRenderer content={currentResult.markdown} />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDownload(currentResult.markdown, 'preview.md', 'text/markdown')}
                        className="text-gray-400 bg-gray-100 rounded-md absolute bottom-2 right-2">
                        <SaveIcon className="w-4 h-4 hover:text-primary hover:scale-110" />
                      </Button>
                    </>
                  ) : (
                    <p className="text-sm text-gray-400 text-center">暂无数据</p>
                  )}
                </TabsContent>
              </div>
            </div>
          </CardContent>
        </Card>
      </Tabs>

      <Tabs defaultValue="card" className={`w-full overflow-hidden ${isDataFullScreen ? 'fixed top-0 left-0 w-full h-full z-50 bg-white' : 'h-[40vh]'}`}>
        <Card className={`w-full h-full rounded-none flex flex-col`}>
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex-1 space-y-1">
              <CardTitle className="flex items-center justify-between">
                <div className="text-lg font-bold">数据预览</div>
                <div className="flex items-center justify-end space-x-2">
                  <TabsList className="">
                    <TabsTrigger value="card" className="data-[state=active]:text-primary">卡片模式</TabsTrigger>
                    <TabsTrigger value="json" className="data-[state=active]:text-primary">JSON模式</TabsTrigger>
                  </TabsList>
                  <Button size={"icon"} variant="ghost" onClick={() => setIsDataFullScreen(!isDataFullScreen)}>
                    {isDataFullScreen ? <ShrinkIcon className="w-4 h-4" /> : <ExpandIcon className="w-4 h-4" />}
                  </Button>
                </div>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="overflow-hidden w-full flex-1">
            <div className="w-full h-full overflow-scroll bg-gray-200 border-8 border-gray-200 rounded-md">
              <TabsContent value="card" className="w-full h-full mt-0">
                {results.length > 0 ? (
                  results.map((result: any, resultIdx: number) => (
                    result.data?.map((item: any, idx: number) => (
                      <div key={`${resultIdx}-${idx}`} className="p-4 bg-white shadow-lg rounded-lg mb-4 w-full">
                        <h3 className="text-lg font-bold mb-2 text-primary">数据 {resultIdx + 1}-{idx + 1}</h3>
                        <div className="space-y-2">
                          {Object.entries(item).map(([key, value]) => (
                            key !== 'error' && (
                              <div key={key} className="flex flex-col bg-gray-50 p-2 rounded-md">
                                <span className="font-semibold text-gray-800">{key}:</span>
                                <span className="text-sm text-gray-700">{String(value)}</span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    ))
                  ))
                ) : (
                  <p className="text-sm text-gray-400 text-center mt-8">暂无数据</p>
                )}
              </TabsContent>


              <TabsContent value="json" className="w-full h-full mt-0">
                {currentResult ? (
                  <JsonEditor initialData={results} />
                ) : (
                  <p className="text-sm text-gray-400 text-center mt-8">暂无数据</p>
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
