import "highlight.js/styles/vs2015.min.css";

import hljs from "highlight.js";
import DOMPurify from "isomorphic-dompurify";

hljs.configure({ languages: ["javascript"] });

export default function Code({ snippet }: { snippet: string }) {
  const html = hljs.highlightAuto(snippet, ["javascript"]).value;
  const sanitizedHtml = DOMPurify.sanitize(html);

  return (
    <code
      className="hljs whitespace-pre-wrap"
      style={{
        backgroundColor: "transparent",
      }}
      dangerouslySetInnerHTML={{
        __html: sanitizedHtml,
      }}
    />
  );
}
