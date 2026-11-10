# 學測金榜

學測英文單字練習網站。字表用大考中心《高中英文參考詞彙表（111 學年度起適用）》，第 1–6 級，共 6,012 個詞條。

## 檔案

| 檔案 | 內容 |
|---|---|
| `index.html` | 頁面骨架 |
| `style.css` | 樣式（亮色／暗色） |
| `app.js` | 程式：程度測驗、每日新字與複習、練習（詞彙題、拼字、錯字複習）、字庫、設定 |
| `words.json` | 單字資料（見下方格式） |
| `examples.json` | 詞彙題用的例句（目前 383 句，第 3–5 級） |
| `chars.json` | 陪讀角色設定 |
| `config.json` | 稱號、雲端同步設定 |
| `passages.json` | 克漏字短文（目前 30 篇、150 格） |
| `fill.json` | 文意選填短文（目前 12 篇、120 格，每篇 10 格 10 個選項） |
| `packs/` | 加密過的額外字庫（要兌換碼） |
| `tools/lock-pack.mjs` | 把字庫加密成兌換碼字庫的小工具 |
| `tools/shrink-images.py` | 把角色圖縮成網站用的小尺寸 |
| `manifest.webmanifest`、`icon-*.png` | 加入主畫面用的圖示 |
| `img/` | 放角色 Q 版圖 |

## 放上 GitHub Pages

1. 把這個資料夾裡的所有檔案推到一個 repo（或 repo 底下的資料夾）。
2. repo 的 Settings → Pages → Branch 選 `main`、資料夾選 `/ (root)`（或你放的資料夾）→ Save。
3. 幾分鐘後網址會是 `https://你的帳號.github.io/repo名稱/`，把這個網址給妹妹就好。

改了檔案之後如果手機上沒更新，把 `index.html` 裡 `style.css?v=1`、`app.js?v=1` 的數字加一。

> 直接在電腦上雙擊 `index.html` 會讀不到 JSON（瀏覽器擋 file://）。本機測試請在資料夾裡跑 `python3 -m http.server 8080`，再開 `http://localhost:8080`。

## 角色和角色圖

第一次打開會先選陪讀角色（六位），選了之後整個網站換成那位的配色；「設定 → 陪讀角色」可以換人。

圖片照這個結構放：

```
img/
  xavier/   idle.png  happy.png  sad.png   ← 沈星回
  zayne/    …                              ← 黎深
  rafayel/  …                              ← 祁煜
  sylus/    …                              ← 秦徹
  caleb/    …                              ← 夏以晝
  aoyin/    …                              ← 敖尹
```

- `idle` 平常、`happy` 答對、`sad` 答錯。建議正方形、透明背景 PNG，寬 300px 左右。
- 圖放在別的地方的話，把 `chars.json` 的 `base` 改成那個資料夾的完整網址（結尾要有 `/`）。
- 每位角色的 `theme` 是配色（亮色／暗色各一組）：`--gold` 主色、`--celadon` 答對、`--seal` 答錯、`--paper` 背景、`--card` 卡片、`--ink` 文字。
- `lines` 是台詞，可以幫每位寫他自己的語氣。
- 圖讀不到時，會顯示主色圓形加名字的一個字。
- **上傳前先縮小**：`python3 tools/shrink-images.py 原圖資料夾 img`，會把圖縮成最長邊 320px 的 PNG（保留透明背景），原圖不動。網站上夠清楚，但拿去印或做周邊會糊。
- 網站已擋住長按「儲存影像」、右鍵存圖和拖曳。截圖和開發者工具還是擋不住，這是所有網頁都做不到的。

## 稱號

每位角色有自己的一套稱號，寫在 `chars.json` 的 `ranks`（由低到高）。升級需要的分數在 `config.json` 的 `rankXp`，六位共用：0、500、1500、3000、5000、8000、12000、17000、23000、30000。換角色時分數不變，只是稱號換成那位的。每天認真做完功課大約 400–900 分。

## words.json 格式

```json
{"id":"abandon","w":"abandon","k":"abandon","pos":"v.","lv":4,"m":[["v.","放棄、拋棄、遺棄"]],"x":"d:abandoned/p:abandoned/i:abandoning/3:abandons"}
```

- `w` 是詞彙表上的原樣（例如 `accomplish(ment)`），`k` 是出題和發音用的主要字形。
- `m` 是中文釋義，每個詞性一組。中文是從 ECDICT（MIT 授權）轉成正體中文，再挑前三個意思，難免有不夠精準的；看到怪的直接改這個檔就好。
- `x` 是字形變化（過去式、分詞、複數等），詞彙題用它把選項變成同一個形態。

## examples.json 格式（加例句）

```json
"abandon": ["The baby kittens were {abandoned} in a box by the road.", "小貓們被丟棄在路邊的箱子裡。", "v.", "d"]
```

- 第一欄的大括號是要挖空的字。
- 最後一欄是字形：`0` 原形、`p` 過去式、`d` 過去分詞、`i` -ing、`3` 第三人稱單數、`s` 複數、`r` 比較級、`t` 最高級。
- 有例句的字，每日測驗會混進詞彙題；「練習 → 詞彙題模擬」只從有例句的字出題。

