import { isValidElement, type ReactNode } from "react";

/**
 * Flattens React children to plain text. MDX wraps multi-line content in
 * <p> elements, so `String(children)` would produce "[object Object]"; this
 * walks the tree and joins the text instead.
 */
export function textContent(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textContent).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    const text = textContent(node.props.children);
    return node.type === "p" ? `${text}\n\n` : text;
  }
  return "";
}
