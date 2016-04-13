/**
 * Created by NikiHrs on 2.4.2016 г..
 */
function Player(game,stage,x,y,team,r,name,id,health,score,weapons,armor,radio){

    var self = this;
    this._game = game;
    this._stage = stage;
    this.player = this;
    this.team = team;
    var asset_key = null;
    if(team == 't1'){
        asset_key = 'terroristSprite';
    }else {
        asset_key = 'counterTerroristSprite';
    }


    Phaser.Sprite.call(this,game,x, y,asset_key);

    if(team == 't1'){
        asset_key = 'bomb';
    }else {
        asset_key = 'pliers';
    }
    this.addChild(game.add.sprite(0,0,asset_key));
    this.children[0].visible = false;
    this.animations.add('walk');
    this.addChild(game.add.image(0,0,'weaponsSprite'));
    this.children[1].frame = 0;
    /*custom*/
    this.rotation = r;
    this.name = name;
    this.health = health;
    this.score = score;
    this.weapons = weapons;
    this.weapons.isReloading = false;
    this.armor = armor;
    this.id = id;
    this.radio = radio;

    this.anchor.setTo(0.5,0.5);

    game.physics.enable(this,Phaser.Physics.ARCADE);
    this.body.maxVelocity.y = 100;
    this.body.maxVelocity.x = 100;
    this.body.drag.x = 100;
    this.body.drag.y = 100;
    this.body.collideWorldBounds = true;

    /*bullets*/

    this.nextFire = 0;

    /*Buttons*/
    this.controls= {};
    this.controls.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.controls.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.controls.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.controls.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.controls.reload = game.input.keyboard.addKey(Phaser.Keyboard.R);
    this.controls.bombInteraction = game.input.keyboard.addKey(Phaser.Keyboard.E);

    this.controls.switchWeapon1 = game.input.keyboard.addKey(49);
    this.controls.switchWeapon2 = game.input.keyboard.addKey(50);
    this.controls.switchWeapon3 = game.input.keyboard.addKey(51);
    this.controls.switchWeapon4 = game.input.keyboard.addKey(52);
    this.controls.switchWeapon5 = game.input.keyboard.addKey(53);
    this.controls.switchWeapon6 = game.input.keyboard.addKey(54);


    this.controls.switchWeapon1.onDown.add(function(){
        self.switchWeapon(0);
    });
    this.controls.switchWeapon2.onDown.add(function(){
        self.switchWeapon(1);
    });
    this.controls.switchWeapon3.onDown.add(function(){
        self.switchWeapon(2);
    });
    this.controls.switchWeapon4.onDown.add(function(){
        self.switchWeapon(3);
    });
    this.controls.switchWeapon5.onDown.add(function(){
        self.switchWeapon(4);
    });
    this.controls.switchWeapon6.onDown.add(function(){
        self.switchWeapon(5);
    });


    this.bullets = new BulletGroup(game);
    game.add.existing(this);
    game.camera.follow(this,2);



}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;


Player.prototype.emitHitSomeOne = function(target,bulletLife){
    this.radio.getSocket().emit('PLAYER-HIT-TARGET',{
        weaponID:this.weapons.selectedWeapon,
        targetID:target,
        distance:bulletLife
    });
};
Player.prototype.move = function(){
    /*Move*/
    if (this.controls.upKey.isDown){
        this.body.velocity.y = -100;
        this.animations.play('walk',5);
    }
    if(this.controls.down.isDown){
        this.body.velocity.y = 100;
        this.animations.play('walk',5);
    }
    if (this.controls.left.isDown){
        this.body.velocity.x = -100;
        this.animations.play('walk',5);
    }
    if (this.controls.right.isDown){
        this.body.velocity.x = 100;
        this.animations.play('walk',5);
    }
    this.animations.stop();
    /*Rotate player to mouse*/
    this.rotation = this._game.physics.arcade.angleToPointer(this);

    if((this.body.velocity.x != 0
        || this.body.velocity.y != 0
        || this._game.input.mouse.input.speed.x != 0
        || this._game.input.mouse.input.speed.y != 0)
        && this._game.input.activePointer.isUp
        || this._game.input.activePointer.isDown
    ){
        try{
            this.radio.emitXYR(
                parseFloat(this.x.toFixed(1)),
                parseFloat(this.y.toFixed(1)),
                parseFloat(this.rotation.toFixed(3))

            )
        }catch (e){
        }

    }

};

