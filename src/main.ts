import * as Phaser from 'phaser';
import { WheelScene } from "./wheel";
import { MenuScene } from "./menu";

// the game itself
let game;
 
// once the window loads...
window.onload = function() {
 
    // game configuration object
    let gameConfig = {

        autoStart: true,
        scene: [MenuScene,WheelScene],
 
        // resolution and scale mode
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 1900,
            height: 600
        },
 
       // game background color
       backgroundColor: 0x000000,
    };
 
    // game constructor
    game = new Phaser.Game(gameConfig);

    //game.scene.add('menuScene', MenuScene);
    //game.scene.add('wheelScene', WheelScene);

    //game.scene.start('menuScene');
 
    // pure javascript to give focus to the page/frame
    window.focus()
}