/* global Phaser */

// the game itself
let game
let attempts 
let points
let sound = true
let buyFuelHuman = false
let buyFuelMarket = false
let ufoChoice = false
let marsChoice = false

let scoreJson = {
   scores: []
};

// once the window loads...
window.onload = function () {
  // game configuration object
  const gameConfig = {

    autoStart: true,
    scene: [MenuScene, WheelScene, EndScene],

    // resolution and scale mode
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: 'thegame',
      width: 1900,
      height: 900
    },
    dom: {
      createContainer: true
    },

    // game background color
    backgroundColor: 0x000000
  }

  // game constructor
  game = new Phaser.Game(gameConfig)

  // pure javascript to give focus to the page/frame
  window.focus()
}

class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'MenuScene' })
  }

  preload () {
    this.load.image('background', 'https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2Fspaceship-bg.png?v=1581155639925')
    
    this.load.image('play', 'https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2Fplay.png?v=1580653667696')
  }

  create () {
    
    var bg = this.add.image(400, 450, 'background')
    bg.setScale(0.5,0.5)

    var title = this.add.text(950, 200, 'Space Luck', {
      font: 'bold 60px Arial',
      align: 'center',
      color: 'white'
    }) 
    // center the text
    title.setOrigin(0.5)
    var soundtxt = 'Activate sound'
    if(sound === true){
      soundtxt = 'Desactivate sound'
    }
    this.soundText = this.add.text(950, 400, soundtxt, {
      font: 'bold 40px Arial',
      align: 'center',
      color: 'white'
    }) 
    this.soundText.setInteractive({ useHandCursor: true })
    this.soundText.on('pointerdown', () => this.clickSound())
    
    // center the text
    this.soundText.setOrigin(0.5)
    
    var textHS = ""
    if(!scoreJson.scores.length){
      textHS = "No scores yet"
    }
    else{
      scoreJson.scores.sort(this.compare);
      scoreJson.scores.forEach(function(score){
        if(score)
          textHS += score.letter1 + score.letter2 + score.letter3 + "  :  " + score.score + " points\n"
        
      })
    }
    
    var highScores = this.add.text(1400, 200, textHS, {
      font: 'bold 32px Arial',
      align: 'center',
      color: 'white'
    })

    var play = this.add.image(950,600,'play');
    play.setScale(0.1,0.1)
    play.setInteractive({ useHandCursor: true })
    play.on('pointerdown', () => this.clickStart())
  }

  clickStart () {
    attempts = 5
    points = 1000
    this.scene.start('WheelScene')
  }
  
  clickSound () {
    sound = !sound
    var soundtxt = 'Activate sound'
    if(sound === true){
      soundtxt = 'Desactivate sound'
    }
    this.soundText.setText(soundtxt)
  }
  
  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const scoreA = a.score;
    const scoreB = b.score;

    let comparison = 0;
    if (scoreA > scoreB) {
      comparison = -1;
    } else if (scoreA < scoreB) {
      comparison = 1;
    }
    return comparison;
  }
}




let tabOfDegrees = [90, 60, 30, 100, 60, 30]

var audioJSON = {
  spritemap: {
    glass: {
      start: 1,
      end: 2,
      loop: false
    }
  }
}

function getRandomDegree () {
  const rand = Math.floor(Math.random() * Math.floor(tabOfDegrees.length))
  const degree = tabOfDegrees[rand]
  tabOfDegrees.splice(rand, 1)
  return degree
}

function redefineDegrees () {
  tabOfDegrees = [90, 60, 30, 100, 60, 30]
  gameOptions.slices.forEach(slice => {
    slice.degrees = getRandomDegree()
  })
}

