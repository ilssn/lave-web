/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the TaskResult interface
import { apiFetch } from "@/lib/api";
import { isEnglish } from "@/lib/utils";
import { useTaskStore } from "@/stores";
import { Task, TaskResult } from "@/stores/slices/task-slice";

import { aiImageToText, aiTranslate, uploadImage } from "./global";

// Generate Video Fetch
export const generateVideo = async (task: Task): Promise<TaskResult> => {
  const taskId = task.id;
  try {
    const {
      model,
      prompt = "",
      firstFrame = "",
      lastFrame = "",
      thirdFile = "",
      ratio = "",
      type = "",
      time = "",
      loop = "",
      camera = "",
      audio = "",
      style = "",
      template = "",
      viduType = "",
      viduStyle = "",
      viduTime = "",
      viduResolution = "",
      viduScene = "",
    } = task.payload;

    // Translate prompt if not in English
    const translatedPrompt = async () =>
      prompt && !isEnglish(prompt) ? await aiTranslate(prompt) : prompt;

    // Extract image description by uploading and processing the frame
    const getUploadedImagePrompt = async (frame: File) => {
      const url = await uploadImage(frame);
      return await aiImageToText(url);
    };

    // Derive the video prompt based on available files
    let videoPrompt = prompt;
    if (!["pixverse"].includes(model)) {
      videoPrompt = prompt
        ? await translatedPrompt()
        : firstFrame
          ? await getUploadedImagePrompt(firstFrame)
          : await getUploadedImagePrompt(lastFrame);
    }

    // Process video creation based on the specified model
    const createVideo = async () => {
      switch (model) {
        case "luma":
          return await getLumaVideo(
            taskId,
            camera !== "none" ? `${camera} ${videoPrompt}` : videoPrompt,
            firstFrame,
            lastFrame,
            loop
          );

        case "kling":
          return await getKlingVideo(
            taskId,
            videoPrompt,
            firstFrame,
            lastFrame,
            ratio,
            type,
            time
          );

        case "runway":
          return await getRunwayVideo(
            taskId,
            videoPrompt,
            firstFrame,
            lastFrame,
            time.replace("s", ""),
            type
          );

        case "cog":
          return await getCogVideo(
            taskId,
            videoPrompt,
            await uploadImage(firstFrame)
          );

        case "minimax":
          return await getMinimaxVideo(
            taskId,
            prompt.slice(0, 200),
            await uploadImage(firstFrame)
          );

        case "pika":
          return await getPikaVideo(
            taskId,
            videoPrompt,
            await uploadImage(firstFrame),
            ratio,
            style !== "none" ? style : "",
            audio === "true"
          );

        case "genmo":
          return await getGenmoVideo(await translatedPrompt());

        case "haiper":
          return await getHaiperVideo(
            taskId,
            videoPrompt,
            await uploadImage(firstFrame)
          );

        case "pixverse":
          return await getPixverseVideo(
            taskId,
            videoPrompt,
            await uploadImage(firstFrame),
            template
          );

        case "lightricks":
          return await getLightricksVideo(
            taskId,
            videoPrompt,
            await uploadImage(firstFrame)
          );

        case "hunyuan":
          return await getHunyuanVideo(taskId, videoPrompt);

        case "vidu":
          let mergeFrame = null;
          if (firstFrame && lastFrame && viduType === "scene") {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            const imageToCanvas = async (
              image: File
            ): Promise<HTMLCanvasElement> => {
              const url = URL.createObjectURL(image);
              const img = new Image();
              img.src = url;
              await new Promise((resolve) => (img.onload = resolve));
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
              ctx.drawImage(img, 0, 0);
              return canvas;
            };

            const firstFrameImage = await imageToCanvas(firstFrame);
            const lastFrameImage = await imageToCanvas(lastFrame);
            canvas.width = firstFrameImage.width + lastFrameImage.width;
            canvas.height = Math.max(
              firstFrameImage.height,
              lastFrameImage.height
            );
            ctx.drawImage(firstFrameImage, 0, 0);
            ctx.drawImage(lastFrameImage, firstFrameImage.width, 0);
            mergeFrame = new File(
              [await new Promise((resolve) => canvas.toBlob(resolve as any))],
              "merged.png",
              {
                type: "image/png",
              }
            );
          }
          return await getViduVideo(
            taskId,
            prompt,
            videoPrompt,
            await uploadImage(mergeFrame || firstFrame),
            await uploadImage(firstFrame),
            await uploadImage(lastFrame),
            await uploadImage(thirdFile),
            ratio,
            viduType,
            viduStyle,
            viduTime,
            viduResolution,
            viduScene
          );
        default:
          throw new Error("Unknown model");
      }
    };

    const res = await createVideo();

    // Validate and return result
    return res.output
      ? { resultId: res.id || "", videoUrl: res.output }
      : Promise.reject("Create video error: missing video");
  } catch (error) {
    return Promise.reject(error);
  }
};

