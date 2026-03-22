declare module "remark-gfm" {
  import type { Plugin } from "unified";
  const remarkGfm: Plugin;
  export default remarkGfm;
}

declare module "react-markdown" {
  import type { ComponentType } from "react";
  export interface ReactMarkdownProps {
    children?: string;
    remarkPlugins?: unknown[];
    rehypePlugins?: unknown[];
    components?: Record<string, ComponentType<unknown>>;
  }
  const ReactMarkdown: ComponentType<ReactMarkdownProps>;
  export default ReactMarkdown;
}
