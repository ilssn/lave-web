"use client";
// import { Metadata } from "next";
import { useToast } from "@/hooks/global/use-toast";
import { useState } from "react";

import LandHeader from "@/components/common/land-header";

import TaskConfig from "./_components/task-config";
import TaskPreview from "./_components/task-preview";

// type Props = {
//   params: { locale: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const locale = params.locale;
//   const { t } = await serverTranslation(locale);

//   return {
//     title: t("网页数据提取工具"),
//     description: t(""),
//   };
// }

interface pageProps {
  params: {
    locale: string;
  };
}

const VideoGeneratorPage = () => {
  const { toast } = useToast();
  // const { t } = await serverTranslation(locale);
  const [taskData, setTaskData] = useState<any>({
    startUrl: "https://news.302.ai",
    taskDescription: "AI大模型及详情介绍",
    maxDepth: 1,
    maxLinks: 1,
    schema: {
      model: {
        type: "string",
        description: "AI大模型名称",
      },
      prompt: {
        type: "string",
        description: "AI大模型功能描述",
      },
    },
  });

  const [taskResult, setTaskResult] = useState<any>(null);

  const handleTaskDataChange = (key: string, value: any) => {
    setTaskData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleTaskResult = (taskData: any) => {
    console.log(taskData);
    const runData = {
      url: taskData.startUrl,
      target: taskData.taskDescription,
      recursiveConfig: {
        maxDepth: taskData.maxDepth,
        maxUrls: taskData.maxLinks,
      },
      schema: taskData.schema,
    };
    handleRunTask(runData);
  };

  const handleRunTask = async (data: any) => {
    try {
      const response = await fetch("http://192.168.199.229:3000/crawler/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("创建任务失败");
      }

      const { taskId } = await response.json();
      let taskStatus = "processing";

      while (taskStatus === "processing") {
        const statusResponse = await fetch(`http://192.168.199.229:3000/crawler/task/${taskId}`);
        if (!statusResponse.ok) {
          throw new Error("查询任务状态失败");
        }

        const statusData = await statusResponse.json();
        taskStatus = statusData.status;

        if (taskStatus === "completed") {
          setTaskResult(statusData.results);
          toast({
            title: "任务完成",
            description: "任务已成功完成。",
            variant: "default",
          });
          break;
        } else if (taskStatus === "failed") {
          toast({
            title: "任务失败",
            description: "任务未能成功完成。",
            variant: "destructive",
          });
          throw new Error("任务失败");
        }

        await new Promise((resolve) => setTimeout(resolve, 2000)); // 等待2秒后再次查询
      }
    } catch (error) {
      console.error("任务运行出错:", error);
      toast({
        title: "任务出错",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 p-4 md:gap-8 md:p-8">
      <section className="flex w-full flex-col items-center justify-center">
        <LandHeader title="网页数据提取工具" />
      </section>

      <section className="relative flex w-full flex-1 flex-col gap-4 overflow-hidden md:flex-row md:gap-8">
        <div className="w-full md:w-[450px]">
          <TaskConfig
            taskData={taskData}
            onTaskDataChange={handleTaskDataChange}
            onTaskResult={handleTaskResult}
          />
        </div>
        <div className="relative flex-1">
          <TaskPreview />
        </div>
      </section>
    </div>
  );
};

export default VideoGeneratorPage;
