import React from 'react';
import rehypeParse from 'rehype-parse';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
// import { getHighlighter } from 'shiki';
import { unified } from 'unified';

interface CodeRendererProps {
  code: string;
  language: 'html' | 'markdown' | 'json';
}

const CodeRenderer: React.FC<CodeRendererProps> = ({ code, language }) => {
  const [highlightedCode, setHighlightedCode] = React.useState<string>('');

  React.useEffect(() => {
    const highlightCode = async () => {
      // const highlighter = await getHighlighter({ themes: ['nord'] });
      const processor = unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypePrettyCode, { theme: 'nord', keepBackground: true })
        .use(rehypeStringify);

      const file = await processor.process(code);
      setHighlightedCode(String(file));
    };

    highlightCode();
  }, [code, language]);

  return (
    <div
      className="code-renderer"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
};

export default CodeRenderer;
