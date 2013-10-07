define(['app/entity/worldentity', 'app/action/actionfactory'], 
		function(WorldEntity, ActionFactory) {
	
	var Rat = function(options) {
		this.options = $.extend({}, this.options, {
			power: 3
		}, options);
		this.hostile = true;
		this.action = null;
		this.hp = this.maxHealth();
		this.xp = 2;
	};
	Rat.prototype = new WorldEntity({
		className: 'rat',
		speed: 20
	});
	Rat.constructor = Rat;
	
	Rat.prototype.think = function() {
		if(this.isIdle() && this.isAlive() && this.action == null) {
			var _this = this;
			require(['app/world'], function(World) {
				var action = null;
				if(!_this.attackRange(World.dude)) {
					_this.action = ActionFactory.getAction("MoveTo", {
						target: World.dude
					});
				} else {
					_this.action = ActionFactory.getAction("FastAttack", {
						target: World.dude
					});
				}
				if(_this.action != null) {
					_this.action.doAction(_this);
				}
			});
		}
	};
	
	Rat.prototype.maxHealth = function() {
		return 1;
	};
	
	Rat.prototype.getDamage = function() {
		return 1;
	};
	
	return Rat;
});