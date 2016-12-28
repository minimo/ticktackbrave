/*
 *  player.js
 *  2016/12/27
 *  @auther minimo  
 *  This Program is MIT license.
 */

//プレイヤーキャラクター管理クラス
phina.define("ttb.Player", {
    superClass: "phina.display.Sprite",

    //プレイヤーの現在マップ座標    
    mapX: -1,
    mapY: -1,

    //乗っているパネル
    onPanel: null,

    //状態フラグ
    special: false,  //特殊アクション中

    init: function() {
        //親クラスの初期化
        this.superInit("player", 32, 32);
        this.setFrameIndex(0);

        this.frameRight = [ 6,  7,  8,  7];
        this.frameLeft =  [ 3,  4,  5,  4];
        this.frameUp =    [ 9, 10, 11, 10];
        this.frameDown =  [ 0,  1,  2,  1];
        this.frameGoal =  [18, 19, 20, 20];
        this.frame = this.frameDown;
        this.index = 0;

        this.origin.y = 0.9;
    },

    update: function(e) {
        //基本アクション
        if (!this.special && e.ticker.frame % 6 == 0) {
            //移動してたらアニメーションする
            if (this.bx != this.x || this.by != this.y) {
                this.index = (this.index + 1) % this.frame.length;
                this.frameIndex = this.frame[this.index];
            }
        }

        //左右の向き
        if (this.bx != this.x) {
            if (this.bx > this.x) {
                this.frame = this.frameRight;
            } else {
                this.frame = this.frameLeft;
            }
        }
        //上下の向き
        if (this.by != this.y) {
            if (this.by > this.y) {
                this.frame = this.frameUp;
            } else {
                this.frame = this.frameDown;
            }
        }

        this.bx = this.x;
        this.by = this.y;
        this.time++;
    },
    
    startup: function() {
        this.visible = true;
        this.special = false;
        this.mapX = -1;
        this.mapY = -1;
    },

    //特殊アクション
    action: function(name) {
        switch (name) {
            case "goal":
                var that = this;
                this.frame = this.frameGoal;
                this.frameIndex = this.frame[0];
                this.index = 0;
                this.tweener.call(function(){that.special = true;});
                this.tweener.moveBy(0, -20, 200,"easeOutQuint").moveBy(0, 20 ,150,"easeOutQuint").wait(300);
                this.tweener.moveBy(0, -20, 200,"easeOutQuint").moveBy(0, 20 ,150,"easeOutQuint").wait(300);
                this.tweener.moveBy(0, -20, 200,"easeOutQuint").moveBy(0, 20 ,150,"easeOutQuint").wait(300);
                break;
            case "miss":
                this.special = true;
                this.tweener.clear().moveBy(0, -20, 200,"easeOutQuint").moveBy(0, 20, 150,"easeOutQuint");
                break
        }
    },
});

//開始時プレイヤーキャラクター
phina.define("ttb.Egg", {
    superClass: "phina.display.Sprite",

    finished: false,

    init: function() {
        //親クラスの初期化
        this.superInit("egg", 32, 32);
        this.setFrameIndex(0);
        this.origin.y = 0.9;
    },
    update: function(e) {
        if (e.ticker.frame % 6 == 0) {
            this.frameIndex++;
            if (this.frameIndex == 0) this.remove();
        }
    },
    
    startup: function() {
        this.tweener.clear()
            .wait(300)
            .from({x: 0, y: -20}, 200, "easeOutQuint")
            .from({x: 0, y: 20}, 150, "easeOutQuint");
    }
});
