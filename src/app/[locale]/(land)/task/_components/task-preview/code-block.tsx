import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';



interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => (
  <div style={{ width: '100%', height: '100%', overflowX: 'auto', }} className='absolute top-0 left-0 w-full h-full'>
    <SyntaxHighlighter language={language} style={docco} wrapLongLines={true} >
      {value}
    </SyntaxHighlighter>
  </div>
);

export default CodeBlock;