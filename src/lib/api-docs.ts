import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type ApiType = {
  type?: string;
  name?: string;
  package?: string;
  qualifiedName?: string;
  value?: string | number | boolean | null;
  operator?: string;
  target?: ApiType | number | { packageName?: string; packagePath?: string; qualifiedName?: string };
  elementType?: ApiType;
  types?: ApiType[];
  typeArguments?: ApiType[];
  elements?: ApiType[];
  declaration?: { children?: ApiSymbol[]; signatures?: ApiSymbol["signatures"] };
  elementTypes?: ApiType[];
  checkType?: ApiType;
  extendsType?: ApiType;
  trueType?: ApiType;
  falseType?: ApiType;
  objectType?: ApiType;
  indexType?: ApiType;
  parameter?: string;
  constraint?: ApiType;
  default?: ApiType;
  templateType?: ApiType;
  queryType?: ApiType;
  parameterType?: ApiType;
};

export type ApiPackage = {
  id: string;
  name: string;
  version?: string;
  children: ApiSymbol[];
};

export type ApiSymbol = {
  id: number;
  name: string;
  kind?: number;
  kindString?: string;
  flags?: {
    isReadonly?: boolean;
    isStatic?: boolean;
    isOptional?: boolean;
    isAbstract?: boolean;
    isPrivate?: boolean;
    isProtected?: boolean;
    isExternal?: boolean;
  };
  comment?: {
    summary?: Array<{ kind?: string; text?: string }>;
    blockTags?: Array<{ tag?: string; content?: Array<{ kind?: string; text?: string }> }>;
  };
  children?: ApiSymbol[];
  groups?: Array<{ title: string; children: number[] }>;
  sources?: Array<{ fileName?: string; line?: number; url?: string }>;
  signatures?: Array<{
    id?: number;
    name?: string;
    comment?: ApiSymbol["comment"];
    parameters?: Array<{
      name: string;
      flags?: ApiSymbol["flags"];
      type?: ApiType;
      comment?: ApiSymbol["comment"];
      defaultValue?: string;
    }>;
    type?: ApiType;
    typeParameters?: Array<{
      name: string;
      type?: ApiType;
      default?: ApiType;
      flags?: ApiSymbol["flags"];
    }>;
  }>;
  type?: ApiType;
  typeParameters?: Array<{
    name: string;
    type?: ApiType;
    default?: ApiType;
    flags?: ApiSymbol["flags"];
  }>;
  extendedTypes?: ApiType[];
  implementedTypes?: ApiType[];
  inheritedFrom?: ApiType;
  overwrites?: ApiType;
  getSignature?: ApiSymbol["signatures"];
  setSignature?: ApiSymbol["signatures"];
};

const apiRoot = join(process.cwd(), "content", "api");

export const apiPackages = ["core", "discord", "bridge"] as const;

const KIND_LABEL: Record<number, string> = {
  2: "Module",
  4: "Namespace",
  8: "Enum",
  16: "Enum member",
  32: "Variable",
  64: "Function",
  128: "Class",
  256: "Interface",
  512: "Constructor",
  1024: "Property",
  2048: "Method",
  4096: "Call signature",
  8192: "Index signature",
  16384: "Constructor signature",
  32768: "Parameter",
  65536: "Type literal",
  131072: "Type parameter",
  262144: "Accessor",
  524288: "Get signature",
  1048576: "Set signature",
  2097152: "Type alias",
  4194304: "Reference",
};

export function kindLabel(symbol?: ApiSymbol | null): string {
  if (!symbol) return "Package";
  if (symbol.kindString) return symbol.kindString;
  if (typeof symbol.kind === "number" && KIND_LABEL[symbol.kind]) {
    return KIND_LABEL[symbol.kind]!;
  }
  return "Symbol";
}

let packageCache: ApiPackage[] | null = null;

export function listGeneratedPackages(): ApiPackage[] {
  if (packageCache) return packageCache;
  if (!existsSync(apiRoot)) return [];
  const files = readdirSync(apiRoot).filter((name) => name.endsWith(".json"));
  const packages: ApiPackage[] = [];

  for (const file of files) {
    try {
      const raw = readFileSync(join(apiRoot, file), "utf8").trim();
      if (!raw || raw === "{" || raw === "[" || raw === "null") continue;
      const data = JSON.parse(raw) as {
        name?: string;
        packageVersion?: string;
        children?: ApiSymbol[];
      };
      if (!data || typeof data !== "object") continue;
      const id = file.replace(/\.json$/, "");
      packages.push({
        id,
        name: data.name || `@draeven/${id}`,
        version: data.packageVersion,
        children: (data.children ?? []).filter((child) => Boolean(child?.name)),
      });
    } catch {
      /* skip corrupt/partial API json */
    }
  }

  packageCache = packages.sort((a, b) => a.id.localeCompare(b.id));
  return packageCache;
}

