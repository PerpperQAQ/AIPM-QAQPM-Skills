import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
export default function MarkdownRenderer({children,resolve}) {return <Markdown remarkPlugins={[remarkGfm]} components={{a:({href,children})=><a href={resolve(href)} target="_blank" rel="noreferrer">{children}</a>}}>{children}</Markdown>}
