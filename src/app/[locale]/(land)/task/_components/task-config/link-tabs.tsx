import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

const LinkInput = ({ links, setLinks }: { links: string[], setLinks: (links: string[]) => void }) => {
  // const [links, setLinks] = useState<string[]>([]);
  const [currentLink, setCurrentLink] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentLink.trim() !== "") {
        handleAddLink();
      }
    }
  };

  const handleAddLink = () => {
    if (currentLink.trim() !== "") {
      let formattedLink = currentLink.trim();
      if (!formattedLink.startsWith("http://") && !formattedLink.startsWith("https://")) {
        formattedLink = "https://" + formattedLink;
      }
      setLinks([...links, formattedLink]);
      setCurrentLink("");
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
      <div className="relative">
        <Input
          id="start-url"
          type="text"
          className="w-full p-2 border rounded"
          value={currentLink}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          placeholder="输入链接并回车/添加"
        />
        <Button className="absolute right-[2px] top-[2px] hover:text-primary"
          size="sm"
          variant="ghost"
          onClick={() => handleAddLink()}>
          <PlusIcon className="h-4 w-4 hover:scale-110" />
        </Button>
      </div>
      <div className="mt-2 space-y-2">
        {links.map((link, index) => (
          <div key={index} className="relative">
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
            <Button variant="ghost" size="sm" className="absolute right-[2px] top-[2px] hover:text-red-600" onClick={() => removeLink(index)}>
              <Trash2Icon className="w-4 h-4 hover:scale-110" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkInput;