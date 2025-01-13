import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProxyForm({ taskData, onTaskDataChange }: { taskData: any, onTaskDataChange: (key: string, value: any) => void }) {
  return <div className="space-y-4">
    <div className="flex-1">
      <Label htmlFor="proxy-url">代理链接</Label>
      <Input id="proxy-url" placeholder="代理链接" className="w-full" value={taskData.proxyUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTaskDataChange("proxyUrl", e.target.value)} />
    </div>
    <div className="flex-1">
      <Label htmlFor="proxy-username">用户名</Label>
      <Input id="proxy-username" placeholder="用户名" className="w-full" value={taskData.proxyUsername} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTaskDataChange("proxyUsername", e.target.value)} />
    </div>
    <div className="flex-1">
      <Label htmlFor="proxy-password">密码</Label>
      <Input id="proxy-password" placeholder="密码" className="w-full" value={taskData.proxyPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTaskDataChange("proxyPassword", e.target.value)} />
    </div>

  </div>;
}