// Extend Video
export const extendVideo = async (task: Task): Promise<TaskResult> => {
  // return
  const {
    id: taskId,
    result,
    payload,
    extendType,
    extendPrompt,
    extendRatio,
    extendSeconds,
    structureTransformation,
  } = task;

  try {
    let res;

    if (extendType === "time") {
      const resultId = result?.resultId;
      if (!resultId) throw new Error("Extend Video Error: Missing result ID");
      const { model, prompt } = payload;

      switch (model) {
        case "luma":
          res = await extendLumaVideo(taskId, resultId, prompt);
          break;

        case "kling":
          res = await extendKlingVideo(taskId, resultId, prompt);
          break;

        default:
          throw new Error("Unsupported model for extension");
      }
    }

    if (extendType === "ratio") {
      const video = result?.videoUrl;
      if (!video)
        throw new Error("Extend Video Error: Missing origin video url");
      const enPrompt =
        extendPrompt && !isEnglish(extendPrompt)
          ? await aiTranslate(extendPrompt)
          : extendPrompt || "";
      res = await extendRunwayVideoRatio(
        taskId,
        video,
        enPrompt,
        extendRatio || "5:3",
        extendSeconds || 5
      );
    }

    if (extendType === "style") {
      const { prompt } = payload;
      const video = result?.videoUrl;
      if (!video)
        throw new Error("Extend Video Error: Missing origin video url");

      const stylePrompt = `${prompt}, ${extendPrompt}`;
      const enPrompt =
        stylePrompt && !isEnglish(stylePrompt)
          ? await aiTranslate(stylePrompt)
          : stylePrompt;
      res = await extendVideoStyle(
        taskId,
        video,
        structureTransformation || 0.9,
        enPrompt,
        extendSeconds || 5
      );
    }

    if (extendType === "upscale") {
      const resultId = result?.resultId;
      if (!resultId) throw new Error("Extend Video Error: Missing result ID");
      const { viduTime } = payload;
      res = await extendViduVideo(taskId, resultId, viduTime || 4);
    }

    if (extendType === "audio") {
      const { prompt } = payload;
      const video = result?.videoUrl;
      if (!video)
        throw new Error("Extend Video Error: Missing origin video url");

      const audioPrompt = extendPrompt || prompt;
      const enPrompt =
        audioPrompt && !isEnglish(audioPrompt)
          ? await aiTranslate(audioPrompt)
          : audioPrompt;
      res = await getMmaudioAudio(
        taskId,
        video,
        enPrompt
        // extendSeconds || 10
      );
    }

    return res.output
      ? { resultId: res.id || "", videoUrl: res.output }
      : Promise.reject("Extend video error: missing video");
  } catch (error) {
    return Promise.reject(error);
  }
};

