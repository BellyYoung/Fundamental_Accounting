//Main.js
//Start:2020/8/9
//End:2020/8/14

var mycanvas,ctx;
var BGImg = new Image();
var PlayerImg = new Image();
var TalkImg = new Image();
var MsgImg = new Image();
var PaperImg = new Image();
var ArrowImg = new Image();
var GameOverImg = new Image();
var BtnImg = new Image();

var GameState = true;
var GameStage = 1;
var BankDone = false, SCDone = false, AICDone = false, FSLDone = false;
var GameOver = false;
//
//引导点
var points;
var curPoint;
var mainPoints;
var main_pNum = 0;
//人物相关变量
var playerX, playerY;
var playerW = 36, playerH = 91;
var playerStep = 25;
var frameIndex = 0, rowIndex = 0;
var dis = 0;

var BtnOn = false;

var arrowW = 200, arrowH = 223;
var arrowIndex = 0;

var m_W,m_H;

//鼠标监听变量
var rect;
var mouseX,mouseY;
var paperShow = false;
var msgClear = false;

//四座建筑物坐标检测区域
// SC：证券投资公司 AIC：天使投资公司 FCL：名校贷

var Bank = [0, 0, 423, 256];
var SC = [0, 311, 420, 642];
var AIC = [872, 0, 1265, 255];
var FCL = [872, 288, 1272, 622];
var Btn = [732, 300, 1024, 700];

var Bank_TalkArea = [500, 290, 700, 490];
var Bank_ExitArea = [1110, 558, 1275, 674];

var SC_PaperArea = [713, 464, 858, 576];
var SC_TalkArea = [888, 187, 1602, 422];
var SC_ExitArea = [1100, 562, 1274, 698];

var AIC_TalkArea = [108, 142, 292, 346];
var AIC_ExitArea = [1000, 150, 1370,350];

var FCL_TalkArea = [710, 77,900, 400];
var FCL_ExitArea = [1070, 562, 1273, 693];

var Destination = [[370,185],[370,510],[870 ,185],[870, 510]];

var dx = 0,dy = 0;

//标识当前要去何建筑
var Buildings = {
    bank : 1,
    sc : 2,
    aic : 3,
    fcl : 4
};
var WayTo = -1;
//初始化场景信息
function initScene(scene) {
    //根据场景更换背景图
    BGImg.src = 'image/scene/'+ scene.add[0].pic;
    //初始位置
    playerX = scene.add[1].x;
    playerY = scene.add[1].y;
    m_W = scene.add[1].w;
    m_H = scene.add[1].h;

    points = scene.point;
    curPoint = 0;
    talkScriptList = scene.talk;
    getTalkList();

    paperShow = false;

    if (GameStage == 2){
        console.log("end!");
        gameEnd();
    }

}
//初始化
function init() {
    mycanvas = document.getElementById("c1");
    ctx = mycanvas.getContext("2d");
    rect = mycanvas.getBoundingClientRect();
    PlayerImg.src = 'image/xiaoming.png';
    TalkImg.src = 'image/Talk.png';
    PaperImg.src = 'image/Paper.png';
    GameOverImg.src = 'image/gameover.png';
    ArrowImg.src = 'image/Arrow.png';
    MsgImg.src = 'image/Msg.png';

    pic_load();
    loadBtn();

    m_scene = sceneInfo.main_scene;
    mainPoints = sceneInfo.main_scene.point;
    main_pNum = 0;
    initScene(m_scene);

    PlayerImg.onload = function(){
        requestAnimationFrame(animationLoop);
    }

}
function animationLoop() {
    if (GameState){
        ctx.clearRect(0,0, mycanvas.width, mycanvas.height);

        drawBG();
        drawPlayer();
        drawMsg();

        showArrow(points[curPoint].x, points[curPoint].y);
        showMainArrow(mainPoints[main_pNum].x, mainPoints[main_pNum].y);
        //更新人物走动动画
        dis++;
        if (dis >= 15){
            dis = 0;
            frameIndex += 1;
            if (frameIndex>3){
                frameIndex = 0;
            }
            if (WayTo != -1){
                //1、设置目标点
                setWay();
                //2、设置人物朝向
                setDir();
                //3、根据人物朝向运动
                moveTo();
            }
            arrowIndex += 1;
            if (arrowIndex > 1){
                arrowIndex = 0;
            }
        }
        requestAnimationFrame(animationLoop);
    }
}

