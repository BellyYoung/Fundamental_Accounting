//Animation.js
//Start:2020/8/15 0:23
//End:2020/8/15 3:05


var endingImg = new Image();

var addAnim = 1;
var Animation_num = -1;

var each_Width = 1280, each_Height = 720;

function drawAnimation() {

    if (Animation_num >= 0){

        if (Animation_num >= 33){

            return;
            addAnim = -1;
        }
        ctx.drawImage(endingImg, (1-Animation_num/32)*each_Width/2, (1-Animation_num/32)*each_Height/2,
            Animation_num/32*each_Width, Animation_num/30*each_Height);

        Animation_num += addAnim;
    }
}

function  startAnimation(){

    Animation_num=0;
    addAnim=1;

}

var ReFresh;
function upDateEnding() {
    drawAnimation();
    if (Animation_num >= 33){
        drawBtn();
    }
    ReFresh = setTimeout(upDateEnding, 50);
}