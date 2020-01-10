define(function() {

	return {
		preShow: function(){
			this.view.middleRibbonFlex.height = "0%";
			this.view.topRibbonFlex.left = "100%";
			this.view.bottomRibbonFlex.left = "-100%";
			this.view.logoImage.opacity = 0;
		},

		postShow: function(){
			/*globals animate, reveal*/
			//TODO: define the 'animate' function inside this module.
			animate(this.view.middleRibbonFlex, "height", "0%", "60%", 0.5, 0.2);
			animate(this.view.topRibbonFlex, "left", "100%", "0%", 0.5, 0.7);
			animate(this.view.bottomRibbonFlex, "left", "-100%", "0%", 0.5, 0.7);
			reveal(this.view.logoImage, 0.8, 1.2);
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});