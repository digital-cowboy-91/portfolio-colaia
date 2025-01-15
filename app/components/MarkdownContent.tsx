import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Markdown from "react-markdown";

export default function MarkdownContent({ text }: { text: string }) {
  return (
    <Markdown
      components={{
        a({ children, ...rest }) {
          return (
            <a className="text-primary" {...rest}>
              {children}
              <Icon
                icon="lsicon:link-filled"
                width="1rem"
                height="1rem"
                className="mx-[0.1rem]"
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
