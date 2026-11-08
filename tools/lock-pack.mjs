// 用法：node tools/lock-pack.mjs 原始字庫.json 兌換碼 輸出檔.json
// 例如：node tools/lock-pack.mjs packsrc/toefl.json TOEFL-2027 packs/toefl.lock.json
// 兌換碼不分大小寫、空白和連字號會被忽略（TOEFL-2027 和 toefl 2027 視為同一組）。
import { readFileSync, writeFileSync } from "node:fs";
import { webcrypto as crypto } from "node:crypto";

const [src, code, out] = process.argv.slice(2);
if (!src || !code || !out) { console.error("用法：node tools/lock-pack.mjs 原始字庫.json 兌換碼 輸出檔.json"); process.exit(1); }
const norm = s => String(s).toUpperCase().replace(/[\s-]/g, "");
const plain = readFileSync(src, "utf8");
JSON.parse(plain); // 先確認是合法 JSON
const enc = new TextEncoder();
const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
const base = await crypto.subtle.importKey("raw", enc.encode(norm(code)), "PBKDF2", false, ["deriveKey"]);
const key = await crypto.subtle.deriveKey({ name:"PBKDF2", salt, iterations:150000, hash:"SHA-256" }, base, { name:"AES-GCM", length:256 }, false, ["encrypt"]);
const data = new Uint8Array(await crypto.subtle.encrypt({ name:"AES-GCM", iv }, key, enc.encode(plain)));
const b64 = u => Buffer.from(u).toString("base64");
writeFileSync(out, JSON.stringify({ v:1, salt:b64(salt), iv:b64(iv), data:b64(data) }));
console.log(`已加密 → ${out}（${(data.length / 1024).toFixed(1)} KB）`);
