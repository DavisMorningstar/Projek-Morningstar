import platform from '../img/tanah.png'
import hills from '../img/puhun.png'
import background from '../img/newbglv1(2).png'
import character from '../img/karakter11.png'
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1440
canvas.height = 1024

const gravity = 0.5 //kecepatan gravitasi

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }

        this.width = 126
        this.height = 129
        this.image = createImage(character)
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
        
    }
    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

       if (this.position.y + this.height +
        this.velocity.y <= canvas.height)
        this.velocity.y += gravity
      
    }
}

  class Platform {
    constructor({x, y, image}) {
      this.position = {
        x,
        y
      }
      this.image = image
      this.width = image.width
      this.height = image.height
    }

    draw() {
      c.drawImage(this.image, this.position.x, this.position.y)
    }
  }

  class GenericObject {
    constructor({x, y, image}) {
      this.position = {
        x,
        y
      }
      this.image = image
      this.width = image.width
      this.height = image.height
    }

    draw() {
      c.drawImage(this.image, this.position.x, this.position.y)
    }
  }

function createImage(imageSrc) {
const image = new Image()
image.src = imageSrc
return image
}

const platformImage =  new createImage(platform)

const player = new Player()
const platforms = [new Platform({
    x: -1, y: 955, image: platformImage
}), 
new Platform({x:1440, y: 955, image: platformImage}),
new Platform({ x: platformImage.width * 2 + 200, y: 955, image: platformImage})]

const genericObjects = [
    new GenericObject({
        x: -1,
        y: -1,
        image: createImage(background)
    }), 
    new GenericObject({
        x: -1,
        y: 400,
        image: createImage(hills)
    })
]

 const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}   

let scrollOffset = 0
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })

    platforms.forEach(platform => {
        platform.draw()
    })

    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
            genericObjects.forEach((genericObject) => {
            genericObject.position.x -= 3
        })
            
        } else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x += 3
            })
            
        }
    }
    platforms.forEach(platform => {
    if ( player.position.y + player.height
      <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
        player.velocity.y = 0
      }
      else if(player.position.x + player.height <= platform.position.x && player.position.x + player.height + player.velocity.x >= platform.position.x && player.position.y + player.height >= platform.position.y) {
        player.velocity.x = 0
      }
    })
    // win condition
    if (scrollOffset > 2000) {
        console.log('You Win!')
    }
    if (player.position.y > canvas.height) {
        console.log('you lose')
    }
    }
animate()

addEventListener('keydown', ({ keyCode }) => {
 //console.log(keyCode)
switch (keyCode) {
    case 65:
        console.log('left')
        keys.left.pressed = true
        break

    case 83:
        console.log('down')
        break

    case 68:
        console.log('right')
        keys.right.pressed = true
        break
        
    case 87:
        console.log('up')
        player.velocity.y -= 2
        break    
    }
  
  })

  addEventListener('keyup', ({ keyCode }) => {
    //console.log(keyCode)
   switch (keyCode) {
       case 65:
           console.log('left')
           keys.left.pressed = false
           break
   
       case 83:
           console.log('down')
           break
   
       case 68:
           console.log('right')
           keys.right.pressed = false
           break
           
       case 87:
           console.log('up')
           player.velocity.y -= 11
           break  
   }
   console.log(keys.right.pressed)
})