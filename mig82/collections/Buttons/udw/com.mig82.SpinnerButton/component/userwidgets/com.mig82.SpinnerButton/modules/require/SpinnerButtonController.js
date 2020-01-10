define(function() {

	var localise = kony.i18n.getLocalizedString2 || kony.i18n.getLocalizedString;
	var enabled = true;

	return {
		setEnabled:function(enable){enabled = enable;},

		hideSpinner: function(){this.view.spinnerImage.opacity = 0;},

		showSpinner: function(){this.view.spinnerImage.opacity = 1;},

		preShow: function(){
			this.view.submitButton.text = localise(this.view.submitButton.text);
			this.hideSpinner();
		},

		postShow: function(){
			this.view.submitButton.onTouchEnd = () => {
				if(enabled){
					this.showSpinner();
					if(typeof this.onPressed === "function"){
						this.onPressed(); //onPressed must be exposed as a custom event.
					}
				}
			};
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {}
	};
});