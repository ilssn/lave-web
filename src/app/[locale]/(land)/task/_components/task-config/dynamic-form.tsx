import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2Icon } from "lucide-react";
import * as React from "react";

const DynamicForm = () => {
  const [formData, setFormData] = React.useState<{ key: string; type: string; description: string }[]>([]);

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newFormData = [...formData];
    newFormData[index].key = e.target.value;
    setFormData(newFormData);
  };

  const handleTypeChange = (e: string, index: number) => {
    const newFormData = [...formData];
    newFormData[index].type = e;
    setFormData(newFormData);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newFormData = [...formData];
    newFormData[index].description = e.target.value;
    setFormData(newFormData);
  };

  const handleAddField = () => {
    setFormData([...formData, { key: "", type: "string", description: "" }]);
  };

  const handleRemoveField = (index: number) => {
    const newFormData = formData.filter((_, i) => i !== index);
    setFormData(newFormData);
  };

  React.useEffect(() => {
    const formattedData = formData.reduce<Record<string, { type: string; description: string }>>((acc, field) => {
      acc[field.key] = {
        type: field.type,
        description: field.description,
      };
      return acc;
    }, {});
    console.log(formattedData);
  }, [formData]);

  return (
    <div className="space-y-4">
      {formData.map((field, index) => (
        <div key={index} className="flex items-center space-x-1 space-y-1">
          <Input
            value={field.key}
            onChange={(e) => handleKeyChange(e, index)}
            placeholder="字段名称"
            className="w-3/12"
          />
          <div className="w-3/12">
            <Select
              value={field.type}
              onValueChange={(e) => handleTypeChange(e, index)}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">string</SelectItem>
                <SelectItem value="number">number</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            value={field.description}
            onChange={(e) => handleDescriptionChange(e, index)}
            placeholder="字段描述"
            className="w-6/12"
          />
          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={() => handleRemoveField(index)}>
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <div className="flex w-full justify-between">
        <Button variant="outline" onClick={handleAddField}>
          自动生成
        </Button>
        <Button variant="outline" onClick={handleAddField}>
          添加字段
        </Button>
      </div>
    </div>
  );
};

export default DynamicForm;