const gameOptions = {

  // slices configuration
  slices: [
    {
      degrees: getRandomDegree(),
      startColor: 0xadebeb,
      endColor: 0x1f7a7a,
      rings: 200,
      iconFrame: 0,
      iconScale: 0.3,
      text: 'Earth',
      enabled: true
    },
    {
      degrees: getRandomDegree(),
      startColor: 0x00ff00,
      endColor: 0x004400,
      rings: 200,
      iconFrame: 8,
      iconScale: 0.4,
      text: 'UFO',
      enabled: true
    },
    {
      degrees: getRandomDegree(),
      startColor: 0xccd9ff,
      endColor: 0x002699,
      rings: 200,
      iconFrame: 2,
      iconScale: 0.4,
      text: 'Out of solar system',
      enabled: true
    },
    {
      degrees: getRandomDegree(),
      startColor: 0x666666,
      endColor: 0x999999,
      rings: 200,
      iconFrame: 3,
      iconScale: 0.4,
      text: 'Blackhole !',
      enabled: true
    },
    {
      degrees: getRandomDegree(),
      startColor: 0xffb3ff,
      endColor: 0x990099,
      rings: 200,
      iconFrame: 4,
      iconScale: 0.4,
      text: 'Mars',
      enabled: true
    },
    {
      degrees: getRandomDegree(),
      startColor: 0xff0000,
      endColor: 0xff8800,
      rings: 200,
      iconFrame: 5,
      iconScale: 0.4,
      text: 'Sun',
      enabled: true
    }
  ],

  // wheel rotation duration range, in milliseconds
  rotationTimeRange: {
    min: 3000,
    max: 4500
  },

  // wheel rounds before it stops
  wheelRounds: {
    min: 6,
    max: 16
  },

  // degrees the wheel will rotate in the opposite direction before it stops
  backSpin: {
    min: 1,
    max: 3
  },

  // wheel radius, in pixels
  wheelRadius: 250,

  // color of stroke lines
  strokeColor: 0xffffff,

  // width of stroke lines
  strokeWidth: 2
}

// Wheel scene
class WheelScene extends Phaser.Scene {


  // constructor
  constructor () {
    super('WheelScene')
  }

  // method to be executed when the scene preloads
  preload () {
    // loading pin image
    this.load.image('pin', 'https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2Fspaceship-pin.png?v=1581155290136https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2Fspaceship-pin.png?v=1581155290136')

    // loading icons spritesheet
    this.load.spritesheet('icons', 'https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2Flogos.png?v=1580653952539', {
      frameWidth: 200,
      frameHeight: 180
    })
    
    this.load.image('play', 'https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2Fplay.png?v=1580653667696')

    this.load.audio('spinsound',"https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2Fbonus.wav?v=1580653257764")
    this.load.audio('ufosound',"https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2FAppear.mp3?v=1580651020366")
    this.load.audio('sunsound',"https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2FPower-Up.mp3?v=1580651261079")
    this.load.audio('blackholesound',"https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2FRed%20Alert.mp3?v=1580651528413")
    this.load.audio('earthsound',"https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2FCity_Centre.mp3?v=1580651716774")
    this.load.audio('marssound',"https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2FChamber%20Decompressing.mp3?v=1580651975910")
    this.load.audio('outsound',"https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2FTime%20Warp.mp3?v=1580651368971")
  }

