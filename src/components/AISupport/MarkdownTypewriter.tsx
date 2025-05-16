import { useTypewriter } from 'react-simple-typewriter';
import ReactMarkdown from 'react-markdown';
import { type MarkdownTypewriterProps } from '../../types';


export default function MarkdownTypewriter({ text, speed }: MarkdownTypewriterProps) {
  const [typedText] = useTypewriter({
    words: [text],
    loop: 1,
    typeSpeed: speed,
    deleteSpeed: 0,
    delaySpeed: 100000,
  });

  return (
    <ReactMarkdown>
      {typedText}
    </ReactMarkdown>
  );
}
