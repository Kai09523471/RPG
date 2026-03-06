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
