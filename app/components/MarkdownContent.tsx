import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Markdown from "react-markdown";

export default function MarkdownContent({ text }: { text: string }) {
  return (
    <Markdown
      components={{
        a({ children, ...rest }) {
          return (
            <a className="text-primary relative pe-[1rem]" {...rest}>
              {children}
              <Icon
                icon="tdesign:link"
                width="1rem"
                height="1rem"
                className="absolute right-0 top-1/2 -translate-y-1/2"
              />
            </a>
          );
        },
      }}
    >
      {text}
    </Markdown>
  );
}
