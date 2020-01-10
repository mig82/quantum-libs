define(["./isValidIban", "./splitBySpaces"], function(isValidIban, splitBySpaces) {

	return {
		validateIban: function(){
			var iban = this.view.ibanTextBox.text;
			if(isValidIban(iban)){
				if(typeof this.onValidIban === "function"){
					this.onValidIban(iban);
				}
			}
			else{
				if(typeof this.onInvalidIban === "function"){
					this.onInvalidIban(iban);
				}
			}
		},

		toggleIcon: function(){
			if(!this.view.iconLabel.text){
				this.view.iconLabel.isVisible = false;
				this.view.ibanTextBox.left = "0dp";
			}
			else{
				this.view.iconLabel.isVisible = true;
				this.view.ibanTextBox.left = "50dp";
			}
		},

		preShow: function(){
			this.toggleIcon();
		},

		postShow: function(){
			this.view.ibanTextBox.onEndEditing = ()=>{
				this.view.ibanTextBox.text = splitBySpaces(this.view.ibanTextBox.text);
				this.validateIban();
			};
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
