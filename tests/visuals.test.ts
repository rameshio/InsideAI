import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { textContent } from "../src/lib/text";
import { logoMesh, mulberry32 } from "../src/lib/logo-mesh";

test("textContent flattens MDX-style children instead of returning [object Object]", () => {
  const children = [
    createElement(
      "p",
      { key: 1 },
      "Line one ",
      createElement("strong", null, "bold"),
    ),
    createElement("p", { key: 2 }, "Line two"),
  ];
  assert.equal(textContent(children).trim(), "Line one bold\n\nLine two");
  assert.equal(textContent("plain"), "plain");
  assert.equal(textContent(null), "");
});

test("logo mesh is deterministic and well-formed", () => {
  const mesh = logoMesh();
  assert(mesh.nodes.length > 60, "enough nodes to read as the logo");
  assert(mesh.edges.length > mesh.nodes.length, "triangulated, not a tree");
  for (const [a, b] of mesh.edges) {
    assert(
      a < b && b < mesh.nodes.length,
      "edge indexes are valid and ordered",
    );
  }
  assert.equal(
    mesh.nodes.filter((n) => n.ring === 2).length,
    1,
    "one core flare",
  );
  for (const n of mesh.nodes)
    assert(Math.abs(n.x) < 1.2 && Math.abs(n.y) < 1.2);
});

test("seeded random is repeatable", () => {
  const a = mulberry32(7);
  const b = mulberry32(7);
  assert.deepEqual([a(), a(), a()], [b(), b(), b()]);
});
