# [Space Luck](https://space-luck.glitch.me/)
## A lucky wheel Phaser 3 Game
_Developed in the context of a technical test for PlaysafeSA_

## How To Play :
1. Go to [Space luck website](https://space-luck.glitch.me/)
2. Click on the play button
3. Click anywhere to spin the wheel
4. Wait for the wheel to completely stop to see the event (written on the left of the wheel)
5. You can see your points and your remaining attempts on the upper left corner
6. When you have no attempts remaining, the game is over. You can enter the 3 first letters of your name and play again.

## Events during the game :
Fuel = Attempts

Ressources = Points

**_EARTH_** : +2 fuel an the possibility to buy more

**_OVNI_** : Choice between fuel or ressources : lose or win your choice.

**_OUT OF SOLAR SYSTEM_** : 4 possibilities

   - You kill agressive aliens : win ressources
    
   - You flee from aggressive aliens : lose fuel
    
   - You find a friendly alien : win ressources and fuel
    
   - You find a market : can buy fuel for ressources
    
**_BLACKHOLE_** : 3 possibilities, losing fuel and/or ressources.

**_MARS_** : You can bet ressources

**_SUN_** : You win fuel and ressources

## Technologies used :
### Local development
- Typescript

- Phaser 3

- Webpack

- NPM

### online development
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

Easing define how an animation should evolve in time, what behavior it should take.

Some examples of easing types :
- Ease in (animation evolve slowly at the begining and then quickly at the end)
- Ease out (animation evolve quickly at the begining and then slowly at the end)
- Linear (animation evolve in a linear way)

You apply these functions when you create define the animation behavior.

**2. What are pros & cons of using Promises in Javascript?  What is the super-set of Promises?**

Pros :

When you use Promises, you don't have to use nested callbacks, so the code is more understandable and with less indentation.
It makes the asynchronous code looks clean and you can understand instantly the sequence of events

Cons :

The only cons of using Promises could be the difficulty to fully understand how it work and how to properly use them.

I would say that a super-set of promises is a set of promises with other sub-sets of promises. Groups of classified promises.

**3. Which non programmable parts of the graphics pipeline can be used to speed up rendering and improve performance. Please give examples.**

After some research, I would say the rasterization and interpolation parts.

An example would be to have a more efficient gaussian blur with linear sampling : [see this link](http://rastergrid.com/blog/2010/09/efficient-gaussian-blur-with-linear-sampling/)

**4. Pick three design patterns that are in your opinion most useful for game development, describe them and write a short example how would you use them in development process.**

- Command pattern

Commands are object-oriented remplacements for callbacks. They are methods called wrapped in an object. In fact, when you want to execute code when a command is used, you use the callback of an event to do so. The command pattern make it easier.

For example, you can use the command pattern to build the basic mouvments of your character in the game.

- State pattern

The state pattern consist of storing the state of an object. The object can change it's behavior when it's internal state is modified.

For example, store a character in a game as in an "attacking" state. It's behavior will change when it will be stored as "defending" state.

- Flyweight pattern

Store an object in two categories : the part that is dependent of the state and one that is not.

For example, you store the state-dependent side of an character, such as the textures, animations... separately from the state-dependent side, such as the position.


**5. Explain Redux design pattern.**


**6. What is game loop? What is FPS?**


**7. Write code to convert an array of strings to an array of the lengths of those strings – use JS ES6 or TS**


**8. Write code to sum an array of numbers – use JS ES6 or TS**


***
**Made by Théodore d'Avray**

[Website](https://theodore-davray.eu/)
