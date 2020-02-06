# [Space Luck](https://space-luck.glitch.me/)
## A lucky wheel Phaser 3 Game
_Developed in the context of a technical test for PlaysafeSA_

## How To Play :
1. Go to [Space luck website](https://space-luck.glitch.me/)
2. Click on the play button.
3. Click anywhere to spin the wheel.
4. Wait for the wheel to completely stop to see the event. (written on the left of the wheel)
5. You can see your points and your remaining attempts on the upper left corner.
6. When you have no attempts remaining, the game is over. You can enter the 3 first letters of your name and play again.

PS : Each part of the wheel will change its size everytime you spin de wheel. (so the probabilities are always changing)

## Events during the game :
Fuel = Attempts

Resources = Points

**_EARTH_** : +2 fuel an the possibility to buy more

**_OVNI_** : Choice between fuel or resources : lose or win your choice.

**_OUT OF SOLAR SYSTEM_** : 4 possibilities

   - You kill agressive aliens : win resources
    
   - You flee from aggressive aliens : lose fuel
    
   - You find a friendly alien : win resources and fuel
    
   - You find a market : can buy fuel for resources
    
**_BLACKHOLE_** : 3 possibilities, losing fuel and/or resources.

**_MARS_** : You can bet resources.

**_SUN_** : You win fuel and resources.

## Technologies used :
### Local development
- Typescript

- Phaser 3

- Webpack

- NPM

### Online development
- Javascript ES6

- Phaser 3

- [Glitch](https://glitch.com/)

## Sources and inspirations :
https://labs.phaser.io/

https://phaser.io/

https://soundbible.com

https://spin.atomicobject.com/

https://www.emanueleferonato.com/

## Question and answer :
**1. What is easing? Write few types of easing. Where would you apply easing functions?**

Easing defines how an animation should evolve in time, what behavior it should take.

Some examples of easing types :
- Ease in (animation evolves slowly at the beginning and then quickly at the end)
- Ease out (animation evolves quickly at the beginning and then slowly at the end)
- Linear (animation evolves in a linear way)

You apply these functions when you create define the animation behavior.

**2. What are pros & cons of using Promises in Javascript?  What is the super-set of Promises?**

Pros :

When you use Promises, you don't have to use nested callbacks, so the code is more understandable and with less indentation.
It makes the asynchronous code looks clean and you can understand instantly the sequence of events.

Cons :

The only cons of using Promises could be the difficulty to fully understand how it works and how to properly use them.

I would say that a super-set of promises is a set of promises with other sub-sets of promises. Groups of classified promises.

**3. Which non programmable parts of the graphics pipeline can be used to speed up rendering and improve performance. Please give examples.**

After some research, I would say the rasterization and interpolation parts.

An example would be to have a more efficient gaussian blur with linear sampling : [see this link](http://rastergrid.com/blog/2010/09/efficient-gaussian-blur-with-linear-sampling/)

**4. Pick three design patterns that are in your opinion most useful for game development, describe them and write a short example how would you use them in development process.**

- Command pattern

Commands are object-oriented replacements for callbacks. They are methods called wrapped in an object. In fact, when you want to execute code when a command is used, you use the callback of an event to do so. The command pattern makes it easier.

For example, you can use the command pattern to build the basic movements of your character in the game.

- State pattern

The state pattern consists of storing the state of an object. The object can change its behavior when it's internal state is modified.

For example, store a character in a game as in an "attacking" state. It's behavior will change when it will be stored as "defending" state.

- Flyweight pattern

Store an object in two categories: the part that is dependent of the state and one that is not.

For example, you store the state-dependent side of a character, such as the textures, animations... separately from the state-dependent side, such as the position.


**5. Explain Redux design pattern.**

The goal of the redux design pattern is to simplify the way you can store and update the state of an application. All your update logic goes into one single function. 

The redux design pattern is separated in 3 parts:
- The store, with all the states of your app
- The action contains all the informations sent from your app to the store.
- The reducer tells to the store what state to change and how depending on the actions.


**6. What is game loop? What is FPS?**

The game loop is a loop that run continuously when the user start the game until he quits. 
It is necessary because when the user is playing the game, a lot of different events (like moving the characters) can be done, and the game has to change intently. The game loop is a frame, so if the game is played with 60fps, this game loop will loop 60 times a second. 

FPS stands for Frames per second, so it's the quantity of frames displayed per second. It is dependent of the resources of the computer, the complexity of the game and the internet connection in some cases.

**7. Write code to convert an array of strings to an array of the lengths of those strings – use JS ES6 or TS**

```javascript
 let planets = ['Mercury','Earth','Mars','Saturn']
 console.log(planets)
 planets.forEach(function(planet, index) {
   planets[index] = planet.length
 })
 console.log(planets)
```

**8. Write code to sum an array of numbers – use JS ES6 or TS**

```javascript
 let numbers = [3,6,2,7]
 let sum = 0
 numbers.forEach(function(number) {
  sum += number
 })
 console.log(sum)
```

***
**Made by Théodore d'Avray**

[Website](https://theodore-davray.eu/)
