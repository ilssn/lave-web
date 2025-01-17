import { useEffect, useState } from "react";

import { SaveIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FileManager from "@/lib/file";

const JsonEditor = ({ initialData }: { initialData: any }) => {
  const [jsonData, setJsonData] = useState("{}");

  const handleSave = () => {
    FileManager.saveDataToFile(jsonData, "data.json", "application/json");
  };

  useEffect(() => {
    const data = initialData.flatMap((item: any) => {
      return item.data.map((item: any) => {
        const { error, ...rest } = item;
        return {
          ...rest,
        };
      });
    });
    setJsonData(JSON.stringify(data, null, 2));
  }, [initialData]);

  return (
    <div className="relative h-full rounded-md bg-gray-100">
      <Textarea
        rows={18}
        style={{ height: "100%" }}
        className="h-full w-full"
        value={jsonData}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setJsonData(e.target.value)
        }
      />
      <Button
        variant="outline"
        size="icon"
        onClick={handleSave}
        className="absolute bottom-2 right-2"
      >
        <SaveIcon className="h-4 w-4 hover:scale-110 hover:text-primary" />
      </Button>
    </div>
  );
};

export default JsonEditor;
