(function(scope){
	var Controller 	= scope.Controller;
	var Model 		= scope.Models;
	var View 		= scope.View;

	var tableTemplate	= '<table><thead><td>Box</td><td>x</td><td>y</td><td>z</td></thead></table>';

	var rowTemplate = '<tr></tr>';
	var cellTemplate = '<td></td>';

	/*
	The Stats View is a simple view into the underlying data

	It serves here to show how the same model can drive several views.
	*/
	View.StatsView = function(theCubes){
	//Private 
		var rows = [];

		// get the DOM element to attach to
		// - assume we've got jQuery to hand
		var $stats = $('#stats');

		$stats.append($(tableTemplate));
		var $table = $stats.find('table');


	//Public

		this.addRow = function(row){
			rows.push(row);
			$table.append(row.$el);

		}
		

	};

	View.Component.StatsRow = function(theCube){
		var model = theCube;
		var $el = $(rowTemplate);
		var cells = {};
		//Initialize children

		var $rowLabel = $("<td>" + model.label + "</td>");
		$rowLabel.css("color", "#" + model.color);
		$el.append($rowLabel);

		cells.x = new View.Component.StatsCell(model, "x");
		$el.append(cells.x.$el);
		cells.y = new View.Component.StatsCell(model, "y");
		$el.append(cells.y.$el);
		cells.z = new View.Component.StatsCell(model, "z");
		$el.append(cells.z.$el);

	//Public
		this.setEnabled = function(){
			$rowLabel.removeClass("css3-blink");
		}
		this.setDisabled = function(){
			$rowLabel.addClass("css3-blink");
		}
		this.setActiveCell = function(cell){
			cells.x.$el.toggleClass("inactiveCell", cell != "x");
			cells.y.$el.toggleClass("inactiveCell", cell != "y");
			cells.z.$el.toggleClass("inactiveCell", cell != "z");
		}
		this.$el = $el;
	}

	var PI = 3.141592653;
	var OVER_PI = 180 / PI;

	View.Component.StatsCell = function(theCube, theProperty){
		var model = theCube;
		var prop = theProperty;
		var $el = $(cellTemplate);


		this.$el = $el;
		this.update = function(){
			var degs = model.getRotation()[prop] * OVER_PI;
			degs = degs % 360;
			$el.text(degs.toFixed(0));
		}

		model.on('update', this.update);

	}

})(MVPresenter);


