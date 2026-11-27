(() => {
"use strict";

/* ---------- constants ---------- */
const EXAM_DAY_DATE = new Date(2027, 0, 22);           // 116 學測第一天
let BASE_RANKS = [["小蛋糕",0],["小蘋果",2000],["寶貝妹妹",8000]], RANK_XP = [0,400,1100,3500,8000,16000,27000,40000,55000,72000];
const OLD_RANK_XP = [0,500,1500,3000,5000,8000,12000,17000,23000,30000];
function RANKS_(){
  const c = charObj(document.documentElement.getAttribute("data-skin") || undefined);
  if (c && Array.isArray(c.ranks) && c.ranks.length){
    return c.ranks.map((name, i) => [String(name), i < RANK_XP.length ? RANK_XP[i] : RANK_XP[RANK_XP.length - 1] + (i - RANK_XP.length + 1) * 20000]);
  }
  return BASE_RANKS;
}
const OUTLINE = "#4A3426";
/* original sticker set — generic objects only */
const STK = {
  star:`<path d="M20 4 L24.6 14.4 L35.6 15.5 L27.2 23 L29.7 34 L20 28.2 L10.3 34 L12.8 23 L4.4 15.5 L15.4 14.4 Z" fill="#FFD66B"/>`,
  sparkle:`<path d="M20 3 C21.5 13 27 18.5 37 20 C27 21.5 21.5 27 20 37 C18.5 27 13 21.5 3 20 C13 18.5 18.5 13 20 3Z" fill="#FFE38F"/>`,
  heart:`<path d="M20 34 C8 25 4 18 4 13 C4 8 8 5 12.5 5 C16 5 18.5 7 20 10 C21.5 7 24 5 27.5 5 C32 5 36 8 36 13 C36 18 32 25 20 34Z" fill="#F59DB2"/><ellipse cx="12" cy="12" rx="2.6" ry="1.7" fill="#fff" opacity=".7" stroke="none"/>`,
  flower:{ u:`<circle cx="20" cy="11" r="7"/><circle cx="28.6" cy="17.2" r="7"/><circle cx="25.3" cy="27.3" r="7"/><circle cx="14.7" cy="27.3" r="7"/><circle cx="11.4" cy="17.2" r="7"/>`, fill:"#F7A9C1", top:`<circle cx="20" cy="20" r="4.6" fill="#FFD66B"/>` },
  apple:`<path d="M20 12 C14 8 6 10 6 20 C6 29 12 35 16 35 C18 35 19 34 20 34 C21 34 22 35 24 35 C28 35 34 29 34 20 C34 10 26 8 20 12Z" fill="#E8574F"/><path d="M22 8 C25 3 31 3 33 5 C30 9 26 10 22 8Z" fill="#8CC26B"/><path d="M20 12 C20 9 21 6 22.5 4.5" fill="none"/><ellipse cx="12" cy="18" rx="2.2" ry="3.4" fill="#fff" opacity=".55" stroke="none"/>`,
  plane:`<path d="M4 19 L36 6 L27 34 L19 24 Z" fill="#D9EEFC"/><path d="M19 24 L18 32 L23 27.5 Z" fill="#A8D1F1"/><path d="M36 6 L19 24" fill="none"/>`,
  bone:{ u:`<rect x="10" y="16" width="20" height="8" rx="3"/><circle cx="9" cy="15" r="4.6"/><circle cx="9" cy="25" r="4.6"/><circle cx="31" cy="15" r="4.6"/><circle cx="31" cy="25" r="4.6"/>`, fill:"#FFF4DE", top:"" },
  moon:`<path d="M25 5 A15 15 0 1 0 35 27 A12 12 0 1 1 25 5Z" fill="#FFE38F"/><circle cx="14" cy="22" r="1.6" fill="#F2C55C" stroke="none"/>`,
  snowflake:`<g fill="none"><path d="M20 4 V36 M6 12 L34 28 M6 28 L34 12 M15 6 L20 10 L25 6 M15 34 L20 30 L25 34" stroke-width="5" /></g><g fill="none" stroke="#BFE2F2" stroke-width="2.4"><path d="M20 4 V36 M6 12 L34 28 M6 28 L34 12 M15 6 L20 10 L25 6 M15 34 L20 30 L25 34"/></g>`,
  shell:`<path d="M20 34 L7 20 C7 10 13 6 20 6 C27 6 33 10 33 20 Z" fill="#F8C7DA"/><path d="M20 32 L12 12 M20 32 L20 8 M20 32 L28 12" fill="none"/>`,
  fish:{ u:`<ellipse cx="17" cy="20" rx="12" ry="7.5"/><path d="M27 20 L37 12 L37 28 Z"/>`, fill:"#8FD3D8", top:`<circle cx="11" cy="18.5" r="1.8" fill="${"#4A3426"}"/>` },
  feather:`<path d="M31 4 C20 7 9 18 7 33 C18 31 29 20 31 4Z" fill="#C9434E"/><path d="M7 33 L27 9" fill="none"/>`,
  gem:`<path d="M12 8 L28 8 L35 16 L20 34 L5 16Z" fill="#E45B6C"/><path d="M5 16 L35 16 M12 8 L16 16 L20 34 M28 8 L24 16 L20 34" fill="none" stroke-width="1.6"/>`,
  paw:`<ellipse cx="20" cy="26" rx="8.5" ry="6.8" fill="#F4C48F"/><circle cx="10.5" cy="16" r="3.8" fill="#F4C48F"/><circle cx="16.5" cy="10.5" r="3.8" fill="#F4C48F"/><circle cx="23.5" cy="10.5" r="3.8" fill="#F4C48F"/><circle cx="29.5" cy="16" r="3.8" fill="#F4C48F"/>`,
  bubble:`<circle cx="20" cy="20" r="14" fill="#DDF2F8"/><path d="M12 16 A9 9 0 0 1 18 10" fill="none" stroke="#fff" stroke-width="2.6"/>`
};
function sticker(name){
  const d = STK[name] || STK.star;
  const body = typeof d === "string" ? `<g stroke="${OUTLINE}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">${d}</g>`
    : `<g fill="${OUTLINE}" stroke="${OUTLINE}" stroke-width="5" stroke-linejoin="round">${d.u}</g><g fill="${d.fill}" stroke="none">${d.u}</g>${d.top ? `<g stroke="${OUTLINE}" stroke-width="2">${d.top}</g>` : ""}`;
  return `<svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true" focusable="false">${body}</svg>`;
}
const INTERVAL = [0,1,2,4,8,16,35];
const MAX_BOX = 6, MASTER_BOX = 5, REVIEW_CAP = 200, LS_KEY = "gsat-jinbang-v1";
const DAILY_OPTS = [10,20,30,40,50,60];
const TEST_PER_LV = 5, DRILL_N = 10, DRILL_XP = 5, LIB_PAGE = 150;
const WEEKDAY = ["日","一","二","三","四","五","六"];
const LV_NAME = ["","一","二","三","四","五","六"];
const SPEAKER = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const DEFAULT_LINES = {
  idle:["今天也一起背吧！"], happy:["答對了！"], sad:["沒關係，等一下會再考一次。"],
  done:["今天的份完成了，辛苦了！"], rankup:["升官了！恭喜！"]
};

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const dayNum = (d = new Date()) => Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
const dayKey = n => new Date(n * 86400000).toISOString().slice(0, 10);
const weekday = n => new Date(n * 86400000).getUTCDay();
const EXAM_DAY = dayNum(EXAM_DAY_DATE);
function shuffle(a){ for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function pick(a){ return a[Math.floor(Math.random() * a.length)]; }
/* 正確答案的位置：四選一時從「每個位置各兩次」的袋子裡抽，避免連續好幾題都在同一側 */
let posBag = [];
function answerSlot(n){
  if (n !== 4) return Math.floor(Math.random() * n);
  if (!posBag.length) posBag = shuffle([0, 0, 1, 1, 2, 2, 3, 3]);
  return posBag.pop();
}
function placeAnswer(opts, isAns){
  const i = opts.findIndex(isAns); if (i < 0) return opts;
  const s = answerSlot(opts.length); [opts[i], opts[s]] = [opts[s], opts[i]]; return opts;
}
/* 只有用鍵盤操作時才自動移動焦點，手機點選不會讓某個選項被框起來 */
let kbd = false;
document.addEventListener("keydown", () => { kbd = true; }, true);
document.addEventListener("pointerdown", () => { kbd = false; }, true);
function mainPos(p){ return String(p || "").replace(/[()]/g, "").split("/")[0].replace(/\.$/, ""); }

/* ---------- data ---------- */
let CFG = null, BANK = [], ALLW = [], PACK_WORDS = {}, PACKS = [], EX = {}, PASS = [], FILL = [], CHARS = { base:"img/", characters:[] };
let WORDS = [], BYID = new Map(), BANK_IDS = new Set();

function cleanPh(p){ return String(p || "").replace(/<[^>]*>/g, "").replace(/&nbsp;|\u00a0/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim(); }
function prepWord(r){
  const m = Array.isArray(r.m) && r.m.length ? r.m : [[r.pos || "", r.zh || ""]];
  const w = { id:r.id, w:r.w, k:r.k || r.w, pos:r.pos || "", lv:r.lv || 0, m, x:r.x || "", tag:r.tag || "", ph:cleanPh(r.ph), o:r.o || 0, au:r.au || "", exau:r.exau || "" };
  w.zh = m.map(s => s[1]).join("；");
  const e = EX[r.id];
  if (e) w.ex = { s:e[0], zh:e[1], pos:e[2], code:e[3] };
  else if (r.ex) w.ex = { s:r.ex, zh:"", pos:"", code:"" };
  return w;
}
function splitTop(s){ const out = []; let d = 0, cur = ""; for (const ch of String(s || "")){ if (ch === "（" || ch === "(") d++; else if (ch === "）" || ch === ")") d = Math.max(0, d - 1); if (ch === "、" && d === 0){ out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out.filter(Boolean); }
function shortZh(w){ const first = w.m[0] ? w.m[0][1] : w.zh; return splitTop(first).slice(0, 2).join("、"); }
function plainEx(w){ return w.ex ? w.ex.s.replace(/[{}]/g, "") : ""; }

let cur = null, pulsePlaque = false, lastSaid = "";
let test = null, drill = null;
const ui = { q:"", lv:"all", st:"all", open:null, delArm:null, limit:LIB_PAGE, mood:"idle", line:"", lineKey:"" };

function freshState(){
  return { v:1, updatedAt:0, prog:{}, xp:0, streak:0, best:0, lastDay:null, history:{}, custom:[], today:null,
           placement:null, drills:{ seen:[], pseen:[], fseen:[], right:0, total:0 }, log:[], sync:{ code:"" }, unlocks:{}, packStart:{}, exams:{},
           settings:{ daily:20, startLv:3, autoSay:false, theme:"auto", char:"", charChosen:false } };
}
function normalize(s){
  const f = freshState();
  if (!s || typeof s !== "object") return f;
  const out = Object.assign(f, s);
  out.settings = Object.assign(freshState().settings, s.settings || {});
  out.drills = Object.assign(freshState().drills, s.drills || {});
  if (!Array.isArray(out.drills.seen)) out.drills.seen = [];
  if (!Array.isArray(out.drills.pseen)) out.drills.pseen = [];
  if (!Array.isArray(out.drills.fseen)) out.drills.fseen = [];
  if (!Array.isArray(out.log)) out.log = [];
  out.sync = Object.assign({ code:"" }, s.sync || {});
  if (!out.unlocks || typeof out.unlocks !== "object") out.unlocks = {};
  if (!out.packStart || typeof out.packStart !== "object") out.packStart = {};
  if (!out.exams || typeof out.exams !== "object") out.exams = {};
  if (!out.prog || typeof out.prog !== "object") out.prog = {};
  if (!Array.isArray(out.custom)) out.custom = [];
  if (!out.history || typeof out.history !== "object") out.history = {};
  if (out.today && !Array.isArray(out.today.newIds)) out.today = null;
  return out;
}
function loadLocal(){ try { const s = localStorage.getItem(LS_KEY); return s ? JSON.parse(s) : null; } catch (e) { return null; } }
function save(){ state.updatedAt = Date.now(); try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {} cloudSave(); }
function logRun(m, n, r, secs, wrong, ty){
  if (!n) return;
  const e = { d:dayKey(dayNum()), t:Date.now(), m, n, r, s:Math.max(0, Math.round(secs || 0)) };
  if (wrong && wrong.length) e.w = wrong.slice(0, 20);
  if (ty) e.ty = ty;
  state.log.push(e);
  if (state.log.length > 600) state.log = state.log.slice(-600);
}

let state = normalize(loadLocal());

/* ---------- 字庫包 ---------- */
function curPackId(){ const id = state.settings.pack || "gsat"; if (id === "mine" && !state.custom.length) return "gsat"; return PACK_WORDS[id] ? id : "gsat"; }
function isMine(){ return curPackId() === "mine"; }
function curPack(){ return PACKS.find(p => p.id === curPackId()) || { id:"gsat", name:"學測", levels:[] }; }
function isGsat(){ return curPackId() === "gsat"; }
function lvName(lv, pk){ const p = pk || curPack(); const L = p.levels || []; return L[lv] || (p.id === "gsat" ? `第 ${lv} 級` : `等級 ${lv}`); }
function packLevels(){ return [...new Set((PACK_WORDS[curPackId()] || []).map(w => w.lv))].filter(Boolean).sort((a, b) => a - b); }
function startLv(){ return isGsat() ? (state.settings.startLv || 1) : (state.packStart[curPackId()] || packLevels()[0] || 1); }
function addPackWords(meta, list){
  const pre = meta.idPrefix || "";
  PACK_WORDS[meta.id] = list.map(r => {
    const base = String(r.k || r.w).replace(/\(.*?\)/g, "").split("/")[0].split(" (")[0].trim();
    const w = prepWord(Object.assign({}, r, { id:(r.id || pre + String(r.w).toLowerCase()), k:r.k || base }));
    w.pk = meta.id;
    if (Array.isArray(r.ex)) w.ex = { s:r.ex[0], zh:r.ex[1] || "", pos:r.ex[2] || "", code:r.ex[3] || "0" };
    return w;
  });
}
/* ---------- 我的單字 ---------- */
const MINE_MAX = 3000;
const reEsc = t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function braceEx(ex, w){
  ex = String(ex || "").trim();
  if (!ex || /\{[^}]+\}/.test(ex)) return ex;
  const k = w.toLowerCase(), alts = [k];
  if (!/\s/.test(k)){
    alts.push(k + "s", k + "es", k + "d", k + "ed", k + "ing", k + k.slice(-1) + "ed", k + k.slice(-1) + "ing");
    if (/e$/.test(k)) alts.push(k.slice(0, -1) + "ing");
    if (/y$/.test(k)) alts.push(k.slice(0, -1) + "ies", k.slice(0, -1) + "ied");
  }
  alts.sort((a, b) => b.length - a.length);
  return ex.replace(new RegExp("(^|[^A-Za-z])(" + alts.map(reEsc).join("|") + ")(?![A-Za-z])", "i"), (m, a, b) => a + "{" + b + "}");
}
function exCode(form, k){
  form = form.toLowerCase(); k = k.toLowerCase();
  if (form === k || /\s/.test(k)) return "0";
  if (/ing$/.test(form)) return "i";
  if (/ed$/.test(form)) return "d";
  if (/s$/.test(form)) return "3";
  return "0";
}
function mineWord(c){
  const w = prepWord({ id:c.w.toLowerCase(), w:c.w, k:c.w, pos:c.pos || "", lv:0, m:[[c.pos || "", c.zh]], tag:"M" });
  if (c.ex){
    const m = c.ex.match(/\{([^}]+)\}/);
    w.ex = { s:c.ex, zh:c.exzh || "", pos:mainPos(c.pos || ""), code:m ? exCode(m[1], c.w) : "" };
  }
  return w;
}
function rebuild(){
  const mine = state.custom.filter(c => c && c.w && c.zh).map(mineWord);
  PACK_WORDS.mine = mine;
  const custom = state.settings.mixMine === false ? [] : mine.filter(w => !BANK_IDS.has(w.id));
  const base = PACK_WORDS[curPackId()] || BANK;
  BYID = new Map();
  base.forEach(w => BYID.set(w.id, w));
  Object.keys(PACK_WORDS).forEach(pk => PACK_WORDS[pk].forEach(w => { if (!BYID.has(w.id)) BYID.set(w.id, w); }));
  WORDS = isMine() ? mine : base.concat(custom);
  ALLW = [...BYID.values()];
}
const normCode = c => String(c || "").toUpperCase().replace(/[\s-]/g, "");
const b64u = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
async function decryptPack(file, code){
  const enc = await getJSON(file);
  const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(normCode(code)), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey({ name:"PBKDF2", salt:b64u(enc.salt), iterations:150000, hash:"SHA-256" }, base, { name:"AES-GCM", length:256 }, false, ["decrypt"]);
  const plain = await crypto.subtle.decrypt({ name:"AES-GCM", iv:b64u(enc.iv) }, key, b64u(enc.data));
  return JSON.parse(new TextDecoder().decode(plain));
}
function mountPack(meta, data){
  Object.assign(meta, { name:meta.name || data.name, levels:data.levels || meta.levels || [], speech:data.speech !== undefined ? data.speech : meta.speech, exam:data.exam || meta.exam, idPrefix:data.idPrefix || meta.idPrefix, order:!!data.order, source:data.source || meta.source || "" });
  addPackWords(meta, data.words || []);
  if (data.tf) tfPrep(data.tf);
  if (data.notes) NOTES = data.notes;
}
/* ---------- 托福寫作模板（toeflcn 包裡的 notes） ---------- */
let NOTES = null;
const nu = { open:{}, add:null, edit:null, delArm:null };
function notesState(){
  if (!state.notes || typeof state.notes !== "object") state.notes = {};
  const n = state.notes;
  if (!Array.isArray(n.mine)) n.mine = [];
  if (!n.checks || typeof n.checks !== "object") n.checks = {};
  return n;
}
function ntForm(sec, m){
  return `<div class="addform ntform" data-sec="${esc(sec)}"${m ? ` data-id="${esc(m.id)}"` : ""}>
    <label>標題（選填）<input class="field" data-nf="title" value="${esc(m ? m.title : "")}" autocomplete="off"></label>
    <label>內容<textarea class="field" data-nf="body" rows="7" autocapitalize="sentences" placeholder="模板、句型、例子、提醒都可以，換行會保留">${esc(m ? m.body : "")}</textarea></label>
    <p class="form-msg" id="ntMsg" aria-live="polite"></p>
    <div class="rowacts"><button type="button" class="btn primary small" data-nt="save">儲存</button><button type="button" class="btn small" data-nt="cancel">取消</button></div></div>`;
}
function ntMine(m){
  if (nu.edit === m.id) return ntForm(m.sec, m);
  return `<div class="ntmine">${m.title ? `<h4>${esc(m.title)}</h4>` : ""}<div class="ntmb">${esc(m.body)}</div>
    <p class="rowacts"><button type="button" class="btn small" data-nt="edit" data-id="${esc(m.id)}">修改</button><button type="button" class="btn danger small" data-nt="del" data-id="${esc(m.id)}">${nu.delArm === m.id ? "再按一次確認刪除" : "刪除"}</button></p></div>`;
}
function renderNote(){
  const v = $("#view-note");
  if (!NOTES){ v.innerHTML = `<h2>寫作模板</h2><p class="lede">輸入托福真題的兌換碼解鎖後才看得到。</p>`; return; }
  const n = notesState();
  const secs = [{ id:"mine", title:"我的筆記", html:`<p class="hint">不屬於下面任何一段的，寫在這裡。</p>` }].concat(NOTES.sections);
  v.innerHTML = buddyHtml("") + `<p class="step"><button type="button" class="linkbtn" data-tab-go="drill">← 練習</button></p><h2>${esc(NOTES.name || "寫作模板")}</h2><p class="lede">點標題展開。每一段最下面都可以「＋ 補充」自己的模板或句子，存在這支手機，備份時會一起帶走。</p>
    <div class="ntsecs">${secs.map(sc => {
      const mine = n.mine.filter(m => m.sec === sc.id);
      const html = sc.html.replace(/<li data-ck="(\w+)">([\s\S]*?)<\/li>/g, (x, k, t) => `<li><label><input type="checkbox" data-ck="${k}"${n.checks[k] ? " checked" : ""}> <span>${t}</span></label></li>`);
      return `<details class="ntsec" data-sec="${esc(sc.id)}"${nu.open[sc.id] ? " open" : ""}><summary>${esc(sc.title)}${mine.length ? `<span class="tag">我的 ${mine.length}</span>` : ""}</summary>
        <div class="ntbody">${html}
        ${mine.length ? `<div class="ntmines"><p class="nthead">我補充的</p>${mine.map(ntMine).join("")}</div>` : ""}
        ${nu.add === sc.id ? ntForm(sc.id) : `<p><button type="button" class="btn small" data-nt="add" data-sec="${esc(sc.id)}">＋ 補充</button></p>`}</div></details>`;
    }).join("")}</div>`;
  hookImgs(v);
}
function ntSave(box){
  const n = notesState(), get = k => box.querySelector(`[data-nf="${k}"]`).value;
  const title = get("title").trim(), body = get("body").replace(/\s+$/, "");
  if (!body.trim()){ const m = $("#ntMsg"); m.textContent = "內容不能空白。"; m.className = "form-msg err"; return; }
  const id = box.dataset.id;
  if (id){ const m = n.mine.find(x => x.id === id); if (m){ m.title = title; m.body = body; m.t = Date.now(); } }
  else n.mine.push({ id:"n" + Date.now().toString(36), sec:box.dataset.sec, title, body, t:Date.now() });
  nu.add = null; nu.edit = null; save(); renderNote();
}
async function loadUnlocked(){
  for (const meta of PACKS){
    if (PACK_WORDS[meta.id]) continue;
    if (!meta.locked && meta.file){ try { mountPack(meta, await getJSON(meta.file)); } catch (e) {} continue; }
    const code = state.unlocks[meta.id];
    if (!meta.locked || !code) continue;
    try { mountPack(meta, meta.plain ? await getJSON(meta.file) : await decryptPack(meta.file, code)); } catch (e) {}
  }
}
async function redeem(raw){
  const msg = $("#redeemMsg"), code = normCode(raw);
  if (!code){ msg.textContent = "請輸入兌換碼。"; return; }
  if (!(window.crypto && crypto.subtle)){ msg.textContent = "這個瀏覽器不支援解鎖，請用 Safari 或 Chrome 打開網址。"; return; }
  msg.textContent = "確認中……";
  if (await sha256Hex(code) === HS_HASH){
    $("#redeemIn").value = ""; enterHs();
    msg.textContent = "解鎖了「同等學力」，已經切換過去。之後可以在這裡的「字庫」切回單字。"; return;
  }
  const h = await sha256Hex(code);
  for (const meta of PACKS){
    if (!meta.plain || meta.hash !== h) continue;
    if (PACK_WORDS[meta.id]){ switchPack(meta.id); msg.textContent = `「${meta.name}」已經解鎖過了，已經切換過去。`; $("#redeemIn").value = ""; return; }
    try { mountPack(meta, await getJSON(meta.file)); } catch (e) { msg.textContent = "字庫載入失敗，請確認有網路再試一次。"; return; }
    state.unlocks[meta.id] = code; switchPack(meta.id);
    msg.textContent = `解鎖了「${meta.name}」，已經切換過去。按「發音」會播族語E樂園的錄音。`; $("#redeemIn").value = "";
    return;
  }
  for (const meta of PACKS){
    if (!meta.locked || meta.plain || PACK_WORDS[meta.id]) continue;
    try {
      const data = await decryptPack(meta.file, code);
      mountPack(meta, data); state.unlocks[meta.id] = code;
      switchPack(meta.id);
      msg.textContent = `解鎖了「${meta.name}」，已經切換過去。` + (data.tf ? `真題閱讀${data.notes ? "和寫作模板" : ""}在「練習」頁最上面。` : "");
      $("#redeemIn").value = "";
      return;
    } catch (e) {}
  }
  msg.textContent = "這組兌換碼不對，或是對應的字庫已經解鎖了。";
}
function switchPack(id){
  if (!PACK_WORDS[id]) return;
  state.settings.pack = id; rebuild(); ui.lv = "all"; ui.open = null;
  if (state.today && !state.today.started) ensureToday(true);
  save(); renderAll();
}
function status(id){ const p = state.prog[id]; if (!p || p[0] === 0) return 0; return p[0] >= MASTER_BOX ? 2 : 1; }
function isWeak(id){ const p = state.prog[id]; return !!p && p[2] - p[3] >= 2; }
function rankIndex(xp, raw){
  const R = RANKS_(); let i = 0; R.forEach((r, k) => { if (xp >= r[1]) i = k; });
  return raw ? i : Math.max(i, Math.min(state.rankMax || 0, R.length - 1));
}
/* 一天內分數遞減：前 600 分全額，600～1200 打五折，1200 以上打兩折，隔天重算 */
const XP_TIERS = [[600, 1], [1200, 0.5], [Infinity, 0.2]];
function xpCurve(x){ let out = 0, lo = 0; for (const [hi, r] of XP_TIERS){ if (x <= lo) break; out += (Math.min(x, hi) - lo) * r; lo = hi; } return out; }
function effXp(n){
  const d = dayNum();
  if (!state.dayXp || state.dayXp.d !== d) state.dayXp = { d, raw:0 };
  const a = state.dayXp.raw, b = a + n; state.dayXp.raw = b;
  return Math.round(xpCurve(b)) - Math.round(xpCurve(a));
}
function xpNote(){
  const raw = state.dayXp && state.dayXp.d === dayNum() ? state.dayXp.raw : 0;
  if (raw <= 600) return "";
  return `<p class="hint">今天已經拿了很多分，之後的分數會打折（600～1,200 分五折、1,200 分以上兩折），明天就恢復。</p>`;
}
function migrateRanks(){
  if (state.rankV === 2) return;
  const c = charObj();
  if (c && Array.isArray(c.ranks) && c.ranks.length){
    let i = 0; c.ranks.forEach((_, k) => { const t = k < OLD_RANK_XP.length ? OLD_RANK_XP[k] : OLD_RANK_XP[OLD_RANK_XP.length - 1] + (k - OLD_RANK_XP.length + 1) * 8000; if (state.xp >= t) i = k; });
    state.rankMax = Math.max(state.rankMax || 0, i);
  }
  state.rankV = 2; save();
}
function motifs(){ const c = charObj(document.documentElement.getAttribute("data-skin") || undefined); return (c && Array.isArray(c.motifs) && c.motifs.length) ? c.motifs : ["star","heart","flower"]; }
function deco(n, cls){ const m = motifs(); return `<span class="stk ${cls || ""}" aria-hidden="true">${sticker(m[(n || 0) % m.length])}</span>`; }
const SEAL = () => `<div class="seal" aria-hidden="true">${sticker("star")}<b>棒</b></div>`;
function renderBunting(){
  const el = $("#bunting"); if (!el) return;
  const cols = ["var(--gold)","#CFE8D5","#CFE3F5","#F7D0D9","#FFF1C9"];
  let tri = "";
  for (let i = 0; i < 10; i++){
    const x = 20 + i * 40, t = x / 400, y = 6 + 96 * t * (1 - t) - 2;
    tri += `<path d="M${x - 15} ${y.toFixed(1)} L${x + 15} ${y.toFixed(1)} L${x} ${(y + 22).toFixed(1)} Z" fill="${cols[i % cols.length]}"/>`;
  }
  el.innerHTML = `<svg viewBox="0 0 400 50" preserveAspectRatio="none" width="100%" height="100%"><path d="M0 6 Q200 54 400 6" fill="none" stroke="${OUTLINE}" stroke-width="2"/><g stroke="${OUTLINE}" stroke-width="2" stroke-linejoin="round">${tri}</g></svg>`;
}
let lastGain = 0;
function addXp(n){
  if (n > 0) n = effXp(n);
  lastGain = n;
  const before = rankIndex(state.xp); state.xp = Math.max(0, state.xp + n);
  const now = rankIndex(state.xp, true); if (now > (state.rankMax || 0)) state.rankMax = now;
  if (rankIndex(state.xp) > before){ pulsePlaque = true; return true; } return false;
}

function freshPool(exclude){ return WORDS.filter(w => !state.prog[w.id] && !(exclude && exclude.has(w.id))); }
function pickNew(n, exclude){
  const s = startLv(), ordered = !!curPack().order, big = 1000;
  return freshPool(exclude)
    .map(w => [(w.lv === 0 ? 0 : w.lv >= s ? w.lv : w.lv + big) + (ordered && w.o ? w.o / 100000 : Math.random() * 0.9), w])
    .sort((a, b) => a[0] - b[0]).slice(0, n).map(x => x[1].id);
}
function remainingFrom(lv){ return WORDS.filter(w => w.lv >= lv && !state.prog[w.id]).length; }
/* exam countdown: one per word pack; 學測 has a default */
function examOf(id = curPackId()){
  const e = state.exams && state.exams[id];
  if (e) return e.name && e.date ? e : null;
  return id === "gsat" ? { name:"學測", date:dayKey(EXAM_DAY) } : null;
}
const examDay = e => Math.floor(Date.parse(e.date + "T00:00:00Z") / 86400000);
const exName = () => (examOf() || {}).name || "考試";
function examLeft(){ const e = examOf(); return e ? examDay(e) - dayNum() : null; }
function daysLeft(){ const l = examLeft(); return l == null ? 0 : Math.max(0, l); }

/* how far the chosen pace reaches before the exam */
function coverage(daily, startLv){
  const days = Math.max(0, daysLeft() - 3);
  let budget = daily * days, reached = startLv - 1;
  for (let lv = startLv; lv <= 6; lv++){
    const n = WORDS.filter(w => w.lv === lv && !state.prog[w.id]).length;
    if (budget >= n){ budget -= n; reached = lv; } else break;
  }
  return reached;
}
function neededDaily(startLv){ const d = Math.max(1, daysLeft() - 3); return Math.ceil(remainingFrom(startLv) / d); }
function suggestDaily(startLv){
  const need = neededDaily(startLv);
  return DAILY_OPTS.find(o => o >= need && o <= 40) || 40;
}
function paceText(daily, startLv){
  const r = coverage(daily, startLv), left = daysLeft();
  if (!left) return "";
  if (r >= 6) return `每天 ${daily} 個新字，${exName()}前可以把第 ${startLv}–6 級都背過一輪。`;
  if (r < startLv) return `每天 ${daily} 個新字，${exName()}前還背不完第 ${startLv} 級。`;
  return `每天 ${daily} 個新字，${exName()}前可以背完第 ${startLv}–${r} 級。要全部背完，每天大約要 ${neededDaily(startLv)} 個。`;
}

/* ---------- today ---------- */
function ensureToday(force){
  const t = dayNum();
  if (!force && state.today && state.today.day === t) return;
  const newIds = pickNew(state.settings.daily);
  const due = ALLW.filter(w => { const p = state.prog[w.id]; return p && p[0] > 0 && p[1] <= t; })
    .sort((a, b) => state.prog[a.id][1] - state.prog[b.id][1]).slice(0, REVIEW_CAP).map(w => w.id);
  state.today = { day:t, started:false, done:false, newIds, reviewIds:due, pendingQuiz:newIds.concat(due),
    learned:0, queue:null, pos:0, xp:0, right:0, total:0, bonus:0, rankBefore:rankIndex(state.xp), rankUp:-1 };
  cur = null;
}
function sanitizeToday(){
  const T = state.today; if (!T) return;
  const learnedSet = new Set(T.newIds.slice(0, T.learned));
  T.newIds = T.newIds.filter(id => BYID.has(id));
  T.learned = T.newIds.filter(id => learnedSet.has(id)).length;
  T.reviewIds = (T.reviewIds || []).filter(id => BYID.has(id));
  T.pendingQuiz = (T.pendingQuiz || []).filter(id => BYID.has(id));
  if (T.queue){
    let pos = 0; const q = [];
    T.queue.forEach((it, i) => { if (BYID.has(it.id)){ if (i < T.pos) pos++; q.push(it); } });
    T.queue = q; T.pos = pos; cur = null;
    if (T.started && !T.done && T.learned >= T.newIds.length && T.pos >= T.queue.length) finish();
  }
}
function phase(){
  const T = state.today;
  if (!T.started) return "start";
  if (T.done) return "done";
  if (T.learned < T.newIds.length) return "learn";
  return "quiz";
}
function enterQuizIfNeeded(){
  const T = state.today;
  if (!T.started || T.done || T.learned < T.newIds.length || T.queue) return;
  T.queue = shuffle(T.pendingQuiz.filter(id => BYID.has(id))).map(id => ({ id, retry:false }));
  T.pos = 0; cur = null;
  if (!T.queue.length) finish();
}

/* ---------- questions ---------- */
function segs(w){
  return w.zh.replace(/[（(][^）)]*[）)]/g, "").split(/[、；，,;／\/]/).map(s => s.replace(/的$/, "").trim()).filter(Boolean);
}
function conflicts(a, b){
  if (a.k.toLowerCase() === b.k.toLowerCase()) return true;
  const sa = segs(a), sb = segs(b);
  for (const x of sa) for (const y of sb){
    if (x === y || (x.length >= 2 && y.length >= 2 && (x.includes(y) || y.includes(x)))) return true;
  }
  return false;
}
function xmap(w){ const o = {}; String(w.x || "").split("/").forEach(p => { const i = p.indexOf(":"); if (i > 0) o[p.slice(0, i)] = p.slice(i + 1); }); return o; }
function inflect(w, code){
  const k = w.k;
  if (!code || code === "0") return k;
  const xm = xmap(w); if (xm[code]) return xm[code];
  if (code === "s" || code === "3"){ if (/(s|x|z|ch|sh)$/.test(k)) return k + "es"; if (/[^aeiou]y$/.test(k)) return k.slice(0, -1) + "ies"; return k + "s"; }
  if (code === "p" || code === "d"){ if (/e$/.test(k)) return k + "d"; if (/[^aeiou]y$/.test(k)) return k.slice(0, -1) + "ied"; return k + "ed"; }
  if (code === "i"){ if (/ie$/.test(k)) return k.slice(0, -2) + "ying"; if (/[^e]e$/.test(k)) return k.slice(0, -1) + "ing"; return k + "ing"; }
  if (code === "r"){ if (/e$/.test(k)) return k + "r"; if (/[^aeiou]y$/.test(k)) return k.slice(0, -1) + "ier"; return k + "er"; }
  if (code === "t"){ if (/e$/.test(k)) return k + "st"; if (/[^aeiou]y$/.test(k)) return k.slice(0, -1) + "iest"; return k + "est"; }
  return k;
}
function hasPos(w, p){ return w.pos.replace(/[()]/g, "").split("/").some(x => x.replace(/\.$/, "") === p.replace(/\.$/, "")); }

function distractors(w, n, filter, strict){
  const src = isMine() ? WORDS.concat(BANK) : WORDS.filter(x => x.tag !== "M");
  const pool = shuffle(src.filter(x => x.id !== w.id && filter(x)));
  const picks = [];
  for (const x of pool){
    if (picks.length >= n) break;
    if (conflicts(w, x) || picks.some(p => conflicts(p, x))) continue;
    picks.push(x);
  }
  if (picks.length < n && !strict){
    for (const x of shuffle(src.filter(x => x.id !== w.id))){
      if (picks.length >= n) break;
      if (picks.includes(x) || conflicts(w, x) || picks.some(p => conflicts(p, x))) continue;
      picks.push(x);
    }
  }
  return picks;
}
function nearLv(w, x, d){ return !w.lv || Math.abs(x.lv - w.lv) <= d; }

/* question: { id, type: en2zh | zh2en | cloze, opts:[{id,label}], answer, picked } */
function makeQuestion(id, forceType){
  const w = BYID.get(id);
  let type = forceType;
  if (!type){
    const canCloze = w.ex && w.ex.code;
    const r = Math.random();
    type = canCloze && r < 0.4 ? "cloze" : (Math.random() < 0.6 ? "en2zh" : "zh2en");
  }
  if (type === "cloze"){
    const code = w.ex.code, p = w.ex.pos.replace(/\.$/, "");
    const m = w.ex.s.match(/\{([^}]+)\}/);
    const form = m ? m[1] : w.k;
    const cap = /^[A-Z]/.test(form) && !/^[A-Z]/.test(w.k);
    const fix = s => cap ? s.charAt(0).toUpperCase() + s.slice(1) : s;
    const okForm = x => !/[\s/()]/.test(x.k) && (code === "0" || !!xmap(x)[code] || (code !== "p" && code !== "d"));
    let ds = distractors(w, 3, x => mainPos(x.pos) === p && nearLv(w, x, 1) && okForm(x), true);
    if (ds.length < 3) ds = distractors(w, 3, x => hasPos(x, p) && nearLv(w, x, 1) && okForm(x));
    const opts = [{ id:w.id, label:form }].concat(ds.map(x => ({ id:x.id, label:fix(inflect(x, code)) })));
    const seen = new Set(); const uniq = opts.filter(o => { const k = o.label.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
    return { id, type, opts:placeAnswer(shuffle(uniq), o => o.id === w.id), picked:null, form };
  }
  const p = mainPos(w.m[0] ? w.m[0][0] : w.pos);
  const ds = distractors(w, 3, x => hasPos(x, p) && nearLv(w, x, 1));
  const opts = [w].concat(ds).map(x => ({ id:x.id, label: type === "en2zh" ? shortZh(x) : x.k }));
  return { id, type, opts:placeAnswer(shuffle(opts), o => o.id === w.id), picked:null };
}

/* ---------- progress updates ---------- */
function grade(id, ok, day){
  const p = state.prog[id] ? state.prog[id].slice() : [0, day, 0, 0];
  p[2]++;
  if (ok){
    const wasNew = p[0] === 0;
    p[0] = wasNew ? 1 : Math.min(p[0] + 1, MAX_BOX);
    p[1] = day + INTERVAL[p[0]]; p[3]++;
    state.prog[id] = p; return wasNew ? 10 : 8;
  }
  p[0] = 1; p[1] = day + 1;
  state.prog[id] = p; return 2;
}
function lapse(id){
  const p = state.prog[id]; if (!p) return;
  const q = p.slice(); q[2]++; q[0] = 1; q[1] = dayNum() + 1; state.prog[id] = q;
}
function credit(id){
  const p = state.prog[id]; if (!p) return;
  const q = p.slice(); q[2]++; q[3]++; state.prog[id] = q;
}

/* ---------- companion ---------- */
function charObj(id){ const cs = CHARS.characters || []; const k = id == null ? state.settings.char : id; return cs.find(c => c.id === k) || cs[0] || null; }
function imgSrc(c, file){ if (!c || !file) return ""; return /^https?:\/\//.test(file) ? file : (CHARS.base || "") + file; }
function initialFace(c){
  return `<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true"><circle cx="50" cy="50" r="44" fill="var(--gold)"/><text x="50" y="50" dy=".35em" text-anchor="middle" font-size="42" font-weight="700" fill="var(--gold-ink)" style="font-family:var(--zh)">${esc(c.initial || (c.name || "?").slice(-1))}</text></svg>`;
}
function injectSkins(){
  const blk = vars => Object.entries(vars || {}).filter(([k]) => /^--[a-z-]+$/.test(k)).map(([k, v]) => `${k}:${String(v).replace(/[;{}<>]/g, "")}`).join(";");
  let css = "";
  (CHARS.characters || []).forEach(c => {
    if (!c.theme || !/^[\w-]+$/.test(c.id)) return;
    const sel = `:root[data-skin="${c.id}"]`, L = blk(c.theme.light), D = blk(c.theme.dark);
    if (L) css += `@media (prefers-color-scheme:light){${sel}:not([data-theme="dark"]){${L}}}${sel}[data-theme="light"]{${L}}`;
    if (D) css += `@media (prefers-color-scheme:dark){${sel}:not([data-theme="light"]){${D}}}${sel}[data-theme="dark"]{${D}}`;
  });
  let el = document.getElementById("skins");
  if (!el){ el = document.createElement("style"); el.id = "skins"; document.head.appendChild(el); }
  el.textContent = css;
}
function applySkin(id){
  const c = charObj(id);
  if (c) document.documentElement.setAttribute("data-skin", c.id); else document.documentElement.removeAttribute("data-skin");
  renderBunting(); if (BANK.length) renderHeader();
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", getComputedStyle(document.documentElement).getPropertyValue("--paper").trim() || "#EEF0E6");
}
function linesFor(mood){
  const c = charObj();
  const base = (c && c.lines && c.lines[mood]) || [];
  const pk = c && c.packLines && c.packLines[curPackId()];
  const L = base.concat((pk && pk[mood]) || []);
  return L.length ? L : (DEFAULT_LINES[mood] || DEFAULT_LINES.idle);
}
function fillLine(s){
  if (!s) return s;
  const title = (RANKS_()[rankIndex(state.xp)] || [""])[0];
  return String(s).replace(/\{稱號\}/g, title);
}
function setMood(mood, key){
  const k = mood + "|" + key;
  if (ui.lineKey === k) return;
  ui.mood = mood; ui.lineKey = k; ui.line = pick(linesFor(mood));
}
function placeholderSvg(mood){
  const mouth = mood === "happy" || mood === "done" || mood === "rankup"
    ? '<path d="M34 58 Q50 74 66 58" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="28" cy="54" r="5" fill="#E38B8B" opacity=".55"/><circle cx="72" cy="54" r="5" fill="#E38B8B" opacity=".55"/>'
    : mood === "sad"
    ? '<path d="M38 66 Q50 58 62 66" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M76 30 q4 8 0 12 q-4 -4 0 -12z" fill="#7FB3E4"/>'
    : '<path d="M38 60 Q50 68 62 60" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>';
  const eyes = mood === "happy" || mood === "done" || mood === "rankup"
    ? '<path d="M32 42 q6 -7 12 0M56 42 q6 -7 12 0" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>'
    : '<circle cx="38" cy="42" r="4.5" fill="currentColor"/><circle cx="62" cy="42" r="4.5" fill="currentColor"/>';
  return `<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true" style="color:var(--ink)"><circle cx="50" cy="52" r="40" fill="var(--gold)" opacity=".85"/>${eyes}${mouth}</svg>`;
}
function buddyHtml(anim){
  const c = charObj(), mood = ui.mood;
  const file = c ? (c[mood === "done" || mood === "rankup" ? "happy" : mood] || c.idle) : "";
  const src = imgSrc(c, file);
  const pic = src && !badImg.has(src) ? `<img src="${esc(src)}" alt="" data-mood="${esc(mood)}" draggable="false"><i class="shield" aria-hidden="true"></i>` : placeholderSvg(mood);
  return `<div class="buddy"><div class="pic${anim ? " " + anim : ""}">${pic}</div>
    <p class="bubble" aria-live="polite">${c && c.name ? `<span class="who">${esc(c.name)}</span>` : ""}${esc(fillLine(ui.line))}</p></div>`;
}
const badImg = new Set();
function hookImgs(root){
  root.querySelectorAll(".buddy img").forEach(img => {
    const fail = () => { badImg.add(img.getAttribute("src")); const m = img.dataset.mood || "idle"; const box = img.parentElement; if (box) box.innerHTML = placeholderSvg(m); };
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) { fail(); return; }
    img.addEventListener("error", fail, { once:true });
  });
}

/* ---------- speech ---------- */
const canSay = typeof window.speechSynthesis !== "undefined" && typeof window.SpeechSynthesisUtterance !== "undefined";
let voice = null;
function pickVoice(){
  try {
    const vs = speechSynthesis.getVoices();
    voice = vs.find(v => /en[-_]US/i.test(v.lang) && /natural|google|samantha|aria|jenny/i.test(v.name))
         || vs.find(v => /en[-_]US/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null;
  } catch (e) {}
}
if (canSay){ pickVoice(); try { speechSynthesis.addEventListener("voiceschanged", pickVoice); } catch (e) {} }
let audioEl = null;
function playUrl(u){
  try { if (canSay) speechSynthesis.cancel(); if (audioEl) audioEl.pause(); audioEl = new Audio(u); const p = audioEl.play(); if (p && p.catch) p.catch(() => {}); } catch (e) {}
}
function audioFor(text){
  if (curPack().speech !== "audio" || !text) return "";
  const k = String(text).toLowerCase(), w = (PACK_WORDS[curPackId()] || []).find(x => x.au && x.k.toLowerCase() === k);
  return w ? w.au : "";
}
function say(text){
  const au = audioFor(text);
  if (au){ playUrl(au); return; }
  if (curPack().speech === "audio") return;
  if (!canSay || !text) return;
  try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = "en-US"; u.rate = 0.9; if (voice) u.voice = voice; speechSynthesis.speak(u); } catch (e) {}
}
function autoSay(key, word){ if (state.settings.autoSay && lastSaid !== key){ lastSaid = key; say(word); } }

/* ---------- rendering: shared bits ---------- */
function applyTheme(){
  const t = state.settings.theme;
  if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  else document.documentElement.removeAttribute("data-theme");
}
function renderHeader(){
  const ri = rankIndex(state.xp), pl = $("#plaque"), rn = RANKS_()[ri][0];
  pl.innerHTML = [...rn].map(c => `<span aria-hidden="true">${c}</span>`).join("") + deco(0, "stk-pl");
  pl.dataset.len = String(Math.min([...rn].length, 6));
  pl.setAttribute("aria-label", "目前稱號：" + rn);
  $("#xp").textContent = state.xp;
  const nx = RANKS_()[ri + 1];
  let pct = 100, txt = `已經是最高稱號「${rn}」了`;
  if (nx){ const base = RANKS_()[ri][1]; pct = Math.max(0, Math.min(100, Math.round((state.xp - base) / (nx[1] - base) * 100))); txt = `再 ${nx[1] - state.xp} 分升級成「${nx[0]}」`; }
  $("#barFill").style.width = pct + "%";
  $("#bar").setAttribute("aria-valuenow", String(pct));
  $("#nextRank").textContent = txt;
  const t = dayNum();
  const live = (state.lastDay === t || state.lastDay === t - 1) ? state.streak : 0;
  $("#streakLine").innerHTML = `連續 <b>${live}</b> 日` + (state.best > live ? `<span class="best">最長 ${state.best} 日</span>` : "");
  const week = $("#week"); week.innerHTML = "";
  for (let i = 6; i >= 0; i--){
    const n = t - i, on = state.history[dayKey(n)] != null, li = document.createElement("li");
    li.textContent = WEEKDAY[weekday(n)];
    if (on) li.classList.add("on");
    if (i === 0) li.classList.add("today");
    li.setAttribute("aria-label", `${dayKey(n)}${on ? "，有完成" : "，沒有完成"}`);
    week.appendChild(li);
  }
  const ex = examOf(), left = examLeft();
  let cd = "";
  if (ex){
    const [, mm, dd] = ex.date.split("-").map(Number), nm = esc(ex.name);
    cd = left > 0 ? `離${nm}（${mm} 月 ${dd} 日）還有<b>${left}</b>天` : left === 0 ? `今天${nm}，加油！` : `${nm}結束了，辛苦了！`;
  }
  if (!isGsat()){ const pk = curPack(); cd = `目前字庫：<b class="pk">${esc(pk.name)}</b>` + (ex && left >= 0 ? `<span class="cdex">・${cd}</span>` : ""); }
  $("#countdown").innerHTML = cd + deco(1, "stk-cd");
  if (pulsePlaque){ pulsePlaque = false; pl.classList.remove("pulse"); void pl.offsetWidth; pl.classList.add("pulse"); }
}
function sayBtn(w){ return (curPack().speech === "audio" ? !!audioFor(w) : canSay && curPack().speech !== null && curPack().speech !== "") ? `<button class="say" type="button" data-act="say" data-w="${esc(w)}" aria-label="唸出 ${esc(w)}">${SPEAKER}<span>發音</span></button>` : ""; }
function lvTag(w){ if (w.tag === "M") return `<span class="tag">自訂</span>`; const pk = PACKS.find(p => p.id === w.pk); return `<span class="tag lv">${w.pk && w.pk !== "gsat" && pk ? esc(pk.name) + "・" : ""}${esc(lvName(w.lv, pk))}</span>`; }
function metaRow(w, showPh = true){ return `<p class="meta">${lvTag(w)}<span class="pos" lang="en">${esc(w.pos)}</span>${w.ph && showPh ? `<span class="ph" lang="en">/${esc(w.ph)}/</span>` : ""}</p>`; }
function sensesHtml(w){ return `<ul class="senses">${w.m.map(s => `<li>${s[0] ? `<span class="pos" lang="en">${esc(s[0])}</span>` : ""}${esc(s[1])}</li>`).join("")}</ul>`; }
function exLine(w){
  if (!w.ex) return "";
  const s = esc(w.ex.s).replace(/\{([^}]+)\}/, "<b>$1</b>");
  return `<p class="ex" lang="en">${s}${w.exau && curPack().speech === "audio" ? ` <button class="say mini" type="button" data-act="playex" data-u="${esc(w.exau)}" aria-label="播放例句">${SPEAKER}</button>` : ""}${w.ex.zh ? `<span class="exzh" lang="zh-Hant">${esc(w.ex.zh)}</span>` : ""}</p>`;
}
function clozeHtml(w, filled){
  const parts = w.ex.s.split(/\{[^}]+\}/), m = w.ex.s.match(/\{([^}]+)\}/);
  const gap = filled ? `<span class="gap filled">${esc(m ? m[1] : w.k)}</span>` : `<span class="gap" aria-label="空格"></span>`;
  return `<p class="cloze" lang="en">${esc(parts[0])}${gap}${esc(parts[1] || "")}</p>`;
}
function promptHtml(q, w){
  if (q.type === "en2zh") return `<div class="wordrow"><h3 class="word" lang="en">${esc(w.k)}</h3>${sayBtn(w.k)}</div>`;
  if (q.type === "zh2en") return `${w.m.length > 1 ? `<p class="meta"><span class="pos" lang="en">${esc(w.m[0][0])}</span></p>` : ""}<h3 class="word zhword">${esc(shortZh(w))}</h3>`;
  return clozeHtml(w, q.picked != null);
}
function revealHtml(q, w){
  if (q.type === "en2zh") return sensesHtml(w) + exLine(w);
  if (q.type === "zh2en") return `<div class="wordrow"><p class="enreveal" lang="en">${esc(w.w)}</p>${sayBtn(w.k)}</div>${sensesHtml(w)}${exLine(w)}`;
  return `${w.ex.zh ? `<p class="exzh">${esc(w.ex.zh)}</p>` : ""}<div class="wordrow"><p class="enreveal" lang="en">${esc(w.w)}</p>${sayBtn(w.k)}</div>${sensesHtml(w)}`;
}
const L2 = () => curPack().speech === "audio" ? "族語" : "英文";
function askText(q){ return q.type === "en2zh" ? "選出中文意思" : q.type === "zh2en" ? `選出對應的${L2()}字` : "選出最適合填入空格的字"; }
function optsHtml(q, act){
  return q.opts.map((o, i) => {
    let cls = "opt" + (q.type !== "en2zh" ? " en" : "");
    if (q.picked != null){ if (o.id === q.id) cls += " right"; else if (o.id === q.picked) cls += " wrong"; }
    return `<li><button type="button" class="${cls}" data-act="${act}" data-id="${esc(o.id)}"${q.picked != null ? " disabled" : ""}${q.type !== "en2zh" ? ' lang="en"' : ""}><span class="key">${i + 1}</span><span>${esc(o.label)}</span></button></li>`;
  }).join("");
}

/* ---------- placement test ---------- */
function startTest(){
  const items = [];
  for (let lv = 1; lv <= 6; lv++){
    const pool = shuffle(BANK.filter(w => w.lv === lv && !/[\s/()]/.test(w.w) && w.m.length && w.k.length > 2));
    pool.slice(0, TEST_PER_LV).forEach(w => items.push({ id:w.id, lv }));
  }
  test = { items, pos:0, res:[], q:null, stopped:false, phase:"q", t0:Date.now() };
  document.body.classList.add("testing");
  nextTestQ();
  setMood("idle", "test");
  ui.line = "不會的字直接按「不認識」，不要用猜的，這樣測出來比較準。";
}
function nextTestQ(){
  const it = test.items[test.pos];
  test.q = it ? makeQuestion(it.id, "en2zh") : null;
}
function testAnswer(pickId){
  const q = test.q; if (!q || q.picked != null) return;
  q.picked = pickId;
  const it = test.items[test.pos];
  test.res.push({ id:it.id, lv:it.lv, ok: pickId === q.id });
  renderToday();
  setTimeout(() => {
    test.pos++;
    const lv = it.lv, done = test.items[test.pos] == null || test.items[test.pos].lv !== lv;
    if (done){
      const sc = levelScores();
      if (lv >= 2 && sc[lv] <= 1 && sc[lv - 1] <= 1){ test.stopped = true; test.pos = test.items.length; }
    }
    if (test.pos >= test.items.length){ finishTest(); } else nextTestQ();
    renderToday(); focusMain();
  }, pickId === q.id ? 450 : 900);
}
function levelScores(){ const s = [0,0,0,0,0,0,0]; test.res.forEach(r => { if (r.ok) s[r.lv]++; }); return s; }
function finishTest(){
  const sc = levelScores();
  let rec = 6;
  for (let lv = 1; lv <= 6; lv++){ if (sc[lv] < 4){ rec = lv; break; } }
  test.phase = "result"; test.scores = sc; test.rec = rec; test.choice = rec;
  test.daily = suggestDaily(rec);
  setMood("done", "testdone");
  ui.line = `測完了！建議從第 ${rec} 級開始。`;
}
function confirmTest(){
  const s = test.choice, t = dayNum();
  logRun("test", test.res.length, test.res.filter(r => r.ok).length, test.t0 ? (Date.now() - test.t0) / 1000 : 0);
  state.placement = { day:t, scores:test.scores, rec:test.rec };
  state.settings.startLv = s;
  state.settings.daily = test.daily;
  test.res.forEach(r => { if (r.ok && !state.prog[r.id]) state.prog[r.id] = [2, t + 2, 1, 1]; });
  test = null;
  document.body.classList.remove("testing");
  ensureToday(true); save(); setMood("idle", "after-test"); renderAll(); focusMain();
}
function skipTest(){
  state.placement = { day:dayNum(), skipped:true };
  state.settings.daily = suggestDaily(state.settings.startLv);
  ensureToday(true); save(); renderAll();
}
function renderTest(v){
  if (test.phase === "result"){
    const sc = test.scores, ch = test.choice;
    const bars = [1,2,3,4,5,6].map(lv => `<li class="${sc[lv] < 4 ? "low" : ""}${lv === ch ? " start" : ""}"><span>第 ${lv} 級</span>
      <span class="track"><span class="fill" style="width:${sc[lv] / TEST_PER_LV * 100}%"></span></span><span class="num">${sc[lv]}／${TEST_PER_LV}</span></li>`).join("");
    const btns = [1,2,3,4,5,6].map(lv => `<button type="button" data-test="lv" data-v="${lv}" aria-pressed="${lv === ch}">${lv}</button>`).join("");
    const dbtns = DAILY_OPTS.map(n => `<button type="button" data-test="daily" data-v="${n}" aria-pressed="${n === test.daily}">${n}</button>`).join("");
    v.innerHTML = buddyHtml("bounce") + `<h2>測驗結果</h2>
      <p class="lede">每一級答對 4 題以上，就算這一級大致會了。${test.stopped ? "後面幾級因為連續兩級都只對 1 題以下，先停在這裡。" : ""}</p>
      <ul class="lvbars">${bars}</ul>
      <h3 class="sub">從第幾級開始</h3>
      <div class="seg" role="group" aria-label="起始級數">${btns}</div>
      <p class="hint">建議第 ${test.rec} 級。比它低的級數之後還是可以在字庫裡看。這次答對的字會先排進複習，不用重學。</p>
      <h3 class="sub">每天幾個新字</h3>
      <div class="seg" role="group" aria-label="每天新字數">${dbtns}</div>
      <div class="plan-note"><p>從第 ${ch} 級開始共 ${remainingFrom(ch)} 個字${examOf() ? `，離${esc(exName())} ${daysLeft()} 天` : ""}。</p><p>${esc(paceText(test.daily, ch))}</p><p class="hint">之後在「設定」隨時可以改。</p></div>
      <div class="actions"><button class="btn primary" type="button" data-test="ok">就這樣開始</button></div>`;
    hookImgs(v); return;
  }
  const q = test.q, w = BYID.get(q.id), it = test.items[test.pos];
  const idk = `<li><button type="button" class="opt idk" data-test="pick" data-id="__idk"${q.picked != null ? " disabled" : ""}>不認識</button></li>`;
  v.innerHTML = buddyHtml("") + `<p class="step"><span>程度測驗</span>${test.pos + 1}／${test.items.length}・第 ${it.lv} 級</p>
    <article class="card">${deco(test.pos, "stk-card")}<div class="wordrow"><h3 class="word" lang="en">${esc(w.k)}</h3></div></article>
    <p class="ask">選出中文意思</p>
    <ul class="opts">${optsHtml(q, "tpick").replace(/data-act="tpick"/g, 'data-test="pick"')}${idk}</ul>`;
  hookImgs(v);
}

/* ---------- character picker ---------- */
let pickId = null;
function renderPicker(v){
  const cs = CHARS.characters;
  if (!pickId) pickId = state.settings.char || cs[0].id;
  const cards = cs.map(c => {
    const src = imgSrc(c, c.idle), on = c.id === pickId;
    const pic = src && !badImg.has(src) ? `<img src="${esc(src)}" alt="" data-face="${esc(c.id)}" draggable="false"><i class="shield" aria-hidden="true"></i>` : initialFace(c);
    const t = (c.theme && c.theme.light) || {}, sw = t["--gold"] ? `--gold:${t["--gold"]};--gold-ink:${t["--gold-ink"] || "#000"}` : "";
    return `<li><button type="button" class="pick" data-skin-pick="${esc(c.id)}" style="${esc(sw)}" aria-pressed="${on}">
      <span class="stk stk-pick" aria-hidden="true">${sticker((c.motifs || ["star"])[0])}</span><span class="pick-pic">${pic}</span><span class="pick-name">${esc(c.name)}</span></button></li>`;
  }).join("");
  const c = charObj(pickId);
  v.innerHTML = `<h2>選一位陪你背單字</h2><p class="lede">他會陪你做每天的功課，答對答錯都會有反應。整個網站的顏色也會換成他的配色，之後在「設定」可以換人。</p>
    <ul class="picks">${cards}</ul>
    <div class="actions"><button class="btn primary" type="button" data-skin-ok>就選${esc(c ? c.name : "他")}</button></div>`;
  v.querySelectorAll("img[data-face]").forEach(img => {
    const fail = () => { badImg.add(img.getAttribute("src")); const box = img.parentElement; if (box) box.innerHTML = initialFace(charObj(img.dataset.face)); };
    if (img.complete && img.naturalWidth === 0) fail(); else img.addEventListener("error", fail, { once:true });
  });
}

/* ---------- today view ---------- */
function renderToday(){
  renderTodayInner();
  const v = $("#view-today"), ph = (!test && state.today && state.settings.charChosen !== false && (state.placement || !isGsat())) ? phase() : "";
  if (ph === "start" || ph === "done"){ const c = backupCard(); if (c){ const b = v.querySelector(".buddy"); if (b) b.insertAdjacentHTML("afterend", c); else v.insertAdjacentHTML("afterbegin", c); } }
  else ui.bkMsg = "";
}
function renderTodayInner(){
  const v = $("#view-today");
  if (test){ renderTest(v); return; }
  document.body.classList.toggle("testing", !!test || (!state.settings.charChosen && (CHARS.characters || []).length > 0));
  if (!state.settings.charChosen && (CHARS.characters || []).length){ renderPicker(v); return; }
  if (!state.placement && isGsat()){
    setMood("idle", "intro");
    v.innerHTML = buddyHtml("") + `<h2>先測一下程度</h2>
      <p class="lede">從第 1 級到第 6 級，每級抽 ${TEST_PER_LV} 個字，大約 3 分鐘。測完會建議從哪一級開始背、每天背幾個。</p>
      <p class="hint">字表是大考中心的《高中英文參考詞彙表》，共 6 級、約 6,000 字。</p>
      ${needA2HS() && !state.settings.hideA2HS ? a2hsCard() : ""}
      <div class="actions row"><button class="btn primary" type="button" data-test="start">開始測驗</button>
      <button class="btn" type="button" data-test="skip">先跳過，從第 ${state.settings.startLv} 級開始</button></div>`;
    hookImgs(v); return;
  }
  const T = state.today;
  if (T.started && !T.done && T.learned >= T.newIds.length && !T.queue) enterQuizIfNeeded();
  const ph = phase();

  if (ph === "start"){
    setMood("idle", "start-" + T.day);
    const nNew = T.newIds.length, nRev = T.reviewIds.length;
    if (!nNew && !nRev){
      v.innerHTML = buddyHtml("") + `<h2>今日功課</h2><p class="lede">今天沒有要複習的字，新字也都學完了。</p><p class="hint">可以到「練習」做詞彙題或拼字。</p>`;
      hookImgs(v); return;
    }
    const parts = [];
    if (nNew) parts.push(`${nNew} 個新字`);
    if (nRev) parts.push(`${nRev} 個複習`);
    const lvs = [...new Set(T.newIds.map(id => (BYID.get(id) || {}).lv).filter(Boolean))].sort((a, b) => a - b);
    v.innerHTML = buddyHtml("") + `<h2>今日功課</h2><p class="lede">${parts.join("、")}。</p>
      ${lvs.length ? `<p class="hint">新字來自${isGsat() ? `第 ${lvs.join("、")} 級` : `「${lvs.map(l => lvName(l)).join("、")}」`}。先看過新字，再和複習的字一起考。</p>` : ""}
      <div class="actions"><button class="btn primary" type="button" data-act="start">開始</button></div>`;
    hookImgs(v); return;
  }

  if (ph === "learn"){
    setMood("idle", "learn-" + T.day);
    const w = BYID.get(T.newIds[T.learned]);
    v.innerHTML = buddyHtml("") + `<p class="step"><span>新字</span>${T.learned + 1}／${T.newIds.length}</p>
      <article class="card">${deco(T.learned, "stk-card")}${metaRow(w)}
        <div class="wordrow"><h3 class="word" lang="en">${esc(w.w)}</h3>${sayBtn(w.k)}</div>
        ${sensesHtml(w)}${exLine(w)}
      </article>
      <div class="actions"><button class="btn primary" type="button" data-act="learned">記下了</button></div>`;
    hookImgs(v);
    autoSay("learn-" + T.day + "-" + T.learned, w.k);
    return;
  }

  if (ph === "quiz"){
    const item = T.queue[T.pos];
    if (!cur || cur.pos !== T.pos || cur.id !== item.id){ cur = makeQuestion(item.id); cur.pos = T.pos; setMood("idle", "q-" + T.day + "-" + T.pos); }
    const w = BYID.get(cur.id), answered = cur.picked != null, ok = cur.picked === cur.id;
    let fb = "", fbCls = "feedback";
    if (answered){
      const right = cur.type === "en2zh" ? shortZh(w) : cur.type === "cloze" ? cur.form : w.k;
      if (ok){ fb = item.retry ? "這次答對了。" : "答對了。"; fbCls += " ok"; }
      else { fb = `答錯了，正確是「${esc(right)}」。` + (item.retry ? "" : "等一下會再考一次，明天也會複習。"); fbCls += " no"; }
    }
    const last = T.pos + 1 >= T.queue.length;
    v.innerHTML = buddyHtml(answered ? (ok ? "bounce" : "shake") : "") + `<p class="step"><span>考場</span>${T.pos + 1}／${T.queue.length}</p>
      <article class="card">${deco(T.pos, "stk-card")}${metaRow(w, answered)}${promptHtml(cur, w)}${answered ? revealHtml(cur, w) : ""}${answered && ok ? SEAL() : ""}</article>
      <div class="answered-bar"><p class="${fbCls}" aria-live="polite">${fb}</p>
      ${answered ? `<div class="actions"><button class="btn primary" type="button" data-act="next">${last ? "看放榜" : "下一題"}</button></div>` : ""}</div>
      <p class="ask">${askText(cur)}</p>
      <ul class="opts">${optsHtml(cur, "pick")}</ul>`;
    hookImgs(v);
    if (cur.type === "en2zh" && !answered) autoSay("q-" + T.day + "-" + T.pos + "-" + cur.id, w.k);
    return;
  }

  /* done */
  setMood(T.rankUp >= 0 ? "rankup" : "done", "done-" + T.day + "-" + T.newIds.length);
  const moreN = Math.min(state.settings.daily, freshPool(new Set(T.newIds)).length);
  const live = (state.lastDay === dayNum() || state.lastDay === dayNum() - 1) ? state.streak : 0;
  v.innerHTML = buddyHtml("bounce") + `<h2 class="bang">今日放榜</h2>
    ${T.rankUp >= 0 ? `<p class="up">升級成<span class="up-rank">${RANKS_()[T.rankUp][0]}</span></p>` : ""}
    <dl class="result">
      <div><dt>答對</dt><dd>${T.right}<small>／${T.total}</small></dd></div>
      <div><dt>今日得分</dt><dd>+${T.xp}</dd></div>
      <div><dt>連續</dt><dd>${live}<small>日</small></dd></div>
    </dl>
    <p>${T.bonus ? `完成今日功課，加 ${T.bonus} 分。` : ""}明天再回來，連續紀錄就會接下去。</p>${xpNote()}
    <div class="actions row">${moreN ? `<button class="btn" type="button" data-act="more">再學 ${moreN} 個新字</button>` : ""}
    <button class="btn" type="button" data-tab-go="drill">去做詞彙題</button></div>`;
  hookImgs(v);
}

function answer(pickId){
  const q = cur, T = state.today;
  if (!q || q.picked != null) return;
  q.picked = pickId;
  const item = T.queue[T.pos], ok = pickId === q.id;
  let gain = 0;
  if (!item.retry){
    T.total++;
    gain = grade(q.id, ok, T.day);
    if (ok) T.right++; else { T.queue.push({ id:q.id, retry:true }); (T.wrong = T.wrong || []).push(q.id); }
  } else if (ok) gain = 3;
  addXp(gain); T.xp += lastGain;
  setMood(ok ? "happy" : "sad", "a-" + T.day + "-" + T.pos);
  save(); renderHeader(); renderToday();
  const nb = $('[data-act="next"]'); if (nb && kbd) nb.focus({ preventScroll:true });
}
function next(){
  const T = state.today;
  T.pos++; cur = null;
  if (T.pos >= T.queue.length) finish();
  save(); renderHeader(); renderToday(); focusMain();
}
function finish(){
  const T = state.today;
  T.done = true; T.bonus = 0;
  logRun("daily", T.total - (T.logged || 0) > 0 ? T.total - (T.logged || 0) : 0, T.right - (T.loggedR || 0), T.t0 ? (Date.now() - T.t0) / 1000 : 0, T.wrong);
  T.logged = T.total; T.loggedR = T.right; T.t0 = Date.now(); T.wrong = [];
  if (state.lastDay !== T.day){
    state.streak = state.lastDay === T.day - 1 ? state.streak + 1 : 1;
    state.lastDay = T.day;
    state.best = Math.max(state.best || 0, state.streak);
    const bonus = 20 + Math.min(state.streak, 10) * 3;
    state.xp += bonus; T.xp += bonus; T.bonus = bonus;
    { const now = rankIndex(state.xp, true); if (now > (state.rankMax || 0)) state.rankMax = now; }
  }
  state.history[dayKey(T.day)] = T.xp;
  const keys = Object.keys(state.history).sort();
  if (keys.length > 200) keys.slice(0, keys.length - 200).forEach(k => delete state.history[k]);
  const after = rankIndex(state.xp);
  T.rankUp = after > T.rankBefore ? after : -1;
  if (T.rankUp >= 0) pulsePlaque = true;
}
function addMore(){
  const T = state.today;
  const more = pickNew(state.settings.daily, new Set(T.newIds));
  if (!more.length) return;
  T.newIds = T.newIds.concat(more);
  T.pendingQuiz = more; T.queue = null; T.pos = 0; T.done = false;
  T.rankBefore = rankIndex(state.xp); T.rankUp = -1; T.bonus = 0;
  cur = null; save(); renderToday(); focusMain();
}

/* ---------- drills ---------- */
function clozePool(){
  const s = startLv();
  const all = WORDS.filter(w => w.ex && w.ex.code);
  const inRange = all.filter(w => w.lv >= s);
  return inRange.length >= DRILL_N ? inRange : all;
}
function startDrill(mode){
  let ids = [];
  if (mode === "passage"){ startPassage(); return; }
  if (mode === "fill"){ startFill(); return; }
  if (mode === "cloze"){
    const pool = clozePool().map(w => w.id), seen = state.drills.seen;
    let fresh = pool.filter(id => !seen.includes(id));
    if (fresh.length < DRILL_N){ state.drills.seen = seen.filter(id => !pool.includes(id)); fresh = pool.slice(); }
    ids = shuffle(fresh).slice(0, DRILL_N);
    state.drills.seen = state.drills.seen.concat(ids);
  } else if (mode === "spell"){
    const learned = WORDS.filter(w => status(w.id) > 0 && /^[A-Za-z'-]{3,}$/.test(w.k));
    const s = startLv();
    const extra = WORDS.filter(w => !state.prog[w.id] && w.lv === s && /^[A-Za-z'-]{3,}$/.test(w.k));
    ids = shuffle(learned).slice(0, DRILL_N).map(w => w.id);
    if (ids.length < DRILL_N) ids = ids.concat(shuffle(extra).slice(0, DRILL_N - ids.length).map(w => w.id));
  } else if (mode === "weak"){
    ids = WORDS.filter(w => { const p = state.prog[w.id]; return p && p[2] > p[3]; })
      .sort((a, b) => { const pa = state.prog[a.id], pb = state.prog[b.id]; return (pb[2] - pb[3]) - (pa[2] - pa[3]) || pa[1] - pb[1]; })
      .slice(0, DRILL_N).map(w => w.id);
    shuffle(ids);
  }
  if (!ids.length){ drill = { mode, empty:true }; renderDrill(); return; }
  drill = { mode, ids, pos:0, right:0, q:null, typed:"", checked:false, ok:false, t0:Date.now(), wrong:[] };
  setupDrillItem(); save(); renderDrill(); focusMain();
}
function setupDrillItem(){
  const id = drill.ids[drill.pos];
  drill.typed = ""; drill.checked = false; drill.ok = false;
  if (drill.mode === "spell") drill.q = { id, type:"spell", picked:null };
  else if (drill.mode === "cloze") drill.q = makeQuestion(id, "cloze");
  else drill.q = makeQuestion(id);
  setMood("idle", "d-" + drill.mode + "-" + drill.pos + "-" + id);
}
function acceptable(w){
  const set = new Set([w.k.toLowerCase()]);
  w.w.split("/").forEach(a => { const b = a.split(" (")[0]; set.add(b.replace(/\(.*?\)/g, "").trim().toLowerCase()); set.add(b.replace(/[()]/g, "").trim().toLowerCase()); });
  return set;
}
function drillResult(ok){
  const q = drill.q, before = rankIndex(state.xp);
  state.drills.total++;
  if (ok){ drill.right++; state.drills.right++; addXp(DRILL_XP); drill.gain = (drill.gain || 0) + lastGain; credit(q.id); }
  else { lapse(q.id); drill.wrong.push(q.id); }
  setMood(ok ? "happy" : "sad", "dr-" + drill.mode + "-" + drill.pos);
  if (rankIndex(state.xp) > before){ ui.line = pick(linesFor("rankup")); }
  save(); renderHeader();
}
function drillPick(id){
  const q = drill.q; if (!q || q.picked != null) return;
  q.picked = id; drillResult(id === q.id); renderDrill();
  const nb = $('[data-drill="next"]'); if (nb && kbd) nb.focus({ preventScroll:true });
}
function drillCheckSpell(skip){
  if (drill.checked) return;
  const inp = $("#spellIn"); const val = skip ? "" : (inp ? inp.value : drill.typed).trim().toLowerCase();
  drill.typed = val; drill.checked = true;
  drill.ok = !!val && acceptable(BYID.get(drill.q.id)).has(val);
  drill.q.picked = val || "(skip)";
  drillResult(drill.ok); renderDrill();
  const nb = $('[data-drill="next"]'); if (nb && kbd) nb.focus({ preventScroll:true });
}
function drillNext(){
  drill.pos++;
  if (drill.pos >= drill.ids.length){ drill.finished = true; setMood("done", "drilldone-" + Date.now()); logRun(drill.mode, drill.ids.length, drill.right, (Date.now() - drill.t0) / 1000, drill.wrong); save(); }
  else setupDrillItem();
  renderDrill(); focusMain();
}
const MODE_NAME = { tfctw:"托福補字", tfread:"托福閱讀", tfmock:"托福模擬考", cloze:"詞彙題", spell:"拼字", weak:"錯字複習", passage:"克漏字", fill:"文意選填", daily:"每日功課", test:"程度測驗" };
const TYPE_NAME = { vocab:"詞彙", phrase:"片語", conj:"轉承詞", gram:"文法" };

/* ---------- 克漏字 ---------- */
let pas = null;
function startPassage(){
  if (!PASS.length){ drill = { mode:"passage", empty:true }; renderDrill(); return; }
  const s = state.settings.startLv || 1, seen = state.drills.pseen;
  let pool = PASS.filter(p => !seen.includes(p.id));
  if (!pool.length){ state.drills.pseen = []; pool = PASS.slice(); }
  const near = pool.filter(p => p.lv >= Math.min(s, 5) - 1 && p.lv <= Math.max(s, 3) + 1);
  const p = pick(near.length ? near : pool);
  state.drills.pseen.push(p.id);
  pas = { p, pos:0, picks:[], opts:p.qs.map(q => placeAnswer(shuffle(q.opts.slice()), o => o === q.a)), t0:Date.now(), done:false };
  drill = { mode:"passage" };
  setMood("idle", "pas-" + p.id);
  save(); renderDrill(); focusMain();
}
function passageText(){
  const p = pas.p;
  return esc(p.text).replace(/\[(\d)\]/g, (_, d) => {
    const i = +d - 1, picked = pas.picks[i];
    if (picked != null){
      const ok = picked === p.qs[i].a;
      return `<span class="pgap ${ok ? "ok" : "no"}">${i + 1}. ${esc(p.qs[i].a)}</span>`;
    }
    return `<span class="pgap${i === pas.pos && !pas.done ? " cur" : ""}">${i + 1}</span>`;
  });
}
function passagePick(opt){
  if (pas.done || pas.picks[pas.pos] != null) return;
  const q = pas.p.qs[pas.pos], ok = opt === q.a;
  pas.picks[pas.pos] = opt; pas.last = opt;
  state.drills.total++;
  if (ok){ state.drills.right++; addXp(DRILL_XP); pas.gain = (pas.gain || 0) + lastGain; if (q.word) credit(q.word); }
  else if (q.word){ if (state.prog[q.word]) lapse(q.word); else state.prog[q.word] = [1, dayNum() + 1, 1, 0]; }
  setMood(ok ? "happy" : "sad", "pp-" + pas.p.id + "-" + pas.pos);
  save(); renderHeader(); renderDrill();
  const nb = $('[data-pas="next"]'); if (nb && kbd) nb.focus({ preventScroll:true });
}
function passageNext(){
  pas.pos++; pas.last = null;
  if (pas.pos >= pas.p.qs.length){
    pas.done = true;
    const ty = {}; let r = 0; const wrong = [];
    pas.p.qs.forEach((q, i) => { const ok = pas.picks[i] === q.a; if (ok) r++; else if (q.word) wrong.push(q.word);
      const t = ty[q.type] || (ty[q.type] = [0, 0]); t[1]++; if (ok) t[0]++; });
    logRun("passage", pas.p.qs.length, r, (Date.now() - pas.t0) / 1000, wrong, ty);
    pas.right = r; setMood("done", "pasdone-" + pas.p.id); save();
  }
  renderDrill(); focusMain();
}
function renderPassage(v){
  const p = pas.p, n = p.qs.length;
  if (pas.done){
    const review = p.qs.map((q, i) => { const ok = pas.picks[i] === q.a;
      return `<li class="${ok ? "ok" : "no"}"><b>${i + 1}. ${esc(q.a)}</b><span class="tag">${TYPE_NAME[q.type] || q.type}</span>${ok ? "" : `<span class="yours">你選 ${esc(pas.picks[i])}</span>`}<p class="hint">${esc(q.why)}</p></li>`; }).join("");
    v.innerHTML = buddyHtml("bounce") + `<h2>克漏字結束</h2>
      <dl class="result"><div><dt>答對</dt><dd>${pas.right}<small>／${n}</small></dd></div><div><dt>得分</dt><dd>+${pas.gain || 0}</dd></div><div><dt>用時</dt><dd>${Math.max(1, Math.round((Date.now() - pas.t0) / 60000))}<small>分</small></dd></div></dl>${xpNote()}
      <article class="card passage">${deco(1, "stk-card")}<h3 class="ptitle" lang="en">${esc(p.title)}</h3><p class="ptext" lang="en">${passageText()}</p></article>
      <h3 class="sub">逐題解析</h3><ol class="review">${review}</ol>
      <div class="actions row"><button class="btn primary" type="button" data-drill="go" data-mode="passage">再做一篇</button>
      <button class="btn" type="button" data-drill="menu">回練習選單</button></div>`;
    hookImgs(v); return;
  }
  const q = p.qs[pas.pos], picked = pas.picks[pas.pos], answered = picked != null, ok = picked === q.a;
  const opts = pas.opts[pas.pos].map((o, i) => {
    let cls = "opt en"; if (answered){ if (o === q.a) cls += " right"; else if (o === picked) cls += " wrong"; }
    return `<li><button type="button" class="${cls}" data-pas="pick" data-v="${esc(o)}"${answered ? " disabled" : ""} lang="en"><span class="key">${i + 1}</span><span>${esc(o)}</span></button></li>`;
  }).join("");
  v.innerHTML = buddyHtml(answered ? (ok ? "bounce" : "shake") : "") + `<p class="step"><span>克漏字</span>第 ${pas.pos + 1}／${n} 格・第 ${p.lv} 級程度</p>
    <article class="card passage">${deco(pas.pos, "stk-card")}<h3 class="ptitle" lang="en">${esc(p.title)}</h3><p class="ptext" lang="en">${passageText()}</p></article>
    <div class="answered-bar">${answered ? `<p class="feedback ${ok ? "ok" : "no"}" aria-live="polite">${ok ? "答對了。" : `答錯了，正確是「${esc(q.a)}」。`}<span class="tag">${TYPE_NAME[q.type] || ""}</span></p><p class="hint">${esc(q.why)}</p>
      <div class="actions row"><button class="btn primary" type="button" data-pas="next">${pas.pos + 1 >= n ? "看結果" : "下一格"}</button><button class="btn" type="button" data-drill="menu">結束</button></div>` : ""}</div>
    <p class="ask">第 ${pas.pos + 1} 格要填什麼？</p><ul class="opts">${opts}</ul>`;
  hookImgs(v);
}

/* ---------- 文意選填 ---------- */
let fil = null;
const LETTERS = "ABCDEFGHIJ";
function startFill(){
  if (!FILL.length){ drill = { mode:"fill", empty:true }; renderDrill(); return; }
  const s = state.settings.startLv || 1, seen = state.drills.fseen;
  let pool = FILL.filter(p => !seen.includes(p.id));
  if (!pool.length){ state.drills.fseen = []; pool = FILL.slice(); }
  const near = pool.filter(p => p.lv >= Math.min(s, 5) - 1 && p.lv <= Math.max(s, 3) + 1);
  const p = pick(near.length ? near : pool);
  state.drills.fseen.push(p.id);
  const bank = shuffle(p.blanks.map(b => b.a));
  fil = { p, bank, put:Array(p.blanks.length).fill(null), cur:0, t0:Date.now(), done:false };
  drill = { mode:"fill" };
  setMood("idle", "fill-" + p.id);
  save(); renderDrill(); focusMain();
}
function fillNextEmpty(from){
  const n = fil.put.length;
  for (let k = 1; k <= n; k++){ const i = (from + k) % n; if (fil.put[i] == null) return i; }
  return from;
}
function fillAct(a, i){
  if (!fil || fil.done) return;
  if (a === "gap"){ i = +i; if (fil.cur === i && fil.put[i] != null) fil.put[i] = null; fil.cur = i; }
  else if (a === "word"){
    i = +i; const at = fil.put.indexOf(i);
    if (at === fil.cur){ fil.put[at] = null; }
    else { if (at >= 0) fil.put[at] = null; fil.put[fil.cur] = i; fil.cur = fillNextEmpty(fil.cur); }
  }
  else if (a === "clear"){ fil.put = fil.put.map(() => null); fil.cur = 0; }
  else if (a === "submit"){ fillSubmit(); return; }
  renderDrill();
  const g = document.querySelector(".fgap.cur"); if (g && a === "word") g.scrollIntoView({ block:"nearest", behavior:"smooth" });
}
function fillSubmit(){
  const p = fil.p; let r = 0; const wrong = [];
  p.blanks.forEach((b, i) => {
    const got = fil.put[i] == null ? null : fil.bank[fil.put[i]], ok = got === b.a;
    state.drills.total++;
    if (ok){ r++; state.drills.right++; addXp(DRILL_XP); fil.gain = (fil.gain || 0) + lastGain; credit(b.word); }
    else { wrong.push(b.word); if (state.prog[b.word]) lapse(b.word); else state.prog[b.word] = [1, dayNum() + 1, 1, 0]; }
  });
  fil.done = true; fil.right = r;
  logRun("fill", p.blanks.length, r, (Date.now() - fil.t0) / 1000, wrong);
  setMood(r >= 7 ? "done" : "sad", "filldone-" + p.id + "-" + Date.now());
  save(); renderHeader(); renderDrill(); focusMain();
}
function fillCap(text, idx){ return idx === 0 || /[.!?]["”]?\s*$/.test(text); }
function fillText(){
  const p = fil.p; let out = "", last = 0;
  p.text.replace(/\[(\d+)\]/g, (m, d, off) => {
    const before = p.text.slice(last, off); out += esc(before);
    const i = +d - 1, b = p.blanks[i], cap = fillCap(p.text.slice(0, off), off);
    const capf = t => cap ? t.charAt(0).toUpperCase() + t.slice(1) : t;
    if (fil.done){
      const got = fil.put[i] == null ? null : fil.bank[fil.put[i]], ok = got === b.a;
      out += `<span class="fgap ${ok ? "ok" : "no"}">${d}. ${esc(capf(b.a))}</span>`;
    } else {
      const k = fil.put[i];
      out += `<button type="button" class="fgap${i === fil.cur ? " cur" : ""}${k != null ? " filled" : ""}" data-fill="gap" data-i="${i}" aria-label="第 ${d} 格${k != null ? "，已填 " + fil.bank[k] : "，空白"}">${d}${k != null ? `<b>${LETTERS[k]}</b> ${esc(capf(fil.bank[k]))}` : ""}</button>`;
    }
    last = off + m.length; return m;
  });
  return out + esc(p.text.slice(last));
}
function renderFill(v){
  const p = fil.p, n = p.blanks.length;
  if (fil.done){
    const review = p.blanks.map((b, i) => { const got = fil.put[i] == null ? null : fil.bank[fil.put[i]], ok = got === b.a, L = LETTERS[fil.bank.indexOf(b.a)];
      return `<li class="${ok ? "ok" : "no"}"><b lang="en">${i + 1}. (${L}) ${esc(b.a)}</b>${ok ? "" : `<span class="yours">${got ? `你填 ${esc(got)}` : "沒填"}</span>`}<p class="hint">${esc(b.why)}</p></li>`; }).join("");
    v.innerHTML = buddyHtml(fil.right >= 7 ? "bounce" : "shake") + `<h2>文意選填結束</h2>
      <dl class="result"><div><dt>答對</dt><dd>${fil.right}<small>／${n}</small></dd></div><div><dt>得分</dt><dd>+${fil.gain || 0}</dd></div><div><dt>用時</dt><dd>${Math.max(1, Math.round((Date.now() - fil.t0) / 60000))}<small>分</small></dd></div></dl>${xpNote()}
      <article class="card passage">${deco(2, "stk-card")}<h3 class="ptitle" lang="en">${esc(p.title)}</h3><p class="ptext" lang="en">${fillText()}</p></article>
      <h3 class="sub">逐格解析</h3><ol class="review">${review}</ol>
      <div class="actions row"><button class="btn primary" type="button" data-drill="go" data-mode="fill">再做一篇</button>
      <button class="btn" type="button" data-drill="menu">回練習選單</button></div>`;
    hookImgs(v); return;
  }
  const filled = fil.put.filter(x => x != null).length, left = n - filled;
  const bank = fil.bank.map((w, k) => { const at = fil.put.indexOf(k);
    return `<li><button type="button" class="fword${at >= 0 ? " used" : ""}" data-fill="word" data-i="${k}" lang="en"><span class="key">${LETTERS[k]}</span>${esc(w)}${at >= 0 ? `<small>${at + 1}</small>` : ""}</button></li>`; }).join("");
  v.innerHTML = buddyHtml("") + `<p class="step"><span>文意選填</span>已填 ${filled}／${n}・第 ${p.lv} 級程度</p>
    <article class="card passage">${deco(0, "stk-card")}<h3 class="ptitle" lang="en">${esc(p.title)}</h3><p class="ptext" lang="en">${fillText()}</p></article>
    <div class="fbank"><p class="ask">第 ${fil.cur + 1} 格要填哪個字？</p><ul class="fwords">${bank}</ul></div>
    <div class="actions row"><button class="btn primary" type="button" data-fill="submit">${left ? `交卷（還有 ${left} 格）` : "交卷"}</button>${filled ? `<button class="btn" type="button" data-fill="clear">全部清除</button>` : ""}<button class="btn" type="button" data-drill="menu">結束</button></div>
    <p class="hint">點文章裡的空格可以換格；點已經用過的字，會把它移到目前這格。每個字只能用一次，全部填完再交卷。</p>`;
  hookImgs(v);
}
function renderDrill(){
  const v = $("#view-drill");
  if (drill && drill.mode === "passage" && pas && !drill.empty){ renderPassage(v); return; }
  if (drill && drill.mode === "fill" && fil && !drill.empty){ renderFill(v); return; }
  if (!drill){
    setMood("idle", "drillmenu");
    const nEx = WORDS.filter(w => w.ex && w.ex.code).length;
    const nWeak = WORDS.filter(w => { const p = state.prog[w.id]; return p && p[2] > p[3]; }).length;
    const nLearned = WORDS.filter(w => status(w.id) > 0).length;
    v.innerHTML = buddyHtml("") + `<h2>練習</h2><p class="lede">每題答對加 ${DRILL_XP} 分。答錯的字會排進明天的複習。</p>
      <ul class="modes">
        ${TF ? `<li><button type="button" class="mode tfmode" data-tab-go="tf"><b>托福真題・閱讀</b><span>${TF.sets.length > 1 ? `${TF.sets.map(s => esc(s.short || s.title)).join("、")} 共 ${TF.sets.length} 套` : esc((TF.sets[0] || {}).title || "")}：補字 ${tfAll("ctw").length} 篇、日常閱讀 ${tfAll("dl").length} 篇、學術閱讀 ${tfAll("ap").length} 篇。</span></button></li>` : ""}
        ${NOTES ? `<li><button type="button" class="mode tfmode" data-tab-go="note"><b>${esc(NOTES.name || "托福寫作模板")}</b><span>${NOTES.sections.map(x => esc(x.title)).slice(1, 5).join("、")}……共 ${NOTES.sections.length} 段${notesState().mine.length ? `，你補充了 ${notesState().mine.length} 則` : "，每段都可以補充自己的模板"}。</span></button></li>` : ""}
        <li><button type="button" class="mode" data-drill="go" data-mode="cloze"><b>詞彙題模擬</b><span>例句挖一個空格，四個詞性相同的選項，跟學測詞彙題一樣考「哪個字放進句子才通」。題庫 ${nEx} 句。</span></button></li>
        <li><button type="button" class="mode" data-drill="go" data-mode="spell"><b>拼字</b><span>${L2() === "族語" ? "看中文拼出族語，熟悉拼寫。" : "看中文拼出英文，練中譯英和作文用得到的字。"}${nLearned ? `從學過的 ${nLearned} 個字出題。` : "還沒學過字的話，會先從起始級數出題。"}</span></button></li>
        <li><button type="button" class="mode" data-drill="go" data-mode="passage"><b>克漏字</b><span>一篇短文 5 個空格，照學測綜合測驗出：詞彙、片語、轉承詞、文法都有，每格附解析。共 ${PASS.length} 篇。</span></button></li>
        ${FILL.length ? `<li><button type="button" class="mode" data-drill="go" data-mode="fill"><b>文意選填</b><span>一篇短文 10 個空格、10 個選項，每個字只用一次，跟學測文意選填一樣。全部填完再交卷看解析。共 ${FILL.length} 篇。</span></button></li>` : ""}
        <li><button type="button" class="mode" data-drill="go" data-mode="weak"${nWeak ? "" : " disabled"}><b>錯字複習</b><span>${nWeak ? `把答錯過的 ${nWeak} 個字裡，錯最多次的再考一輪。` : "還沒有答錯過的字。"}</span></button></li>
      </ul>
      ${state.drills.total ? `<p class="hint">練習累計答對 ${state.drills.right}／${state.drills.total} 題。</p>` : ""}`;
    hookImgs(v); return;
  }
  if (drill.empty){
    v.innerHTML = `<p class="lede">這個練習目前沒有題目可以出。</p><div class="actions"><button class="btn" type="button" data-drill="menu">回練習選單</button></div>`;
    return;
  }
  if (drill.finished){
    v.innerHTML = buddyHtml("bounce") + `<h2>${MODE_NAME[drill.mode]}結束</h2>
      <dl class="result"><div><dt>答對</dt><dd>${drill.right}<small>／${drill.ids.length}</small></dd></div><div><dt>得分</dt><dd>+${drill.gain || 0}</dd></div><div><dt>累計</dt><dd>${state.drills.right}<small>題</small></dd></div></dl>${xpNote()}
      <div class="actions row"><button class="btn primary" type="button" data-drill="go" data-mode="${drill.mode}">再一輪</button>
      <button class="btn" type="button" data-drill="menu">回練習選單</button></div>`;
    hookImgs(v); return;
  }
  const q = drill.q, w = BYID.get(q.id), answered = q.picked != null, last = drill.pos + 1 >= drill.ids.length;
  const head = `<p class="step"><span>${MODE_NAME[drill.mode]}</span>${drill.pos + 1}／${drill.ids.length}</p>`;
  const nextBtn = answered ? `<div class="actions row"><button class="btn primary" type="button" data-drill="next">${last ? "看結果" : "下一題"}</button><button class="btn" type="button" data-drill="menu">結束</button></div>` : "";
  if (q.type === "spell"){
    const ok = drill.ok;
    const hint = w.k[0] + " " + Array(Math.max(0, w.k.length - 1)).fill("_").join(" ");
    v.innerHTML = buddyHtml(answered ? (ok ? "bounce" : "shake") : "") + head + `
      <article class="card">${deco(drill.pos, "stk-card")}<p class="meta">${lvTag(w)}<span class="pos" lang="en">${esc(w.m[0] ? w.m[0][0] : w.pos)}</span></p>
        <h3 class="word zhword">${esc(shortZh(w))}</h3>
        ${answered ? "" : `<p class="hintline" lang="en" aria-label="第一個字母是 ${esc(w.k[0])}，共 ${w.k.length} 個字母">${esc(hint)}</p>`}
        ${answered ? `<div class="wordrow"><p class="enreveal" lang="en">${esc(w.w)}</p>${sayBtn(w.k)}</div>${sensesHtml(w)}${exLine(w)}` : ""}
        ${answered && ok ? SEAL() : ""}
      </article>
      ${answered ? `<p class="feedback ${ok ? "ok" : "no"}" aria-live="polite">${ok ? "拼對了。" : drill.typed ? `你拼的是「${esc(drill.typed)}」，正確是「${esc(w.k)}」。` : `正確是「${esc(w.k)}」，下次再挑戰。`}</p>${nextBtn}`
        : `<div class="spell"><label class="vh" for="spellIn">輸入${L2()}拼字</label><input id="spellIn" class="field" lang="en" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done">
           <button class="btn skip" type="button" data-drill="skip">跳過</button><button class="btn primary" type="button" data-drill="check">確定</button></div>
           <p class="hint">不會的話按「跳過」看答案。</p>`}`;
    hookImgs(v); return;
  }
  const ok = q.picked === q.id;
  let fb = "";
  if (answered){ const right = q.type === "en2zh" ? shortZh(w) : q.type === "cloze" ? q.form : w.k; fb = ok ? `<p class="feedback ok" aria-live="polite">答對了。</p>` : `<p class="feedback no" aria-live="polite">答錯了，正確是「${esc(right)}」。</p>`; }
  v.innerHTML = buddyHtml(answered ? (ok ? "bounce" : "shake") : "") + head + `
    <article class="card">${deco(drill.pos, "stk-card")}${metaRow(w, answered)}${promptHtml(q, w)}${answered ? revealHtml(q, w) : ""}${answered && ok ? SEAL() : ""}</article>
    <div class="answered-bar">${fb}${nextBtn}</div>
    <p class="ask">${askText(q)}</p>
    <ul class="opts">${optsHtml(q, "dpick").replace(/data-act="dpick"/g, 'data-drill="pick"')}</ul>`;
  hookImgs(v);
}

/* ---------- library ---------- */
function dueText(n){ const d = n - dayNum(); if (d <= 0) return "今天"; if (d === 1) return "明天"; return `${d} 天後`; }
function rowHtml(w){
  const s = status(w.id), open = ui.open === w.id, p = state.prog[w.id];
  let more = "";
  if (open){
    more = `<div class="row-more"><p class="meta">${lvTag(w)}<span class="pos" lang="en">${esc(w.pos)}</span>${sayBtn(w.k)}</p>
      ${sensesHtml(w)}${exLine(w)}
      ${p && p[2] ? `<p class="hint">作答 ${p[2]} 次，答對 ${p[3]} 次${p[0] > 0 ? `。下次複習：${dueText(p[1])}` : ""}</p>` : ""}
      ${w.tag === "M" ? (ui.edit === w.id ? editHtml(w) : `<p class="rowacts"><button type="button" class="btn small" data-lib="edit" data-id="${esc(w.id)}">修改／填例句</button><button type="button" class="btn danger small" data-lib="del" data-id="${esc(w.id)}">${ui.delArm === w.id ? "再按一次確認刪除" : "刪除這個字"}</button></p>`) : ""}</div>`;
  }
  return `<li class="row"><button type="button" class="row-main" data-lib="toggle" data-id="${esc(w.id)}" aria-expanded="${open}">
    <span class="row-word" lang="en">${esc(w.w)}<small>${w.tag === "M" ? "自訂" : (isGsat() ? w.lv + " 級" : esc(lvName(w.lv)))}</small></span><span class="row-zh">${esc(shortZh(w))}</span>
    <i class="dot s${s}" aria-hidden="true"></i><span class="vh">${["未學","學習中","熟記"][s]}</span></button>${more}</li>`;
}
function renderLib(){
  renderMine();
  const lvs = packLevels(), fl = $("#fLv");
  const want = ["all"].concat(lvs.map(String), state.custom.length ? ["M"] : []).join(",");
  if (fl.dataset.k !== want + curPackId()){
    fl.dataset.k = want + curPackId();
    fl.innerHTML = lvs.length > 10
      ? `<label class="vh" for="lvSel">等級</label><select id="lvSel" class="field sel"><option value="all">全部</option>${lvs.map(lv => `<option value="${lv}">${esc(lvName(lv))}</option>`).join("")}${state.custom.length ? `<option value="M">自訂</option>` : ""}</select>`
      : `<button type="button" data-v="all">全部</button>` + lvs.map(lv => `<button type="button" data-v="${lv}">${esc(lvName(lv).replace(/^第 (\d) 級$/, "$1 級"))}</button>`).join("") + (state.custom.length ? `<button type="button" data-v="M">自訂</button>` : "");
  }
  const sel = $("#lvSel"); if (sel) sel.value = ui.lv;
  setPressed("#fLv", ui.lv);
  const c = [0, 0, 0]; WORDS.forEach(w => c[status(w.id)]++);
  $("#counts").innerHTML = `<span><i class="dot s2"></i>熟記 ${c[2]}</span><span><i class="dot s1"></i>學習中 ${c[1]}</span><span><i class="dot s0"></i>未學 ${c[0]}</span>`;
  const raw = ui.q.trim(), q = raw.toLowerCase();
  const items = WORDS.filter(w =>
      (ui.lv === "all" || (ui.lv === "M" ? w.tag === "M" : w.lv === +ui.lv)) &&
      (ui.st === "all" || (ui.st === "weak" ? isWeak(w.id) : status(w.id) === +ui.st)) &&
      (!q || w.w.toLowerCase().includes(q) || w.zh.includes(raw)))
    .sort((a, b) => (q && a.k.toLowerCase().startsWith(q) ? 0 : 1) - (q && b.k.toLowerCase().startsWith(q) ? 0 : 1) || a.w.localeCompare(b.w, "en", { sensitivity:"base" }));
  $("#list").innerHTML = items.slice(0, ui.limit).map(rowHtml).join("");
  const rest = items.length - ui.limit;
  $("#libMore").innerHTML = rest > 0 ? `<p class="hint">共 ${items.length} 個字，目前顯示 ${ui.limit} 個。用搜尋可以直接找到某個字。</p>
    <button class="btn small" type="button" data-lib="more">再顯示 ${Math.min(LIB_PAGE, rest)} 個</button>` : "";
  $("#listEmpty").hidden = items.length > 0;
  $("#q").placeholder = `搜尋${L2()}或中文`;
  const src = curPack().source, sb = $("#libSrc");
  if (sb){ sb.hidden = !src; sb.textContent = src ? "資料來源：" + src : ""; }
}
function refocusRow(id, sel){ const el = document.querySelector(`[data-lib="${sel}"][data-id="${CSS.escape(id)}"]`); if (el && kbd) el.focus({ preventScroll:true }); }
function mineEntry(id){ return state.custom.find(c => c.w.toLowerCase() === id); }
function editHtml(w){
  const c = mineEntry(w.id) || {};
  const f = (n, label, v, ph) => `<label>${label}<input class="field" data-ed="${n}" value="${esc(v || "")}"${ph ? ` placeholder="${ph}"` : ""} autocomplete="off"${n === "ex" ? ' autocapitalize="sentences" lang="en"' : ""}></label>`;
  return `<div class="addform editform" data-id="${esc(w.id)}">
    ${f("zh", "中文意思", c.zh)}${f("pos", "詞性（選填）", c.pos, "例如 adj.")}
    ${f("ex", "例句（選填）", (c.ex || "").replace(/[{}]/g, ""), "寫一句有用到這個字的英文句子")}${f("exzh", "例句中文（選填）", c.exzh)}
    <p class="form-msg" id="edMsg" aria-live="polite"></p>
    <div class="rowacts"><button type="button" class="btn primary small" data-lib="save" data-id="${esc(w.id)}">儲存</button><button type="button" class="btn small" data-lib="cancel" data-id="${esc(w.id)}">取消</button></div></div>`;
}
function saveEdit(id){
  const box = document.querySelector(".editform"), c = mineEntry(id); if (!box || !c) return;
  const get = n => box.querySelector(`[data-ed="${n}"]`).value.trim();
  const zh = get("zh"), msg = $("#edMsg");
  if (!zh){ msg.textContent = "中文意思不能空白。"; msg.className = "form-msg err"; return; }
  c.zh = zh; c.pos = get("pos"); c.ex = braceEx(get("ex"), c.w); c.exzh = c.ex ? get("exzh") : "";
  ui.edit = null; rebuild(); save(); renderLib(); refocusRow(id, "toggle");
}
function splitPos(zh){
  const m = zh.match(/^[(（]?((?:n|v|vt|vi|adj|adv|prep|conj|pron|phr|art|aux|num|det|int|abbr)\.(?:\/(?:n|v|vt|vi|adj|adv)\.)*)[)）]?\s*(.+)$/i);
  return m ? [m[1].toLowerCase(), m[2].trim()] : ["", zh];
}
function parseMine(text){
  const rows = [], bad = [];
  String(text || "").split(/\r?\n/).forEach(raw => {
    const line = raw.trim(); if (!line) return;
    let w = "", zh = "", ex = "", exzh = "";
    const parts = /\t/.test(line) ? line.split("\t") : /[|｜]/.test(line) ? line.split(/[|｜]/) : null;
    if (parts){ [w, zh, ex, exzh] = [0, 1, 2, 3].map(i => (parts[i] || "").trim()); }
    else { const m = line.match(/^([A-Za-z][A-Za-z '\-]*?)[\s,，:：=]+((?:[(（]?[A-Za-z]{1,5}\.[)）]?\s*)?[^\x00-\x7F].*)$/); if (m){ w = m[1]; zh = m[2].trim(); } }
    w = w.replace(/\s+/g, " ").trim();
    if (!w || !zh || !/^[A-Za-z][A-Za-z '\-]*$/.test(w)){ bad.push(line); return; }
    const [pos, z] = splitPos(zh);
    rows.push({ w, zh:z, pos, ex:braceEx(ex, w), exzh:ex ? exzh : "" });
  });
  return { rows, bad };
}
function addBulk(){
  const ta = $("#bulkIn"), msg = $("#bulkMsg");
  const { rows, bad } = parseMine(ta.value);
  const have = new Set(state.custom.map(c => c.w.toLowerCase()));
  let add = 0, dup = 0, full = 0;
  rows.forEach(r => {
    const id = r.w.toLowerCase();
    if (have.has(id)){ dup++; return; }
    if (state.custom.length >= MINE_MAX){ full++; return; }
    have.add(id); state.custom.push(r); add++;
  });
  if (add){ rebuild(); if (state.today && !state.today.started) ensureToday(true); save(); renderAll(); }
  const bits = [];
  if (add) bits.push(`加入了 ${add} 個字`);
  if (dup) bits.push(`${dup} 個已經有了，略過`);
  if (full) bits.push(`${full} 個超過上限 ${MINE_MAX} 個，沒有加入`);
  if (bad.length) bits.push(`${bad.length} 行看不懂，留在框裡給你修改`);
  msg.textContent = bits.length ? bits.join("；") + "。" : "先把單字貼進框裡，一行一個字。";
  msg.className = "form-msg " + (add && !bad.length ? "ok" : bad.length || !add ? "err" : "ok");
  ta.value = bad.join("\n");
}
function mineText(){
  return state.custom.map(c => [c.w, (c.pos ? c.pos + " " : "") + c.zh, (c.ex || "").replace(/[{}]/g, ""), c.exzh || ""].join(" | ").replace(/( \| )+$/, "")).join("\n");
}
async function copyMine(){
  const msg = $("#bulkMsg"), t = mineText();
  if (!t){ msg.textContent = "還沒有自己的單字。"; msg.className = "form-msg err"; return; }
  try { await navigator.clipboard.writeText(t); msg.textContent = `已複製 ${state.custom.length} 個字的清單。傳給朋友，對方貼進這個框就能加入。`; msg.className = "form-msg ok"; }
  catch (e) { const ta = $("#bulkIn"); ta.value = t; ta.select(); msg.textContent = "這個瀏覽器不能自動複製，清單已經放在框裡，請長按全選後複製。"; msg.className = "form-msg err"; }
}
function renderMine(){
  const n = state.custom.length, box = $("#mineBox"); if (!box) return;
  $("#mineSum").textContent = n ? `我的單字（${n} 個）` : "加入自己的字";
  box.hidden = !n;
  if (!n) return;
  const mix = state.settings.mixMine !== false;
  box.innerHTML = `<p class="hint">${isMine() ? "現在只背「我的單字」。" : "想只背這些字，按下面的按鈕；之後可以在「設定」的字庫切回來。"}</p>
    <div class="rowacts">${isMine() ? `<button type="button" class="btn small" data-mine="back">切回${esc((PACKS.find(p => p.id === "gsat") || {}).name || "學測")}</button>` : `<button type="button" class="btn primary small" data-mine="only">只背我的單字</button>`}<button type="button" class="btn small" data-mine="copy">複製清單分享</button></div>
    <p class="hint">背其他字庫時，要不要優先抽到我的單字：</p>
    <div class="seg" role="group" aria-label="混進其他字庫" id="sMix"><button type="button" data-v="on" aria-pressed="${mix}">要</button><button type="button" data-v="off" aria-pressed="${!mix}">不要</button></div>`;
}
function deleteCustom(id){
  state.custom = state.custom.filter(c => c.w.toLowerCase() !== id);
  delete state.prog[id];
  ui.open = null; ui.delArm = null;
  rebuild(); sanitizeToday(); save(); renderAll();
}
function addCustom(){
  const f = $("#addForm"), get = n => f.querySelector(`[name="${n}"]`).value.trim();
  const w = get("w").replace(/\s+/g, " "), zh = get("zh"), pos = get("pos"), ex = braceEx(get("ex"), get("w").replace(/\s+/g, " ")), exzh = ex ? get("exzh") : "";
  const msg = $("#addMsg");
  const fail = t => { msg.textContent = t; msg.className = "form-msg err"; };
  if (!w || !zh) return fail("英文單字和中文意思都要填。");
  if (!/^[A-Za-z][A-Za-z '\-]*$/.test(w)) return fail("英文單字只能用英文字母、空格、連字號或撇號。");
  if (mineEntry(w.toLowerCase())) return fail(`我的單字裡已經有 ${w} 了。`);
  if (state.custom.length >= MINE_MAX) return fail(`我的單字最多 ${MINE_MAX} 個。`);
  state.custom.push({ w, zh, pos, ex, exzh });
  rebuild(); save(); renderLib();
  f.querySelectorAll("input").forEach(i => { i.value = ""; });
  msg.textContent = `已加入 ${w}。`; msg.className = "form-msg ok";
  f.querySelector('[name="w"]').focus();
}

/* ---------- iPhone 加入主畫面 ---------- */
function isIOS(){ return /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); }
function isAndroid(){ return /Android/i.test(navigator.userAgent); }
function isStandalone(){ return !!window.navigator.standalone || matchMedia("(display-mode: standalone)").matches; }
function needA2HS(){ return (isIOS() || isAndroid()) && !isStandalone(); }
function a2hsCard(){
  const how = isIOS()
    ? `用 Safari 打開 → 點下方的分享按鈕 → 選「加入主畫面」→ 之後都從桌面的圖示打開。`
    : `用 Chrome 打開 → 點右上角「⋮」→「加到主畫面」或「安裝應用程式」→ 之後都從桌面的圖示打開。`;
  const why = isIOS()
    ? `這樣進度比較不會被 iPhone 自動清掉。注意：主畫面版和 Safari 裡的進度是分開存的，最好一開始就從主畫面版開始用。`
    : `開起來像 App，也不會跟其他分頁混在一起。`;
  return `<div class="plan-note a2hs"><p><b>先把網站加到主畫面</b></p><p>${how}</p>
    <p class="hint">${why}詳細步驟在「設定 → 怎麼保存進度」。</p>
    <div class="actions"><button class="btn small" type="button" data-a2hs-hide>知道了</button></div></div>`;
}

/* ---------- records ---------- */
function pct(r, n){ return n ? Math.round(r / n * 100) : 0; }
function renderLog(){
  const v = $("#view-log"), L = state.log, t = dayNum();
  const learned = WORDS.filter(w => status(w.id) > 0).length, master = WORDS.filter(w => status(w.id) === 2).length;
  const totN = L.reduce((a, e) => a + e.n, 0), totR = L.reduce((a, e) => a + e.r, 0);
  const live = (state.lastDay === t || state.lastDay === t - 1) ? state.streak : 0;
  const days = []; for (let i = 13; i >= 0; i--){ const k = dayKey(t - i); const es = L.filter(e => e.d === k); days.push({ k, n:es.reduce((a, e) => a + e.n, 0), r:es.reduce((a, e) => a + e.r, 0), s:es.reduce((a, e) => a + e.s, 0) }); }
  const maxN = Math.max(10, ...days.map(d => d.n));
  const d14 = days.reduce((a, d) => [a[0] + d.n, a[1] + d.r, a[2] + d.s], [0, 0, 0]);
  const bars = days.map((d, i) => `<li title="${d.k}"><span class="col"><span class="colfill" style="height:${d.n / maxN * 100}%"></span></span><span class="cl">${i === 13 ? "今" : +d.k.slice(8)}</span></li>`).join("");
  const PL = packLevels(), groups = PL.length > 10 ? Array.from({ length:Math.ceil(PL.length / 6) }, (_, i) => PL.slice(i * 6, i * 6 + 6)) : PL.map(x => [x]);
  const lvRows = groups.map(g => { const all = WORDS.filter(w => g.includes(w.lv)), l = all.filter(w => status(w.id) > 0).length, m = all.filter(w => status(w.id) === 2).length;
    const label = g.length > 1 ? `${lvName(g[0])}–${String(g[g.length - 1]).padStart(2, "0")}` : lvName(g[0]);
    return `<li><span>${esc(label)}</span><span class="track"><span class="fill two" style="width:${pct(m, all.length)}%"></span><span class="fill one" style="width:${pct(l - m, all.length)}%"></span></span><span class="num">${l}／${all.length}</span></li>`; }).join("");
  const ty = {}; L.forEach(e => { if (e.ty) Object.entries(e.ty).forEach(([k, a]) => { const x = ty[k] || (ty[k] = [0, 0]); x[0] += a[0]; x[1] += a[1]; }); });
  const tyRows = Object.keys(TYPE_NAME).filter(k => ty[k]).map(k => `<li class="${pct(ty[k][0], ty[k][1]) < 60 ? "low" : ""}"><span>${TYPE_NAME[k]}</span><span class="track"><span class="fill" style="width:${pct(ty[k][0], ty[k][1])}%"></span></span><span class="num">${pct(ty[k][0], ty[k][1])}%</span></li>`).join("");
  const weak = WORDS.filter(w => { const p = state.prog[w.id]; return p && p[2] > p[3]; })
    .sort((a, b) => { const pa = state.prog[a.id], pb = state.prog[b.id]; return (pb[2] - pb[3]) - (pa[2] - pa[3]); }).slice(0, 8);
  const recent = L.slice(-12).reverse().map(e => { const dt = new Date(e.t);
    return `<li><span class="rd">${dt.getMonth() + 1}/${dt.getDate()} ${String(dt.getHours()).padStart(2, "0")}:${String(dt.getMinutes()).padStart(2, "0")}</span><span class="rm">${MODE_NAME[e.m] || e.m}</span><span class="rs">${e.r}／${e.n}</span><span class="rt">${e.s >= 60 ? Math.round(e.s / 60) + " 分" : e.s + " 秒"}</span></li>`; }).join("");
  v.innerHTML = `<h2>紀錄</h2>${isGsat() ? "" : `<p class="hint">目前字庫：${esc(curPack().name)}。各級進度只算這個字庫；每日答題數是全部加總。</p>`}
    <dl class="tiles"><div><dt>學過的字</dt><dd>${learned}</dd></div><div><dt>熟記</dt><dd>${master}</dd></div><div><dt>連續天數</dt><dd>${live}<small>／最長 ${state.best || 0}</small></dd></div><div><dt>總正確率</dt><dd>${pct(totR, totN)}<small>%</small></dd></div></dl>
    <h3 class="sub">最近 14 天</h3>
    <p class="hint">共答 ${d14[0]} 題，正確率 ${pct(d14[1], d14[0])}%，練了 ${Math.round(d14[2] / 60)} 分鐘。</p>
    <ol class="cols" aria-label="每天答題數">${bars}</ol>
    <h3 class="sub">各級進度</h3>
    <ul class="lvbars prog${PL.length > 10 ? " wide" : ""}">${lvRows}</ul>
    <p class="hint"><i class="dot s2"></i> 熟記　<i class="dot s1"></i> 學習中</p>
    ${tyRows ? `<h3 class="sub">克漏字題型正確率</h3><ul class="lvbars">${tyRows}</ul>` : ""}
    ${weak.length ? `<h3 class="sub">最常錯的字</h3><ul class="weak">${weak.map(w => { const p = state.prog[w.id]; return `<li><b lang="en">${esc(w.k)}</b><span>${esc(shortZh(w))}</span><span class="num">錯 ${p[2] - p[3]} 次</span></li>`; }).join("")}</ul>` : ""}
    <h3 class="sub">最近紀錄</h3>
    ${recent ? `<ul class="recent">${recent}</ul>` : `<p class="hint">做完一次功課或練習，這裡就會有紀錄。</p>`}`;
}

/* ---------- account sync (optional, Supabase: UID + password) ---------- */
const ACCT_KEY = "gsat-jinbang-acct";
let SB = null, cloudTimer = null, cloudState = "off", cloudBusy = false, cloudAgain = false;
function loadAcct(){ try { const a = JSON.parse(localStorage.getItem(ACCT_KEY) || "null"); return a && a.uid && a.pass ? a : null; } catch (e) { return null; } }
function saveAcct(a){ try { if (a) localStorage.setItem(ACCT_KEY, JSON.stringify(a)); else localStorage.removeItem(ACCT_KEY); } catch (e) {} }
let acct = loadAcct();
function syncNote(t){ cloudState = t; if ($("#syncNote") && !document.querySelector("#syncNote input:focus")) renderSync(); }
function setSyncMsg(t){ const el = $("#syncMsg"); if (el) el.textContent = t; }
async function rpc(fn, args){
  const r = await fetch(`${SB.url.replace(/\/+$/, "")}/rest/v1/rpc/${fn}`, {
    method:"POST", headers:Object.assign({ "Content-Type":"application/json", apikey:SB.anonKey }, /^eyJ/.test(SB.anonKey) ? { Authorization:`Bearer ${SB.anonKey}` } : {}), body:JSON.stringify(args) });
  if (!r.ok) throw new Error("http " + r.status);
  return r.json();
}
const ERR = { bad_login:"UID 或密碼不對。", locked:"密碼錯太多次，這個帳號先鎖 15 分鐘，等一下再試。", short:"密碼至少要 6 個字。", big:"進度太大，雲端存不下，請改用備份檔。" };
function cloudData(){ const s = Object.assign({}, state); delete s.sync; return s; }
/* merge two progress records: per word keep the one answered more times */
function mergeState(a, b){
  a = normalize(a); b = normalize(b);
  const nw = (b.updatedAt || 0) > (a.updatedAt || 0) ? b : a, od = nw === a ? b : a;
  const out = JSON.parse(JSON.stringify(nw));
  for (const [id, p] of Object.entries(od.prog)){
    const q = out.prog[id];
    if (!q || (p[2] || 0) > (q[2] || 0) || ((p[2] || 0) === (q[2] || 0) && (p[1] || 0) > (q[1] || 0))) out.prog[id] = p;
  }
  out.xp = Math.max(a.xp || 0, b.xp || 0);
  out.best = Math.max(a.best || 0, b.best || 0);
  if ((od.lastDay || 0) > (out.lastDay || 0)){ out.lastDay = od.lastDay; out.streak = od.streak; }
  for (const [k, v] of Object.entries(od.history)) out.history[k] = Math.max(out.history[k] || 0, v || 0);
  const lg = new Map(); [...od.log, ...out.log].forEach(e => { if (e && e.t) lg.set(e.t + ":" + e.m, e); });
  out.log = [...lg.values()].sort((x, y) => x.t - y.t).slice(-600);
  const cw = new Set(out.custom.map(c => String(c.w || "").toLowerCase()));
  od.custom.forEach(c => { const k = String(c.w || "").toLowerCase(); if (k && !cw.has(k)){ cw.add(k); out.custom.push(c); } });
  out.unlocks = Object.assign({}, od.unlocks, nw.unlocks);
  out.packStart = Object.assign({}, od.packStart, nw.packStart);
  out.exams = Object.assign({}, od.exams || {}, nw.exams || {});
  ["seen", "pseen", "fseen"].forEach(k => { out.drills[k] = [...new Set([...(od.drills[k] || []), ...(out.drills[k] || [])])]; });
  if (!out.notes && od.notes) out.notes = od.notes;
  if (!out.hs && od.hs) out.hs = od.hs;
  if (!out.placement && od.placement) out.placement = od.placement;
  out.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0);
  return out;
}
async function adoptMerged(remote){
  const sync = state.sync;
  state = normalize(remote ? mergeState(state, remote) : state); state.sync = sync;
  rebuild(); migrateRanks(); ensureToday(); sanitizeToday(); cur = null;
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
  await loadUnlocked(); rebuild();
  applyTheme(); applySkin(); renderAll();
}
async function cloudInit(){
  if (!SB || !acct) { syncNote("off"); return; }
  syncNote("busy");
  try {
    const r = await rpc("vs_load", { p_uid:acct.uid, p_pass:acct.pass });
    if (!r.ok){ syncNote(r.err === "bad_login" ? "badpass" : "fail"); return; }
    if ((r.updated_at || 0) > (acct.base || 0) && r.data) await adoptMerged(r.data);
    acct.base = r.updated_at || 0; saveAcct(acct);
    syncNote("on"); cloudPush(true);
  } catch (e) { syncNote("fail"); }
}
function cloudSave(){ cloudPush(false); }
function cloudPush(now){
  if (!SB || !acct || cloudState === "badpass") return;
  clearTimeout(cloudTimer);
  cloudTimer = setTimeout(doPush, now ? 0 : 2500);
}
async function doPush(retry){
  if (cloudBusy){ cloudAgain = true; return; }
  cloudBusy = true;
  try {
    const r = await rpc("vs_save", { p_uid:acct.uid, p_pass:acct.pass, p_data:cloudData(), p_updated:state.updatedAt || Date.now(), p_base:acct.base || 0 });
    if (r.ok){ acct.base = r.updated_at; saveAcct(acct); syncNote("on"); }
    else if (r.err === "stale" && !retry){
      await adoptMerged(r.data); acct.base = r.updated_at; saveAcct(acct);
      state.updatedAt = Date.now(); try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
      cloudBusy = false; return doPush(true);
    }
    else syncNote(r.err === "bad_login" ? "badpass" : r.err === "big" ? "big" : "fail");
  } catch (e) { syncNote("fail"); }
  cloudBusy = false;
  if (cloudAgain){ cloudAgain = false; cloudPush(true); }
}
async function acctCreate(){
  const p1 = $("#acctPass").value, p2 = $("#acctPass2").value;
  if (p1.length < 6) return setSyncMsg(ERR.short);
  if (p1 !== p2) return setSyncMsg("兩次輸入的密碼不一樣。");
  setSyncMsg("建立中……");
  try {
    state.updatedAt = state.updatedAt || Date.now();
    const r = await rpc("vs_register", { p_pass:p1, p_data:cloudData(), p_updated:state.updatedAt });
    if (!r.ok) return setSyncMsg(ERR[r.err] || "建立失敗，等一下再試。");
    acct = { uid:r.uid, pass:p1, base:r.updated_at }; saveAcct(acct);
    syncNote("on"); setSyncMsg(`建立好了！你的 UID 是 ${r.uid}，請抄下來。`);
  } catch (e) { setSyncMsg("連不上雲端，等一下再試。"); }
}
async function acctLogin(){
  const uid = $("#acctUid").value.trim().toUpperCase().replace(/[^A-Z0-9]/g, ""), pass = $("#acctLoginPass").value;
  if (!uid || !pass) return setSyncMsg("UID 和密碼都要填。");
  setSyncMsg("登入中……");
  try {
    const r = await rpc("vs_load", { p_uid:uid, p_pass:pass });
    if (!r.ok) return setSyncMsg(ERR[r.err] || "登入失敗，等一下再試。");
    acct = { uid, pass, base:r.updated_at || 0 }; saveAcct(acct);
    await adoptMerged(r.data || null);
    save(); cloudPush(true); syncNote("on");
    setSyncMsg(`登入了。這台的進度已經和雲端合併：${Object.keys(state.prog).length} 個字、${state.xp} 分。`);
  } catch (e) { setSyncMsg("連不上雲端，等一下再試。"); }
}
async function acctPasswd(){
  const o = $("#acctOld").value, n = $("#acctNew").value;
  if (n.length < 6) return setSyncMsg(ERR.short);
  try {
    const r = await rpc("vs_passwd", { p_uid:acct.uid, p_old:o, p_new:n });
    if (!r.ok) return setSyncMsg(ERR[r.err] || "改密碼失敗。");
    acct.pass = n; saveAcct(acct); syncNote("on"); setSyncMsg("密碼改好了。其他裝置要用新密碼重新登入。");
  } catch (e) { setSyncMsg("連不上雲端，等一下再試。"); }
}
function acctLogout(){ acct = null; saveAcct(null); clearTimeout(cloudTimer); syncNote("off"); setSyncMsg("已登出。這台的進度還在，只是不再同步。"); }
function renderSync(){
  const el = $("#syncNote"); if (!el) return;
  if (!SB){ el.innerHTML = `<p class="hint">這個網站還沒開帳號同步，進度只存在這支手機。可以用下方的備份檔搬家。</p>`; return; }
  const msg = $("#syncMsg") ? $("#syncMsg").textContent : "";
  if (!acct){
    el.innerHTML = `<p class="hint">登入後，進度會自動存到雲端。換手機或和別的裝置共用時，輸入同一組 UID 和密碼就能接著背。不登入也能用，進度只存在這支手機。</p>
      <details class="acct"><summary>建立新帳號</summary>
        <label>自訂密碼（至少 6 個字）<input id="acctPass" class="field" type="password" autocomplete="new-password"></label>
        <label>再輸入一次<input id="acctPass2" class="field" type="password" autocomplete="new-password"></label>
        <p class="actions row"><button class="btn small primary" type="button" id="acctCreate">建立並上傳這台的進度</button></p>
      </details>
      <details class="acct"><summary>用已有的 UID 登入</summary>
        <label>UID<input id="acctUid" class="field" lang="en" autocomplete="username" autocapitalize="characters" spellcheck="false" placeholder="例如 K7QM2XPA"></label>
        <label>密碼<input id="acctLoginPass" class="field" type="password" autocomplete="current-password"></label>
        <p class="actions row"><button class="btn small primary" type="button" id="acctLogin">登入</button></p>
        <p class="hint">這台已經背過的進度會和雲端合併，不會被蓋掉。</p>
      </details>
      <p class="hint" id="syncMsg" aria-live="polite">${esc(msg)}</p>`;
    return;
  }
  const st = { on:"已同步。每次作答都會自動存到雲端。", busy:"同步中……", fail:"連不上雲端，進度先存在手機裡，連上後會再同步。", big:ERR.big, badpass:"密碼不對了（可能在別台改過密碼），請登出後用新密碼重新登入。", off:"" }[cloudState] || "";
  el.innerHTML = `<p class="code"><span>你的 UID</span><b lang="en">${esc(acct.uid)}</b><button class="btn small" type="button" id="copyUid">複製</button></p>
    <p class="hint">${st}</p>
    <p class="hint">在別支手機或電腦輸入這組 UID 和密碼，就能共用同一份進度。UID 和密碼等於鑰匙，只給要共用的人。</p>
    <p class="actions row"><button class="btn small" type="button" id="acctSyncNow">立刻同步</button><button class="btn small" type="button" id="acctLogout">登出</button></p>
    <details class="acct"><summary>改密碼</summary>
      <label>舊密碼<input id="acctOld" class="field" type="password" autocomplete="current-password"></label>
      <label>新密碼（至少 6 個字）<input id="acctNew" class="field" type="password" autocomplete="new-password"></label>
      <p class="actions row"><button class="btn small" type="button" id="acctPasswd">改密碼</button></p>
    </details>
    <p class="hint" id="syncMsg" aria-live="polite">${esc(msg)}</p>`;
}

/* ---------- settings ---------- */
let resetArmed = false, resetTimer = null, delTimer = null;
function setPressed(sel, v){ document.querySelectorAll(sel + " button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.v === v))); }
function renderSet(){
  const s = state.settings;
  const unlocked = PACKS.filter(p => PACK_WORDS[p.id] && (p.id !== "mine" || state.custom.length));
  $("#packGroup").hidden = false;
  const hsU = !!(state.hs && state.hs.ok);
  $("#sPack").innerHTML = unlocked.map(p => `<button type="button" data-v="${esc(p.id)}" aria-pressed="${!hsOn() && p.id === curPackId()}">${esc(p.name)}</button>`).join("") + (hsU ? `<button type="button" data-v="hs" aria-pressed="${hsOn()}">同等學力</button>` : "");
  $("#sPack").hidden = unlocked.length + (hsU ? 1 : 0) < 2;
  $("#startGroup").hidden = !isGsat();
  { const ex = examOf(), on = document.activeElement && document.activeElement.closest && document.activeElement.closest("#examGroup");
    $("#examFor").textContent = `「${curPack().name}」字庫的考試，會顯示在最上面的倒數，每天新字數的建議也照這天算。每個字庫可以設不同的考試。`;
    if (!on){ $("#examName").value = ex ? ex.name : ""; $("#examDate").value = ex ? ex.date : ""; } }
  const ps = $("#packStart"), PLs = packLevels();
  ps.hidden = isGsat() || PLs.length < 2;
  if (!ps.hidden) ps.innerHTML = `<label>從哪裡開始抽新字 <select id="packStartSel" class="field sel">${PLs.map(lv => `<option value="${lv}"${lv === startLv() ? " selected" : ""}>${esc(lvName(lv))}</option>`).join("")}</select></label><p class="hint">照順序往後抽；前面還沒學的字，會等後面都抽完才回頭。</p>`;
  setPressed("#sStart", String(s.startLv));
  setPressed("#sDaily", String(s.daily));
  setPressed("#sSay", s.autoSay ? "on" : "off");
  setPressed("#sTheme", s.theme);
  const pl = state.placement;
  $("#startHint").textContent = (pl && pl.scores ? `程度測驗建議第 ${pl.rec} 級。` : "") + `新字會先從第 ${s.startLv} 級抽，抽完再往上一級；比它低的級數最後才抽。`;
  { const R = isGsat() ? remainingFrom(s.startLv) : remainingFrom(1), d = daysLeft(), hasEx = !!examOf() && d > 0;
    $("#dailyHint").textContent = (!isGsat() ? `「${curPack().name}」還有 ${R} 個沒學過的字` + (hasEx ? `，離${exName()} ${d} 天，要背完每天大約 ${Math.ceil(R / Math.max(1, d - 3))} 個。` : "。")
      : `從第 ${s.startLv} 級開始還有 ${R} 個沒學過的字` + (hasEx ? `，離${exName()} ${d} 天。` + paceText(s.daily, s.startLv) : "。")) + " 今天還沒按開始的話立刻生效，否則從明天起。"; }
  const cs = CHARS.characters || [];
  const curC = charObj();
  $("#charGroup").hidden = cs.length < 2;
  $("#sChar").innerHTML = cs.map(c => `<button type="button" data-v="${esc(c.id)}" aria-pressed="${!!curC && c.id === curC.id}">${esc(c.name || c.id)}</button>`).join("");
  $("#sSay").hidden = !canSay;
  $("#sayHint").textContent = canSay ? "" : "這個瀏覽器不支援發音。";
  $("#resetBtn").textContent = resetArmed ? "再按一次確認重設" : "重設進度";
  renderSync(); $("#lastBackup").textContent = lastBackupText();
  if (!renderSet.opened){ renderSet.opened = true; const g = isAndroid() ? $("#guideAndroid") : isIOS() ? $("#guideIOS") : null; if (g) g.open = true; }
}
function exportBackup(){
  try {
    const blob = new Blob([JSON.stringify(state)], { type:"application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `學測金榜備份-${dayKey(dayNum())}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    markBackup(); $("#backupNote").textContent = "已下載備份檔。";
  } catch (e) { $("#backupNote").textContent = "這個瀏覽器沒辦法下載檔案。"; }
}
/* 備份文字：GSATJB1: + gzip + base64；不支援壓縮時用 GSATJB0: + base64 */
function b64FromBytes(u8){ let s = ""; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); }
function bytesFromB64(b){ const s = atob(b); const u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; }
async function makeBackupText(){
  const raw = new TextEncoder().encode(JSON.stringify(state));
  if (typeof CompressionStream !== "undefined"){
    const gz = new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream("gzip"))).arrayBuffer());
    return "GSATJB1:" + b64FromBytes(gz);
  }
  return "GSATJB0:" + b64FromBytes(raw);
}
async function readBackupText(t){
  t = String(t || "").trim().replace(/\s+/g, "");
  if (t.startsWith("{")) return JSON.parse(t);
  const m = t.match(/^GSATJB([01]):(.+)$/); if (!m) throw new Error("bad");
  let bytes = bytesFromB64(m[2]);
  if (m[1] === "1"){
    if (typeof DecompressionStream === "undefined") throw new Error("nogz");
    bytes = new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer());
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}
function adoptBackup(data){
  if (!data || typeof data !== "object" || !data.prog) throw new Error("bad");
  const keepSync = state.sync;
  state = normalize(data); if (!state.sync || !state.sync.code) state.sync = keepSync;
  rebuild(); migrateRanks(); ensureToday(); sanitizeToday(); cur = null; save(); applyTheme(); applySkin(); renderAll();
  $("#backupNote").textContent = `還原完成：${Object.keys(state.prog).length} 個字的進度、${state.xp} 分。`;
}
async function copyBackup(fromToday){
  const note = $("#backupNote");
  const say = t => { note.textContent = t; if (fromToday){ ui.bkMsg = t; renderToday(); } };
  try {
    const t = await makeBackupText();
    try { await navigator.clipboard.writeText(t); markBackup(); say(`已複製備份文字（${Math.ceil(t.length / 1024)} KB）。貼到 LINE Keep 或備忘錄存起來。`); }
    catch (e) {
      if (fromToday){ ui.bkMsg = ""; showTab("set"); }
      const ta = $("#restoreText"); ta.value = t; ta.closest("details").open = true; ta.select(); markBackup(); note.textContent = "這個瀏覽器不能自動複製，備份文字已經放在下方的框裡，請長按全選後複製。";
    }
  } catch (e) { say("產生備份文字失敗，請到「設定」改用下載備份檔。"); }
}
function markBackup(){ state.backupAt = Date.now(); state.backupSnooze = null; save(); const el = $("#lastBackup"); if (el) el.textContent = lastBackupText(); }
function lastBackupText(){
  if (!state.backupAt) return "還沒備份過。之後每 7 天會在「今日」提醒一次。";
  const d = new Date(state.backupAt), n = Math.floor((Date.now() - state.backupAt) / 86400000);
  return `上次備份：${d.getMonth() + 1}/${d.getDate()}（${n ? n + " 天前" : "今天"}）。每 7 天會在「今日」提醒一次。`;
}
function backupDue(){
  if (cloudState === "on" && acct) return 0;
  if (Object.keys(state.prog).length < 10) return 0;
  if (state.backupSnooze === dayNum()) return 0;
  if (!state.backupAt) return -1;
  const n = Math.floor((Date.now() - state.backupAt) / 86400000);
  return n >= 7 ? n : 0;
}
function backupCard(){
  if (ui.bkMsg) return `<div class="remind" role="status"><p>${esc(ui.bkMsg)}</p></div>`;
  const n = backupDue(); if (!n) return "";
  return `<div class="remind"><p><b>${n < 0 ? "還沒備份過進度" : `已經 ${n} 天沒備份了`}</b>　換手機或清除瀏覽器資料時，沒備份的進度會不見。複製一段備份文字貼到 LINE Keep 就好。</p>
    <div class="actions row"><button class="btn small primary" type="button" data-bk="copy">複製備份文字</button><button class="btn small" type="button" data-bk="later">今天先不要</button></div></div>`;
}
async function restoreFromText(){
  const note = $("#backupNote");
  try { adoptBackup(await readBackupText($("#restoreText").value)); $("#restoreText").value = ""; }
  catch (e) { note.textContent = String(e && e.message) === "nogz" ? "這支手機的瀏覽器太舊，讀不了這份備份，請更新系統或改用備份檔。" : "這段文字讀不出來，請確認是從這裡複製的完整備份文字。"; }
}
function importBackup(file){
  const r = new FileReader();
  r.onload = () => {
    try {
      readBackupText(r.result).then(adoptBackup).catch(() => { $("#backupNote").textContent = "這個檔案讀不出來，請確認是從這裡下載的備份檔。"; });
    } catch (e) { $("#backupNote").textContent = "這個檔案讀不出來，請確認是從這裡下載的備份檔。"; }
  };
  r.readAsText(file);
}


/* ---------- 同等學力（兌換碼解鎖） ---------- */
const HS_HASH = "7bf275b84f0bd4ba721067c37c9f6f575137d8425bfda500f1185fa61edb4eb2";
const HS_FILES = ["hs/115.json", "hs/114.json", "hs/113.json"];
const HS_LETTERS = "ABCD";
let HS = null, hsv = { page:"home", sub:null, run:null };
const hsOn = () => !!(state.hs && state.hs.ok && state.hs.on);
function hsState(){
  if (!state.hs || typeof state.hs !== "object") state.hs = {};
  const h = state.hs;
  if (!h.ans || typeof h.ans !== "object") h.ans = {};
  if (!Array.isArray(h.wrong)) h.wrong = [];
  if (!h.essay || typeof h.essay !== "object") h.essay = {};
  if (!Array.isArray(h.runs)) h.runs = [];
  return h;
}
async function sha256Hex(s){
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
}
async function hsLoad(){
  if (HS) return HS;
  const exams = [];
  for (const f of HS_FILES){ try { exams.push(await getJSON(f)); } catch (e) {} }
  const subs = {};
  exams.forEach(ex => ex.subjects.forEach(s => {
    const o = subs[s.id] || (subs[s.id] = { id:s.id, name:s.name, qs:[], papers:[] });
    o.papers.push({ year:ex.year, title:ex.title, mins:s.mins, secs:s.secs, ids:s.qs.map(q => q.id) });
    s.qs.forEach(q => { q.year = ex.year; q.secName = (s.secs[q.sec] || {}).name || ""; q.pts = (s.secs[q.sec] || {}).pts || 0; q.subName = s.name; o.qs.push(q); });
  }));
  const order = ["chi", "eng", "math", "nat", "soc"];
  HS = { subs:order.filter(k => subs[k]).map(k => subs[k]), byId:new Map() };
  HS.subs.forEach(s => s.qs.forEach(q => HS.byId.set(q.id, q)));
  return HS;
}
function applyHsMode(){
  document.body.classList.toggle("hs", hsOn());
  if (hsOn()){ if ($("#view-hs").hidden && $("#view-set").hidden) showTab("hs"); }
  else if (!$("#view-hs").hidden) showTab("today");
}
function enterHs(){ hsState().ok = true; state.hs.on = true; save(); applyHsMode(); showTab("hs"); }
function leaveHs(){ if (state.hs) state.hs.on = false; save(); applyHsMode(); }
function hsLines(mood){
  const c = charObj(), base = (c && c.lines && c.lines[mood]) || [];
  const L = base.filter(s => !/字|單字|稱號|背|英文|多益|托福|學測/.test(s));
  const D = { idle:["一題一題來，不用急。"], happy:["答對了，很好。"], sad:["錯了沒關係，記下來就好。"], done:["這一回做完了，辛苦了。"], rankup:["做得很好。"] };
  return L.length ? L : (D[mood] || D.idle);
}
function hsStat(qs){
  const A = hsState().ans; let done = 0, right = 0;
  qs.forEach(q => { const a = A[q.id]; if (a){ done++; if (a[2]) right++; } });
  return { done, right, n:qs.length };
}
function hsGradable(q){ return q.t === "mc" || q.t === "fill"; }
function hsNorm(s){
  return String(s || "").normalize("NFKC").toLowerCase().replace(/\s+/g, "").replace(/[−–—－]/g, "-")
    .replace(/根號|sqrt/g, "√").replace(/[()（）]/g, "").replace(/^\+/, "");
}
function hsCheck(q, v){ if (q.t === "mc") return v === q.a; const n = hsNorm(v); return !!n && q.acc.some(a => hsNorm(a) === n); }

function hsStart(kind){
  const s = HS.subs.find(x => x.id === hsv.sub); if (!s) return;
  let ids = [];
  let year = null;
  if (/^paper/.test(kind)){ const p = s.papers.find(x => "paper-" + x.year === kind) || s.papers[0]; year = p.year; ids = p.ids.filter(id => hsGradable(HS.byId.get(id))); kind = "paper"; }
  else if (kind === "rand") ids = shuffle(s.qs.filter(hsGradable).map(q => q.id)).slice(0, 10);
  else if (kind === "wrong") ids = shuffle(hsState().wrong.filter(id => HS.byId.has(id) && HS.byId.get(id).subName === s.name));
  if (!ids.length) return;
  hsv.run = { kind, year, ids, pos:0, picks:{}, t0:Date.now() };
  hsv.page = "q";
  setMood("idle", "hs-" + kind + "-" + Date.now());
  renderHs(); window.scrollTo(0, 0);
}
function hsAnswer(v){
  const R = hsv.run, id = R.ids[R.pos], q = HS.byId.get(id);
  if (!q || R.picks[id] !== undefined) return;
  R.picks[id] = v;
  const ok = hsCheck(q, v), h = hsState(), a = h.ans[id] || [0, 0, 0];
  a[0]++; if (ok) a[1]++; a[2] = ok ? 1 : 0; h.ans[id] = a;
  const wi = h.wrong.indexOf(id);
  if (ok && wi >= 0 && R.kind === "wrong") h.wrong.splice(wi, 1);
  if (!ok && wi < 0) h.wrong.push(id);
  setMood(ok ? "happy" : "sad", "hsa-" + id + "-" + Date.now());
  save(); renderHs();
  if (kbd){ const nb = $('[data-hs="next"]'); if (nb) nb.focus({ preventScroll:true }); }
}
function hsNext(){
  const R = hsv.run; R.pos++;
  if (R.pos >= R.ids.length){
    hsv.page = "result";
    const right = R.ids.filter(id => hsCheck(HS.byId.get(id), R.picks[id])).length;
    const h = hsState(); h.runs.push({ t:Date.now(), sub:hsv.sub, k:R.kind, n:R.ids.length, r:right }); if (h.runs.length > 200) h.runs.splice(0, h.runs.length - 200);
    setMood(right / R.ids.length >= 0.6 ? "done" : "sad", "hsdone-" + Date.now());
    save();
  } else setMood("idle", "hsq-" + R.ids[R.pos]);
  renderHs(); window.scrollTo(0, 0);
}
function hsBuddy(anim){
  const keep = ui.line;
  if (!ui.hsLineKey || ui.hsLineKey !== ui.lineKey){ ui.hsLine = pick(hsLines(ui.mood)); ui.hsLineKey = ui.lineKey; }
  ui.line = ui.hsLine; const h = buddyHtml(anim); ui.line = keep; return h;
}
function hsQHtml(q, answered){
  const img = q.img ? `<a class="qimgl" href="${esc(q.img)}" target="_blank" rel="noopener"><img class="qimg" src="${esc(q.img)}" alt="題目附圖（點一下放大）" loading="lazy"></a><p class="hint imgtip">圖看不清楚可以點一下放大。</p>` : "";
  return `<div class="hsq" ${q.subName === "英文" ? 'lang="en"' : ""}><p class="hsstem"><b class="qn">${q.n}.</b>${q.q}</p>${img}</div>`;
}
function renderHs(){
  const v = $("#view-hs");
  if (!state.hs || !state.hs.ok){ v.innerHTML = ""; return; }
  if (!HS){ v.innerHTML = `<p class="hint">正在載入考古題……</p>`; hsLoad().then(() => renderHs()); return; }
  const h = hsState();
  if (hsv.page === "home" || !hsv.sub){
    setMood("idle", "hs-home");
    const cards = HS.subs.map(s => { const st = hsStat(s.qs.filter(hsGradable)), w = h.wrong.filter(id => (HS.byId.get(id) || {}).subName === s.name).length;
      return `<li><button type="button" class="hssub" data-hs="sub" data-v="${s.id}"><b>${esc(s.name)}</b><span>${st.n} 題・做過 ${st.done}${st.done ? `・答對 ${Math.round(st.right / st.done * 100)}%` : ""}${w ? `・錯題 ${w}` : ""}</span></button></li>`; }).join("");
    v.innerHTML = hsBuddy("") + `<h2>同等學力・五科考古題</h2>
      <p class="hint">普通型高中學力鑑定：每科 100 分，60 分及格；也可以五科都達 50 分、平均 60 分通過。官方說歷屆試題約占 4 成，考古題多做幾次很划算。</p>
      <ul class="hssubs">${cards}</ul>
      <p class="hint">目前題庫：${HS.subs[0] ? esc(HS.subs[0].papers.map(p => p.year + " 年度").join("、")) : ""}自學進修普通型高級中等學校畢業程度學力鑑定考試（官方公開試題與答案）。</p>`;
    hookImgs(v); return;
  }
  const s = HS.subs.find(x => x.id === hsv.sub);
  if (hsv.page === "sub"){
    setMood("idle", "hs-sub-" + s.id);
    const gq = s.qs.filter(hsGradable), st = hsStat(gq), w = h.wrong.filter(id => (HS.byId.get(id) || {}).subName === s.name).length;
    const essays = s.qs.filter(q => q.t === "essay");
    const secs = s.papers[0].secs.map((sc, i) => { const qs = gq.filter(q => q.sec === i); if (!qs.length) return ""; const t = hsStat(qs); return `<li>${esc(sc.name)}：${qs.length} 題，每題 ${sc.pts} 分${t.done ? `，做過 ${t.done} 題、答對 ${t.right}` : ""}</li>`; }).join("");
    v.innerHTML = hsBuddy("") + `<p class="step"><button type="button" class="linkbtn" data-hs="home">← 五科</button></p><h2>${esc(s.name)}</h2>
      <ul class="hsinfo">${secs}</ul>
      <ul class="modes">
        ${s.papers.map(p => { const pq = p.ids.map(id => HS.byId.get(id)).filter(hsGradable), t = hsStat(pq);
          return `<li><button type="button" class="mode" data-hs="go" data-v="paper-${p.year}"><b>${p.year} 年度整份</b><span>照考卷順序做完 ${pq.length} 題，最後算分數。正式考試 ${p.mins} 分鐘。${t.done ? `已做過 ${t.done} 題。` : ""}</span></button></li>`; }).join("")}
        <li><button type="button" class="mode" data-hs="go" data-v="rand"><b>隨機 10 題</b><span>零碎時間用，題目打亂抽。</span></button></li>
        <li><button type="button" class="mode" data-hs="go" data-v="wrong"${w ? "" : " disabled"}><b>錯題重做</b><span>${w ? `目前有 ${w} 題答錯過，重做答對就會移出錯題本。` : "還沒有答錯的題目。"}</span></button></li>
        ${essays.map(e => `<li><button type="button" class="mode" data-hs="essay" data-v="${esc(e.id)}"><b>作文練習・${e.year} 年度</b><span>題目：${esc(e.q.split("<br>")[0].replace("題目：", ""))}。${(h.essay[e.id] || "").trim() ? "已經寫了一些，" : ""}寫的內容會存在這支手機。</span></button></li>`).join("")}
      </ul>`;
    hookImgs(v); return;
  }
  if (hsv.page === "essay"){
    const e = s.qs.find(q => q.t === "essay" && q.id === hsv.essay) || s.qs.find(q => q.t === "essay"), txt = h.essay[e.id] || "";
    v.innerHTML = `<p class="step"><button type="button" class="linkbtn" data-hs="back">← ${esc(s.name)}</button></p><h2>${e.year} 年度作文</h2>
      <article class="card"><p class="hsstem">${e.q}</p></article>
      <label class="vh" for="hsEssay">作文內容</label><textarea id="hsEssay" data-id="${esc(e.id)}" class="field essay" rows="14" placeholder="先列大綱再寫：開頭點題 → 一件具體經驗 → 你怎麼面對、想通了什麼 → 結尾呼應題目。">${esc(txt)}</textarea>
      <p class="hint" id="hsCount">${[...txt.replace(/\s/g, "")].length} 字・自動儲存</p>
      <p class="hint">練習時抓 50 分鐘左右寫完，大約 600～800 字。作文沒辦法自動改，寫完可以給老師或朋友看。</p>`;
    return;
  }
  const R = hsv.run;
  if (hsv.page === "result"){
    const qs = R.ids.map(id => HS.byId.get(id)), right = qs.filter(q => hsCheck(q, R.picks[q.id])).length;
    const pts = R.kind === "paper" ? qs.reduce((t, q) => t + (hsCheck(q, R.picks[q.id]) ? q.pts : 0), 0) : null;
    const full = R.kind === "paper" ? qs.reduce((t, q) => t + q.pts, 0) : 0;
    const mins = Math.max(1, Math.round((Date.now() - R.t0) / 60000));
    const wrongList = qs.filter(q => !hsCheck(q, R.picks[q.id])).map(q => `<li><b>${esc(q.secName)} 第 ${q.n} 題</b>：正確答案 ${q.t === "mc" ? `(${HS_LETTERS[q.a]})` : esc(q.show)}${R.picks[q.id] == null || R.picks[q.id] === "" ? "（沒作答）" : ""}</li>`).join("");
    v.innerHTML = hsBuddy(right / qs.length >= 0.6 ? "bounce" : "shake") + `<h2>${esc(s.name)}・${R.kind === "paper" && R.year ? R.year + " 年度・" : ""}結果</h2>
      <dl class="result"><div><dt>答對</dt><dd>${right}<small>／${qs.length}</small></dd></div>${pts != null ? `<div><dt>分數</dt><dd>${Math.round(pts * 10) / 10}<small>／${full}</small></dd></div>` : ""}<div><dt>用時</dt><dd>${mins}<small>分</small></dd></div></dl>
      ${R.cut ? `<p class="hint">中途結束，分數只算做完的 ${qs.length} 題。</p>` : pts != null && full < 100 ? `<p class="hint">作文 ${100 - full} 分沒有算在裡面。</p>` : ""}
      ${pts != null && !R.cut ? `<p class="hint">${pts >= 60 * full / 100 ? "已經達到及格線，繼續保持。" : "還沒到及格線（60 分），先把錯題重做一遍。"}</p>` : ""}
      ${wrongList ? `<h3 class="sub">答錯的題目</h3><ul class="hswrong">${wrongList}</ul>` : ""}
      <div class="actions row"><button class="btn primary" type="button" data-hs="go" data-v="${R.kind === "wrong" ? "wrong" : "rand"}">${R.kind === "wrong" ? "再練一次錯題" : "再抽 10 題"}</button><button class="btn" type="button" data-hs="back">回${esc(s.name)}</button></div>`;
    hookImgs(v); return;
  }
  const id = R.ids[R.pos], q = HS.byId.get(id), picked = R.picks[id], answered = picked !== undefined, ok = answered && hsCheck(q, picked);
  let body = "";
  if (q.t === "mc"){
    body = `<ul class="opts hsopts">${q.o.map((o, i) => { let cls = "opt" + (q.subName === "英文" ? " en" : ""); if (answered){ if (i === q.a) cls += " right"; else if (i === picked) cls += " wrong"; }
      return `<li><button type="button" class="${cls}" data-hs="pick" data-v="${i}"${answered ? " disabled" : ""}><span class="key">${HS_LETTERS[i]}</span><span>${o}</span></button></li>`; }).join("")}</ul>`;
  } else {
    body = answered ? "" : `<div class="spell"><label class="vh" for="hsIn">答案</label><input id="hsIn" class="field" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="text" placeholder="輸入答案">
      <button class="btn skip" type="button" data-hs="skip">跳過</button><button class="btn primary" type="button" data-hs="fill">確定</button></div>
      <div class="mkeys">${["√", "/", "-", "π", "x"].map(k => `<button type="button" class="btn small" data-hs="key" data-v="${k}">${k}</button>`).join("")}</div>
      <p class="hint">分數寫成 5/32，根號可以按 √ 或打「根號3」。</p>`;
  }
  const fb = answered ? `<p class="feedback ${ok ? "ok" : "no"}" aria-live="polite">${ok ? "答對了。" : `答錯了，正確答案是 ${q.t === "mc" ? `(${HS_LETTERS[q.a]})` : `<b>${esc(q.show)}</b>`}。`}${!ok && q.t === "fill" && picked ? `你寫的是「${esc(picked)}」。` : ""}</p>
    <div class="actions"><button class="btn primary" type="button" data-hs="next">${R.pos + 1 >= R.ids.length ? "看結果" : "下一題"}</button></div>` : "";
  v.innerHTML = hsBuddy(answered ? (ok ? "bounce" : "shake") : "") + `<p class="step"><span>${esc(s.name)}・${R.kind === "paper" ? q.year + " 年度・" : ""}${esc(q.secName)}</span>${R.pos + 1}／${R.ids.length}${R.kind !== "paper" ? `・${q.year} 年度第 ${q.n} 題` : ""}<button type="button" class="linkbtn" data-hs="quit">結束</button></p>
    <article class="card">${hsQHtml(q, answered)}</article>
    <div class="answered-bar">${fb}</div>${body}`;
  hookImgs(v);
  if (!answered && q.t === "fill" && kbd){ const i = $("#hsIn"); if (i) i.focus({ preventScroll:true }); }
}
function hsClick(b){
  const a = b.dataset.hs, val = b.dataset.v;
  if (a === "sub"){ hsv.sub = val; hsv.page = "sub"; renderHs(); window.scrollTo(0, 0); }
  else if (a === "home"){ hsv.page = "home"; hsv.sub = null; renderHs(); window.scrollTo(0, 0); }
  else if (a === "back"){ hsv.page = "sub"; hsv.run = null; renderHs(); window.scrollTo(0, 0); }
  else if (a === "go") hsStart(val);
  else if (a === "essay"){ hsv.page = "essay"; hsv.essay = val; renderHs(); window.scrollTo(0, 0); }
  else if (a === "pick") hsAnswer(+val);
  else if (a === "fill"){ const i = $("#hsIn"); hsAnswer(i ? i.value.trim() : ""); }
  else if (a === "skip") hsAnswer("");
  else if (a === "key"){ const i = $("#hsIn"); if (i){ const p = i.selectionStart == null ? i.value.length : i.selectionStart; i.value = i.value.slice(0, p) + val + i.value.slice(i.selectionEnd == null ? p : i.selectionEnd); i.focus(); i.setSelectionRange(p + val.length, p + val.length); } }
  else if (a === "next") hsNext();
  else if (a === "quit"){ const R = hsv.run; if (R && Object.keys(R.picks).length){ R.ids = R.ids.slice(0, R.pos + (R.picks[R.ids[R.pos]] !== undefined ? 1 : 0)); R.cut = true; if (R.ids.length){ R.pos = R.ids.length - 1; hsNext(); return; } } hsv.page = "sub"; hsv.run = null; renderHs(); }
}

/* ---------- 托福真題閱讀（兌換碼解鎖的私人題庫，資料在加密字庫的 tf 欄位） ---------- */
let TF = null, tfv = { page:"home", sec:null, item:null };
const TF_SEC = { ctw:{ name:"Complete the Words", zh:"補字題", tip:"依照上下文，把每個字缺少的字母補完。每篇 10 格。" },
  dl:{ name:"Read in Daily Life", zh:"日常閱讀", tip:"公告、廣告、課程介紹這類生活短文。" },
  ap:{ name:"Read an Academic Passage", zh:"學術閱讀", tip:"學術短文，含字義、推論、句子插入題。" } };
function tfPrep(data){
  TF = data; TF.byId = new Map();
  (TF.sets || []).forEach(s => (s.items || []).forEach(it => {
    it.set = s;
    if (it.type === "ctw"){ it.blanks = []; it.text.replace(/([A-Za-z]+)\{([A-Za-z]+)\}/g, (m, pre, rest) => { it.blanks.push({ pre, rest }); return m; }); }
    TF.byId.set(it.id, it);
  }));
  const all = (TF.sets || []).reduce((a, s) => a.concat(s.items || []), []);
  TF.allSet = { id:"all", short:"全部題庫", title:"全部題庫：所有套的題目照題型放在一起", items:all };
}
function tfState(){
  if (!state.tf || typeof state.tf !== "object") state.tf = {};
  const t = state.tf;
  if (!t.ans || typeof t.ans !== "object") t.ans = {};
  if (!t.ctw || typeof t.ctw !== "object") t.ctw = {};
  return t;
}
function tfSet(){ if (!TF || !TF.sets || !TF.sets.length) return null; const id = tfState().set || "all"; if (id === "all" && TF.sets.length > 1) return TF.allSet; return TF.sets.find(s => s.id === id) || TF.sets[TF.sets.length - 1]; }
function tfItems(sec, set){ const s = set || tfSet(); return s ? s.items.filter(it => !sec || it.sec === sec) : []; }
function tfAll(sec){ return TF && TF.sets ? TF.sets.reduce((a, s) => a.concat(tfItems(sec, s)), []) : []; }
function tfScore(it){
  const t = tfState();
  if (it.type === "ctw"){
    const c = t.ctw[it.id]; if (!c || !c.done) return null;
    return { r:it.blanks.filter((b, i) => tfOkWord(b, (c.v || [])[i])).length, n:it.blanks.length };
  }
  const done = it.qs.filter(q => t.ans[q.id] != null); if (done.length < it.qs.length) return done.length ? { part:done.length, n:it.qs.length } : null;
  return { r:it.qs.filter(q => t.ans[q.id] === q.a).length, n:it.qs.length };
}
function tfOkWord(b, v){ return String(v || "").trim().toLowerCase() === b.rest.toLowerCase(); }
function tfBadge(it){
  const s = tfScore(it);
  if (!s) return "還沒做";
  if (s.part != null) return `做到 ${s.part}／${s.n}`;
  return `答對 ${s.r}／${s.n}`;
}
function tfOpen(id){ const it = TF.byId.get(id); if (!it) return; tfv.page = "item"; tfv.item = id; tfv.sec = it.sec; renderTf(); window.scrollTo(0, 0); }
function tfNextId(it){ let L = tfItems(it.sec); if (!L.includes(it)) L = tfItems(it.sec, it.set); const i = L.indexOf(it); return L[i + 1] ? L[i + 1].id : null; }
function tfCtwHtml(it, done, vals){
  let i = 0;
  return it.text.replace(/([A-Za-z]+)\{([A-Za-z]+)\}/g, (m, pre, rest) => {
    const k = i++, v = vals[k] || "", n = rest.length;
    if (!done) return `<span class="ctw"><b>${esc(pre)}</b><input class="ctwin" data-i="${k}" value="${esc(v)}" maxlength="${n}" style="width:calc(${n}ch + .45em)" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="next" aria-label="第 ${k + 1} 格：${esc(pre)} 後面還有 ${n} 個字母"></span>`;
    const ok = tfOkWord({ rest }, v);
    return `<span class="ctw ${ok ? "ok" : "no"}"><b>${esc(pre)}</b><u>${esc(rest)}</u>${ok ? "" : `<s aria-label="你寫的">${v ? esc(v) : "空白"}</s>`}</span>`;
  });
}
function renderTf(){
  const v = $("#view-tf");
  if (!TF){ v.innerHTML = `<p class="lede">還沒解鎖托福真題。到「設定 → 字庫」輸入兌換碼。</p>`; return; }
  const t = tfState(), set = tfSet();
  if (tfv.page !== "mock") tfTimerStop();
  if (tfv.page === "mock"){ renderMock(); return; }
  if (tfv.page === "home"){
    setMood("idle", "tf-home");
    const secs = ["ctw", "dl", "ap"].map(sec => {
      const L = tfItems(sec); if (!L.length) return "";
      const rows = L.map(it => { const s = tfScore(it), cls = !s ? "" : s.part != null ? " part" : s.r === s.n ? " full" : " some";
        return `<li><button type="button" class="tfitem${cls}" data-tf="open" data-v="${esc(it.id)}"><span lang="en">${esc(it.title)}</span><small>${tfBadge(it)}</small></button></li>`; }).join("");
      const tot = L.reduce((a, it) => { const s = tfScore(it); if (s && s.part == null){ a.r += s.r; a.n += s.n; } return a; }, { r:0, n:0 });
      return `<h3 class="sub">${TF_SEC[sec].zh}・<span lang="en">${TF_SEC[sec].name}</span></h3><p class="hint">${TF_SEC[sec].tip}共 ${L.length} 篇${tot.n ? `，目前答對 ${tot.r}／${tot.n}` : ""}。</p><ul class="tflist">${rows}</ul>`;
    }).join("");
    const pk = PACKS.find(p => p.id === "toeflcn"), nW = (PACK_WORDS.toeflcn || []).length;
    v.innerHTML = buddyHtml("") + `<p class="step"><button type="button" class="linkbtn" data-tab-go="drill">← 練習</button></p>
      <h2>托福題庫・閱讀</h2>
      <div class="card tfmockcard"><p><b>模擬考</b>：照新制閱讀的結構，從題庫各題型抽題，分 Module 1、Module 2，考完才對答案。${t.mock && !t.mock.done ? "你有一份還沒交卷的模擬考。" : ""}</p>
        <div class="actions row"><button type="button" class="btn primary" data-tf="mock">${t.mock && !t.mock.done ? "繼續模擬考" : "開始模擬考"}</button>${(t.mocks || []).length ? `<small class="hint">已考 ${(t.mocks || []).length} 次</small>` : ""}</div></div>
      ${TF.sets.length > 1 ? `<div class="seg tfsets" role="group" aria-label="選擇哪一套">${[TF.allSet].concat(TF.sets).map(s => { const L = tfItems("", s), done = L.filter(it => { const x = tfScore(it); return x && x.part == null; }).length;
        return `<button type="button" data-tf="set" data-v="${esc(s.id)}" aria-pressed="${s === set}">${esc(s.short || s.title)}<small>${done}／${L.length} 篇</small></button>`; }).join("")}</div>` : ""}
      <p class="hint">${esc(set.title)}。${set.id === "all" ? "真題的答案依原檔的參考答案。" : /^practice/.test(set.id) ? "這套是原創練習題，題型和主題方向照真題設計。" : "答案依原檔的參考答案；原檔沒有附解析。"}</p>
      ${nW && pk ? `<div class="actions"><button type="button" class="btn" data-tf="words">${curPackId() === "toeflcn" ? "正在背" : "改背"}托福真題生字（${nW} 個${TF.sets.length > 1 ? "，各套合在一起" : ""}）</button></div>` : ""}
      ${secs}
      <p class="hint">這是私人題庫，只有輸入兌換碼的人看得到，請不要轉傳截圖或內容。</p>`;
    hookImgs(v); return;
  }
  const it = TF.byId.get(tfv.item); if (!it){ tfv.page = "home"; renderTf(); return; }
  const nx = tfNextId(it), back = `<p class="step"><button type="button" class="linkbtn" data-tf="home">← 托福真題</button></p>`;
  const head = `<p class="hint">${TF_SEC[it.sec].zh}${it.mod ? `・Module ${it.mod}` : ""}${it.task ? `・<span lang="en">${esc(it.task)}</span>` : ""}${TF.sets.length > 1 && it.set ? `・${esc(it.set.short || it.set.title)}` : ""}</p><h2 lang="en" class="tftitle">${esc(it.title)}</h2>${it.note ? `<p class="hint tfnote">${esc(it.note)}</p>` : ""}`;
  if (it.type === "ctw"){
    const c = t.ctw[it.id] || { v:[], done:false }, sc = tfScore(it);
    const wrong = c.done ? it.blanks.map((b, i) => tfOkWord(b, (c.v || [])[i]) ? "" : b.pre + b.rest).filter(Boolean) : [];
    v.innerHTML = (c.done ? buddyHtml(sc.r >= 8 ? "bounce" : "shake") : "") + back + head + `
      <article class="card tfp ctwp" lang="en">${tfCtwHtml(it, c.done, c.v || [])}</article>
      ${c.done ? `<p class="feedback ${sc.r === sc.n ? "ok" : "no"}">答對 ${sc.r}／${sc.n} 格。${wrong.length ? `要再記一下的字：<span lang="en">${wrong.map(esc).join("、")}</span>` : "全對！"}</p>
        <div class="actions row">${nx ? `<button class="btn primary" type="button" data-tf="open" data-v="${nx}">下一篇</button>` : `<button class="btn primary" type="button" data-tf="home">回目錄</button>`}<button class="btn" type="button" data-tf="redo" data-v="${it.id}">重做這篇</button></div>`
      : `<p class="hint">底線前的字母已經給了，只要補後面缺的字母，格子寬度就是缺幾個字母。輸入完一格按 Enter 跳到下一格。</p>
        <div class="actions row"><button class="btn primary" type="button" data-tf="check" data-v="${it.id}">對答案</button></div>`}`;
    if (c.done) setMood(sc.r >= 8 ? "happy" : "sad", "tfc-" + it.id + "-" + sc.r);
    hookImgs(v); return;
  }
  const qs = it.qs, allDone = qs.every(q => t.ans[q.id] != null), sc = tfScore(it);
  const qHtml = qs.map((q, qi) => {
    const p = t.ans[q.id], answered = p != null, ok = p === q.a;
    return `<div class="tfq" id="tfq-${q.id}"><p class="tfstem"><b class="qn">${qi + 1}.</b><span${q.k === "ins" ? "" : ' lang="en"'}>${q.q}</span></p>
      <ul class="opts">${q.o.map((o, i) => { let cls = "opt en"; if (answered){ if (i === q.a) cls += " right"; else if (i === p) cls += " wrong"; }
        return `<li><button type="button" class="${cls}" data-tf="pick" data-q="${q.id}" data-v="${i}"${answered ? " disabled" : ""}><span class="key">${"ABCD"[i]}</span><span>${o}</span></button></li>`; }).join("")}</ul>
      ${answered ? `<p class="feedback ${ok ? "ok" : "no"}" aria-live="polite">${ok ? "答對了。" : `答錯了，正確答案是 (${"ABCD"[q.a]})。`}</p>` : ""}</div>`;
  }).join("");
  v.innerHTML = back + head + `<article class="card tfp" lang="en">${it.paras.map(p => `<p>${p}</p>`).join("")}</article>
    <p class="hint">共 ${qs.length} 題，點選項就會馬上對答案。原卷題號 Q${qs[0].n}–Q${qs[qs.length - 1].n}。</p>
    ${qHtml}
    ${allDone ? `<p class="feedback ${sc.r === sc.n ? "ok" : "no"}">這篇答對 ${sc.r}／${sc.n} 題。</p><div class="actions row">${nx ? `<button class="btn primary" type="button" data-tf="open" data-v="${nx}">下一篇</button>` : `<button class="btn primary" type="button" data-tf="home">回目錄</button>`}<button class="btn" type="button" data-tf="redo" data-v="${it.id}">重做這篇</button></div>` : ""}`;
  hookImgs(v);
}
function tfClick(b){
  const a = b.dataset.tf, val = b.dataset.v, t = tfState();
  if (a.startsWith("m") && mockClick(a, val, b)) return;
  if (a === "home"){ mockHarvest(); save(); tfv.page = "home"; tfv.quitArm = false; renderTf(); window.scrollTo(0, 0); }
  else if (a === "open") tfOpen(val);
  else if (a === "set"){ t.set = val; save(); renderTf(); }
  else if (a === "words"){ if (PACK_WORDS.toeflcn){ switchPack("toeflcn"); showTab("today"); } }
  else if (a === "redo"){ const it = TF.byId.get(val); if (!it) return; if (it.type === "ctw") delete t.ctw[it.id]; else it.qs.forEach(q => { delete t.ans[q.id]; }); save(); renderTf(); window.scrollTo(0, 0); }
  else if (a === "check"){
    const it = TF.byId.get(val); if (!it) return;
    const vals = [...document.querySelectorAll("#view-tf .ctwin")].map(i => i.value.trim());
    t.ctw[it.id] = { v:vals, done:true, at:Date.now() };
    const r = it.blanks.filter((bk, i) => tfOkWord(bk, vals[i])).length;
    logRun("tfctw", it.blanks.length, r, 0, it.blanks.filter((bk, i) => !tfOkWord(bk, vals[i])).map(bk => bk.pre + bk.rest));
    save(); renderTf(); window.scrollTo(0, 0);
  }
  else if (a === "pick"){
    const qid = b.dataset.q, it = TF.byId.get(qid.replace(/q\d+$/, "")); if (!it || t.ans[qid] != null) return;
    t.ans[qid] = +val;
    const q = it.qs.find(x => x.id === qid);
    setMood(+val === q.a ? "happy" : "sad", "tfa-" + qid);
    if (it.qs.every(x => t.ans[x.id] != null)) logRun("tfread", it.qs.length, it.qs.filter(x => t.ans[x.id] === x.a).length, 0);
    save(); renderTf();
    const el = document.getElementById("tfq-" + qid); if (el) el.scrollIntoView({ block:"nearest" });
  }
}

/* ---------- 托福模擬考：從所有套的題目照題型抽題，兩個模組，考完才對答案 ---------- */
// 每個模組抽幾篇。ETS 公布的閱讀是兩個模組、約 30 分鐘；之後官方題數有變，改這裡就好。
const MOCK_PLAN = { 1:{ ctw:1, dl:2, ap:1 }, 2:{ ctw:1, dl:2, ap:1 } };
const MOCK_MIN = 30;     // 整個閱讀的時間（分鐘）
const MOCK_HARD = 0.6;   // Module 1 答對率到這個比例，Module 2 就抽較難的題目
let tfTimer = null;
function tfTimerStop(){ if (tfTimer){ clearInterval(tfTimer); tfTimer = null; } }
function mockOrder(it, tiers){ const lv = it.lv || "m"; const i = tiers.indexOf(lv); return i < 0 ? tiers.length : i; }
function mockPick(sec, n, tiers, used){
  const t = tfState(), seen = t.seen || {};
  return tfAll(sec).filter(it => !used.has(it.id))
    .map(it => [(seen[it.id] || 0) * 10 + mockOrder(it, tiers) + Math.random() * 0.9, it])
    .sort((a, b) => a[0] - b[0]).slice(0, n).map(x => x[1].id);
}
function mockBuild(mod, route){
  const m = tfState().mock, used = new Set([].concat(m ? m.list[1] || [] : []));
  const tiers = mod === 1 ? ["m", "e", "h"] : route === "h" ? ["h", "m", "e"] : ["e", "m", "h"];
  const p = MOCK_PLAN[mod], ids = [];
  ["ctw", "dl", "ap"].forEach(sec => { mockPick(sec, p[sec] || 0, tiers, used).forEach(id => { used.add(id); ids.push(id); }); });
  return ids;
}
function mockItemScore(it, m){
  if (it.type === "ctw"){ const v = m.ctw[it.id] || []; return { r:it.blanks.filter((b, i) => tfOkWord(b, v[i])).length, n:it.blanks.length, left:it.blanks.filter((b, i) => !String(v[i] || "").trim()).length }; }
  return { r:it.qs.filter(q => m.ans[q.id] === q.a).length, n:it.qs.length, left:it.qs.filter(q => m.ans[q.id] == null).length };
}
function mockTally(m, ids){
  const out = { r:0, n:0, left:0, sec:{} };
  ids.forEach(id => { const it = TF.byId.get(id); if (!it) return; const s = mockItemScore(it, m);
    out.r += s.r; out.n += s.n; out.left += s.left; const x = out.sec[it.sec] || (out.sec[it.sec] = [0, 0]); x[0] += s.r; x[1] += s.n; });
  return out;
}
function mockHarvest(){
  const m = tfState().mock; if (!m || m.done || tfv.page !== "mock") return;
  const el = document.querySelector("#view-tf [data-mit]"); if (!el) return;
  m.ctw[el.dataset.mit] = [...el.querySelectorAll(".ctwin")].map(i => i.value);
}
function mockLeft(m){ return Math.max(0, m.end - Date.now()); }
function mockClock(ms){ const s = Math.ceil(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }
function mockFinish(){
  const t = tfState(), m = t.mock; if (!m || m.done) return;
  mockHarvest();
  const ids = (m.list[1] || []).concat(m.list[2] || []), T = mockTally(m, ids);
  m.done = true; m.doneAt = Date.now();
  t.seen = t.seen || {}; ids.forEach(id => { t.seen[id] = (t.seen[id] || 0) + 1; });
  t.mocks = (t.mocks || []).concat([{ at:m.doneAt, r:T.r, n:T.n, sec:T.sec, route:m.route, min:Math.round((m.doneAt - m.start) / 60000) }]).slice(-30);
  logRun("tfmock", T.n, T.r, (m.doneAt - m.start) / 1000);
  tfTimerStop(); save();
}
function mockNextModule(){
  const m = tfState().mock; mockHarvest();
  const T = mockTally(m, m.list[1]);
  m.route = T.n && T.r / T.n >= MOCK_HARD ? "h" : "e";
  m.list[2] = mockBuild(2, m.route); m.mod = 2; m.idx = 0;
  if (!m.list[2].length) mockFinish();
  save();
}
function mockClick(a, val, b){
  const t = tfState(); let m = t.mock;
  if (a === "mock"){ tfv.page = "mock"; tfv.item = null; renderTf(); window.scrollTo(0, 0); return true; }
  if (a === "mstart"){
    t.mock = m = { start:Date.now(), end:Date.now() + MOCK_MIN * 60000, mod:1, route:null, list:{ 1:[], 2:[] }, idx:0, ans:{}, ctw:{}, done:false };
    m.list[1] = mockBuild(1);
    save(); renderTf(); window.scrollTo(0, 0); return true;
  }
  if (a === "mnew"){ t.mock = null; save(); renderTf(); window.scrollTo(0, 0); return true; }
  if (!m) return false;
  if (a === "mpick"){ if (m.done) return true; m.ans[b.dataset.q] = +val; save(); mockHarvest(); renderTf(); const el = document.getElementById("tfq-" + b.dataset.q); if (el) el.scrollIntoView({ block:"nearest" }); return true; }
  if (a === "mprev" || a === "mnext"){ mockHarvest(); m.idx = Math.max(0, Math.min(m.list[m.mod].length - 1, m.idx + (a === "mnext" ? 1 : -1))); tfv.quitArm = false; save(); renderTf(); window.scrollTo(0, 0); return true; }
  if (a === "mgo"){ mockHarvest(); m.idx = +val; save(); renderTf(); window.scrollTo(0, 0); return true; }
  if (a === "mmod"){ mockNextModule(); renderTf(); window.scrollTo(0, 0); return true; }
  if (a === "msubmit"){ mockFinish(); renderTf(); window.scrollTo(0, 0); return true; }
  if (a === "mquit"){
    if (!tfv.quitArm){ tfv.quitArm = true; renderTf(); return true; }
    tfv.quitArm = false; t.mock = null; tfTimerStop(); save(); renderTf(); window.scrollTo(0, 0); return true;
  }
  return false;
}
function mockReadHtml(it, m, review){
  const qs = it.qs.map((q, qi) => {
    const p = m.ans[q.id];
    return `<div class="tfq" id="tfq-${q.id}"><p class="tfstem"><b class="qn">${qi + 1}.</b><span${q.k === "ins" ? "" : ' lang="en"'}>${q.q}</span></p>
      <ul class="opts">${q.o.map((o, i) => { let cls = "opt en";
        if (review){ if (i === q.a) cls += " right"; else if (i === p) cls += " wrong"; } else if (i === p) cls += " picked";
        return `<li><button type="button" class="${cls}" data-tf="mpick" data-q="${q.id}" data-v="${i}" aria-pressed="${i === p}"${review ? " disabled" : ""}><span class="key">${"ABCD"[i]}</span><span>${o}</span></button></li>`; }).join("")}</ul>
      ${review ? `<p class="feedback ${p === q.a ? "ok" : "no"}">${p == null ? `沒作答，正確答案是 (${"ABCD"[q.a]})。` : p === q.a ? "答對了。" : `答錯了，正確答案是 (${"ABCD"[q.a]})。`}</p>` : ""}</div>`;
  }).join("");
  return `<article class="card tfp" lang="en">${it.paras.map(p => `<p>${p}</p>`).join("")}</article>${qs}`;
}
function mockItemHead(it){ return `<p class="hint">${TF_SEC[it.sec].zh}・<span lang="en">${TF_SEC[it.sec].name}</span>${it.task ? `・<span lang="en">${esc(it.task)}</span>` : ""}${it.set ? `・出自 ${esc(it.set.short || it.set.title)}` : ""}</p><h3 lang="en" class="tftitle">${esc(it.title)}</h3>`; }
function renderMock(){
  const v = $("#view-tf"), t = tfState(), m = t.mock;
  const back = `<p class="step"><button type="button" class="linkbtn" data-tf="home">← 托福題庫</button></p>`;
  const plan = p => ["ctw", "dl", "ap"].filter(s => p[s]).map(s => `${TF_SEC[s].zh} ${p[s]} 篇`).join("、");
  const pct = (r, n) => n ? Math.round(r / n * 100) + "%" : "—";
  if (!m){
    tfTimerStop(); setMood("idle", "tf-mock");
    const bank = ["ctw", "dl", "ap"].map(s => `${TF_SEC[s].zh} ${tfAll(s).length} 篇`).join("、");
    const hist = (t.mocks || []).slice(-8).reverse().map(h => { const d = new Date(h.at);
      return `<li>${d.getMonth() + 1}/${d.getDate()}：${h.r}／${h.n}（${pct(h.r, h.n)}）${["ctw", "dl", "ap"].filter(s => h.sec[s]).map(s => `・${TF_SEC[s].zh} ${pct(h.sec[s][0], h.sec[s][1])}`).join("")}${h.route ? `・Module 2 ${h.route === "h" ? "較難" : "較易"}` : ""}</li>`; }).join("");
    v.innerHTML = buddyHtml("") + back + `<h2>托福閱讀模擬考</h2>
      <p>照新制閱讀的結構出題：</p>
      <ul><li><b>Module 1</b>：${plan(MOCK_PLAN[1])}，難度中等。</li>
        <li><b>Module 2</b>：${plan(MOCK_PLAN[2])}。Module 1 答對 ${Math.round(MOCK_HARD * 100)}% 以上會抽較難的題目，否則抽較易的，跟正式考試一樣依表現調整。</li>
        <li>全部 <b>${MOCK_MIN} 分鐘</b>，時間到自動交卷。考的時候不會對答案，交卷後一次看。</li></ul>
      <p class="hint">題庫目前有：${bank}。沒考過的題目會優先出，考過的之後才會再出現。</p>
      <div class="actions row"><button type="button" class="btn primary" data-tf="mstart">開始計時</button></div>
      ${hist ? `<h3 class="sub">考過的紀錄</h3><ul class="tfhist">${hist}</ul>` : ""}`;
    hookImgs(v); return;
  }
  if (m.done){
    tfTimerStop();
    const all = (m.list[1] || []).concat(m.list[2] || []), T = mockTally(m, all), ok = T.n && T.r / T.n >= 0.8;
    setMood(ok ? "happy" : "idle", "tf-mockres-" + m.doneAt);
    const secRows = ["ctw", "dl", "ap"].filter(s => T.sec[s]).map(s => `<li>${TF_SEC[s].zh}・<span lang="en">${TF_SEC[s].name}</span>：${T.sec[s][0]}／${T.sec[s][1]}（${pct(T.sec[s][0], T.sec[s][1])}）</li>`).join("");
    const weak = ["ctw", "dl", "ap"].filter(s => T.sec[s] && T.sec[s][1]).sort((a, b) => T.sec[a][0] / T.sec[a][1] - T.sec[b][0] / T.sec[b][1])[0];
    const rev = [1, 2].map(mod => (m.list[mod] || []).length ? `<h3 class="sub">Module ${mod}${mod === 2 && m.route ? `（${m.route === "h" ? "較難" : "較易"}路線）` : ""}</h3>` + m.list[mod].map(id => {
      const it = TF.byId.get(id); if (!it) return ""; const s = mockItemScore(it, m);
      const body = it.type === "ctw" ? `<article class="card tfp ctwp" lang="en">${tfCtwHtml(it, true, m.ctw[it.id] || [])}</article>` : mockReadHtml(it, m, true);
      return `<details class="tfrev"><summary><span lang="en">${esc(it.title)}</span><small>${TF_SEC[it.sec].zh}・${s.r}／${s.n}</small></summary>${mockItemHead(it)}${body}</details>`;
    }).join("") : "").join("");
    v.innerHTML = buddyHtml(ok ? "bounce" : "") + back + `<h2>模擬考結果</h2>
      <p class="feedback ${ok ? "ok" : "no"}">答對 ${T.r}／${T.n}（${pct(T.r, T.n)}），用了 ${Math.max(1, Math.round((m.doneAt - m.start) / 60000))} 分鐘${T.left ? `，有 ${T.left} 題沒作答` : ""}。</p>
      <ul>${secRows}</ul>
      ${weak ? `<p class="hint">這次最弱的是「${TF_SEC[weak].zh}」，可以回題庫選「全部題庫」專練這一型。</p>` : ""}
      <p class="hint">百分比只是練習參考，不是官方 1–6 分換算。</p>
      <div class="actions row"><button type="button" class="btn primary" data-tf="mnew">再考一次</button><button type="button" class="btn" data-tf="home">回題庫</button></div>
      <h2 class="sub">逐題檢討</h2><p class="hint">點標題展開。</p>${rev}`;
    hookImgs(v); return;
  }
  if (mockLeft(m) <= 0){ mockFinish(); renderMock(); return; }
  const L = m.list[m.mod], it = TF.byId.get(L[m.idx]);
  if (!it){ mockFinish(); renderMock(); return; }
  const last = m.idx === L.length - 1, T = mockTally(m, L);
  const dots = L.map((id, i) => { const x = TF.byId.get(id), s = x ? mockItemScore(x, m) : { left:0 };
    return `<button type="button" data-tf="mgo" data-v="${i}" aria-pressed="${i === m.idx}" title="${x ? esc(TF_SEC[x.sec].zh) : ""}">${i + 1}${s.left ? "" : " ✓"}</button>`; }).join("");
  const body = it.type === "ctw"
    ? `<article class="card tfp ctwp" lang="en" data-mit="${esc(it.id)}">${tfCtwHtml(it, false, m.ctw[it.id] || [])}</article><p class="hint">補完缺少的字母，輸入完一格按 Enter 跳下一格。</p>`
    : mockReadHtml(it, m, false);
  const endBtn = last ? (m.mod === 1
      ? `<button class="btn primary" type="button" data-tf="mmod">交出 Module 1，進入 Module 2</button>`
      : `<button class="btn primary" type="button" data-tf="msubmit">交卷</button>`)
    : `<button class="btn primary" type="button" data-tf="mnext">下一篇</button>`;
  v.innerHTML = `<div class="tfmockbar"><span>Module ${m.mod}・第 ${m.idx + 1}／${L.length} 篇</span><span class="tfclock" id="tfClock" aria-label="剩餘時間">${mockClock(mockLeft(m))}</span></div>
    <div class="seg tfdots" role="group" aria-label="跳到第幾篇">${dots}</div>
    ${mockItemHead(it)}${body}
    ${last && T.left ? `<p class="hint">這個模組還有 ${T.left} 題沒作答。${m.mod === 1 ? "交出後就不能回來改了。" : ""}</p>` : ""}
    <div class="actions row">${m.idx > 0 ? `<button class="btn" type="button" data-tf="mprev">上一篇</button>` : ""}${endBtn}</div>
    <p class="step"><button type="button" class="linkbtn" data-tf="mquit">${tfv.quitArm ? "再按一次就放棄這次模擬考（不會留下紀錄）" : "放棄這次模擬考"}</button>　<button type="button" class="linkbtn" data-tf="home">先離開（計時會繼續）</button></p>`;
  hookImgs(v);
  if (!tfTimer) tfTimer = setInterval(() => {
    const mm = tfState().mock; if (!mm || mm.done || tfv.page !== "mock" || $("#view-tf").hidden){ tfTimerStop(); return; }
    const left = mockLeft(mm), c = $("#tfClock");
    if (left <= 0){ mockFinish(); renderTf(); window.scrollTo(0, 0); return; }
    if (c){ c.textContent = mockClock(left); c.classList.toggle("low", left < 5 * 60000); }
  }, 1000);
}

/* ---------- navigation ---------- */
function renderAll(){
  renderHeader(); renderToday();
  if (!$("#view-drill").hidden) renderDrill();
  if (!$("#view-lib").hidden) renderLib();
  if (!$("#view-set").hidden) renderSet();
  if (!$("#view-log").hidden) renderLog();
  if (!$("#view-hs").hidden) renderHs();
  if (!$("#view-tf").hidden) renderTf();
}
function showTab(t){
  if (test) return;
  ui.bkMsg = "";
  ["today", "drill", "lib", "log", "set", "hs", "tf", "note"].forEach(k => { $("#view-" + k).hidden = k !== t; });
  document.querySelectorAll("[data-tab]").forEach(b => { if (b.dataset.tab === t) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); });
  if (t === "today") renderToday();
  if (t === "drill") renderDrill();
  if (t === "lib") renderLib();
  if (t === "set") renderSet();
  if (t === "log") renderLog();
  if (t === "hs") renderHs();
  if (t === "tf"){ tfv.page = "home"; renderTf(); }
  if (t === "note") renderNote();
  window.scrollTo(0, 0);
}
function focusMain(){
  const sp = $('#spellIn'); if (sp){ sp.focus({ preventScroll:true }); return; }
  if (!kbd){ if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); return; }
  const el = $('#view-today:not([hidden]) [data-act="learned"]') || $('main section:not([hidden]) .opt:not(:disabled)') || $('main section:not([hidden]) .btn.primary');
  if (el) el.focus({ preventScroll:true });
}

/* ---------- events ---------- */
document.addEventListener("click", e => {
  const go = e.target.closest("[data-tab-go]"); if (go){ showTab(go.dataset.tabGo); return; }
  if (e.target.closest("[data-a2hs-hide]")){ state.settings.hideA2HS = true; save(); renderToday(); return; }
  const sp = e.target.closest("[data-skin-pick]");
  if (sp){ pickId = sp.dataset.skinPick; applySkin(pickId); renderToday(); const again = document.querySelector(`[data-skin-pick="${CSS.escape(pickId)}"]`); if (again && kbd) again.focus({ preventScroll:true }); return; }
  if (e.target.closest("[data-skin-ok]")){
    state.settings.char = pickId || state.settings.char; state.settings.charChosen = true; ui.lineKey = "";
    applySkin(); save(); renderAll(); focusMain(); return;
  }
  const tb = e.target.closest("[data-test]");
  if (tb){
    const a = tb.dataset.test;
    if (a === "start"){ startTest(); renderToday(); focusMain(); }
    else if (a === "skip") skipTest();
    else if (a === "pick" && test) testAnswer(tb.dataset.id);
    else if (a === "lv" && test){ test.choice = +tb.dataset.v; test.daily = suggestDaily(test.choice); renderToday(); }
    else if (a === "daily" && test){ test.daily = +tb.dataset.v; renderToday(); }
    else if (a === "ok" && test) confirmTest();
    return;
  }
  const tfb = e.target.closest("[data-tf]");
  if (tfb && !tfb.disabled){ tfClick(tfb); return; }
  const hb = e.target.closest("[data-hs]");
  if (hb && !hb.disabled){ hsClick(hb); return; }
  const fl = e.target.closest("[data-fill]");
  if (fl){ fillAct(fl.dataset.fill, fl.dataset.i); return; }
  const bk = e.target.closest("[data-bk]");
  if (bk){ if (bk.dataset.bk === "copy") copyBackup(true); else { state.backupSnooze = dayNum(); save(); renderToday(); } return; }
  const pb = e.target.closest("[data-pas]");
  if (pb){ if (pb.dataset.pas === "pick") passagePick(pb.dataset.v); else if (pb.dataset.pas === "next") passageNext(); return; }
  const db = e.target.closest("[data-drill]");
  if (db){
    const a = db.dataset.drill;
    if (a === "go") startDrill(db.dataset.mode);
    else if (a === "menu"){ drill = null; pas = null; fil = null; renderDrill(); }
    else if (a === "pick") drillPick(db.dataset.id);
    else if (a === "check") drillCheckSpell();
    else if (a === "skip") drillCheckSpell(true);
    else if (a === "next") drillNext();
    return;
  }
  const b = e.target.closest("[data-act]"); if (!b) return;
  const act = b.dataset.act, T = state.today;
  if (act === "say"){ say(b.dataset.w); return; }
  if (act === "playex"){ playUrl(b.dataset.u); return; }
  if (act === "start"){ T.started = true; T.t0 = Date.now(); T.wrong = []; enterQuizIfNeeded(); save(); renderHeader(); renderToday(); focusMain(); return; }
  if (act === "learned"){ T.learned++; enterQuizIfNeeded(); save(); renderHeader(); renderToday(); focusMain(); return; }
  if (act === "pick"){ answer(b.dataset.id); return; }
  if (act === "next"){ next(); return; }
  if (act === "more"){ addMore(); return; }
});
document.querySelectorAll("[data-tab]").forEach(b => b.addEventListener("click", () => showTab(b.dataset.tab)));
/* 角色圖：擋右鍵、長按、拖曳存圖 */
["contextmenu", "dragstart"].forEach(t => document.addEventListener(t, e => { if (e.target.closest && e.target.closest(".buddy .pic, .pick-pic")) e.preventDefault(); }));
const NAV_ICON = { hs:"star",  today:"heart", drill:"star", lib:"flower", log:"sparkle", set:"bubble" };
document.querySelectorAll(".nav [data-tab]").forEach(b => { const k = NAV_ICON[b.dataset.tab]; if (k){ const sp = document.createElement("span"); sp.className = "ni"; sp.setAttribute("aria-hidden", "true"); sp.innerHTML = sticker(k); b.prepend(sp); } });

document.addEventListener("keydown", e => {
  if (e.target.id === "hsIn"){
    if (e.key === "Enter" && !e.isComposing && e.keyCode !== 229){ e.preventDefault(); const bb = $('[data-hs="fill"]'); if (bb) hsClick(bb); }
    return;
  }
  if (e.target.classList && e.target.classList.contains("ctwin")){
    if (e.key === "Enter" && !e.isComposing && e.keyCode !== 229){
      e.preventDefault();
      const all = [...document.querySelectorAll("#view-tf .ctwin")], i = all.indexOf(e.target);
      if (all[i + 1]) all[i + 1].focus(); else { const cb = $('[data-tf="check"]'); if (cb) cb.focus(); }
    }
    return;
  }
  if (e.target.id === "spellIn"){
    if (e.key === "Enter" && !e.isComposing && e.keyCode !== 229){ e.preventDefault(); drillCheckSpell(); }
    return;
  }
  if (e.target.closest && e.target.closest("input, textarea, select")) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const section = document.querySelector("main section:not([hidden])"); if (!section) return;
  if (/^[1-5]$/.test(e.key)){
    const btns = [...section.querySelectorAll(".opt:not(:disabled)")];
    const btn = btns[+e.key - 1]; if (btn){ e.preventDefault(); btn.click(); } return;
  }
  if (e.key === "Enter" || e.key === " "){
    if (document.activeElement && document.activeElement.tagName === "BUTTON") return;
    const btn = section.querySelector('[data-act="learned"], [data-act="next"], [data-drill="next"], [data-pas="next"], [data-act="start"]');
    if (btn){ e.preventDefault(); btn.click(); }
  }
});

document.addEventListener("input", e => {
  if (e.target.classList && e.target.classList.contains("ctwin") && tfv.page === "mock"){
    mockHarvest();
    const all = [...document.querySelectorAll("#view-tf .ctwin")];
    if (e.target.value.length >= +e.target.maxLength && !e.isComposing){ const nx = all[all.indexOf(e.target) + 1]; if (nx) nx.focus({ preventScroll:false }); }
    clearTimeout(tfv.st); tfv.st = setTimeout(save, 600); return;
  }
  if (e.target.classList && e.target.classList.contains("ctwin") && tfv.item){
    const all = [...document.querySelectorAll("#view-tf .ctwin")], t = tfState();
    t.ctw[tfv.item] = { v:all.map(i => i.value), done:false };
    if (e.target.value.length >= +e.target.maxLength && !e.isComposing){ const nx = all[all.indexOf(e.target) + 1]; if (nx) nx.focus({ preventScroll:false }); }
    clearTimeout(tfv.st); tfv.st = setTimeout(save, 600); return;
  }
});
document.addEventListener("input", e => { if (e.target.id === "hsEssay"){ hsState().essay[e.target.dataset.id] = e.target.value; const c = $("#hsCount"); if (c) c.textContent = [...e.target.value.replace(/\s/g, "")].length + " 字・自動儲存"; clearTimeout(hsv.st); hsv.st = setTimeout(save, 600); } });
$("#view-lib").addEventListener("change", e => { if (e.target.id === "lvSel"){ ui.lv = e.target.value; ui.open = null; ui.limit = LIB_PAGE; renderLib(); } });
$("#q").addEventListener("input", e => { ui.q = e.target.value; ui.open = null; ui.limit = LIB_PAGE; renderLib(); });
$("#view-lib").addEventListener("click", e => {
  const seg = e.target.closest(".seg button");
  if (seg){
    const g = seg.parentElement.id;
    if (g === "fLv") ui.lv = seg.dataset.v;
    if (g === "fStatus") ui.st = seg.dataset.v;
    setPressed("#" + g, seg.dataset.v); ui.open = null; ui.limit = LIB_PAGE; renderLib(); return;
  }
  const b = e.target.closest("[data-lib]"); if (!b) return;
  const id = b.dataset.id;
  if (b.dataset.lib === "more"){ ui.limit += LIB_PAGE; renderLib(); return; }
  if (b.dataset.lib === "toggle"){ ui.open = ui.open === id ? null : id; ui.delArm = null; ui.edit = null; renderLib(); refocusRow(id, "toggle"); return; }
  if (b.dataset.lib === "edit"){ ui.edit = id; ui.delArm = null; renderLib(); const i = document.querySelector('.editform [data-ed="ex"]'); if (i) i.focus(); return; }
  if (b.dataset.lib === "cancel"){ ui.edit = null; renderLib(); return; }
  if (b.dataset.lib === "save"){ saveEdit(id); return; }
  if (b.dataset.lib === "del"){
    if (ui.delArm !== id){
      ui.delArm = id; renderLib(); refocusRow(id, "del");
      clearTimeout(delTimer); delTimer = setTimeout(() => { if (ui.delArm === id){ ui.delArm = null; renderLib(); } }, 4000);
      return;
    }
    clearTimeout(delTimer); deleteCustom(id);
  }
});
$("#addBtn").addEventListener("click", addCustom);
$("#view-note").addEventListener("toggle", e => { const d = e.target; if (d.matches && d.matches("details.ntsec")) nu.open[d.dataset.sec] = d.open; }, true);
$("#view-note").addEventListener("change", e => { const c = e.target.closest("[data-ck]"); if (c){ notesState().checks[c.dataset.ck] = c.checked; save(); } });
$("#view-note").addEventListener("click", e => {
  const b = e.target.closest("[data-nt]"); if (!b) return;
  const a = b.dataset.nt, id = b.dataset.id;
  if (a === "add"){ nu.add = b.dataset.sec; nu.edit = null; renderNote(); const t = document.querySelector('.ntform [data-nf="body"]'); if (t) t.focus(); return; }
  if (a === "edit"){ nu.edit = id; nu.add = null; nu.delArm = null; renderNote(); const t = document.querySelector('.ntform [data-nf="body"]'); if (t) t.focus(); return; }
  if (a === "cancel"){ nu.add = null; nu.edit = null; renderNote(); return; }
  if (a === "save"){ ntSave(b.closest(".ntform")); return; }
  if (a === "del"){
    if (nu.delArm !== id){ nu.delArm = id; renderNote(); setTimeout(() => { if (nu.delArm === id){ nu.delArm = null; renderNote(); } }, 4000); return; }
    const n = notesState(); n.mine = n.mine.filter(m => m.id !== id); nu.delArm = null; save(); renderNote();
  }
});
$("#bulkBtn").addEventListener("click", addBulk);
$("#mineBox").addEventListener("click", e => {
  const m = e.target.closest("[data-mine]");
  if (m){
    if (m.dataset.mine === "copy"){ copyMine(); return; }
    if (hsOn()) leaveHs();
    switchPack(m.dataset.mine === "only" ? "mine" : "gsat"); return;
  }
  const seg = e.target.closest("#sMix button");
  if (seg){ state.settings.mixMine = seg.dataset.v === "on"; rebuild(); sanitizeToday(); if (state.today && !state.today.started) ensureToday(true); save(); renderAll(); }
});
$("#list").addEventListener("keydown", e => { if (e.key === "Enter" && !e.isComposing && e.keyCode !== 229 && e.target.matches("[data-ed]")){ e.preventDefault(); const box = e.target.closest(".editform"); if (box) saveEdit(box.dataset.id); } });
$("#addForm").addEventListener("keydown", e => { if (e.key === "Enter" && !e.isComposing && e.keyCode !== 229 && e.target.tagName === "INPUT"){ e.preventDefault(); addCustom(); } });

$("#view-set").addEventListener("click", e => {
  const b = e.target.closest(".seg button");
  if (b){
    const g = b.parentElement.id, v = b.dataset.v, T = state.today;
    if (g === "sPack"){ if (v === "hs"){ enterHs(); return; } if (hsOn()){ leaveHs(); } switchPack(v); renderSet(); return; }
    if (g === "sStart"){ state.settings.startLv = +v; if (!T.started) ensureToday(true); }
    if (g === "sDaily"){ state.settings.daily = +v; if (!T.started) ensureToday(true); }
    if (g === "sChar"){ state.settings.char = v; state.settings.charChosen = true; ui.lineKey = ""; applySkin(); }
    if (g === "sSay") state.settings.autoSay = v === "on";
    if (g === "sTheme"){ state.settings.theme = v; applyTheme(); }
    save(); renderSet(); return;
  }
  if (e.target.closest("#examSave")){
    const name = $("#examName").value.trim().slice(0, 12), date = $("#examDate").value;
    if (!name || !/^\d{4}-\d{2}-\d{2}$/.test(date)){ $("#examMsg").textContent = "考試名稱和日期都要填。"; return; }
    state.exams[curPackId()] = { name, date }; save(); renderAll(); renderSet();
    const l = examLeft(); $("#examMsg").textContent = l > 0 ? `存好了，離${name}還有 ${l} 天。` : l === 0 ? `存好了，今天就是${name}！` : "存好了。這個日期已經過了，倒數會顯示「結束了」。";
    return;
  }
  if (e.target.closest("#examClear")){ state.exams[curPackId()] = { name:"", date:"" }; save(); renderAll(); renderSet(); $("#examMsg").textContent = "這個字庫不倒數了。想恢復的話重新填好按儲存。"; return; }
  if (e.target.closest("#retestBtn")){ showTab("today"); startTest(); renderToday(); focusMain(); return; }
  if (e.target.closest("#exportBtn")){ exportBackup(); return; }
  if (e.target.closest("#copyBackup")){ copyBackup(); return; }
  if (e.target.closest("#restoreBtn")){ restoreFromText(); return; }
  if (e.target.closest("#redeemBtn")){ redeem($("#redeemIn").value); return; }
  if (e.target.closest("#copyUid")){ try { navigator.clipboard.writeText(acct.uid).then(() => setSyncMsg("已複製。"), () => setSyncMsg("請手動抄下這組 UID。")); } catch (err) { setSyncMsg("請手動抄下這組 UID。"); } return; }
  if (e.target.closest("#acctCreate")){ acctCreate(); return; }
  if (e.target.closest("#acctLogin")){ acctLogin(); return; }
  if (e.target.closest("#acctPasswd")){ acctPasswd(); return; }
  if (e.target.closest("#acctLogout")){ acctLogout(); return; }
  if (e.target.closest("#acctSyncNow")){ setSyncMsg(""); cloudInit(); return; }
  if (e.target.closest("#resetBtn")){
    if (!resetArmed){
      resetArmed = true; renderSet();
      clearTimeout(resetTimer); resetTimer = setTimeout(() => { resetArmed = false; renderSet(); }, 4000);
      return;
    }
    clearTimeout(resetTimer); resetArmed = false;
    const keep = { custom:state.custom, settings:state.settings, sync:state.sync, notes:state.notes, unlocks:state.unlocks };
    state = Object.assign(freshState(), keep);
    rebuild(); ensureToday(true); save(); renderAll();
    $("#resetNote").textContent = "已重設。回到「今日」可以重新做程度測驗。";
  }
});
$("#view-set").addEventListener("change", e => {
  if (e.target.id === "packStartSel"){ state.packStart[curPackId()] = +e.target.value; if (state.today && !state.today.started) ensureToday(true); save(); renderSet(); }
});
$("#importFile").addEventListener("change", e => { const f = e.target.files && e.target.files[0]; if (f) importBackup(f); e.target.value = ""; });

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible" || !state.today || test) return;
  if (state.today.day === dayNum()) return;
  const ph = phase();
  if (ph === "start" || ph === "done"){ ensureToday(); renderAll(); } else renderHeader();
});

/* ---------- boot ---------- */
async function getJSON(url){ const r = await fetch(url, { cache:"no-cache" }); if (!r.ok) throw new Error(url + " " + r.status); return r.json(); }
async function load(){
  try {
    const [words, ex, chars] = await Promise.all([
      getJSON("words.json"),
      getJSON("examples.json").catch(() => ({})),
      getJSON("chars.json").catch(() => null),
      getJSON("config.json").catch(() => null),
      getJSON("passages.json").catch(() => []),
      getJSON("fill.json").catch(() => [])
    ]).then(r => { const cfg = r[3]; CFG = cfg; PASS = Array.isArray(r[4]) ? r[4] : []; FILL = Array.isArray(r[5]) ? r[5] : []; if (cfg && cfg.supabase && cfg.supabase.url && cfg.supabase.anonKey) SB = cfg.supabase; if (cfg && Array.isArray(cfg.rankXp) && cfg.rankXp.length) RANK_XP = cfg.rankXp.map(x => Math.max(0, +x || 0)).sort((a, b) => a - b); if (cfg && Array.isArray(cfg.ranks) && cfg.ranks.length){
        const rk = cfg.ranks.filter(x => x && x.name).map(x => [String(x.name), Math.max(0, +x.xp || 0)]).sort((a, b) => a[1] - b[1]);
        if (rk.length){ rk[0][1] = 0; BASE_RANKS = rk; } } return r; });
    EX = ex || {};
    if (chars && Array.isArray(chars.characters)) CHARS = chars;
    injectSkins();
    const cs = CHARS.characters || [];
    if (typeof state.settings.char === "number") state.settings.char = cs[state.settings.char] ? cs[state.settings.char].id : "";
    if (cs.length < 2 && !state.settings.charChosen){ state.settings.charChosen = true; state.settings.char = cs[0] ? cs[0].id : ""; }
    BANK = words.map(prepWord);
    BANK.forEach(w => { w.pk = "gsat"; });
    BANK_IDS = new Set(BANK.map(w => w.id));
    PACK_WORDS.gsat = BANK;
    const cfgPacks = (CFG && Array.isArray(CFG.packs)) ? CFG.packs : [];
    PACKS = cfgPacks.filter(p => p && p.id).map(p => Object.assign({}, p));
    if (!PACKS.some(p => p.id === "gsat")) PACKS.unshift({ id:"gsat", name:"學測", levels:[] });
    if (!PACKS.some(p => p.id === "mine")) PACKS.push({ id:"mine", name:"我的單字", levels:[] });
    await loadUnlocked();
  } catch (e) {
    $("#view-load").innerHTML = `<p class="lede">字庫載入失敗。</p><p class="hint">如果是直接在電腦上點開 index.html，瀏覽器會擋住讀檔；請放到 GitHub Pages，或在資料夾裡執行 <code>python3 -m http.server</code> 再打開。</p>`;
    return;
  }
  rebuild();
  migrateRanks();
  ensureToday();
  sanitizeToday();
  if (state.today.started && !state.today.done) enterQuizIfNeeded();
  cur = null;
  applyTheme();
  applySkin();
  $("#view-load").hidden = true;
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
  cloudInit();
  $("#view-today").hidden = false;
  renderAll();
  if (hsOn()){ document.body.classList.add("hs"); showTab("hs"); }
}
load();
})();
