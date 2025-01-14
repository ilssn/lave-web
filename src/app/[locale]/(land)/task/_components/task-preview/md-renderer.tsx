import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react';

interface MdEditorProps {
  initialContent?: string;
}

const MdEditor: React.FC<MdEditorProps> = ({ initialContent }) => {
  const [value, setValue] = useState(initialContent || '**Hello World!**');

  const handleEditorChange = (newValue?: string) => {
    setValue(newValue || '');
  };

  return (
    <div className="w-full h-full" data-color-mode="light">
      <MDEditor
        value={value}
        onChange={handleEditorChange}
        height="100%"
      // height={2000}
      />
      <style jsx>{`
        .w-md-editor .w-md-editor-preview {
          display: none; /* 隐藏预览部分 */
        }
      `}</style>
    </div>
  );
};

export default MdEditor;