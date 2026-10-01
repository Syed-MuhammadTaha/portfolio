type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode };

/** A link styled like code: { label }. Hover strikes through the label and eases the braces apart. */
export default function CodeLink({ children, className, ...rest }: Props) {
  const external = typeof rest.href === "string" && rest.href.startsWith("http");
  return (
    <a
      className={`code-link${className ? ` ${className}` : ""}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <span className="b" aria-hidden="true">
        {"{"}
      </span>
      <span className="txt">{children}</span>
      <span className="b" aria-hidden="true">
        {"}"}
      </span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
