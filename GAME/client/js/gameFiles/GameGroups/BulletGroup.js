/**
 * Created by NikiHrs on 2.4.2016 г..
 */
function BulletGroup(game) {

    Phaser.Group.call(this, game);
    this.enableBody = true;
    this.createMultiple(500, 'bullet', 0, false);
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5);
    this.setAll('checkWorldBounds', true);
    this.setAll('outOfBoundsKill', true);
    this.setAll('fixedToCamera ', false);
}
BulletGroup.prototype = Object.create(Phaser.Group.prototype);
BulletGroup.prototype.constructor = BulletGroup;

