/**
 * Created by NikiHrs on 2.4.2016 г..
 */
function TerroristBulletGroup(game){

    Phaser.Group.call(this, game);
    this.enableBody = true;
    this.createMultiple(500, 'bullet', 0, false);
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);
    this.setAll('checkWorldBounds', true);
    this.setAll('outOfBoundsKill', true);



}
TerroristBulletGroup.prototype = Object.create(Phaser.Group.prototype);
TerroristBulletGroup.prototype.constructor = TerroristBulletGroup;