/** Lightweight package list for search / layout — avoids shipping member trees. */
export function listPackageSummaries(): Array<{ id: string; name: string; version?: string }> {
  return listGeneratedPackages().map(({ id, name, version }) => ({ id, name, version }));
}

export function getPackage(id: string): ApiPackage | null {
  const normalized = decodeURIComponent(id).trim();
  return listGeneratedPackages().find((pkg) => pkg.id === normalized) ?? null;
}

export function getSymbol(pkg: ApiPackage, slug: string[]): ApiSymbol | null {
  if (slug.length < 1) return null;
  const parts = slug.map((part) => decodeURIComponent(part));
  let current: ApiSymbol | undefined = pkg.children.find((child) => child.name === parts[0]);
  for (const part of parts.slice(1)) {
    current = current?.children?.find((child) => child.name === part);
    if (!current) return null;
  }
  return current ?? null;
}

export function summarizeComment(symbol?: ApiSymbol | null): string {
  const parts = symbol?.comment?.summary ?? [];
  return parts.map((part) => part.text ?? "").join("").trim();
}

export function blockTag(symbol: ApiSymbol | null | undefined, tag: string): string {
  const blocks = symbol?.comment?.blockTags ?? [];
  const hit = blocks.find((item) => item.tag === tag || item.tag === `@${tag}`);
  return (hit?.content ?? []).map((part) => part.text ?? "").join("").trim();
}

export function symbolPath(pkgId: string, slug: string[] = []): string {
  const encoded = slug.map((part) => encodeURIComponent(part));
  return encoded.length > 0
    ? `/reference/${pkgId}/${encoded.join("/")}`
    : `/reference/${pkgId}`;
}

export function formatType(type?: ApiType | null, depth = 0): string {
  if (!type || depth > 8) return "unknown";

  switch (type.type) {
    case "intrinsic":
    case "unknown":
      return type.name || "unknown";
    case "literal":
      if (typeof type.value === "string") return JSON.stringify(type.value);
      if (type.value === null) return "null";
      return String(type.value);
    case "reference": {
      const name =
        type.name ||
        (typeof type.target === "object" && type.target && "qualifiedName" in type.target
          ? type.target.qualifiedName
          : undefined) ||
        "Reference";
      const args = (type.typeArguments || []).map((arg) => formatType(arg, depth + 1));
      return args.length ? `${name}<${args.join(", ")}>` : name;
    }
    case "array":
      return `${formatType(type.elementType, depth + 1)}[]`;
    case "union":
      return (type.types || []).map((item) => formatType(item, depth + 1)).join(" | ");
    case "intersection":
      return (type.types || []).map((item) => formatType(item, depth + 1)).join(" & ");
    case "tuple":
      return `[${(type.elements || type.elementTypes || [])
        .map((item) => formatType(item, depth + 1))
        .join(", ")}]`;
    case "typeOperator":
      return `${type.operator || "readonly"} ${formatType(
        typeof type.target === "object" && type.target && "type" in type.target
          ? (type.target as ApiType)
          : undefined,
        depth + 1
      )}`;
    case "reflection": {
      if (type.declaration?.signatures?.length) {
        return type.declaration.signatures
          .map((sig) => {
            const params = (sig.parameters || [])
              .map((param) => `${param.name}: ${formatType(param.type, depth + 1)}`)
              .join(", ");
            return `(${params}) => ${formatType(sig.type, depth + 1)}`;
          })
          .join(" | ");
      }
      const props = (type.declaration?.children || [])
        .map((child) => `${child.name}: ${formatType(child.type, depth + 1)}`)
        .join("; ");
      return props ? `{ ${props} }` : "object";
    }
    case "conditional":
      return `${formatType(type.checkType, depth + 1)} extends ${formatType(
        type.extendsType,
        depth + 1
      )} ? ${formatType(type.trueType, depth + 1)} : ${formatType(type.falseType, depth + 1)}`;
    case "indexedAccess":
      return `${formatType(type.objectType, depth + 1)}[${formatType(type.indexType, depth + 1)}]`;
    case "mapped":
      return `{ [${type.parameter || "K"} in ${formatType(type.parameterType as ApiType | undefined, depth + 1)}]: ${formatType(
        type.templateType,
        depth + 1
      )} }`;
    case "query":
      return `typeof ${formatType(type.queryType, depth + 1)}`;
    case "inferred":
      return `infer ${type.name || "T"}`;
    default:
      return type.name || type.type || "unknown";
  }
}

