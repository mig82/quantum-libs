define(["./slideIn"], function(slideIn) {

	return {
		preShow: function(){
			//Move flex out of view to animate it back in on postShow.
			this.view.topFlex.top = "100%";

			if(typeof kony.i18n.getLocalizedString2 === "function"){
				this.view.textBox.placeholder = kony.i18n.getLocalizedString2(this.view.textBox.placeholder);
			}
		},

		postShow: function(){
			slideIn(this.view.topFlex);
			if(typeof this.onTextChange === "function"){
				this.view.textBox.onTextChange = this.onTextChange;
			}
		},

		onHide: function(){},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {

			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
			this.view.onHide = this.onHide;
		},

		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});