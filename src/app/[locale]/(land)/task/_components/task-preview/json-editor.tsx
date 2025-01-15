import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import FileManager from '@/lib/file';
import { SaveIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const JsonEditor = ({ initialData }: { initialData: any }) => {
  const [jsonData, setJsonData] = useState("{}");

  const handleSave = () => {
    FileManager.saveDataToFile(jsonData, 'data.json', 'application/json');
  };

  useEffect
    (() => {
      const data = initialData.map((item: any) => {
        return {
          depth: item.depth,
          url: item.url,
          title: item.metadata.title,
          description: item.metadata.description,
          data: item.data,
          // metadata: item.metadata,
        }
      })
      setJsonData(JSON.stringify(data, null, 2));
    }, [initialData]);

  return (
    <div className="h-full bg-gray-100 rounded-md relative">
      <Textarea
        rows={18}
        style={{ height: '100%' }}
        className="w-full h-full"
        value={jsonData}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJsonData(e.target.value)}
      />
      <Button variant="outline" size="icon" onClick={handleSave} className="absolute bottom-2 right-2">
        <SaveIcon className="w-4 h-4 hover:text-primary hover:scale-110" />
      </Button>
    </div>
  );
};

export default JsonEditor;