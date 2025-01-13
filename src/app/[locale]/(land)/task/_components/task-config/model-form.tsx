import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function ModelForm({ taskData, onTaskDataChange }: { taskData: any, onTaskDataChange: (key: string, value: any) => void }) {
  return <div className="space-y-4">
    <div className="w-full">
      <Label htmlFor="model-name">深度爬虫</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="选择深度爬虫" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="depth">关闭（只根据任务链接进行提取）</SelectItem>
          <SelectItem value="breadth">开启（从页面中自动检索更多链接）</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="w-full flex justify-between space-x-4">
      <div className="flex-1">
        <Label htmlFor="max-depth">最大爬取深度</Label>
        <Input type="number" min={1} id="max-depth" placeholder="最大爬取深度" className="w-full" value={taskData.maxDepth} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTaskDataChange("maxDepth", Number(e.target.value))} />
      </div>
      <div className="flex-1">
        <Label htmlFor="max-links">最大链接数量</Label>
        <Input type="number" min={1} id="max-links" placeholder="最大链接数量" className="w-full" value={taskData.maxLinks} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTaskDataChange("maxLinks", Number(e.target.value))} />
      </div>
    </div>

    <Separator className="mt-6 mb-2 border-gray-200 text-gray-500 border" />

    <div className="w-full">
      <Label htmlFor="model-name">数据抓取模式</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="选择数据抓取模式" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto">自动模式（AI根据HTML自动输出数据）</SelectItem>
          <SelectItem value="schema">手动模式</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>;
}