function drawBG(){
    ctx.drawImage(BGImg, 0, 0, 1280, 760);

    if (m_scene == sceneInfo.main_scene){
        pic_show();
    }
}
//绘制人物
function drawPlayer() {
    var mX = frameIndex * playerW,
        mY = rowIndex * playerH;
    ctx.drawImage(PlayerImg, mX, mY, playerW, playerH, playerX, playerY, m_W, m_H);

    if (paperShow && m_scene == sceneInfo.sc_scene){
        ctx.drawImage(PaperImg, 75, 0);
    }

}
function drawMsg() {
    if (!msgClear){
        if (BankDone && SCDone && AICDone && FSLDone){
            if (m_scene == sceneInfo.main_scene){
                ctx.drawImage(MsgImg, 350, 120,600, 300);
                ctx.font = "bold 40px Georgia";
                ctx.fillText("请帮助小明选择", 500, 260);
                ctx.fillText("最优的筹资方式", 500, 310);
            }
            GameStage = 2;
            setTimeout(function () {
                msgClear = true;
            },3000);
        }
    }

}
//人物通过鼠标移动
function setWay() {
    //根据要去的建筑物标识，获取最终要到达的位置坐标
    switch (WayTo){
        case Buildings.bank:
            dx = Destination[0][0] ;
            dy = Destination[0][1];
            break;
        case Buildings.sc:
            dx = Destination[1][0];
            dy = Destination[1][1];
            break;
        case Buildings.aic:
            dx = Destination[2][0];
            dy = Destination[2][1];
            break;
        case Buildings.fcl:
            dx = Destination[3][0];
            dy = Destination[3][1];
            break;
    }
}
//判断人物朝向
function setDir() {
    if (dy != playerY && dy != 0){
        if (dy > playerY){
            rowIndex = 0;
        }else if (dy < playerY){
            rowIndex = 3;
        }
    }else {
        if (dx > playerX){
            rowIndex = 2;
        }else if (dx < playerX){
            rowIndex = 1;
        }
    }
}
//根据人物朝向，移动人物到指定位置
function moveTo() {
    switch (rowIndex){
        case 0:
            if (playerY != dy && dy != 0){
                playerY += playerStep;
            }else{
                dy = 0;
            }
            break;
        case 1:
            if (playerX != dx && dx != 0){
                playerX -= playerStep;
            }else{
                dx = 0;
            }
            break;
        case 2:
            if (playerX != dx && dx != 0){
                playerX += playerStep;
            }else{
                dx = 0;
            }
            break;
        case 3:
            if (playerY != dy && dy != 0){
                playerY -= playerStep;
            }else{
                dy = 0;
            }
            break;
    }
    //检测是否到达场景更换点
    //console.log(dx, dy);
    if(dx == 0 || dy == 0){
        checkJump();
    }
}

function AreaCheck(CheckArr) {
    if (mouseX > CheckArr[0] && mouseX < CheckArr[2]){
        if (mouseY > CheckArr[1] && mouseY < CheckArr[3]){
            return true;
        }
    }
    return false;
}

//鼠标事件
function HandleMouseDown(e){
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
   //根据鼠标是否点击到建筑物区域，进行建筑物识别
    if (!GameOver){
        if (m_scene == sceneInfo.main_scene){
            if(AreaCheck(Bank)){
                WayTo = Buildings.bank;
                pic_dchange(WayTo);
            }
            if(AreaCheck(SC)){
                WayTo = Buildings.sc;
                pic_dchange(WayTo);
            }
            if(AreaCheck(AIC)){
                WayTo = Buildings.aic;
                pic_dchange(WayTo);
            }
            if(AreaCheck(FCL)){
                WayTo = Buildings.fcl;
                pic_dchange(WayTo);
            }
        }
        //银行
        if (m_scene == sceneInfo.bank_scene){

            main_pNum = 1;
            //人物对话
            if (AreaCheck(Bank_TalkArea) && !talkDone){
                if (GameStage == 2){
                    GameState = false;
                    drawBG();
                    drawPlayer();
                    showTalk();
                }
            }
            //出口跳转
            if (AreaCheck(Bank_ExitArea)){
                rowIndex = 0;
                m_scene = sceneInfo['main_scene'];
                initScene(m_scene);
                BankDone = true;
            }
        }
        //证券
        if (m_scene == sceneInfo.sc_scene){
            main_pNum = 3;

            if (AreaCheck(SC_PaperArea)){
                paperShow = !paperShow;
                curPoint = 2;

            }
            if (AreaCheck(SC_TalkArea) && !talkDone){
                GameState = false;
                drawBG();
                drawPlayer();
                showTalk();
                curPoint = 1;
            }
            if (AreaCheck(SC_ExitArea)){
                rowIndex = 0;
                m_scene = sceneInfo['main_scene'];
                initScene(m_scene);
                SCDone = true;
            }
        }
        //天使
        if (m_scene == sceneInfo.aic_scene){
            main_pNum = 2;

            //人物对话
            if (AreaCheck(AIC_TalkArea) && !talkDone){
                GameState = false;
                drawBG();
                drawPlayer();
                showTalk();
                curPoint = 1;
            }
            //出口跳转
            if (AreaCheck(AIC_ExitArea)){
                rowIndex = 0;
                m_scene = sceneInfo['main_scene'];
                initScene(m_scene);
                AICDone = true;
            }
        }
        //名校贷
        if (m_scene == sceneInfo.fsl_scene){

            //人物对话
            if (AreaCheck(FCL_TalkArea) && !talkDone){
                GameState = false;
                drawBG();
                drawPlayer();
                showTalk();
                curPoint = 1;
            }
            //出口跳转
            if (AreaCheck(FCL_ExitArea)){
                rowIndex = 0;
                m_scene = sceneInfo['main_scene'];
                initScene(m_scene);
                FSLDone = true;
            }
        }
    }else{
        //重新开始按钮

        if (AreaCheck(Btn)){
            downBtn();
            drawBtn();
            reStart();
        }
    }
   //console.log('x:' + mouseX);
   //console.log('y:' + mouseY);
}

function HandleMouseMove(e){
    var curBuilding = -1;
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    if (!GameOver){
        if (m_scene == sceneInfo.main_scene){
            if(AreaCheck(Bank)){
                curBuilding = Buildings.bank;
                pic_onchange(curBuilding);
            }
            if(AreaCheck(SC)){
                curBuilding = Buildings.sc;
                pic_onchange(curBuilding);
            }
            if(AreaCheck(AIC)){
                curBuilding = Buildings.aic;
                pic_onchange(curBuilding);
            }
            if(AreaCheck(FCL)){
                curBuilding = Buildings.fcl;
                pic_onchange(curBuilding);
            }
        }
    }else{
        if (AreaCheck(Btn)){
            BtnOn = true;
            onBtn();
            drawBtn();
        }else {
            BtnOn = false;
            onBtn();
            drawBtn();
        }

    }
}

window.addEventListener("load",init,false);
window.addEventListener("mousemove",HandleMouseMove,false);
window.addEventListener('mousedown',HandleMouseDown,false);