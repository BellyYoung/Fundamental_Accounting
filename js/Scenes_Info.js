//Scenes_Info.js
//Start:2020/8/9
//End:2020/8/14

//存放脚本数据
var sceneInfo = {
    main_scene:{
        add:[
            {chara:"BG", pic:"BG.jpg", x:0, y:0,w:0, h:0},
            {chara:"xiaoming", pic: "player.png", x:620, y:510, w:50, h:90},
        ],
        talk:{
            t1:[
                {msg:"请帮助小明选择最优的筹资方式.",x:611 ,y:415},
            ],
            t2:[
                {msg:"",x:611 ,y:415},
            ],
        },
        jump:[
            {at: {x:Destination[0][0],y:Destination[0][1]}, to: "bank_scene"},
            {at: {x:Destination[1][0],y:Destination[1][1]}, to: "sc_scene"},
            {at: {x:Destination[2][0],y:Destination[2][1]}, to: "aic_scene"},
            {at: {x:Destination[3][0],y:Destination[3][1]}, to: "fsl_scene"},
        ],
        point:[
            {action: "bank", x:444, y:200},
            {action: "aic", x:1013, y:190},
            {action: "sc", x:430, y:502},
            {action: "fsl", x:1104, y:415},
        ],
    },
    //商业银行
    bank_scene:{
        add:[
            {chara:"BG", pic:"Bank.jpg", x:0, y:0,w:0, h:0},
            {chara:"xiaoming", pic: "player.png", x:230, y:400, w:170, h:380},
        ],
        talk:{
            t1:[
                {msg:"",x:611 ,y:415},
            ],
            t2:[
                {msg:"恭喜你，符合借款条件，可以贷款.",x:611 ,y:415},
            ],
        },
        jump:[
            //{at: {x:Destination[0][0],y:Destination[0][1]}, to: "main_scene"},
        ],
        point:[
            //{action: "talk", x:937, y:144},
            {action: "exit", x:1188, y:568},
        ],
    },
    //证券投资公司
    sc_scene:{
        add:[
            {chara:"BG", pic:"SC.jpg", x:0, y:0,w:0, h:0},
            {chara:"xiaoming", pic: "player.png", x:407, y:420, w:170, h:380},
        ],
        talk:{
            t1:[
                {msg:"这是首次公开发行股票的基本条件.",x:996 ,y:400},
            ],
            t2:[
                {msg:"抱歉，您的资质暂时还不符合公开发行股票的要求.",x:996 ,y:400},
            ],
        },
        jump:[
            //{at: {x:Destination[0][0],y:Destination[0][1]}, to: "main_scene"},
        ],
        point:[
            {action: "talk", x:937, y:144},
            {action: "paper", x:814, y:425},
            {action: "exit", x:1180, y:555},
        ],
    },
    //天使投资
    aic_scene:{
        add:[
            {chara:"BG", pic:"AIC.jpg", x:0, y:0,w:0, h:0},
            {chara:"xiaoming", pic: "player.png", x:640, y:355, w:170, h:380},
        ],
        talk:{
            t1:[
                {msg:"我要按投资比例分享利润.", x:276 ,y:320},
            ],
            t2:[
                {msg:"恭喜你，我们将对你的公司进行投资.", x:276 ,y:320},
            ],
        },
        jump:[
            //{at: {x:Destination[0][0],y:Destination[0][1]}, to: "main_scene"},
        ],
        point:[
            {action: "talk", x:190, y:85},
            {action: "exit", x:1180, y:185},
        ],
    },
    //名校贷
    fsl_scene:{
        add:[
            {chara:"BG", pic:"FCL.jpg", x:0, y:0,w:0, h:0},
            {chara:"xiaoming", pic: "player.png", x:300, y:386,w:170, h:380},
        ],
        talk:{
            t1:[
                {msg:"我们的贷款月利率只有  0 .99%，而且审核门槛低，放款非常快",x:876 ,y:213},
            ],
            t2:[
                {msg:"Game Over!.",x:876 ,y:213},
            ],
        },
        jump:[
            //{at: {x:Destination[0][0],y:Destination[0][1]}, to: "main_scene"},
        ],
        point:[
            {action: "talk", x:792, y:6},
            {action: "exit", x:1187, y:577},
        ],
    }
}