export function formatSignature(symbol: ApiSymbol, signature = symbol.signatures?.[0]): string {
  if (!signature) {
    if (symbol.type) return `${symbol.name}: ${formatType(symbol.type)}`;
    return symbol.name;
  }

  const typeParams = (signature.typeParameters || symbol.typeParameters || [])
    .map((param) => {
      const constraint = param.type ? ` extends ${formatType(param.type)}` : "";
      const def = param.default ? ` = ${formatType(param.default)}` : "";
      return `${param.name}${constraint}${def}`;
    })
    .join(", ");

  const params = (signature.parameters || [])
    .map((param) => {
      const optional = param.flags?.isOptional ? "?" : "";
      const def = param.defaultValue ? ` = ${param.defaultValue}` : "";
      return `${param.name}${optional}: ${formatType(param.type)}${def}`;
    })
    .join(", ");

  const returns = signature.type ? `: ${formatType(signature.type)}` : "";
  const name = signature.name || symbol.name;
  return `${name}${typeParams ? `<${typeParams}>` : ""}(${params})${returns}`;
}

export function formatHeritage(types?: ApiType[]): string {
  return (types || []).map((type) => formatType(type)).join(", ");
}

export type MemberSection = {
  title: string;
  members: ApiSymbol[];
};

export function memberSections(symbol: ApiSymbol | null, fallback: ApiSymbol[]): MemberSection[] {
  if (!symbol) {
    return groupPackageSymbols(fallback);
  }

  const byId = new Map((symbol.children || []).map((child) => [child.id, child]));
  if (symbol.groups?.length) {
    return symbol.groups
      .map((group) => ({
        title: group.title,
        members: group.children
          .map((id) => byId.get(id))
          .filter((item): item is ApiSymbol => Boolean(item?.name)),
      }))
      .filter((section) => section.members.length > 0);
  }

  const buckets: Record<string, ApiSymbol[]> = {
    Constructors: [],
    Properties: [],
    Accessors: [],
    Methods: [],
    "Type parameters": [],
    Other: [],
  };

  for (const child of symbol.children || []) {
    if (!child.name) continue;
    if (child.kind === 512) buckets.Constructors!.push(child);
    else if (child.kind === 1024 || child.kind === 16) buckets.Properties!.push(child);
    else if (child.kind === 262144) buckets.Accessors!.push(child);
    else if (child.kind === 2048) buckets.Methods!.push(child);
    else if (child.kind === 131072) buckets["Type parameters"]!.push(child);
    else buckets.Other!.push(child);
  }

  return Object.entries(buckets)
    .filter(([, members]) => members.length > 0)
    .map(([title, members]) => ({ title, members }));
}

function groupPackageSymbols(children: ApiSymbol[]): MemberSection[] {
  const order = ["Classes", "Interfaces", "Functions", "Type aliases", "Variables", "Enums", "Other"];
  const buckets: Record<string, ApiSymbol[]> = Object.fromEntries(order.map((title) => [title, []]));

  for (const child of children) {
    if (!child.name) continue;
    if (child.kind === 128) buckets.Classes!.push(child);
    else if (child.kind === 256) buckets.Interfaces!.push(child);
    else if (child.kind === 64) buckets.Functions!.push(child);
    else if (child.kind === 2097152) buckets["Type aliases"]!.push(child);
    else if (child.kind === 32) buckets.Variables!.push(child);
    else if (child.kind === 8) buckets.Enums!.push(child);
    else buckets.Other!.push(child);
  }

  return order
    .map((title) => ({ title, members: (buckets[title] || []).slice().sort((a, b) => a.name.localeCompare(b.name)) }))
    .filter((section) => section.members.length > 0);
}

export function flagBadges(symbol: ApiSymbol): string[] {
  const flags = symbol.flags || {};
  const badges: string[] = [];
  if (flags.isReadonly) badges.push("readonly");
  if (flags.isStatic) badges.push("static");
  if (flags.isOptional) badges.push("optional");
  if (flags.isAbstract) badges.push("abstract");
  if (flags.isPrivate) badges.push("private");
  if (flags.isProtected) badges.push("protected");
  if (blockTag(symbol, "deprecated") || symbol.comment?.blockTags?.some((t) => t.tag === "@deprecated")) {
    badges.push("deprecated");
  }
  return badges;
}

export function primarySource(symbol?: ApiSymbol | null) {
  return symbol?.sources?.[0] ?? null;
}