Player.prototype.shoot = function(){
    if (this._game.input.activePointer.isDown && this.controls.bombInteraction.isUp){

        if(this._game.time.now > this.nextFire  && this.bullets.countDead() > 0 ){
            if (this.weapons[this.weapons.selectedWeapon].wAmmo > 0){
                this.nextFire = this.game.time.now + this.weapons[this.weapons.selectedWeapon].wfRate;
                var bullet = this.bullets.getFirstExists(false);
                this.bullets.resetChild(bullet,this.x,this.y);
                bullet.rotation = this._game.physics.arcade.moveToPointer(bullet,this.weapons[this.weapons.selectedWeapon].bSpeed);
                bullet.lifespan = 3000;
                this.weapons[this.weapons.selectedWeapon].wAmmo--;
                this.radio.getSocket().emit('PLAYER-FIRE',{

                    x:parseFloat(this.x.toFixed(1)),
                    y:parseFloat(this.y.toFixed(1)),
                    r:parseFloat(this.rotation.toFixed(3)),
                    w:this.weapons[this.weapons.selectedWeapon].wIndx
                });
                this._stage.GameUi.ammoText.setText('AMMO :'+ this.weapons[this.weapons.selectedWeapon].wAmmo);
                this._stage.sound.weapons[this.weapons.selectedWeapon].play();

            }else {
                this.nextFire = this.game.time.now + this.weapons[this.weapons.selectedWeapon].wfRate;
                this._stage.sound.w_empty.play();
            }

        }

    }
};

Player.prototype.bombInteract = function(){
    if(this.team == 't1'){

        if(this.controls.bombInteraction.isDown && this._stage.gameObjects.bomb.plantStatus < 100){

            this.game.physics.arcade.overlap(this,this._stage.gameObjects.bomb,function(player,bomb){
                bomb.plantBomb();
                player.children[0].visible = true;
                player.children[1].visible = false;

            });
        }else {
            this.children[0].visible = false;
            this.children[1].visible = true;
        }
    }else {
        if(this.controls.bombInteraction.isDown && this._stage.gameObjects.bomb.plantStatus >= 0){
            this.game.physics.arcade.overlap(this,this._stage.gameObjects.bomb,function(player,bomb){
                bomb.defuseBomb();
                player.children[0].visible = true;
                player.children[1].visible = false;

            });
        }else {
            this.children[0].visible = false;
            this.children[1].visible = true;
        }
    }

};

Player.prototype.reloadWeapon = function(){
    if ((this.controls.reload.isDown || this.weapons[this.weapons.selectedWeapon].wAmmo == 0) && !this.weapons[this.weapons.selectedWeapon].isReloading){
        this.radio.getSocket().emit('RELOAD-WEAPON');
        this.weapons[this.weapons.selectedWeapon].wAmmo = 0;
        this._stage.GameUi.ammoText.setText('AMMO : '+ this.weapons[this.weapons.selectedWeapon].wAmmo);
        this._stage.sound.w_clipout.play();
        this.weapons[this.weapons.selectedWeapon].isReloading = true;
    }
};

Player.prototype.update = function(){
    this.move();
    this.shoot();
    this.reloadWeapon();
    this.bombInteract();
};
Player.prototype.respawn = function(newStats){
    this.x = newStats.x;
    this.y = newStats.y;
    this.rotation = newStats.r;
    this.health = newStats.health;
    this.weapon = newStats.weapon;
    this.armor = newStats.armor;
    this.visible = true;
};
Player.prototype.switchWeapon = function(weaponIndex){

    if(this.weapons[weaponIndex] != undefined && !this.weapons[this.weapons.selectedWeapon].isReloading){
        this.weapons.selectedWeapon = weaponIndex;
        this.radio.getSocket().emit('WEAPON CHANGED',weaponIndex);
        this._stage.GameUi.weapon.setText(this.weapons[this.weapons.selectedWeapon].wName);
        this.children[1].frame = weaponIndex;

    }
};