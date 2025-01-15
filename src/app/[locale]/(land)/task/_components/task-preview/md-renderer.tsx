import 'github-markdown-css';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

// 预处理函数，识别并处理外部括号中有两个 http 开头的链接
const preprocessMarkdown = (content: string) => {
  // 使用正则表达式匹配并替换
  // 匹配形如 http://example.com<http://example2.com> 的字符串，并将其替换为 http://example2.com
  return content.replace(/https?:\/\/[^\s<]+<\s*(https?:\/\/[^\s>]+)\s*>/g, '$1');
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // 预处理内容
  const processedContent = preprocessMarkdown(content);

  return (
    <div className="markdown-body" style={{ backgroundColor: 'white', color: 'black', padding: '1rem', borderRadius: '8px' }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => {
            if (props.src && typeof props.src === 'string') {
              try {
                new URL(props.src);
                return <img {...props} alt={props.alt || ''} />;
              } catch {
                return <span>{props.alt || 'Invalid image link'}</span>;
              }
            }
            return <span>{props.alt || 'Invalid image link'}</span>;
          },
          a: ({ node, ...props }) => {
            return <a {...props} target="_blank" rel="noopener noreferrer">{props.children}</a>;
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;