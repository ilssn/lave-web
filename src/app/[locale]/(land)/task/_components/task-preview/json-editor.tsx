import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import FileManager from '@/lib/file';
import { SaveIcon } from 'lucide-react';
import { useState } from 'react';

const JsonEditor = ({ initialData }: { initialData: any }) => {
  const [jsonData, setJsonData] = useState(JSON.stringify(initialData, null, 2));

  const handleSave = () => {
    FileManager.saveDataToFile(jsonData, 'data.json', 'application/json');
  };

  return (
    <div className="h-full bg-gray-100 rounded-md relative mx-[1px]">
      <Textarea
        rows={18}
        className="w-full h-full p-2"
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