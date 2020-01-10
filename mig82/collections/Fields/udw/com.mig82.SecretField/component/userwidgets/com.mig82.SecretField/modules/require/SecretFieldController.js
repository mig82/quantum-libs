define(["./slideIn"], function(slideIn) {

	//Constants for Font Awesome 4.7
	// OLD_KEY = "\uF084";
	// OPEN_LOCK = "\uF09C";
	// CLOSED_LOCK = "\uF023";
	// OPEN_EYE = "\uF06E";
	// CLOSED_EYE = "\uF070";

	return {
		toggle: function(){
			var button = this.view.showButton;
			if(button.text === this.showIconText){
				button.text = this.hideIconText;
				this.view.textBox.secureTextEntry = false;
			}
			else{
				button.text = this.showIconText;
				this.view.textBox.secureTextEntry = true;
			}
		},

		preShow: function(){
			this.view.showButton.text = this.showIconText;
			this.view.topFlex.top = "100%";
		},

		postShow: function(){
			this.view.showButton.onTouchEnd = this.toggle;
			slideIn(this.view.topFlex);
		},

		onHide: function(){},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {

			//Remember the initial icon config to be able to switch later.
			this.iconLabelText = this.view.iconLabel.text;
			this.showIconText = this.view.showButton.text;
			this.hideIconText = this.view.hideButton.text;

			//Never show the hideButton. It's just a placeholder for the Hide Icon text.
			this.view.hideButton.isVisible = false;

			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
			this.view.onHide = this.onHide;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		}
	};
});