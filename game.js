const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ゲームの状態管理
let gameState = "TITLE"; // TITLE, PLAYING のいずれか

// プレイヤーデータ
let player = { x: 50, y: 50, size: 30, speed: 5 };
let keys = {};

// キー入力の設定
window.addEventListener("keydown", e => {
    keys[e.key] = true;
    // タイトル画面でEnterを押したらゲーム開始
    if (gameState === "TITLE" && e.key === "Enter") {
        gameState = "PLAYING";
    }
});
window.addEventListener("keyup", e => keys[e.key] = false);

// 更新処理
function update() {
    if (gameState === "PLAYING") {
        if (keys["ArrowUp"]) player.y -= player.speed;
        if (keys["ArrowDown"]) player.y += player.speed;
        if (keys["ArrowLeft"]) player.x -= player.speed;
        if (keys["ArrowRight"]) player.x += player.speed;
    }
}

// 描画処理
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "TITLE") {
        // タイトル画面の表示
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("MY GITHUB RPG", canvas.width / 2, 150);
        
        ctx.font = "20px Arial";
        ctx.fillText("Press Enter to Start", canvas.width / 2, 250);
    } 
    else if (gameState === "PLAYING") {
        // ゲーム本編（プレイヤー）の表示
        ctx.fillStyle = "red";
        ctx.fillRect(player.x, player.y, player.size, player.size);
        
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "left";
        ctx.fillText("Adventure Started!", 10, 20);
    }
}

// メインループ
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// プレイヤーの設定
let player = { x: 50, y: 50, size: 30, speed: 5 };

// キー入力を監視
let keys = {};
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

function update() {
    // 移動ロジック
    if (keys["ArrowUp"]) player.y -= player.speed;
    if (keys["ArrowDown"]) player.y += player.speed;
    if (keys["ArrowLeft"]) player.x -= player.speed;
    if (keys["ArrowRight"]) player.x += player.speed;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 画面をクリア
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.size, player.size); // プレイヤーを描画
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop); // 毎秒60回ループ
}

gameLoop();



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 画面いっぱいにリサイズ
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// ゲーム設定
const TILE_SIZE = 40;
let gameState = "TITLE";

// プレイヤー
let player = { x: 80, y: 80, size: 30, speed: 4 };
let keys = {};

// ステージデータ (0:芝生, 1:木) 
// 画面いっぱいに広げるためにループで描画します
const mapWidth = Math.ceil(window.innerWidth / TILE_SIZE);
const mapHeight = Math.ceil(window.innerHeight / TILE_SIZE);

window.addEventListener("keydown", e => {
    keys[e.key] = true;
    if (gameState === "TITLE" && e.key === "Enter") gameState = "PLAYING";
});
window.addEventListener("keyup", e => keys[e.key] = false);

function update() {
    if (gameState !== "PLAYING") return;

    let nextX = player.x;
    let nextY = player.y;

    if (keys["ArrowUp"]) nextY -= player.speed;
    if (keys["ArrowDown"]) nextY += player.speed;
    if (keys["ArrowLeft"]) nextX -= player.speed;
    if (keys["ArrowRight"]) nextX += player.speed;

    // 簡単な画面端の衝突判定
    if (nextX > 0 && nextX < canvas.width - player.size) player.x = nextX;
    if (nextY > 0 && nextY < canvas.height - player.size) player.y = nextY;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "TITLE") {
        drawTitle();
    } else {
        drawForest();
        // プレイヤー（勇者）
        ctx.fillStyle = "#ffcc00"; // 勇者っぽい色
        ctx.fillRect(player.x, player.y, player.size, player.size);
    }
}

function drawForest() {
    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            // 画面の端っこを「木(1)」にするロジック
            const isEdge = x === 0 || y === 0 || x === mapWidth - 1 || y === mapHeight - 1;
            
            if (isEdge) {
                ctx.fillStyle = "#2d5a27"; // 深緑（木）
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                // 木のディテール（小さな四角）
                ctx.fillStyle = "#1e3d1a";
                ctx.fillRect(x * TILE_SIZE + 10, y * TILE_SIZE + 10, 20, 20);
            } else {
                ctx.fillStyle = "#55a630"; // 黄緑（芝生）
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

function drawTitle() {
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "bold 48px sans-serif";
    ctx.fillText("FOREST QUEST", canvas.width / 2, canvas.height / 2 - 40);
    ctx.font = "24px sans-serif";
    ctx.fillText("Press Enter to Start", canvas.width / 2, canvas.height / 2 + 40);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();
