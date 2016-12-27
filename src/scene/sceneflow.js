/*
 *  SceneFlow.js
 *  2016/12/27
 *  @auther minimo  
 *  This Program is MIT license.
 *
 */

//基本シーンフロー
phina.define("ttb.SceneFlow", {
    superClass: "phina.game.ManagerScene",

    init: function() {
        this.superInit({
            scenes: [{
                label: "load",
                className: "ttb.LoadingScene",
                arguments: ttb.Application.assets["common"],
                nextLabel: "main",
            },{
                label: "main",
                className: "ttb.MainScene",
            }],
        });
    }
});
