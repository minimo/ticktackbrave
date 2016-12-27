/*
 *  Application.js
 *  2016/12/27
 *  @auther minimo  
 *  This Program is MIT license.
 */

//namespace ttb
ttb = {};

phina.define("ttb.Application", {
    superClass: "phina.display.CanvasApp",

	_static: {
        version: "0.0.1",
        assets: {
            "common": {
                image: {
                    "panel1":   "assets/panel1.png",
                    "panel2":   "assets/panel2.png",
                    "item":   	"assets/item.png",
                    "egg":      "assets/etc_egg.png",
                    "player":   "assets/hiyoco_nomal_full.png",
                },
                font: {
                    "UbuntuMono":       "font/UbuntuMono-Bold.ttf",
                    "Orbitron-Regular": "font/Orbitron-Regular.ttf",
                    "KS-Kohichi":       "font/KS-Kohichi-FeltPen.ttf",
                    "azuki":            "font/azuki.ttf",
                }
            },
        },
    },

    //ＢＧＭ＆効果音
    bgm: null,
    bgmIsPlay: false,
    sounds: null,

    //バックグラウンドカラー
    backgroundColor: 'rgba(0, 0, 0, 1)',

    init: function(param) {
        this.superInit(param);

        //設定情報の読み込み
        this.loadConfig();
 
        //ＢＧＭ＆ＳＥ
        this.soundset = phina.extension.SoundSet();

        this.replaceScene(ttb.SceneFlow());
    },

    _onLoadAssets: function() {
        this.soundset.readAsset();
    },

    //設定データの保存
    saveConfig: function() {
        return this;
    },

    //設定データの読み込み
    loadConfig: function() {
        return this;
    },

    playBGM: function(asset, loop, callback) {
        if (loop === undefined) loop = true;
        this.soundset.playBGM(asset, loop, callback);
    },

    stopBGM: function(asset) {
        this.soundset.stopBGM();
    },

    setVolumeBGM: function(vol) {
        if (vol > 1) vol = 1;
        if (vol < 0) vol = 0;
        this.soundset.setVolumeBGM(vol);
    },

    playSE: function(asset, loop) {
        this.soundset.playSE(asset, loop);
    },

    setVolumeSE: function(vol) {
        if (vol > 1) vol = 1;
        if (vol < 0) vol = 0;
        this.soundset.setVolumeSE(vol);
    },

    _accessor: {
        volumeBGM: {
            "get": function() { return this.sounds.volumeBGM; },
            "set": function(vol) { this.setVolumeBGM(vol); }
        },
        volumeSE: {
            "get": function() { return this.sounds.volumeSE; },
            "set": function(vol) { this.setVolumeSE(vol); }
        }
    }
});
