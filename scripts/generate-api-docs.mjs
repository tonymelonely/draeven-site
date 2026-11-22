#!/usr/bin/env node
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Application, TSConfigReader } from "typedoc";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const framework = join(root, "..", "Draeven-framework", "packages");
const outDir = join(root, "content", "api");

function posix(path) {
  return path.replaceAll("\\", "/");
}

const packages = [
  {
    id: "core",
    entry: join(framework, "core", "src", "index.ts"),
    tsconfig: join(framework, "core", "tsconfig.json"),
  },
  {
    id: "discord",
    entry: join(framework, "discord", "src", "index.ts"),
    tsconfig: join(framework, "discord", "tsconfig.json"),
  },
  {
    id: "bridge",
    entry: join(framework, "bridge", "src", "index.ts"),
    tsconfig: join(framework, "bridge", "tsconfig.json"),
  },
];

await mkdir(outDir, { recursive: true });

for (const pkg of packages) {
  if (!existsSync(pkg.entry)) {
    console.warn(`[api:docs] skip ${pkg.id} — missing ${pkg.entry}`);
    continue;
  }

  const app = await Application.bootstrap({
    entryPoints: [posix(pkg.entry)],
    tsconfig: posix(pkg.tsconfig),
    excludeExternals: true,
    excludePrivate: true,
    excludeProtected: true,
    exclude: ["**/*.{test,spec}.ts"],
    skipErrorChecking: true,
    readme: "none",
    name: `@draeven/${pkg.id}`,
  });
  app.options.addReader(new TSConfigReader());

  const project = await app.convert();
  if (!project) {
    console.warn(`[api:docs] convert failed for ${pkg.id}`);
    continue;
  }

  const out = join(outDir, `${pkg.id}.json`);
  await app.generateJson(project, out);
  console.log(`[api:docs] wrote content/api/${pkg.id}.json`);
}
