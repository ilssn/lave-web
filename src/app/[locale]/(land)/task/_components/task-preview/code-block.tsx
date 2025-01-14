import beautify from 'js-beautify';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as themes from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ code, language }: { code: string, language: string }) => {
  // 根据语言格式化代码
  const formattedCode = language === 'html' ? beautify.html(code) : code;

  return (
    <SyntaxHighlighter
      language={language}
      style={themes.vscDarkPlus}
      showLineNumbers
      lineNumberStyle={{ minWidth: '2em', textAlign: 'right', marginRight: '1em', opacity: 0.5 }}
    >
      {formattedCode}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;