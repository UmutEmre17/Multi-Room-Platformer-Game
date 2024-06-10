class Player extends Sprite{
    constructor({clsnBlocks= [], imageSrc, frameRate, animations, loop }){
        super({imageSrc, frameRate, animations, loop})
        this.position = {
            x: 200,
            y: 200
        }

        this.velocity= {
            x:0,
            y:0
        }

        
        this.sides = {
            bottom: this.position.y + this.height

        }
        this.gravity = 1

        this.clsnBlocks = clsnBlocks
    }
    

    update(){
       // c.fillStyle = 'rgba(0, 0, 255, 0.5)'
       // c.fillRect(this.position.x, this.position.y, this.width, this.height)
       
        this.position.x += this.velocity.x

        this.updateHitbox()

        this.checkForHorizontalClsns()
        this.applyGravity()

        this.updateHitbox()

        //c.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
        this.checkForVerticalClsns() 
    }

    handleInput(keys){
        if (this.preventInput) return
        this.velocity.x = 0
        if(keys.d.pressed){
            this.switchSprite('runRight')
            this.velocity.x = 4
            this.LastDirection = 'right'
        }
        else if(keys.a.pressed){
            this.switchSprite('runLeft')
            this.velocity.x = -4
            this.LastDirection = 'left'
        }
        else{
            if(player.LastDirection === 'left') player.switchSprite('idleLeft')
            else player.switchSprite('idleRight')
        }
    }

    switchSprite(name){
        if(this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]

    }

    updateHitbox(){
        this.hitBox = {
            position:{
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width:50,
            height:53              
        }
    }


    checkForHorizontalClsns(){
        for(let i = 0; i < this.clsnBlocks.length; i++){
            const clsnBlock = this.clsnBlocks[i]

            if(this.hitBox.position.x <= clsnBlock.position.x + clsnBlock.width && 
               this.hitBox.position.x + this.hitBox.width >= clsnBlock.position.x &&
               this.hitBox.position.y + this.hitBox.height >= clsnBlock.position.y &&
               this.hitBox.position.y <= clsnBlock.position.y + clsnBlock.height){

                if(this.velocity.x < 0){
                    const offset= this.hitBox.position.x-this.position.x
                    this.position.x = clsnBlock.position.x +clsnBlock.width - offset + 0.01
                    break
                }
                if (this.velocity.x > 1){
                    const offset = this.hitBox.position.x - this.position.x + this.hitBox.width
                    this.position.x = clsnBlock.position.x - offset - 0.01
                    break
                }
                
               }

        }

    }
    applyGravity(){
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y

    }
    checkForVerticalClsns(){
        for(let i = 0; i < this.clsnBlocks.length; i++){
            const clsnBlock = this.clsnBlocks[i]

            if(this.hitBox.position.x <= clsnBlock.position.x + clsnBlock.width && 
               this.hitBox.position.x + this.hitBox.width >= clsnBlock.position.x &&
               this.hitBox.position.y + this.hitBox.height >= clsnBlock.position.y &&
               this.hitBox.position.y <= clsnBlock.position.y + clsnBlock.height){

                if(this.velocity.y < 0){
                    this.velocity.y = 0
                    const offset = this.hitBox.position.y - this.position.y
                    this.position.y = clsnBlock.position.y + clsnBlock.height - offset + 0.01
                    break
                }
                if (this.velocity.y > 0){
                    this.velocity.y = 0
                    const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
                    this.position.y = clsnBlock.position.y - offset - 0.01
                    break
                }
                
               }
        } 

    }
}