// 视频: Luma
export async function getLumaVideo(
  taskId: string,
  prompt: string,
  firstFrame: File | null,
  lastFrame: File | null,
  loop: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      const formData = new FormData();
      formData.append("user_prompt", prompt);
      if (firstFrame) {
        formData.append("image_url", firstFrame);
      }
      if (lastFrame) {
        formData.append("image_end_url", lastFrame);
        formData.append("loop", loop);
      }

      const res = await apiFetch("luma/submit", {
        method: "POST",
        body: formData,
        headers: {},
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      if (result.video) {
        resolve({ output: result.video, id: result.id });
        return;
      }

      result = await fetchLumaTask(taskId, result.id);
      resolve({ output: result.video, id: result.id });
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Luma
async function fetchLumaTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(`luma/task/${resultId}/fetch`, {
        headers: {},
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
            return;
          }
          if (data.state === "completed") {
            resolve(data);
          } else if (data.state === "failed") {
            reject("Task failed");
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached!");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// 拓展: Luma
export async function extendLumaVideo(
  taskId: string,
  key: string,
  prompt: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      const formData = new FormData();
      formData.append("user_prompt", prompt);

      const res = await apiFetch(`luma/extend/${key}`, {
        method: "POST",
        body: formData,
        headers: {},
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      if (result.video) {
        resolve({ output: result.video, id: result.id });
        return;
      }
      result = await fetchLumaTask(taskId, result.id);
      resolve({ output: result.video, id: result.id });
    } catch (error) {
      reject(error);
    }
  });
}

// 视频：Kling
export async function getKlingVideo(
  taskId: string,
  prompt: string,
  firstFrame: File,
  lastFrame: File,
  ratio: string,
  type: string,
  time: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};
      let path = "";
      let url = "";
      if (firstFrame) {
        if (type === "fast") {
          path = time === "5s" ? "m2v_16_img2video_5s" : "m2v_16_img2video_10s";
        } else {
          path =
            time === "5s"
              ? "m2v_16_img2video_hq_5s"
              : "m2v_16_img2video_hq_10s";
        }
      } else {
        if (type === "fast") {
          path = time === "5s" ? "m2v_16_txt2video_5s" : "m2v_16_txt2video_10s";
        } else {
          path =
            time === "5s"
              ? "m2v_16_txt2video_hq_5s"
              : "m2v_16_txt2video_hq_10s";
        }
      }
      url = `klingai/${path}`;

      const formdata = new FormData();
      if (firstFrame) {
        if (lastFrame) {
          formdata.append("tail_image", lastFrame);
        }
        formdata.append("input_image", firstFrame);
        formdata.append("prompt", prompt);
        formdata.append("negative_prompt", "");
        formdata.append("cfg", "0.5");
        formdata.append("aspect_ratio", ratio);
        formdata.append("camera_type", "zoom");
        formdata.append("camera_value", "-5");
      } else {
        formdata.append("prompt", prompt);
        formdata.append("negative_prompt", "");
        formdata.append("cfg", "0.5");
        formdata.append("aspect_ratio", ratio);
        formdata.append("camera_type", "zoom");
        formdata.append("camera_value", "-5");
      }

      const res = await apiFetch(url, {
        method: "POST",
        body: formdata,
        headers: {},
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();

      if (result.error) {
        reject(result.error);
      }

      const video = result.data.works[0]?.resource.resource;
      if (video) {
        const id = type === "fast" ? result.data.task.id : "";
        resolve({ output: video, id });
        return;
      }
      result = await fetchKlingTask(taskId, result.data.task.id);
      resolve({ output: result.video, id: type === "fast" ? result.id : "" });
    } catch (error) {
      reject(error);
    }
  });
}

// 拓展：Kling
export async function extendKlingVideo(
  taskId: string,
  key: string,
  prompt: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      const url = "klingai/m2v_16_extend_video";
      const formdata = new FormData();
      formdata.append("prompt", prompt);
      formdata.append("task_id", key);

      const res = await apiFetch(url, {
        method: "POST",
        body: formdata,
        headers: {},
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      const video = result.data.works[0]?.resource.resource;
      if (video) {
        const id = result.data.task.id;
        resolve({ output: video, id });
        return;
      }
      result = await fetchKlingTask(taskId, result.data.task.id);
      resolve({ output: result.video, id: result.id });
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Kling
async function fetchKlingTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(
        `klingai/task/${resultId}/fetch
      `,
        {
          headers: {},
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const video = data.data.works[0]?.resource.resource;
          const id = data.data.task.id;
          if (video) {
            resolve({ video, id });
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// Create Video：Runway-turbo
export async function getRunwayVideo(
  taskId: string,
  prompt: string,
  firstFrame: File,
  lastFrame: File,
  time: string,
  type: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};
      const file = firstFrame || lastFrame;
      const url =
        type === "fast" && file ? "runway_turbo/submit" : "runway/submit";

      const formdata = new FormData();
      if (!file) {
        formdata.append("text_prompt", prompt);
        formdata.append("seconds", time);
        formdata.append("seed", "");
      } else if (type !== "fast") {
        const end = firstFrame ? "false" : "true";
        formdata.append("init_image", file);
        formdata.append("text_prompt", prompt);
        formdata.append("seconds", time);
        formdata.append("seed", "");
        formdata.append("image_as_end_frame", end);
      } else {
        formdata.append("image_url", firstFrame || "");
        formdata.append("image_end_url", lastFrame || "");
        formdata.append("text_prompt", prompt);
        formdata.append("seconds", time);
        formdata.append("seed", "");
      }

      const res = await apiFetch(url, {
        method: "POST",
        body: formdata,
        headers: {},
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      const video = result.task.artifacts[0]?.url;
      if (video) {
        resolve({ output: video });
        return;
      }
      result = await fetchRunwayTask(taskId, result.task.id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Runway
async function fetchRunwayTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(
        `runway/task/${resultId}/fetch
      `,
        {
          headers: {},
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const video = data.task.artifacts[0]?.url;
          if (video) {
            resolve({ output: video });
          } else if (data.task.status === "FAILED") {
            reject("Fetch task failed");
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000);
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// 视频: Cog
export async function getCogVideo(
  taskId: string,
  prompt: string,
  url: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};
      let raw = "";
      if (url) {
        raw = JSON.stringify({
          model: "cogvideox",
          prompt: prompt,
          image_url: url,
        });
      } else {
        raw = JSON.stringify({
          model: "cogvideox",
          prompt: prompt,
        });
      }

      const res = await apiFetch("zhipu/api/paas/v4/videos/generations", {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      // save task
      if (result.task_status === "SUCCESS") {
        resolve({ output: result.video_result[0].url });
        return;
      }
      result = await fetchCogTask(taskId, result.id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Cog
async function fetchCogTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(`zhipu/api/paas/v4/async-result/${resultId}`, {
        headers: {},
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
            return;
          }
          if (data.task_status === "SUCCESS") {
            resolve({ output: data.video_result[0].url });
          } else if (data.state === "failed") {
            reject("Fetch task failed");
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// 视频: Minimax
export async function getMinimaxVideo(
  taskId: string,
  prompt: string,
  url: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      const data = url
        ? {
            model: "video-01",
            prompt: prompt,
            first_frame_image: url,
          }
        : {
            model: "video-01",
            prompt: prompt,
          };

      const res = await apiFetch("minimaxi/v1/video_generation", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      if (!result.task_id) {
        // throw new Error("Fetch faild");
        throw result.base_resp.status_msg;
      }
      result = await fetchMinimaxTask(taskId, result.task_id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Minimax
async function fetchMinimaxTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(`minimaxi/v1/query/video_generation?task_id=${resultId}`, {
        headers: {},
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.error) {
            reject(data.error);
            return;
          }
          if (data.file_id) {
            const url = await fetchMinimaxFile(data.file_id);
            resolve({ output: url });
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// 查询: Minimax
async function fetchMinimaxFile(fileId: string) {
  return new Promise((resolve, reject) => {
    const polling = (fileId: string) => {
      apiFetch(`minimaxi/v1/files/retrieve?file_id=${fileId}`, {
        headers: {},
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
            return;
          }
          if (data.file) {
            resolve(data.file.download_url);
          } else {
            reject("Get Minimax File Error");
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(fileId);
  });
}

// 视频: Pika
export async function getPikaVideo(
  taskId: string,
  prompt: string,
  url: string,
  ratio: string,
  style: string,
  audio: boolean
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      let data: any = {
        style: style,
        ratio: ratio,
        prompt: prompt,
        sfx: audio,
        model: 1.5,
        options: {
          frameRate: 24,
          camera: {
            pan: "right",
            tilt: "up",
            rotate: "cw",
            zoom: "in",
          },
          parameters: {
            guidanceScale: 16,
            motion: 2,
            negativePrompt: "ugly",
          },
        },
      };

      if (url) {
        data = {
          prompt: prompt,
          sfx: audio,
          image: url,
          style: style,
          model: 1.5,
          options: {
            frameRate: 24,
            parameters: {
              guidanceScale: 16,
              motion: 2,
              negativePrompt: "ugly",
            },
          },
        };
      }

      const res = await apiFetch("pika/generate", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });
      if (!res.ok) {
        throw await res.json();
      }

      const jsonData = await res.json();

      result = await fetchPikaTask(taskId, jsonData.data.task_id);
      resolve({ output: result.video_url });
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Pika
async function fetchPikaTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(
        `pika/task/${resultId}/fetch
      `,
        {
          headers: {},
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
            return;
          }
          if (data.data.video_url) {
            resolve(data.data);
          } else if (data.code !== 200) {
            reject("Task failed");
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// 拓展: Pika
export async function extendPikaVideo(
  taskId: string,
  key: string,
  prompt: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      const formData = new FormData();
      formData.append("user_prompt", prompt);

      const res = await apiFetch(`luma/extend/${key}`, {
        method: "POST",
        body: formData,
        headers: {},
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      if (result.video) {
        resolve({ output: result.video, id: result.id });
        return;
      }
      result = await fetchPikaTask(taskId, result.id);
      resolve({ output: result.video, id: result.id });
    } catch (error) {
      reject(error);
    }
  });
}

// 视频: Genmo
export async function getGenmoVideo(prompt: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      const data = {
        prompt: prompt,
        enable_prompt_expansion: true,
        seed: 1936147,
      };

      const res = await apiFetch("302/submit/mochi-v1", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();

      resolve({ output: result.video.url });
    } catch (error) {
      reject(error);
    }
  });
}

// 视频: Haiper
export async function getHaiperVideo(
  taskId: string,
  prompt: string,
  url: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let raw = "";
      if (url) {
        raw = JSON.stringify({
          prompt: prompt,
          image_url: url,
          prompt_enhancer: true,
          duration: "4",
          seed: 1936147,
        });
      } else {
        raw = JSON.stringify({
          prompt: prompt,
          prompt_enhancer: true,
          duration: "4",
          seed: 1936147,
        });
      }

      const res = await apiFetch("302/submit/haiper-video-v2", {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });
      if (!res.ok) {
        throw await res.json();
      }

      const data = await res.json();

      if (data.video.url) {
        resolve({ output: data.video.url });
      } else {
        throw new Error("Create Haiper Video Error: ");
      }
    } catch (error) {
      reject(error);
    }
  });
}

// 视频: Pixverse
export async function getPixverseVideo(
  taskId: string,
  prompt: string,
  url: string,
  template: string
): Promise<any> {
  const prompts: Record<string, string> = {
    "304826314164992": "Transform into Hulk and smash everything",
    "304826126435072": "Transform into a clown and smile mysteriously",
    "304826054394624": "Activate Iron Man mode",
    "304826374632192": "Transform into Batman and protect the night",
    "303788802773760": "Wicked Shots",
    "303624537709312": "We Are Venom!",
    "304358279051648": "Venom! (Color Blind Box Edition)",
    "303624424723200": "Hug Your Love",
    "302325299651648": "Zombie Mode",
    "302325299692608": "Squish It",
    "302325299672128": "Zombie Hand",
    "302325299661888": "Wizard Hat",
    // "302325299661888": "Out of Frame",
    "302325299711040": "Leggy Run",
    "302325299682368": "Monster Invades",
    "302325299702848": "Lego Blast",
  };
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};
      const raw = JSON.stringify({
        model: "v3",
        prompt: prompt || (template in prompts ? prompts[template] : ""),
        image: url,
        template_id: Number(template),
        motion_strength: 0.55,
        motion_scale: {
          horizontal: -3.3,
          vertical: 2.7,
          roll: 4,
          zoom: -4.4,
        },
      });

      const res = await apiFetch("pix/generate", {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();

      result = await fetchPixverseTask(taskId, result.data.task_id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Pixverse
async function fetchPixverseTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 120;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(`pix/task/${resultId}/fetch`, {
        headers: {},
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
            return;
          }
          if (data.data.video_url) {
            resolve({ output: data.data.video_url });
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// 视频: Lightricks
export async function getLightricksVideo(
  taskId: string,
  prompt: string,
  url: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let path = "";
      let raw = "";
      if (url) {
        path = "302/submit/ltx-video-i2v";
        raw = JSON.stringify({
          image_url: url,
          prompt: prompt,
          negative_prompt:
            "low quality, worst quality, deformed, distorted, disfigured, motion smear, motion artifacts, fused fingers, bad anatomy, weird hand, ugly",
          num_inference_steps: 30,
          guidance_scale: 3,
        });
      } else {
        path = "302/submit/ltx-video";
        raw = JSON.stringify({
          prompt: prompt,
          negative_prompt:
            "low quality, worst quality, deformed, distorted, disfigured, motion smear, motion artifacts, fused fingers, bad anatomy, weird hand, ugly",
          num_inference_steps: 30,
          guidance_scale: 3,
        });
      }

      const res = await apiFetch(path, {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });
      if (!res.ok) {
        throw await res.json();
      }

      const data = await res.json();

      if (data.video.url) {
        resolve({ output: data.video.url });
      } else {
        throw new Error("Create Haiper Video Error: ");
      }
    } catch (error) {
      reject(error);
    }
  });
}

// 视频: Hunyuan
export async function getHunyuanVideo(
  taskId: string,
  prompt: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};
      const raw = JSON.stringify({
        prompt: prompt,
      });

      const res = await apiFetch("302/submit/hunyuan-video", {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      result = await fetchHunyuanTask(taskId, result.request_id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Hunyuan
async function fetchHunyuanTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 180;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(`302/submit/hunyuan-video?request_id=${resultId}`, {
        headers: {},
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
            return;
          }
          if (data.status === "COMPLETED") {
            resolve({ output: data.video.url });
          } else if (data.state === "failed") {
            reject("Fetch task failed");
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// 视频: Vidu
export async function getViduVideo(
  taskId: string,
  prompt: string,
  videoPrompt: string,
  mergeUrl: string,
  firstUrl: string,
  lastUrl: string,
  thirdUrl: string,
  ratio: string,
  type: string,
  style: string,
  time: string,
  resolution: string,
  scene: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};
      let path = "";
      let data = {};
      let genType = "text2video";
      const prompts = [
        {
          type: "text",
          content: videoPrompt,
        },
      ];

      switch (type) {
        case "general":
          // push firstimage
          if (firstUrl) {
            genType = "img2video";
            prompts.push({
              type: "image",
              content: firstUrl,
            });
          }
          // push lastimage
          if (lastUrl) {
            genType = "img2video";
            prompts.push({
              type: "image",
              content: lastUrl,
            });
          }
          // use headtailimg2video when firstUrl && lastUrl
          if (firstUrl && lastUrl) {
            genType = "headtailimg2video";
          }
          // set path
          path = "vidu/ent/v1/tasks";
          // set data
          if (firstUrl || lastUrl) {
            data = {
              type: genType,
              model_version: "1.5",
              input: {
                prompts: prompts,
              },
              output_params: {
                sample_count: 1,
                resolution: time === "8" ? "720p" : resolution,
                aspect_ratio: ratio,
                movement_amplitude: "auto",
                duration: Number(time),
              },
              moderation: false,
            };
          } else {
            data = {
              type: genType,
              style: style,
              model_version: "1.5",
              input: {
                seed: 123,
                enhance: true,
                prompts: prompts,
              },
              output_params: {
                sample_count: 1,
                resolution: time === "8" ? "720p" : resolution,
                aspect_ratio: ratio,
                movement_amplitude: "auto",
                duration: Number(time),
              },
              moderation: false,
            };
          }

          break;
        case "character":
          // gen type
          genType = "character2video";
          // push firstimage
          if (firstUrl) {
            prompts.push({
              type: "image",
              content: firstUrl,
            });
          }
          // push lastimage
          if (lastUrl) {
            prompts.push({
              type: "image",
              content: lastUrl,
            });
          }
          // push thirdimage
          if (thirdUrl) {
            prompts.push({
              type: "image",
              content: thirdUrl,
            });
          }
          // set path
          path = "vidu/ent/v1/tasks";
          // set data
          data = {
            type: genType,
            model_version: "1.5",
            input: {
              enhance: true,
              multi_image_boost: true,
              prompts: prompts,
            },
            output_params: {
              sample_count: 1,
              resolution: time === "8" ? "720p" : resolution,
              duration: Number(time),
              aspect_ratio: ratio,
              movement_amplitude: "auto",
            },
            moderation: false,
          };

          break;
        case "scene":
          // complete prompt
          // # 拥抱
          if (scene.split("_")[0] === "hug") {
            prompts[0].content = `拥抱${prompt ? `,${prompt}` : ""}`;
          }
          // # 亲吻
          if (scene.split("_")[0] === "kiss") {
            prompts[0].content = `亲吻${prompt ? `,${prompt}` : ""}`;
          }
          // # 圣诞
          if (scene.split("_")[0] === "christmas") {
            // 变身
            if (scene.split("_")[1] === "effect") {
              prompts[0].content = `视频内容\\n画面中的人物从下前方轻轻举起鲜红的布，动作干净利落地将其从头覆盖到全身，然后随着人物将红布迅速向下扯下，人物变成了充满节日气息的圣诞老人。\\n# 要求\\n1.Style设定为:Realistic, HD\\n2.根据用户上传图片确定人物数量，不要出现[一群人]、[们]等代词而是精准地指出人物数量\\n3.如果用户上传图片有多个人物，则他们需要一起举起红布，所有人都变身为圣诞老人。不要出现图片中没有的人物${prompt ? `,${prompt}` : ""}`;
            }
            // 礼物
            if (scene.split("_")[1] === "gifts") {
              prompts[0].content = `视频内容\\n镜头中人物看向右边，然后一个圣诞老人满面笑容地从右边走入画面，手中捧着一个精美的礼物盒。他轻轻将礼物递给画面中的人物，动作自然且充满温暖。镜头聚焦在接到礼物的人物，人物神情中充满惊喜与感激。画面捕捉到人物的微表情和互动细节。\\n# 要求\\n1.Style设定为:Realistic, HD\\n2.根据用户上传图片确定人物数量，不要出现[一群人]、[们]等代词而是精准地指出人物数量\\n3.如果用户上传图片有多个人物，则他们需要一起举起红布，所有人都变身为圣诞老人。不要出现图片中没有的人物${prompt ? `,${prompt}` : ""}`;
            }
            // 举杯
            if (scene.split("_")[1] === "merry") {
              prompts[0].content = `视频内容\\n画面人物手里拿起香槟酒杯，庆祝圣诞快乐，随着镜头拉远，画面出现圣诞树等圣诞节日物品\\n# 要求\\n1.Take a step-by-step approach in your response\\n2.以我的视频描述为第一要素，背景的描述统一、合理，不要描述两次.\\n3.根据用户上传图片确定人物数量，不要出现[一群人]、[们]等代词而是精准地指出人物数量\\n4.Motion Level 设定为：Middle\\n5.如果用户上传图片有多个人物，每个人都需要拿起香槟酒杯。不要出现图片中没有的人物${prompt ? `,${prompt}` : ""}`;
            }
            // 拥抱
            if (scene.split("_")[1] === "hug") {
              prompts[0].content = `视频内容\\n镜头中人物看向画面外，接着一个圣诞老人满面笑容地从画面外走入画面，然后和人物拥抱，动作自然且充满温暖，镜头聚焦在一个温暖的拥抱，画面捕捉到人物的的微表情和互动细节\\n# 要求\\n1.根据人物的位置和状态合理的设计动作，而不是突兀的直接拥抱，要先描写人物转变到一个合适拥抱的姿势\\n2.Take a step-by-step approach in your response\\n3.根据用户上传图片确定人物数量，不要出现[一群人]、[们]等代词而是精准地指出人物数量\\n4.如果图片中有多个人物，则需要一起和圣诞老人拥抱。不要出现图片中没有的人物\\n5.强调只有1个圣诞老人${prompt ? `,${prompt}` : ""}`;
            }
          }
          // # 变形
          if (scene.split("_")[0] === "morphlab") {
            // 膨胀
            if (scene.split("_")[1] === "inflate") {
              prompts[0].content = `视频内容\\n画面中主体开始膨胀变形，变得越来越大，越来越圆，就像一个气球，慢慢飘了起来\\n# 要求\\n1.根据用户上传图片确定主体数量,每个主体都要膨胀\\n2.Motion Level 设定为:Middle\\n3.以我的视频内容为第一要素，背景的描述统一、合理，不要描述两次.${prompt ? `,${prompt}` : ""}`;
            }
            // 扭曲
            if (scene.split("_")[1] === "twist") {
              prompts[0].content = `视频内容\\n画面开始，主体静止不动。随后，一双大手出现，将主体像橡皮泥般抓住并挤压。\\n随着主体逐渐缩小，被夹在手指间柔软变形\\n# 要求\\n1.根据用户上传图片确定主体数量,每个主体都要被捏扁\\n2.Motion Level 设定为:Middle\\n3.以我的视频内容为第一要素，背景的描述统一、合理，不要描述两次.${prompt ? `,${prompt}` : ""}`;
            }
            // 爆炸
            if (scene.split("_")[1] === "explode") {
              prompts[0].content = `视频内容\\n画面开始主体突然爆炸，细碎的颗粒爆炸开来\\n# 要求\\n1.根据用户上传图片确定主体数量,每个主体都要爆炸\\n2.Motion Level 设定为:Middle\\n3.以我的视频内容为第一要素，背景的描述统一、合理，不要描述两次.${prompt ? `,${prompt}` : ""}`;
            }
            // 扭曲
            if (scene.split("_")[1] === "melt") {
              prompts[0].content = `视频内容\\n画面中主体慢慢地开始融化，最终形成一个表面光滑的水坑\\n# 要求\\n1.根据用户上传图片确定主体数量,每个主体都要融化\\n2.Motion Level 设定为:Middle\\n3.以我的视频内容为第一要素，背景的描述统一、合理，不要描述两次.${prompt ? `,${prompt}` : ""}`;
            }
          }
          // prompts[0].content = scene.split("_").join(" ");
          // push firstimage
          if (firstUrl && !lastUrl) {
            prompts.push({
              type: "image",
              content: firstUrl,
            });
          }
          // push lastimage
          if (!firstUrl && lastUrl) {
            prompts.push({
              type: "image",
              content: lastUrl,
            });
          }
          // push lastimage
          if (firstUrl && lastUrl) {
            prompts.push({
              type: "image",
              content: mergeUrl,
            });
          }
          // set path
          path = "vidu/ent/v1/scenes/tasks";
          // set data
          data = {
            scene: scene.split("_")[0],
            input: {
              prompts: prompts,
            },
          };
          break;
        default:
          break;
      }

      const res = await apiFetch(path, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });

      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      result = await fetchViduTask(taskId, result.id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });

  // return {output: "https://vidu-ai.oss-cn-hangzhou.aliyuncs.com/vidu/vidu.mp4"}
}

// 拓展: Vidu
export async function extendViduVideo(
  taskId: string,
  resultId: string,
  duration: number
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};
      const data = {
        type: "upscale",
        model: "stable",
        input: {
          creation_id: resultId,
        },
        output_params: {
          sample_count: 1,
          duration: duration,
        },
      };

      const res = await apiFetch("vidu/ent/v1/tasks", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });

      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      result = await fetchViduTask(taskId, result.id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// 查询: Vidu
async function fetchViduTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 180;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(`vidu/ent/v1/tasks/${resultId}/creations`, {
        headers: {},
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
            return;
          }
          if (data.state === "success") {
            resolve({
              output: data.creations[0].url,
              id: data.creations[0].id,
            });
          } else if (data.state === "failed") {
            reject("Fetch task failed");
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}

// 拓展比例//////
// 拓展比例: Runway
export async function extendRunwayVideoRatio(
  taskId: string,
  video: string,
  prompt: string,
  ratio: string,
  seconds: number = 5
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      const formData = new FormData();
      formData.append("video", video);
      formData.append("text_prompt", prompt);
      formData.append("outpaint_aspect_ratio", ratio);
      formData.append("seconds", seconds.toString());

      const res = await apiFetch("runway_turbo_expand/submit", {
        method: "POST",
        body: formData,
        headers: {},
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      result = await fetchRunwayTask(taskId, result.task.id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// 拓展风格/////
export async function extendVideoStyle(
  taskId: string,
  video: string,
  structure_transformation: number,
  text_prompt?: string,
  seconds?: number
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};

      const formData = new FormData();
      formData.append("video_prompt", video);
      // formData.append(
      //   "structure_transformation",
      //   structure_transformation.toString()
      // );
      if (text_prompt) {
        formData.append("text_prompt", text_prompt);
      }
      if (seconds) {
        formData.append("seconds", seconds.toString());
      }

      const res = await apiFetch("runway_turbo/submit", {
        method: "POST",
        body: formData,
        headers: {},
      });
      if (!res.ok) {
        throw await res.json();
      }

      result = await res.json();
      result = await fetchRunwayTask(taskId, result.task.id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// 视频配音/////
// 音频生成：mmaudio
export async function getMmaudioAudio(
  taskId: string,
  video: string,
  prompt: string
  // seconds: number = 10
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any = {};
      const data = {
        video_url: video,
        prompt: prompt,
        negative_prompt: "",
        num_steps: 25,
        // duration: 8,
        cfg_strength: 4.5,
      };

      const res = await apiFetch("302/submit/mmaudio", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json;charset:utf-8;",
        },
      });
      if (!res.ok) {
        throw await res.json();
      }
      result = await res.json();
      result = await fetchMmaudioTask(taskId, result.request_id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// 音频获取：mmaudio
export async function fetchMmaudioTask(taskId: string, resultId: string) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const maxAttempts = 180;

    const polling = (taskId: string, resultId: string) => {
      apiFetch(`302/submit/mmaudio?request_id=${resultId}`, {
        headers: {},
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            reject(data.error);
            return;
          }
          if (data.status === "COMPLETED") {
            resolve({ output: data.video.url });
          } else if (data.state === "failed") {
            reject("Fetch task failed");
          } else {
            if (counter < maxAttempts) {
              counter++;
              const { getTask } = useTaskStore.getState();
              const task = getTask(taskId);
              if (task) {
                setTimeout(() => polling(taskId, resultId), 10000); // 每隔10秒轮询一次
              }
            } else {
              reject("Max attempts reached");
            }
          }
        })
        .catch((error) => {
          reject(error);
        });
    };
    polling(taskId, resultId);
  });
}
