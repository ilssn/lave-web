import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

const LinkInput = ({ links, setLinks }: { links: string[], setLinks: (links: string[]) => void }) => {
  // const [links, setLinks] = useState<string[]>([]);
  const [currentLink, setCurrentLink] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentLink.trim() !== "") {
        setLinks([...links, currentLink.trim()]);
        setCurrentLink("");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLink(e.target.value);
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  return (
    <div>
      <Label htmlFor="start-url">添加链接</Label>
      <Input
        id="start-url"
        type="text"
        className="w-full p-2 border rounded"
        value={currentLink}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder="输入链接并回车/添加"
      />
      <div className="mt-2 space-y-2">
        {links.map((link, index) => (
          <div key={index} className="flex items-center relative">
            <Input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={link}
              onChange={(e) => {
                const newLinks = [...links];
                newLinks[index] = e.target.value;
                setLinks(newLinks);
              }}
            />
            <Trash2Icon
              className="absolute right-2 top-4 w-4 h-4 text-red-500 hover:text-red-600 hover:scale-105 hover:cursor-pointer"
              onClick={() => removeLink(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkInput;