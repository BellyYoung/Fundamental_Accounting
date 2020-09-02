//Scenes.js
//Start:2020/8/9
//End:2020/8/14

var m_scene;

//对话数据存储列表
var talkScriptList;
//当前对话列表
var talkScript;
//
var talkIndex = 0;

var talkDone = false;


//跳转页面
function checkJump() {
    var jump = m_scene.jump;
    var jump_scene;

    for (var i = 0; i < jump.length; i++){
        jump_scene = jump[i];
        if (playerX == jump_scene.at.x && playerY == jump_scene.at.y){
            //console.log('success');
            WayTo = -1;
            rowIndex = 0;

            m_scene = sceneInfo[jump_scene.to];

            if (m_scene == sceneInfo.bank_scene){
                rowIndex = 3;
            }

            initScene(m_scene);
            return;
        }else{
            continue;
        }
    }
}

function showArrow(ax, ay) {
    if (m_scene != sceneInfo.main_scene) {
        var AX = arrowIndex * arrowW,
            AY = 0;
        ctx.drawImage(ArrowImg, AX, AY, arrowW, arrowH, ax, ay, 50, 75);
    }
}

function showMainArrow(ax,ay) {
    if (m_scene == sceneInfo.main_scene && !FSLDone){
        var AX = arrowIndex * arrowW,
            AY = 0;
        ctx.drawImage(ArrowImg, AX, AY, arrowW, arrowH, ax, ay, 50, 75);
    }
}

function getTalkList() {
    //根据游戏阶段的不同获取不同的对话内容
        talkScript = talkScriptList["t" + GameStage];
        //对话索引
        talkIndex = 0;
        talkDone = false;
}


function showTalk() {
    if (talkIndex < talkScript.length){
        var talkObject = talkScript[talkIndex];
        //绘制对话

        if(talkIndex == 0){
            //绘制对话框
            ctx.drawImage(TalkImg, talkObject.x, talkObject.y);
            talkIndex++;

            talkDone = true;
            addText(talkObject.msg,talkObject.x,talkObject.y);
        }
    }
}

function addText(tosplitFont,sx,sy) {
    var arr = [];
    var sub = 0;
    var time = 0;
    var x = sx + 30,y = sy + 35;

    ctx.font = "bold 20px Georgia";
    ctx.fillStyle = "black";
    arr = tosplitFont.split('');

    //循环输出
    for (var i = 0; i < arr.length; i++){
        setTimeout(function () {
            ctx.fillText(arr[sub], x, y);
            sub += 1;
            x += ctx.measureText(arr[sub]).width;
            //换行
            if (sub % 12 == 0){
                x = sx + 30;
                y += 25;
            }
        },time);
        time += 50;
    }
    setTimeout(function () {
        GameState = true;
        requestAnimationFrame(animationLoop);
    },2000);
}

function gameEnd() {
    if (m_scene == sceneInfo.bank_scene){
        endingImg.src = "image/endings/bank_end.jpg";
}
    if (m_scene == sceneInfo.sc_scene){
        endingImg.src = "image/endings/sc_end.jpg";
    }
    if (m_scene == sceneInfo.aic_scene){
        endingImg.src = "image/endings/aic_end.jpg";
    }
    if (m_scene == sceneInfo.fsl_scene){
        endingImg.src = "image/endings/fsl_end.jpg";
    }
    startAnimation();
    GameState = false;
    GameOver = true;
    upDateEnding();
}

function loadBtn() {
    console.log("loadBtn");
    BtnImg.src = "image/button/startbtn2_up.png";
}
function onBtn() {
    console.log("onBtn");
    if (BtnOn){
        BtnImg.src = "image/button/startbtn2_normal.png";
    }else {
        loadBtn();
    }
}
function downBtn() {
    console.log("downBtn");
    BtnImg.src = "image/button/startbtn2_down.png";
}

function drawBtn() {
    console.log("drawBtn");
    ctx.drawImage(BtnImg, 800,450);
}

function reStart() {
    clearTimeout(ReFresh);
    ReFresh = null;
    GameState = true;
    GameStage = 1;
    GameOver = false;
    BankDone=AICDone=SCDone=FSLDone=false;
    m_scene = sceneInfo.main_scene;
    main_pNum = 0;
    msgClear = false;
    initScene(m_scene);
    drawBG();
    drawPlayer();
    requestAnimationFrame(animationLoop);

}