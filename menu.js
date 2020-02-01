export class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'MenuScene' })
  }

  preload () {
    this.load.image('background', 'https://i.imgur.com/P2tQgxm.jpg')
  }

  create () {
    var bg = this.add.sprite(0, 0, 'background')
    bg.setOrigin(0, 0)

    var text = this.add.text(950, 200, 'To infinity... and beyond!', {
      font: 'bold 32px Arial',
      align: 'center',
      color: 'white'
    })

    // center the text
    text.setOrigin(0.5)
    text.setInteractive({ useHandCursor: true })
    text.on('pointerdown', () => this.clickButton())
  }

  clickButton () {
    this.scene.start('WheelScene')
  }
}