  // method to be executed once the scene has been created
  create () {
    this.createWheel()

    // adding the text field
    this.prizeText = this.add.text(400, 300, 'Spin the wheel', {
      font: 'bold 32px Arial',
      align: 'center',
      color: 'white'
    })
    this.prizeDescText = this.add.text(400, 390, 'Click to spin !', {
      font: 'bold 24px Arial',
      align: 'center',
      color: 'white'
    })

    // center the text
    this.prizeText.setOrigin(0.5)
    // center the text
    this.prizeDescText.setOrigin(0.5)

    // the game has just started = we can spin the wheel
    this.canSpin = true

    // waiting for your input, then calling "spinWheel" function
    this.input.on('pointerdown', this.spinWheel, this)

    // Add points
    this.pointText = this.add.text(10, 10, points + ' points', {
      font: 'bold 25px Arial',
      align: 'center',
      color: 'white'
    })

    this.attemptsLeftText = this.add.text(10, 45, attempts + ' attempts remaining', {
      font: 'bold 25px Arial',
      align: 'center',
      color: 'white'
    })
    
    var soundtxt = 'Press "A" to Activate sound'
    if(sound === true){
      soundtxt = 'Press "A" to Desactivate sound'
    }
    this.soundText = this.add.text(1600, 20, soundtxt, {
      font: 'bold 20px Arial',
      align: 'center',
      color: 'white'
    }) 
    
    // center the text
    this.soundText.setOrigin(0.5)
    
    
    this.input.keyboard.on('keydown', function (input) {
      
      //SOUND SWITCH
      if (input.key === 'a' && attempts > 0) {
        console.log("trigger")
        sound = !sound
        var soundtxt = 'Press "A" to Activate sound'
        if(sound === true){
          soundtxt = 'Press "A" to Desactivate sound'
        }
        console.log(this.scene)
        this.scene.soundText.setText(soundtxt)
      }
      
      //EARTH EVENT
      if (input.key === 'b' && buyFuelHuman && points > 300) {
        this.scene.removePoints(300)
        attempts += 1
        this.scene.pointText.setText(points + ' points')
        this.scene.attemptsLeftText.setText(attempts + '  remaining attempts')
        return
      }
      
      //UFO EVENT
      if (input.key === 'f' && ufoChoice) {
        const rand = Math.floor(Math.random() * Math.floor(2))
        if(rand === 0){
          if(attempts < 1){
            this.scene.prizeDescText.setText('The UFO desepear,\n You had no fuel, so it took resources... (-300 points)')
              this.scene.removePoints(300)
            this.scene.pointText.setText(points + ' points')
          }
          else{
            this.scene.removeAttempts(1)
            this.scene.prizeDescText.setText('The UFO desepear,\n but with some of your fuel... (-1 attempt)')
            this.scene.attemptsLeftText.setText(attempts + '  remaining attempts')
          }
        }
        else{
          this.scene.prizeDescText.setText('The UFO desepear,\n and you have more fuel ! (+1 attempt)')
          attempts ++
          this.scene.attemptsLeftText.setText(attempts + '  remaining attempts')
        }
        this.scene.canSpin = true
        return
      }
      if (input.key === 'r' && ufoChoice) {
        const rand = Math.floor(Math.random() * Math.floor(2))
        console.log(rand)
        if(rand === 0){
          if(points < 300){
            this.scene.prizeDescText.setText('The UFO desepear,\n You had not enough resources, so it took fuel... (-1 attempt)')
            this.scene.removeAttempts(1)
            this.scene.attemptsLeftText.setText(attempts + '  remaining attempts')
          }
          else{
            this.scene.removePoints(300)
            this.scene.prizeDescText.setText('The UFO desepear,\n but also did some of your resources... (-300 points)')
            this.scene.pointText.setText(points + ' points')
          }
        }
        else{
          points += 300
          this.scene.prizeDescText.setText('The UFO desepear,\n and you have more resources! (+300 points)')
          this.scene.pointText.setText(points + ' points')
        }
        
        this.scene.canSpin = true
        return
      }
      
      //MARKET EVENT (OUT OF SOLAR SYSTEM)
      if (input.key === 'b' && buyFuelMarket && points > 150) {
        this.scene.removePoints(150)
        attempts += 1
        this.scene.pointText.setText(points + ' points')
        this.scene.attemptsLeftText.setText(attempts + '  remaining attempts')
        return
      }
    })
  }
  
  removePoints(qtypoints){
    if(points < qtypoints)
      points = 0
    else
      points -= qtypoints
  }
  
  removeAttempts(qty){
    if(attempts < qty)
      attempts = 0
    else
      attempts -= qty
  }
  
  
  switchSound () {
    console.log("trigger")
    sound = !sound
    var soundtxt = 'Activate sound'
    if(sound === true){
      soundtxt = 'Desactivate sound'
    }
    this.soundText.setText(soundtxt)
  }

