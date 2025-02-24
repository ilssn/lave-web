"use client";

// import { Metadata } from "next";
import { useEffect, useState } from "react";

import LandHeader from "@/components/common/land-header";
import { useToast } from "@/hooks/global/use-toast";
import { apiCrawler } from "@/lib/api";
import { useHistoryStore } from "@/stores";
import { HistoryType } from "@/stores/slices/history-slice";

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

// interface pageProps {
//   params: {
//     locale: string;
//   };
// }

const TaskPage = () => {
  const { toast } = useToast();
  // const { t } = await serverTranslation(locale);
  const DEFAULT_TASK_DATA = {
    // task config
    startUrls: [],
    taskDescription: "",
    // model config
    matchType: "auto", // auto manual
    searchModel: "default", // default, deep, agent
    maxDepth: 2,
    maxLinks: 20,
    // data config
    schema: {},
    // proxy config
    proxyUrl: "",
    proxyUsername: "",
    proxyPassword: "",
    // browser config
    headless: "true",
    browserType: "chromium",
    viewportWidth: 1920,
    viewportHeight: 1080,
    userAgent: "",
    headers: "",
    cookies: "",
    lightMode: "false",
    textMode: "false",
    jsEnabled: "false",
    cacheEnabled: "false",
  };

  const TEST_TASK_DATA = {
    // task config
    startUrls: ["https://news.302.ai"],
    taskDescription: "AI大模型及详情介绍",
    // model config
    matchType: "auto", // auto manual
    searchModel: "default", // default, deep, agent
    maxDepth: 2,
    maxLinks: 20,
    // data config
    schema: {
      topic: {
        type: "string",
        description: "文章主题",
      },
      view: {
        type: "number",
        description: "文章浏览量",
      },
      detail: {
        type: "string",
        description: "文章详情概要",
      },
      keywords: {
        type: "array",
        description: "文章关键词, 最多5个",
        items: {
          type: "string",
        },
      },
      hot: {
        type: "boolean",
        description: "是否为热门文章, 浏览量超过10",
      },
    },
    // proxy config
    proxyUrl: "",
    proxyUsername: "",
    proxyPassword: "",
    // browser config
    headless: "true",
    browserType: "chromium",
    viewportWidth: 1920,
    viewportHeight: 1080,
    userAgent: "",
    headers: "",
    cookies: "",
    lightMode: "false",
    textMode: "false",
    jsEnabled: "false",
    cacheEnabled: "false",
  };

  const [taskData, setTaskData] = useState<any>(DEFAULT_TASK_DATA);
  const [taskResult, setTaskResult] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const addHistory = useHistoryStore((state) => state.addHistory);

  const handleResetTaskData = (type: string) => {
    if (type === "default") {
      setTaskData(DEFAULT_TASK_DATA);
    } else if (type === "test") {
      setTaskData(TEST_TASK_DATA);
    }
    setTaskResult([]);
  };

  const handleTaskDataChange = (key: string, value: any) => {
    setTaskData((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleTaskResult = async (taskData: any) => {
    const schema = await getSchema();
    const runData = {
      urls: taskData.startUrls,
      target: taskData.taskDescription,
      recursiveConfig: {
        maxDepth: taskData.searchModel === "deep" ? taskData.maxDepth : 1,
        maxUrls:
          taskData.searchModel === "deep"
            ? taskData.maxLinks
            : taskData.startUrls.length,
      },
      schema: schema,
      proxyConfig: {
        proxyUrl: taskData.proxyUrl,
        proxyUsername: taskData.proxyUsername,
        proxyPassword: taskData.proxyPassword,
      },
      browserConfig: {
        headless: taskData.headless === "true",
        browserType: taskData.browserType,
        viewportWidth: taskData.viewportWidth,
        viewportHeight: taskData.viewportHeight,
        userAgent: taskData.userAgent,
        headers: taskData.headers ? JSON.parse(taskData.headers) : "",
        cookies: taskData.cookies ? JSON.parse(taskData.cookies) : "",
        lightMode: taskData.lightMode === "true",
        textMode: taskData.textMode === "true",
        jsEnabled: taskData.jsEnabled === "true",
        cacheEnabled: taskData.cacheEnabled === "true",
      },
    };
    setTaskResult([]);
    setCurrentIndex(0);
    handleRunTask(runData);
  };

  const fetchSchema = async (description: string) => {
    try {
      const response = await apiCrawler("crawler/generate-schema", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error("获取schema失败");
      }

      const schemaData = await response.json();
      return schemaData;
    } catch (error) {
      console.error("Error fetching schema:", error);
      return null;
    }
  };

  const getSchema = async () => {
    try {
      setLoading(true);
      if (Object.keys(taskData.schema).length > 0) {
        return taskData.schema;
      }
      if (taskData.taskDescription) {
        const { schema } = await fetchSchema(taskData.taskDescription);
        handleTaskDataChange("schema", schema);
        return schema;
      }
      return {};
    } catch (error) {
      // console.error("Error fetching schema:", error);
      toast({
        title: "获取schema失败",
        description: (error as Error).message,
        variant: "destructive",
      });
      return {};
    } finally {
      setLoading(false);
    }
  };

  const handleRunTask = async (data: any) => {
    try {
      setLoading(true);
      const response = await apiCrawler("crawler/task", {
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
        const statusResponse = await apiCrawler(`crawler/task/${taskId}`, {
          method: "GET",
        });
        if (!statusResponse.ok) {
          throw new Error("查询任务状态失败");
        }

        const statusData = await statusResponse.json();
        taskStatus = statusData.status;

        // 如果任务结果存在，则设置任务结果
        if (statusData.results) {
          setTaskResult(statusData.results);
        }

        // 如果任务状态为完成，则显示任务完成的消息
        if (taskStatus === "completed") {
          toast({
            title: "任务完成",
            description: "网页数据提取任务完成。",
            variant: "default",
          });
          addHistory(
            {
              taskData: { ...taskData, schema: data.schema },
              result: statusData.results,
            },
            HistoryType.DATA_EXTRACT
          );
          break;
        } else if (taskStatus === "failed") {
          // 如果任务状态为失败，则显示任务失败的消息
          toast({
            title: "任务失败",
            description: "网页数据提取任务失败！",
            variant: "destructive",
          });
          throw new Error("任务失败");
        }

        await new Promise((resolve) => setTimeout(resolve, 2000)); // 等待2秒后再次查询
      }
    } catch (error) {
      setLoading(false);
      console.error("任务运行出错:", error);
      toast({
        title: "任务出错",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (document) {
      document.title = "Lava Web - 网页数据提取工具";
    }
  }, []);

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
            taskResult={taskResult}
            loading={loading}
            onResetTaskData={handleResetTaskData}
            onFetchSchema={fetchSchema}
            setTaskResult={setTaskResult}
            setTaskData={setTaskData}
          />
        </div>
        <div className="relative flex-1 md:w-[calc(100%-500px)]">
          <TaskPreview
            results={taskResult || []}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
      </section>
    </div>
  );
};

export default TaskPage;
