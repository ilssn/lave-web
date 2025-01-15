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
};

const handleDownload = (data: string, filename: string, type: string) => {
  FileManager.saveDataToFile(data, filename, type);
};

const TaskPreview = ({ className, results = [] }: TaskPreviewProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentResult, setCurrentResult] = useState(results[0] || null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDataFullScreen, setIsDataFullScreen] = useState(false);

  useEffect(() => {
    setCurrentResult(results[selectedIndex]);
  }, [selectedIndex, results.length]);

  return (
    <div className={cn("overflow-y-scroll scroll-smooth h-full flex flex-col space-y-4", className)}>

      <Tabs defaultValue="screenshot" className={`w-full overflow-hidden ${isFullScreen ? 'fixed top-0 left-0 w-full h-full z-50 bg-white' : 'h-[40vh]'}`}>
        <Card className={"relative w-full h-full rounded-none flex flex-col"}>
          <CardHeader className="flex-row items-center justify-between ">
            <CardTitle className="flex items-center justify-between w-full">
              <div className="text-lg font-bold">界面预览</div>
              <div className="flex items-center justify-end space-x-2">
                <TabsList className="">
                  <TabsTrigger value="screenshot">截图</TabsTrigger>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="md">MD</TabsTrigger>
                </TabsList>
                <Button size={"icon"} variant="ghost" onClick={() => setIsFullScreen(!isFullScreen)} className="text-gray-400 bg-gray-100 rounded-md">
                  {isFullScreen ? <ShrinkIcon className="w-4 h-4" /> : <ExpandIcon className="w-4 h-4" />}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-hidden w-full flex-1">
            <div className="w-full h-full flex flex-col bg-gray-200 border-8 border-gray-200 rounded-md relative">
              <PageTab pages={results} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
              <div className="w-full flex-1 overflow-scroll">
                <TabsContent value="screenshot" className="">
                  {currentResult ? (
                    <>
                      <ScreenshotRenderer
                        src={currentResult.screenshot}
                        alt={`Screenshot ${selectedIndex + 1}`}
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

                <TabsContent value="html" className="">
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
                <TabsContent value="md" className="">
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
                    <TabsTrigger value="card">卡片模式</TabsTrigger>
                    <TabsTrigger value="json">JSON模式</TabsTrigger>
                  </TabsList>
                  <Button size={"icon"} variant="ghost" onClick={() => setIsDataFullScreen(!isDataFullScreen)} className="text-gray-400 bg-gray-100 rounded-md">
                    {isDataFullScreen ? <ShrinkIcon className="w-4 h-4" /> : <ExpandIcon className="w-4 h-4" />}
                  </Button>
                </div>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="overflow-hidden w-full flex-1">
            <div className="w-full h-full overflow-scroll bg-gray-200 border-8 border-gray-200 rounded-md">
              <TabsContent value="card" className="w-full">
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
                  <p className="text-sm text-gray-400 text-center mt-8">暂无数据</p>
                )}
              </TabsContent>


              <TabsContent value="json">
                {currentResult ? (
                  <JsonEditor initialData={currentResult.data} />
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