## 進度存在哪裡

- 每支手機的瀏覽器各自存，每答一題自動存，不用登入。
- 網站內的「紀錄」分頁看得到：每天答題數、各級進度、克漏字題型正確率、最常錯的字、最近紀錄。
- iPhone 請「加入主畫面」再用：Safari 會清掉超過 7 天沒打開的網站資料，主畫面版比較不會。主畫面版和 Safari 版的資料是分開的。
- 「設定 → 怎麼保存進度」有 iPhone 和 Android 的圖文步驟，打開設定時會自動展開對應手機的那一份。
- 「設定 → 備份進度」可以「複製備份文字」（貼到 LINE Keep 或備忘錄存著）或下載備份檔；「還原進度」貼回去或讀檔就能接著背。iPhone 建議用備份文字，比下載檔案方便。

## 開啟雲端同步（選用，Firebase）

開了之後，每個人會自動拿到一組「同步碼」，進度會自動存到雲端；換手機時輸入同步碼就能接回去。不用登入，每個人互不干擾。

1. 到 Firebase console 建一個專案 → 新增網頁應用程式，複製它給的 `firebaseConfig`。
2. Authentication → Sign-in method → 開啟「匿名」。
3. Authentication → Settings → 已授權網域，加上 `你的帳號.github.io`。
4. Firestore Database → 建立資料庫（正式版模式）→ 規則貼上：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sync/{code} {
      allow get, create, update: if request.auth != null && code.size() == 19;
      allow list, delete: if false;
    }
  }
}
```

5. 把 `firebaseConfig` 貼進 `config.json`：

```json
"firebase": {
  "apiKey": "…",
  "authDomain": "…",
  "projectId": "…",
  "appId": "…"
}
```

同步碼就是鑰匙，知道碼的人就能讀寫那份進度，所以請大家不要把自己的碼貼出去。

## 兌換碼解鎖其他字庫（托福、雅思、GRE……）

「設定 → 字庫」可以輸入兌換碼。對的話會解鎖對應的字庫並切換過去，之後在同一個地方切換。進度共用：同一個英文字在學測和托福裡學過一次就算數。

目前內建：「托福」（4,260 字，照 Word List 01–48 的順序）。原始檔不在這個資料夾裡；要換兌換碼，用 lock-pack 重新加密一次即可。

### 做一個新字庫

1. 寫一個原始字庫檔，例如 `toefl.json`（**不要放進公開的 repo**）：

```json
{
  "id": "toefl",
  "name": "托福 3000",
  "levels": ["", "核心", "進階", "高分"],
  "speech": "en-US",
  "words": [
    {"w":"hypothesis","pos":"n.","lv":1,"m":[["n.","假說"]],
     "ex":["Scientists tested the {hypothesis} in three experiments.","科學家用三個實驗檢驗這個假說。","n.","0"]}
  ]
}
```

   - `levels` 是各等級的名稱（第 0 個留空），`lv` 填數字。
   - `ex` 選填，格式和 examples.json 一樣，有例句的字會出現在詞彙題。
   - `speech` 是發音語言；台語這類瀏覽器不會唸的，填 `null`，發音按鈕就會隱藏。
   - 想讓這個字庫的進度和英文字分開，加 `"idPrefix": "tw:"`。

2. 加密：`node tools/lock-pack.mjs toefl.json 你的兌換碼 packs/toefl.lock.json`
3. 在 `config.json` 的 `packs` 加一行：`{"id":"toefl","name":"托福 3000","file":"packs/toefl.lock.json","locked":true}`
4. 只把 `packs/toefl.lock.json` 和 `config.json` 推上去。

### 這個鎖有多安全

字庫內容是加密的（AES-256），沒有兌換碼的人就算打開原始碼也讀不到單字。但兌換碼本身可以被轉傳，拿到碼的人都能解鎖。給朋友用很夠，但如果要賣，需要後端伺服器才能做到「一人一碼、用過就失效」。

## 多益字庫（packs/toeic.json）

- 來源：TOEIC Service List 1.2（1,250 字）＋ Business Service List 1.20（扣掉重複後約 1,120 字），作者 Charles Browne、Brent Culligan，CC BY-SA 4.0。
- 分組：「多益核心 01–10」是 TSL，依出現頻率排序；「商用進階 01–09」是 BSL 裡 TSL 沒有的字。
- 中文：和學測重疊的字沿用學測版校對過的意思，其餘以 ECDICT 為底稿人工校對。
- 這個字庫不用兌換碼，大家都看得到。因為 CC BY-SA 不允許用加密等技術限制別人取用，所以沒有上鎖。
- 進度和學測版分開記（`idPrefix: "toeic:"`），同一個字在多益裡會重新背一次。
- 改中文的方法和 words.json 一樣：打開 `packs/toeic.json`，找到那個字改 `"m"` 裡的中文。

## 授權與來源

設定頁最下面有「授權與來源」，內容寫在 `index.html` 的 `#credits` 區塊；要改文字直接改那裡。
