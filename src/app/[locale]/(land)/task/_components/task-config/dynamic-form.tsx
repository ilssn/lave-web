import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { MinusCircleIcon, PlusIcon, Trash2Icon } from "lucide-react";
import * as React from "react";

const convertToSchemaObject = (formData: { key: string; type: string; description: string }[]) => {
  return Object.fromEntries(formData.map(field => [field.key, { type: field.type, description: field.description }]));
};

const DynamicForm = ({ taskData, onTaskDataChange }: any) => {

  const schemaArray = Object.entries(taskData.schema).map(([key, value]) => ({
    key,
    type: typeof value === 'object' && value !== null && 'type' in value ? String(value.type) : '',
    description: typeof value === 'object' && value !== null && 'description' in value ? String(value.description) : ''
  }));

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newFormData = [...schemaArray];
    newFormData[index].key = e.target.value;
    onTaskDataChange("schema", convertToSchemaObject(newFormData));
  };

  const handleTypeChange = (e: string, index: number) => {
    const newFormData = [...schemaArray];
    newFormData[index].type = e;
    onTaskDataChange("schema", convertToSchemaObject(newFormData));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newFormData = [...schemaArray];
    newFormData[index].description = e.target.value;
    onTaskDataChange("schema", convertToSchemaObject(newFormData));
  };

  const handleAddField = () => {
    const uniqueKey = `key${schemaArray.length + 1}`;
    const newFormData = [...schemaArray, { key: uniqueKey, type: "string", description: "" }];
    onTaskDataChange("schema", convertToSchemaObject(newFormData));
  };

  const handleRemoveField = (index: number) => {
    const newFormData = schemaArray.filter((_: any, i: number) => i !== index);
    onTaskDataChange("schema", convertToSchemaObject(newFormData));
  };

  const handleResetForm = () => {
    onTaskDataChange("schema", {});
  };

  React.useEffect(() => {
    const formattedData = schemaArray.reduce((acc: Record<string, { type: string; description: string }>, field: { key: string; type: string; description: string }) => {
      acc[field.key] = {
        type: field.type,
        description: field.description,
      };
      return acc;
    }, {});
    // console.log(formattedData);
  }, [taskData]);

  return (
    <div className="space-y-4">
      {schemaArray.map((field: { key: string; type: string; description: string }, index: number) => (
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
          <div
            className="ml-2 cursor-pointer hover:scale-110 hover:text-red-600"
            onClick={() => handleRemoveField(index)}
            aria-label="删除字段"
          >
            <MinusCircleIcon className="h-4 w-4" />
          </div>
        </div>
      ))}

      <Button variant="ghost" onClick={handleAddField} className="w-full border">
        <PlusIcon className="h-4 w-4 hover:text-primary hover:scale-110" />
      </Button>
      <div className="flex w-full justify-between">
        <Button variant="outline" onClick={handleResetForm}>
          <Trash2Icon className="h-4 w-4 hover:text-red-600 hover:scale-110" />
        </Button>
        <Button variant="outline" onClick={handleAddField}>
          <MagicWandIcon className="h-4 w-4 hover:text-primary hover:scale-110" />
        </Button>
      </div>
    </div>
  );
};

export default DynamicForm;