  createWheel () {
    // starting degrees
    let startDegrees = -90

    // making a graphic object without adding it to the game
    const graphics = this.make.graphics({
      x: 0,
      y: 0,
      add: false
    })

    // this array will contain the allowed degrees
    this.allowedDegrees = []

    // adding a container to group wheel and icons
    this.wheelContainer = this.add.container(950, 300)

    // array which will contain all icons
    const iconArray = []

    // looping through each slice
    for (let i = 0; i < gameOptions.slices.length; i++) {
      // if the slice is enabled, that is if the prize can be won...
      if (gameOptions.slices[i].enabled) {
        // ... we insert all slice degrees into allowedDegrees array
        for (let j = 0; j < gameOptions.slices[i].degrees; j++) {
          this.allowedDegrees.push(270 - startDegrees - j)
        }
      }

      // converting colors from 0xRRGGBB format to Color objects
      const startColor = Phaser.Display.Color.ValueToColor(gameOptions.slices[i].startColor)
      const endColor = Phaser.Display.Color.ValueToColor(gameOptions.slices[i].endColor)

      for (let j = gameOptions.slices[i].rings; j > 0; j--) {
        // interpolate colors
        const ringColor = Phaser.Display.Color.Interpolate.ColorWithColor(startColor, endColor, gameOptions.slices[i].rings, j)

        // converting the interpolated color to 0xRRGGBB format
        const ringColorString = Phaser.Display.Color.RGBToString(Math.round(ringColor.r), Math.round(ringColor.g), Math.round(ringColor.b), 0, '0x')

        // setting fill style
        graphics.fillStyle(+ringColorString, 1)

        // drawing the slice
        graphics.slice(gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius + gameOptions.strokeWidth, j * gameOptions.wheelRadius / gameOptions.slices[i].rings, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees), false)

        // filling the slice
        graphics.fillPath()
      }

      // setting line style
      graphics.lineStyle(gameOptions.strokeWidth, gameOptions.strokeColor, 1)

      // drawing the biggest slice
      graphics.slice(gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius + gameOptions.strokeWidth, gameOptions.wheelRadius, Phaser.Math.DegToRad(startDegrees), Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees), false)

      // stroking the slice
      graphics.strokePath()

      // add the icon, if any
      if (gameOptions.slices[i].iconFrame !== undefined) {
        // icon image
        const icon = this.add.image(gameOptions.wheelRadius * 0.75 * Math.cos(Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees / 2)), gameOptions.wheelRadius * 0.75 * Math.sin(Phaser.Math.DegToRad(startDegrees + gameOptions.slices[i].degrees / 2)), 'icons', gameOptions.slices[i].iconFrame)

        // scaling the icon according to game preferences
        icon.scaleX = gameOptions.slices[i].iconScale
        icon.scaleY = gameOptions.slices[i].iconScale

        // rotating the icon
        icon.angle = startDegrees + gameOptions.slices[i].degrees / 2 + 90

