import React from "react";
import ReactMarkdown from "react-markdown";
import "./index.scss";
import { useCreation } from "ahooks";
import remarkFrontMatter from "remark-frontmatter";
import remarkDirective from "remark-directive";
import remarkGfm from 'remark-gfm'

export function MarkdownArea({ data: res }) {
  if (!res) {
    return null;
  }

  const { moduleMap, content } = res;

  const markdownElements = useCreation(
    () => (
      // @ts-ignore
      <ReactMarkdown
        className="markdown-body"
        remarkPlugins={[remarkDirective, remarkFrontMatter as any, remarkGfm]}
      >

        {content.replace(/#+\s*API.*/gs, '')}
      </ReactMarkdown>
    ),
    [content, moduleMap]
  );

  return <div className="markdown-area">{markdownElements}</div>;
}
