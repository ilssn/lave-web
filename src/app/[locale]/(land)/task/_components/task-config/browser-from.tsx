import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BrowserForm({ taskData, onTaskDataChange }: { taskData: any, onTaskDataChange: (key: string, value: any) => void }) {
  return <div className="space-y-4">
    <div className="w-full">
      <Label htmlFor="browser-name">浏览器内核</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="选择浏览器内核" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="chromium">Chromium</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="w-full flex justify-between space-x-4">
      <div className="flex-1">
        <Label htmlFor="window-width">浏览器宽度</Label>
        <Input type="number" min={1} id="window-width" placeholder="浏览器宽度" className="w-full" value={taskData.windowWidth} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTaskDataChange("windowWidth", Number(e.target.value))} />
      </div>
      <div className="flex-1">
        <Label htmlFor="window-height">浏览器高度</Label>
        <Input type="number" min={1} id="window-height" placeholder="浏览器高度" className="w-full" value={taskData.windowHeight} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTaskDataChange("windowHeight", Number(e.target.value))} />
      </div>
    </div>

    {/* <Separator className="mt-6 mb-2 border-gray-200 text-gray-500 border" /> */}
    <div className="flex-1">
      <Label htmlFor="browser-headers">Headers设置</Label>
      <Input id="browser-headers" placeholder="设置Headers" className="w-full" value={taskData.browserHeaders} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTaskDataChange("browserHeaders", e.target.value)} />
    </div>
    <div className="flex-1">
      <Label htmlFor="browser-cookies">Cookies设置</Label>
      <Input id="browser-cookies" placeholder="设置Cookies" className="w-full" value={taskData.browserCookies} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTaskDataChange("browserCookies", e.target.value)} />
    </div>
    <div className="flex-1">
      <Label htmlFor="browser-user-agent">User Agent</Label>
      <Input id="browser-user-agent" placeholder="设置User Agent" className="w-full" value={taskData.browserUserAgent} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTaskDataChange("browserUserAgent", e.target.value)} />
    </div>
    <div className="w-full flex justify-between space-x-4">
      <div className="flex-1">
        <Label htmlFor="browser-name">纯文本模式</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="是否打开纯文本模式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">开启</SelectItem>
            <SelectItem value="false">关闭</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <Label htmlFor="browser-light-mode">轻量模式</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="是否打开轻量模式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">开启</SelectItem>
            <SelectItem value="false">关闭</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

  </div>;
}