//Buildings.js
//Start:2020/8/14
//End:2020/8/15

var BankImg = new Image();
var SCImg = new Image();
var AICImg = new Image();
var FSLImg = new Image();

var bank_X = -15,bank_Y = 0,bank_W = 465,bank_H = 380;
var sc_X = 30,sc_Y = 263,sc_W = 420,sc_H = 420;
var aic_X = 868,aic_Y = 0,aic_W = 410,aic_H = 310;
var fsl_X = 876,fsl_Y = 274,fsl_W = 380,fsl_H = 360;


function pic_load(){
    BankImg.src = "image/buildings/银行_up.png";
    SCImg.src = "image/buildings/证券公司_up.png";
    AICImg.src = "image/buildings/天使投资公司_up.png";
    FSLImg.src = "image/buildings/名校贷_up.png";
}

function pic_show() {
    ctx.drawImage(BankImg, bank_X, bank_Y, bank_W, bank_H);
    ctx.drawImage(SCImg, sc_X, sc_Y, sc_W, sc_H);
    ctx.drawImage(AICImg, aic_X, aic_Y, aic_W, aic_H);
    ctx.drawImage(FSLImg, fsl_X, fsl_Y, fsl_W, fsl_H);
}

function pic_dchange(building) {
    switch (building){
        case Buildings.bank:
            BankImg.src = "image/buildings/银行_down.png";
            break;
        case Buildings.sc:
            SCImg.src = "image/buildings/证券公司_down.png";
            break;
        case Buildings.aic:
            AICImg.src = "image/buildings/天使投资公司_down.png";
            break;
        case Buildings.fcl:
            FSLImg.src = "image/buildings/名校贷_down.png";
            break;
    }

}

function pic_onchange(on_building) {
    switch (on_building){
        case Buildings.bank:
            BankImg.src = "image/buildings/银行_normal.png";
            SCImg.src = "image/buildings/证券公司_up.png";
            AICImg.src = "image/buildings/天使投资公司_up.png";
            FSLImg.src = "image/buildings/名校贷_up.png";
            break;
        case Buildings.sc:
            BankImg.src = "image/buildings/银行_up.png";
            SCImg.src = "image/buildings/证券公司_normal.png";
            AICImg.src = "image/buildings/天使投资公司_up.png";
            FSLImg.src = "image/buildings/名校贷_up.png";
            break;
        case Buildings.aic:
            BankImg.src = "image/buildings/银行_up.png";
            SCImg.src = "image/buildings/证券公司_up.png";
            AICImg.src = "image/buildings/天使投资公司_normal.png";
            FSLImg.src = "image/buildings/名校贷_up.png";
            break;
        case Buildings.fcl:
            BankImg.src = "image/buildings/银行_up.png";
            SCImg.src = "image/buildings/证券公司_up.png";
            AICImg.src = "image/buildings/天使投资公司_up.png";
            FSLImg.src = "image/buildings/名校贷_normal.png";
       break;
    }
}