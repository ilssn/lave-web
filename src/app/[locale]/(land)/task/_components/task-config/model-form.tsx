import { Separator } from "@radix-ui/react-dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ModelForm({
  taskData,
  onTaskDataChange,
}: {
  taskData: any;
  onTaskDataChange: (key: string, value: any) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="w-full">
        <Label>深度爬虫</Label>
        <Select
          value={taskData.searchModel}
          onValueChange={(value) => onTaskDataChange("searchModel", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="选择深度爬虫" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">
              关闭（只根据任务链接进行提取）
            </SelectItem>
            <SelectItem value="deep">
              开启（从页面中自动检索更多链接）
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {taskData.searchModel === "deep" && (
        <div className="flex w-full justify-between space-x-4">
          <div className="flex-1">
            <Label htmlFor="max-depth">最大爬取深度</Label>
            <Input
              type="number"
              min={1}
              id="max-depth"
              placeholder="最大爬取深度"
              className="w-full"
              value={taskData.maxDepth}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onTaskDataChange("maxDepth", Number(e.target.value))
              }
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="max-links">最大链接数量</Label>
            <Input
              type="number"
              min={1}
              id="max-links"
              placeholder="最大链接数量"
              className="w-full"
              value={taskData.maxLinks}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onTaskDataChange("maxLinks", Number(e.target.value))
              }
            />
          </div>
        </div>
      )}

      <Separator className="mb-2 mt-6 border border-gray-200 text-gray-500" />

      <div className="w-full">
        <Label>数据抓取模式</Label>
        <Select
          value={taskData.matchType}
          onValueChange={(value) => onTaskDataChange("matchType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="选择数据抓取模式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">
              自动模式（AI根据HTML自动输出数据）
            </SelectItem>
            {/* <SelectItem value="manual">手动模式</SelectItem> */}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
