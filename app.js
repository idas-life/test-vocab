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
let CFG = null, BANK = [], ALLW = [], PACK_WORDS = {}, PACKS = [], EX = {}, PASS = [], FILL = [], CHARS = { base:"img/", characters:[] }, FB_CFG = null;
let WORDS = [], BYID = new Map(), BANK_IDS = new Set();

function prepWord(r){
  const m = Array.isArray(r.m) && r.m.length ? r.m : [[r.pos || "", r.zh || ""]];
  const w = { id:r.id, w:r.w, k:r.k || r.w, pos:r.pos || "", lv:r.lv || 0, m, x:r.x || "", tag:r.tag || "", ph:r.ph || "", o:r.o || 0 };
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
           placement:null, drills:{ seen:[], pseen:[], fseen:[], right:0, total:0 }, log:[], sync:{ code:"" }, unlocks:{}, packStart:{},
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
function curPackId(){ const id = state.settings.pack || "gsat"; return PACK_WORDS[id] ? id : "gsat"; }
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
function rebuild(){
  const custom = state.custom.filter(c => c && c.w && c.zh && !BANK_IDS.has(c.w.toLowerCase()))
    .map(c => prepWord({ id:c.w.toLowerCase(), w:c.w, k:c.w, pos:c.pos || "", lv:0, m:[[c.pos || "", c.zh]], ex:c.ex || "", tag:"M" }));
  BYID = new Map();
  (PACK_WORDS[curPackId()] || []).forEach(w => BYID.set(w.id, w));
  Object.keys(PACK_WORDS).forEach(pk => PACK_WORDS[pk].forEach(w => { if (!BYID.has(w.id)) BYID.set(w.id, w); }));
  custom.forEach(w => { if (!BYID.has(w.id)) BYID.set(w.id, w); });
  WORDS = (PACK_WORDS[curPackId()] || BANK).concat(custom);
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
  Object.assign(meta, { name:data.name || meta.name, levels:data.levels || meta.levels || [], speech:data.speech !== undefined ? data.speech : meta.speech, exam:data.exam || meta.exam, idPrefix:data.idPrefix || meta.idPrefix, order:!!data.order });
  addPackWords(meta, data.words || []);
}
async function loadUnlocked(){
  for (const meta of PACKS){
    if (PACK_WORDS[meta.id]) continue;
    if (!meta.locked && meta.file){ try { mountPack(meta, await getJSON(meta.file)); } catch (e) {} continue; }
    const code = state.unlocks[meta.id];
    if (!meta.locked || !code) continue;
    try { mountPack(meta, await decryptPack(meta.file, code)); } catch (e) {}
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
  for (const meta of PACKS){
    if (!meta.locked || PACK_WORDS[meta.id]) continue;
    try {
      const data = await decryptPack(meta.file, code);
      mountPack(meta, data); state.unlocks[meta.id] = code;
      switchPack(meta.id);
      msg.textContent = `解鎖了「${meta.name}」，已經切換過去。`;
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
function daysLeft(){ return Math.max(0, EXAM_DAY - dayNum()); }

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
  if (r >= 6) return `每天 ${daily} 個新字，學測前可以把第 ${startLv}–6 級都背過一輪。`;
  if (r < startLv) return `每天 ${daily} 個新字，學測前還背不完第 ${startLv} 級。`;
  return `每天 ${daily} 個新字，學測前可以背完第 ${startLv}–${r} 級。要全部背完，每天大約要 ${neededDaily(startLv)} 個。`;
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
  const pool = shuffle(WORDS.filter(x => x.id !== w.id && x.tag !== "M" && filter(x)));
  const picks = [];
  for (const x of pool){
    if (picks.length >= n) break;
    if (conflicts(w, x) || picks.some(p => conflicts(p, x))) continue;
    picks.push(x);
  }
  if (picks.length < n && !strict){
    for (const x of shuffle(WORDS.filter(x => x.id !== w.id && x.tag !== "M"))){
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
function say(text){
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
  const left = EXAM_DAY - t;
  if (!isGsat()){ const pk = curPack(); $("#countdown").innerHTML = `目前字庫：<b class="pk">${esc(pk.name)}</b>` + deco(1, "stk-cd"); }
  else $("#countdown").innerHTML = (left > 0 ? `離學測（1 月 22 日）還有<b>${left}</b>天` : left === 0 ? "今天學測，加油！" : "學測結束了，辛苦了！") + deco(1, "stk-cd");
  if (pulsePlaque){ pulsePlaque = false; pl.classList.remove("pulse"); void pl.offsetWidth; pl.classList.add("pulse"); }
}
function sayBtn(w){ return canSay && curPack().speech !== null && curPack().speech !== "" ? `<button class="say" type="button" data-act="say" data-w="${esc(w)}" aria-label="唸出 ${esc(w)}">${SPEAKER}<span>發音</span></button>` : ""; }
function lvTag(w){ if (w.tag === "M") return `<span class="tag">自訂</span>`; const pk = PACKS.find(p => p.id === w.pk); return `<span class="tag lv">${w.pk && w.pk !== "gsat" && pk ? esc(pk.name) + "・" : ""}${esc(lvName(w.lv, pk))}</span>`; }
function metaRow(w){ return `<p class="meta">${lvTag(w)}<span class="pos" lang="en">${esc(w.pos)}</span>${w.ph ? `<span class="ph" lang="en">/${esc(w.ph)}/</span>` : ""}</p>`; }
function sensesHtml(w){ return `<ul class="senses">${w.m.map(s => `<li>${s[0] ? `<span class="pos" lang="en">${esc(s[0])}</span>` : ""}${esc(s[1])}</li>`).join("")}</ul>`; }
function exLine(w){
  if (!w.ex) return "";
  const s = esc(w.ex.s).replace(/\{([^}]+)\}/, "<b>$1</b>");
  return `<p class="ex" lang="en">${s}${w.ex.zh ? `<span class="exzh" lang="zh-Hant">${esc(w.ex.zh)}</span>` : ""}</p>`;
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
function askText(q){ return q.type === "en2zh" ? "選出中文意思" : q.type === "zh2en" ? "選出對應的英文字" : "選出最適合填入空格的字"; }
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
      <div class="plan-note"><p>從第 ${ch} 級開始共 ${remainingFrom(ch)} 個字，離學測 ${daysLeft()} 天。</p><p>${esc(paceText(test.daily, ch))}</p><p class="hint">之後在「設定」隨時可以改。</p></div>
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
      <article class="card">${deco(T.pos, "stk-card")}${metaRow(w)}${promptHtml(cur, w)}${answered ? revealHtml(cur, w) : ""}${answered && ok ? SEAL() : ""}</article>
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
const MODE_NAME = { cloze:"詞彙題", spell:"拼字", weak:"錯字複習", passage:"克漏字", fill:"文意選填", daily:"每日功課", test:"程度測驗" };
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
        <li><button type="button" class="mode" data-drill="go" data-mode="cloze"><b>詞彙題模擬</b><span>例句挖一個空格，四個詞性相同的選項，跟學測詞彙題一樣考「哪個字放進句子才通」。題庫 ${nEx} 句。</span></button></li>
        <li><button type="button" class="mode" data-drill="go" data-mode="spell"><b>拼字</b><span>看中文拼出英文，練中譯英和作文用得到的字。${nLearned ? `從學過的 ${nLearned} 個字出題。` : "還沒學過字的話，會先從起始級數出題。"}</span></button></li>
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
        : `<div class="spell"><label class="vh" for="spellIn">輸入英文拼字</label><input id="spellIn" class="field" lang="en" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done">
           <button class="btn skip" type="button" data-drill="skip">跳過</button><button class="btn primary" type="button" data-drill="check">確定</button></div>
           <p class="hint">不會的話按「跳過」看答案。</p>`}`;
    hookImgs(v); return;
  }
  const ok = q.picked === q.id;
  let fb = "";
  if (answered){ const right = q.type === "en2zh" ? shortZh(w) : q.type === "cloze" ? q.form : w.k; fb = ok ? `<p class="feedback ok" aria-live="polite">答對了。</p>` : `<p class="feedback no" aria-live="polite">答錯了，正確是「${esc(right)}」。</p>`; }
  v.innerHTML = buddyHtml(answered ? (ok ? "bounce" : "shake") : "") + head + `
    <article class="card">${deco(drill.pos, "stk-card")}${metaRow(w)}${promptHtml(q, w)}${answered ? revealHtml(q, w) : ""}${answered && ok ? SEAL() : ""}</article>
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
      ${w.tag === "M" ? `<p><button type="button" class="btn danger small" data-lib="del" data-id="${esc(w.id)}">${ui.delArm === w.id ? "再按一次確認刪除" : "刪除這個字"}</button></p>` : ""}</div>`;
  }
  return `<li class="row"><button type="button" class="row-main" data-lib="toggle" data-id="${esc(w.id)}" aria-expanded="${open}">
    <span class="row-word" lang="en">${esc(w.w)}<small>${w.tag === "M" ? "自訂" : (isGsat() ? w.lv + " 級" : esc(lvName(w.lv)))}</small></span><span class="row-zh">${esc(shortZh(w))}</span>
    <i class="dot s${s}" aria-hidden="true"></i><span class="vh">${["未學","學習中","熟記"][s]}</span></button>${more}</li>`;
}
function renderLib(){
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
}
function refocusRow(id, sel){ const el = document.querySelector(`[data-lib="${sel}"][data-id="${CSS.escape(id)}"]`); if (el && kbd) el.focus({ preventScroll:true }); }
function deleteCustom(id){
  state.custom = state.custom.filter(c => c.w.toLowerCase() !== id);
  delete state.prog[id];
  ui.open = null; ui.delArm = null;
  rebuild(); sanitizeToday(); save(); renderAll();
}
function addCustom(){
  const f = $("#addForm"), get = n => f.querySelector(`[name="${n}"]`).value.trim();
  const w = get("w").replace(/\s+/g, " "), zh = get("zh"), pos = get("pos"), ex = get("ex");
  const msg = $("#addMsg");
  const fail = t => { msg.textContent = t; msg.className = "form-msg err"; };
  if (!w || !zh) return fail("英文單字和中文意思都要填。");
  if (!/^[A-Za-z][A-Za-z '\-]*$/.test(w)) return fail("英文單字只能用英文字母、空格、連字號或撇號。");
  if (BYID.has(w.toLowerCase()) || WORDS.some(x => x.k.toLowerCase() === w.toLowerCase())) return fail(`字庫裡已經有 ${w} 了。`);
  state.custom.push({ w, zh, pos, ex });
  rebuild(); save(); renderLib();
  f.querySelectorAll("input").forEach(i => { i.value = ""; });
  msg.textContent = `已加入 ${w}。之後抽新字時會優先抽到它。`; msg.className = "form-msg ok";
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

/* ---------- cloud sync (optional, Firebase) ---------- */
let fb = null, cloudTimer = null, cloudState = "off";
function syncNote(t){ cloudState = t; const el = $("#syncNote"); if (el) renderSync(); }
function newCode(){ const a = "abcdefghjkmnpqrstuvwxyz23456789"; let s = ""; const r = new Uint32Array(16); crypto.getRandomValues(r); r.forEach(x => s += a[x % a.length]); return s.match(/.{4}/g).join("-"); }
function loadScript(src){ return new Promise((ok, no) => { const el = document.createElement("script"); el.src = src; el.onload = ok; el.onerror = no; document.head.appendChild(el); }); }
async function cloudInit(){
  if (!FB_CFG || !FB_CFG.apiKey) return;
  try {
    const V = "10.12.2", base = `https://www.gstatic.com/firebasejs/${V}/`;
    await loadScript(base + "firebase-app-compat.js");
    await Promise.all([loadScript(base + "firebase-auth-compat.js"), loadScript(base + "firebase-firestore-compat.js")]);
    firebase.initializeApp(FB_CFG);
    await firebase.auth().signInAnonymously();
    fb = firebase.firestore();
    if (!state.sync.code){ state.sync.code = newCode(); }
    const snap = await fb.collection("sync").doc(state.sync.code).get();
    if (snap.exists){
      const d = snap.data();
      if ((d.updatedAt || 0) > (state.updatedAt || 0)){ adoptRemote(d.data, state.sync.code); }
    }
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
    syncNote("on"); cloudSave(true);
  } catch (e) { fb = null; syncNote("fail"); }
}
function adoptRemote(json, code){
  const remote = normalize(JSON.parse(json));
  remote.sync = { code };
  state = remote; rebuild(); migrateRanks(); ensureToday(); sanitizeToday(); cur = null;
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
  applyTheme(); applySkin(); renderAll();
}
function cloudSave(now){
  if (!fb || !state.sync.code) return;
  clearTimeout(cloudTimer);
  cloudTimer = setTimeout(async () => {
    try {
      const data = JSON.stringify(state);
      if (data.length > 900000) { syncNote("big"); return; }
      await fb.collection("sync").doc(state.sync.code).set({ data, updatedAt:state.updatedAt || Date.now(), name:(charObj() || {}).name || "" });
      syncNote("on");
    } catch (e) { syncNote("fail"); }
  }, now ? 0 : 2500);
}
async function cloudLoad(code){
  code = String(code || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "").replace(/(.{4})(?=.)/g, "$1-");
  if (!fb){ $("#syncMsg").textContent = "雲端同步還沒設定好。"; return; }
  if (code.length < 19){ $("#syncMsg").textContent = "同步碼是 16 個字母或數字（4 個一組）。"; return; }
  try {
    const snap = await fb.collection("sync").doc(code).get();
    if (!snap.exists){ $("#syncMsg").textContent = "找不到這個同步碼，請再確認一次。"; return; }
    adoptRemote(snap.data().data, code); save();
    $("#syncMsg").textContent = `讀取完成：${Object.keys(state.prog).length} 個字的進度、${state.xp} 分。`;
  } catch (e) { $("#syncMsg").textContent = "連不上雲端，等一下再試。"; }
}
function renderSync(){
  const el = $("#syncNote"); if (!el) return;
  if (!FB_CFG || !FB_CFG.apiKey){ el.innerHTML = `<p class="hint">這個網站還沒開雲端同步，進度只存在這支手機。可以用下方的備份檔搬家。</p>`; return; }
  const msg = { on:"已開啟。每次作答都會自動存到雲端。", fail:"連不上雲端，進度先存在手機裡，連上後會再同步。", big:"進度太大，雲端存不下，請用備份檔。", off:"正在連線……" }[cloudState] || "";
  el.innerHTML = `<p class="hint">${msg}</p>
    ${state.sync.code ? `<p class="code"><span>你的同步碼</span><b lang="en">${esc(state.sync.code)}</b><button class="btn small" type="button" id="copyCode">複製</button></p>
    <p class="hint">換手機、或從主畫面圖示改開時，在新的地方輸入這組碼，就能接著背。同步碼等於鑰匙，不要給別人。</p>` : ""}
    <div class="spell"><label class="vh" for="codeIn">輸入同步碼</label><input id="codeIn" class="field" lang="en" placeholder="xxxx-xxxx-xxxx-xxxx" autocomplete="off" autocapitalize="off" spellcheck="false">
    <button class="btn small" type="button" id="codeLoad">讀取</button></div>
    <p class="hint" id="syncMsg" aria-live="polite"></p>`;
}

/* ---------- settings ---------- */
let resetArmed = false, resetTimer = null, delTimer = null;
function setPressed(sel, v){ document.querySelectorAll(sel + " button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.v === v))); }
function renderSet(){
  const s = state.settings;
  const unlocked = PACKS.filter(p => PACK_WORDS[p.id]);
  $("#packGroup").hidden = false;
  const hsU = !!(state.hs && state.hs.ok);
  $("#sPack").innerHTML = unlocked.map(p => `<button type="button" data-v="${esc(p.id)}" aria-pressed="${!hsOn() && p.id === curPackId()}">${esc(p.name)}</button>`).join("") + (hsU ? `<button type="button" data-v="hs" aria-pressed="${hsOn()}">同等學力</button>` : "");
  $("#sPack").hidden = unlocked.length + (hsU ? 1 : 0) < 2;
  $("#startGroup").hidden = !isGsat();
  const ps = $("#packStart"), PLs = packLevels();
  ps.hidden = isGsat() || PLs.length < 2;
  if (!ps.hidden) ps.innerHTML = `<label>從哪裡開始抽新字 <select id="packStartSel" class="field sel">${PLs.map(lv => `<option value="${lv}"${lv === startLv() ? " selected" : ""}>${esc(lvName(lv))}</option>`).join("")}</select></label><p class="hint">照順序往後抽；前面還沒學的字，會等後面都抽完才回頭。</p>`;
  setPressed("#sStart", String(s.startLv));
  setPressed("#sDaily", String(s.daily));
  setPressed("#sSay", s.autoSay ? "on" : "off");
  setPressed("#sTheme", s.theme);
  const pl = state.placement;
  $("#startHint").textContent = (pl && pl.scores ? `程度測驗建議第 ${pl.rec} 級。` : "") + `新字會先從第 ${s.startLv} 級抽，抽完再往上一級；比它低的級數最後才抽。`;
  $("#dailyHint").textContent = !isGsat() ? `「${curPack().name}」還有 ${remainingFrom(1)} 個沒學過的字。今天還沒按開始的話立刻生效，否則從明天起。` : `從第 ${s.startLv} 級開始還有 ${remainingFrom(s.startLv)} 個沒學過的字，離學測 ${daysLeft()} 天。` + paceText(s.daily, s.startLv) + " 今天還沒按開始的話立刻生效，否則從明天起。";
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
  if (cloudState === "on" && state.sync && state.sync.code) return 0;
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
const HS_FILES = ["hs/115.json"];
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
  if (kind === "paper") ids = s.papers[0].ids.filter(id => hsGradable(HS.byId.get(id)));
  else if (kind === "rand") ids = shuffle(s.qs.filter(hsGradable).map(q => q.id)).slice(0, 10);
  else if (kind === "wrong") ids = shuffle(hsState().wrong.filter(id => HS.byId.has(id) && HS.byId.get(id).subName === s.name));
  if (!ids.length) return;
  hsv.run = { kind, ids, pos:0, picks:{}, t0:Date.now() };
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
    const p = s.papers[0], essay = s.qs.find(q => q.t === "essay");
    const secs = p.secs.map((sc, i) => { const qs = gq.filter(q => q.sec === i); if (!qs.length) return ""; const t = hsStat(qs); return `<li>${esc(sc.name)}：${qs.length} 題，每題 ${sc.pts} 分${t.done ? `，做過 ${t.done} 題、答對 ${t.right}` : ""}</li>`; }).join("");
    v.innerHTML = hsBuddy("") + `<p class="step"><button type="button" class="linkbtn" data-hs="home">← 五科</button></p><h2>${esc(s.name)}</h2>
      <ul class="hsinfo">${secs}</ul>
      <ul class="modes">
        <li><button type="button" class="mode" data-hs="go" data-v="paper"><b>${p.year} 年度整份</b><span>照考卷順序做完 ${p.ids.filter(id => hsGradable(HS.byId.get(id))).length} 題，最後算分數。正式考試 ${p.mins} 分鐘。</span></button></li>
        <li><button type="button" class="mode" data-hs="go" data-v="rand"><b>隨機 10 題</b><span>零碎時間用，題目打亂抽。</span></button></li>
        <li><button type="button" class="mode" data-hs="go" data-v="wrong"${w ? "" : " disabled"}><b>錯題重做</b><span>${w ? `目前有 ${w} 題答錯過，重做答對就會移出錯題本。` : "還沒有答錯的題目。"}</span></button></li>
        ${essay ? `<li><button type="button" class="mode" data-hs="essay"><b>作文練習</b><span>${p.year} 年度題目：${esc(essay.q.split("<br>")[0].replace("題目：", ""))}。寫的內容會存在這支手機。</span></button></li>` : ""}
      </ul>`;
    hookImgs(v); return;
  }
  if (hsv.page === "essay"){
    const e = s.qs.find(q => q.t === "essay"), txt = h.essay[e.id] || "";
    v.innerHTML = `<p class="step"><button type="button" class="linkbtn" data-hs="back">← ${esc(s.name)}</button></p><h2>作文（40 分）</h2>
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
    v.innerHTML = hsBuddy(right / qs.length >= 0.6 ? "bounce" : "shake") + `<h2>${esc(s.name)}・結果</h2>
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
  v.innerHTML = hsBuddy(answered ? (ok ? "bounce" : "shake") : "") + `<p class="step"><span>${esc(s.name)}・${esc(q.secName)}</span>${R.pos + 1}／${R.ids.length}${R.kind !== "paper" ? `・${q.year} 年度第 ${q.n} 題` : ""}<button type="button" class="linkbtn" data-hs="quit">結束</button></p>
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
  else if (a === "essay"){ hsv.page = "essay"; renderHs(); window.scrollTo(0, 0); }
  else if (a === "pick") hsAnswer(+val);
  else if (a === "fill"){ const i = $("#hsIn"); hsAnswer(i ? i.value.trim() : ""); }
  else if (a === "skip") hsAnswer("");
  else if (a === "key"){ const i = $("#hsIn"); if (i){ const p = i.selectionStart == null ? i.value.length : i.selectionStart; i.value = i.value.slice(0, p) + val + i.value.slice(i.selectionEnd == null ? p : i.selectionEnd); i.focus(); i.setSelectionRange(p + val.length, p + val.length); } }
  else if (a === "next") hsNext();
  else if (a === "quit"){ const R = hsv.run; if (R && Object.keys(R.picks).length){ R.ids = R.ids.slice(0, R.pos + (R.picks[R.ids[R.pos]] !== undefined ? 1 : 0)); R.cut = true; if (R.ids.length){ R.pos = R.ids.length - 1; hsNext(); return; } } hsv.page = "sub"; hsv.run = null; renderHs(); }
}

/* ---------- navigation ---------- */
function renderAll(){
  renderHeader(); renderToday();
  if (!$("#view-drill").hidden) renderDrill();
  if (!$("#view-lib").hidden) renderLib();
  if (!$("#view-set").hidden) renderSet();
  if (!$("#view-log").hidden) renderLog();
  if (!$("#view-hs").hidden) renderHs();
}
function showTab(t){
  if (test) return;
  ui.bkMsg = "";
  ["today", "drill", "lib", "log", "set", "hs"].forEach(k => { $("#view-" + k).hidden = k !== t; });
  document.querySelectorAll("[data-tab]").forEach(b => { if (b.dataset.tab === t) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); });
  if (t === "today") renderToday();
  if (t === "drill") renderDrill();
  if (t === "lib") renderLib();
  if (t === "set") renderSet();
  if (t === "log") renderLog();
  if (t === "hs") renderHs();
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
  if (b.dataset.lib === "toggle"){ ui.open = ui.open === id ? null : id; ui.delArm = null; renderLib(); refocusRow(id, "toggle"); return; }
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
  if (e.target.closest("#retestBtn")){ showTab("today"); startTest(); renderToday(); focusMain(); return; }
  if (e.target.closest("#exportBtn")){ exportBackup(); return; }
  if (e.target.closest("#copyBackup")){ copyBackup(); return; }
  if (e.target.closest("#restoreBtn")){ restoreFromText(); return; }
  if (e.target.closest("#redeemBtn")){ redeem($("#redeemIn").value); return; }
  if (e.target.closest("#copyCode")){ try { navigator.clipboard.writeText(state.sync.code).then(() => { $("#syncMsg").textContent = "已複製。"; }, () => { $("#syncMsg").textContent = "請手動抄下這組碼。"; }); } catch (err) { $("#syncMsg").textContent = "請手動抄下這組碼。"; } return; }
  if (e.target.closest("#codeLoad")){ cloudLoad($("#codeIn").value); return; }
  if (e.target.closest("#resetBtn")){
    if (!resetArmed){
      resetArmed = true; renderSet();
      clearTimeout(resetTimer); resetTimer = setTimeout(() => { resetArmed = false; renderSet(); }, 4000);
      return;
    }
    clearTimeout(resetTimer); resetArmed = false;
    const keep = { custom:state.custom, settings:state.settings, sync:state.sync };
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
    ]).then(r => { const cfg = r[3]; CFG = cfg; PASS = Array.isArray(r[4]) ? r[4] : []; FILL = Array.isArray(r[5]) ? r[5] : []; if (cfg && cfg.firebase && cfg.firebase.apiKey) FB_CFG = cfg.firebase; if (cfg && Array.isArray(cfg.rankXp) && cfg.rankXp.length) RANK_XP = cfg.rankXp.map(x => Math.max(0, +x || 0)).sort((a, b) => a - b); if (cfg && Array.isArray(cfg.ranks) && cfg.ranks.length){
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