        // add icon to iconArray
        iconArray.push(icon)
      }

      // updating degrees
      startDegrees += gameOptions.slices[i].degrees
    }

    // generate a texture called "wheel" from graphics data
    graphics.generateTexture('wheel', (gameOptions.wheelRadius + gameOptions.strokeWidth) * 2, (gameOptions.wheelRadius + gameOptions.strokeWidth) * 2)

    // creating a sprite with wheel image as if it was a preloaded image
    const wheel = this.add.sprite(0, 0, 'wheel')

    // adding the wheel to the container
    this.wheelContainer.add(wheel)

    // adding all iconArray items to the container
    this.wheelContainer.add(iconArray)

    // adding the pin in the middle of the canvas

    this.pin = this.add.sprite(950, 300, 'pin')
    this.pin.setScale(0.1, 0.1)
  }

  // function to spin the wheel
  spinWheel () {

    // can we spin the wheel?
    if (this.canSpin && attempts > 0) {
      buyFuelHuman = false
      buyFuelMarket = false
      ufoChoice = false
      this.removeAttempts(1)
      this.attemptsLeftText.setText(attempts + '  remaining attempts')
      if(sound === true){
        this.sound.play('spinsound');
      }

      // resetting text field
      this.prizeText.setText('')
      this.prizeDescText.setText('')
      if (this.iconBig !== undefined) { this.iconBig.destroy() }

      redefineDegrees()
      this.createWheel()

      // the wheel will spin round for some times. This is just coreography
      const rounds = Phaser.Math.Between(gameOptions.wheelRounds.min, gameOptions.wheelRounds.max)

      // then will rotate by a random amount of degrees picked among the allowed degrees. This is the actual spin
      const degrees = Phaser.Utils.Array.GetRandom(this.allowedDegrees)

      // then will rotate back by a random amount of degrees
      const backDegrees = Phaser.Math.Between(gameOptions.backSpin.min, gameOptions.backSpin.max)

      // before the wheel ends spinning, we already know the prize
      let prizeDegree = 0

      // looping through slices
      for (let i = gameOptions.slices.length - 1; i >= 0; i--) {
        // adding current slice angle to prizeDegree
        prizeDegree += gameOptions.slices[i].degrees

        // if it's greater than the random angle...
        if (prizeDegree > degrees) {
          // we found the prize
          var prize = i
          break
        }
      }

      // now the wheel cannot spin because it's already spinning
      this.canSpin = false

      // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
      // the quadratic easing will simulate friction
      this.tweens.add({

        // adding the wheel container to tween targets
        targets: [this.wheelContainer],

        // angle destination
        angle: 360 * rounds + degrees + backDegrees,

        // tween duration
        duration: Phaser.Math.Between(gameOptions.rotationTimeRange.min, gameOptions.rotationTimeRange.max),

        // tween easing
        ease: 'Cubic.easeOut',

        // callback scope
        callbackScope: this,

        // function to be executed once the tween has been completed
        onComplete: function (tween) {
          // another tween to rotate a bit in the opposite direction
          this.tweens.add({
            targets: [this.wheelContainer],
            angle: this.wheelContainer.angle - backDegrees,
            duration: Phaser.Math.Between(gameOptions.rotationTimeRange.min, gameOptions.rotationTimeRange.max) / 2,
            ease: 'Cubic.easeIn',
            callbackScope: this,
            onComplete: function (tween) {
              // displaying prize text
              this.prizeText.setText(gameOptions.slices[prize].text)
              this.iconBig = this.add.sprite(1500, 350, 'icons', gameOptions.slices[prize].iconFrame)
              this.iconBig.setScale(3.5, 3.5)

              switch (prize) {
                case 0 : { // EARTH
                  if(sound === true){
                    this.sound.play('earthsound');
                  }
                  this.prizeDescText.setText('Home sweet home...\nThe spaceport offer your some fuel (+2 fuel)\nDo you want to buy even more ?\n300 resources = 1 fuel\n (buy using "B")')
                  buyFuelHuman = true
                  attempts += 2
                  this.attemptsLeftText.setText(attempts + '  remaining attempts')
                  this.canSpin = true
                  break
                }
                case 1 : { //  UFO
                  if(sound === true){
                    this.sound.play('ufosound');
                  }
                  this.prizeDescText.setText('Should we be scared?\nYou hear a strange voice whisper : \n"FUEL OR RESOURCES?"\n(F for Fuel, R for resources)')
                  ufoChoice = true
                  
                  //turnOver = true
                  break
                }
                case 2 : { // OUT OF SOLAR SYSTEM
                  if(sound === true){
                    this.sound.play('outsound');
                  }
                  const rand = Math.floor(Math.random() * Math.floor(4))
                  switch(rand){
                    case 0 :{
                      this.prizeDescText.setText('You find some pretty agressive alien ships !\nBut your ship is better.\n You destroy them and scrap some resources\n(+500 resources)')
                      points += 500
                      this.pointText.setText(points + ' points')
                      break
                    }
                    case 1 :{
                      this.prizeDescText.setText('You find some pretty agressive alien ships !\nThey are too strong for you.\n You flee, using a lot of fuel\n(-1 fuel)')
                      this.removeAttempts(1)
                      this.attemptsLeftText.setText(attempts + '  remaining attempts')
                      break
                    }
                    case 2 :{
                      this.prizeDescText.setText('You find a really frendly alien ship.\n"Take this human"\n "it will be more useful to you".\n(+1 fuel and + 250 resources)')
                      points += 250
                      attempts += 1
                      this.pointText.setText(points + ' points')
                      this.attemptsLeftText.setText(attempts + '  remaining attempts')
                      break
                    }
                    case 3 :{
                      this.prizeDescText.setText('You find a market station.\nThey sell fuel for really cheap !\n150 resources = 1 fuel\n (buy using "B")')
                      buyFuelMarket = true
                      break
                    }
                  }
                  this.canSpin = true
                  break
                }
                case 3 : { // BLACKHOLE
                  if(sound === true){
                    this.sound.play('blackholesound');
                  }
                  const rand = Math.floor(Math.random() * Math.floor(3))
                  switch(rand){
                    case 0 :{
                      this.prizeDescText.setText('You got a little bit too close of a blackhole\nYou had to eject some resources to lighten your ship\n(-100 resources)')
                      this.removePoints(100)
                      this.pointText.setText(points + ' points')
                      break
                    }
                    case 1 :{
                      this.prizeDescText.setText('You got too close of a blackhole!\nYou had to eject some resources to lighten your ship\nYou also used a lot of fuel\n(-150 resources and -1 fuel)')
                      this.removePoints(150)
                      this.removeAttempts(1)
                      this.attemptsLeftText.setText(attempts + '  remaining attempts')
                      this.pointText.setText(points + ' points')
                      break
                    }
                    case 2 :{
                      this.prizeDescText.setText('You got way too close of a blackhole!!!\nYou had to eject a lot resources to lighten your ship\nYou also used a lot of fuel\n(-300 resources and -1 fuel)')
                      this.removePoints(300)
                      this.removeAttempts(1)
                      this.attemptsLeftText.setText(attempts + '  remaining attempts')
                      this.pointText.setText(points + ' points')
                      break
                    }
                  }
                  this.canSpin = true
                  break
                }
                case 4 : { // MARS
                  if(sound === true){
                    this.sound.play('marssound');
                  }
                  marsChoice = true
                  let amount = 0
                  if(points >= 100){
                    this.prizeDescText.setText('On Mars, you play a betting game with an Alien\nPlease choose how much you want to bet : ')

                    this.firstChoice = this.add.text(300, 420, '100', {
                      font: 'bold 24px Arial',
                      align: 'center',
                      color: 'white'
                    })
                    this.firstChoice.setInteractive({ useHandCursor: true })
                    this.firstChoice.on('pointerdown', () => this.marsSelect(100))

                    let color = points >= 200 ? 'white' : 'grey';

                    this.secondChoice = this.add.text(350, 420, '200', {
                      font: 'bold 24px Arial',
                      align: 'center',
                      color: color
                    })
                    if(points >= 200){
                      this.secondChoice.setInteractive({ useHandCursor: true })
                      this.secondChoice.on('pointerdown', () => this.marsSelect(200))
                    }

                    color = points >= 500 ? 'white' : 'grey';

                    this.thirdChoice = this.add.text(400, 420, '500', {
                      font: 'bold 24px Arial',
                      align: 'center',
                      color: color
                    })
                    if(points >= 500){
                      this.thirdChoice.setInteractive({ useHandCursor: true })
                      this.thirdChoice.on('pointerdown', () => this.marsSelect(500))
                    }

                    this.lastChoice = this.add.text(450, 420, "all : " + points, {
                      font: 'bold 24px Arial',
                      align: 'center',
                      color: 'white'
                    })
                    this.lastChoice.setInteractive({ useHandCursor: true })
                    this.lastChoice.on('pointerdown', () => this.marsSelect(points))

                    if(!marsChoice){
                      this.canSpin = true
                    }
                  }
                  else{
                    this.prizeDescText.setText("On Mars, an alien is playing a betting game\nBut you don't have enough resources to bet...")
                    this.canSpin = true
                  }
                  
                  break
                }
                case 5 : { // SUN
                  if(sound === true){
                    this.sound.play('sunsound');
                  }
                  this.prizeDescText.setText('You find some useful raw resources next to the sun\nYou also use some solar energy as fuel.\n(+1 fuel and +300 resources)')

                  points += 300
                  this.pointText.setText(points + ' points')
                  attempts += 1
                  this.attemptsLeftText.setText(attempts + '  remaining attempts')
                  this.canSpin = true
                  break
                }
              }

              this.pointText.setText(points + ' points')

              
            }
          })
        }
      })
    }
    if (this.canSpin && attempts === 0) {
      this.prizeText.setText("It's the end of your interstellar trip !\nPlease enter 3 letters for you name")
      this.prizeDescText.setText('Points : ' + points)
      this.nameTextA = this.add.text(860, 800, '_', {
        font: 'bold 60px Arial',
        align: 'center',
        color: 'white'
      })
      this.nameTextB = this.add.text(920, 800, '_', {
        font: 'bold 60px Arial',
        align: 'center',
        color: 'white'
      })
      this.nameTextC = this.add.text(980, 800, '_', {
        font: 'bold 60px Arial',
        align: 'center',
        color: 'white'
      })
      this.input.keyboard.on('keydown', function (input) {
        if (this.nameTextA.text === '_' && input.key >= 'a' && input.key <= 'z') {
          this.nameTextA.setText(input.key.toUpperCase())
          return
        } else if (this.nameTextB.text === '_' && input.key >= 'a' && input.key <= 'z') {
          this.nameTextB.setText(input.key.toUpperCase())
          return
        } else if (this.nameTextC.text === '_' && input.key >= 'a' && input.key <= 'z') {
          this.nameTextC.setText(input.key.toUpperCase())
          scoreJson.scores.push({letter1: this.nameTextA.text, letter2: this.nameTextB.text, letter3: this.nameTextC.text, score:points});
          this.scene.start('EndScene', { name: this.nameTextA.text + this.nameTextB.text + this.nameTextC.text })
          return
        }
      }, this)
      attempts = -1
    }
  }
  
  marsSelect(amount){
    const rand = Math.floor(Math.random() * Math.floor(2))
    if(marsChoice){
      if(rand === 0){
        this.removePoints(amount)
        this.pointText.setText(points + ' points')
        this.prizeDescText.setText('The alien flip a coin... AND...\n Oh no you lost... Better luck next time.')
      }
      else{
        points += amount
        this.pointText.setText(points + ' points')
        this.prizeDescText.setText("The alien flip a coin... AND...\n YAY! You won ! It's your lucky day.")
      }
      this.firstChoice.setText("")
      this.secondChoice.setText("")
      this.thirdChoice.setText("")
      this.lastChoice.setText("")
      
      this.input.on('pointerdown', function(){
        if (marsChoice){
          marsChoice = false
          this.scene.canSpin = true
        }
      });
          
    }
  }
}

