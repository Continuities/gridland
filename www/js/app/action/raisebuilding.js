define(['app/action/action', 'app/gamecontent'], function(Action, Content) {
	
	var RaiseBuilding = function(options) {
		this.building = options.building;
	};
	RaiseBuilding.prototype = new Action();
	RaiseBuilding.constructor = RaiseBuilding;
	
	RaiseBuilding.prototype.doAction = function(dude) {
		var _action = this;
		dude.move(this.building.dudeSpot(), function(dude) {
			dude.animation(8);
			require(["app/graphics", "app/gamecontent", 'app/resources', 'app/world'], 
					function(Graphics, Content, R, World) {
				Graphics.raiseBuilding(_action.building, function() {
					_action.building.built = true;
					World.stuff.push(_action.building);
					dude.animation(0);
					dude.action = null;
					var cb = Content.BuildingCallbacks[_action.building.options.type.className];
					if(cb) {
						cb();
					}
				});
			});
		});
	};

	RaiseBuilding.prototype.terminateAction = function(dude) {
		var _action = this;
		require(['app/graphics'], function(Graphics) {
			dude.animation(0);
			dude.action = null;
			Graphics.sinkBuilding(_action.building);			
		});
	};
	
	return RaiseBuilding; 
});