class EndScene extends Phaser.Scene {
  constructor () {
    super({ key: 'EndScene' })
  }

  preload () {
    this.load.image('background', 'https://cdn.glitch.com/51afda45-62e0-4d8d-b6b1-038264655f6c%2Fspaceship-bg.png?v=1581155639925')
  }
  
  init(data){
    this.name = data.name;
  }

  create () {
    var bg = this.add.image(400, 450, 'background')
    bg.setScale(0.5,0.5)

    var title = this.add.text(950, 200, "Thanks for playing Space Luck !", {
      font: 'bold 50px Arial',
      align: 'center',
      color: 'white'
    }) 
    // center the text
    title.setOrigin(0.5)
    
    var score = this.add.text(950, 300, this.name + ' score : ' + points, {
      font: 'bold 30px Arial',
      align: 'center',
      color: 'white'
    }) 
    // center the text
    score.setOrigin(0.5)
    
    var commentContent =  ''
    if(points < 1000){
      commentContent += "You will do better next time..."
    }
    else if(points >= 1000 && points < 3000){
      commentContent += "You did great !"
    }
    else{
      commentContent += "Wow really impressive !"
    }
    var comment = this.add.text(950, 400, commentContent, {
      font: 'bold 30px Arial',
      align: 'center',
      color: 'white'
    }) 
    // center the text
    comment.setOrigin(0.5)
    
    
    var back = this.add.text(850, 500, 'Go to menu', {
      font: 'bold 30px Arial',
      align: 'center',
      color: 'white'
    }) 
    // center the text
    back.setOrigin(0.5)
    back.setInteractive({ useHandCursor: true })
    back.on('pointerdown', () => this.clickBack())
    
    var play = this.add.text(1050, 500, 'Play again', {
      font: 'bold 30px Arial',
      align: 'center',
      color: 'white'
    }) 
    // center the text
    play.setOrigin(0.5)

    play.setInteractive({ useHandCursor: true })
    play.on('pointerdown', () => this.clickStart())
  }

  clickStart () {
    attempts = 5
    points = 1000
    this.scene.start('WheelScene')
  }
  
  clickBack () {
    this.scene.start('MenuScene')
  }
}