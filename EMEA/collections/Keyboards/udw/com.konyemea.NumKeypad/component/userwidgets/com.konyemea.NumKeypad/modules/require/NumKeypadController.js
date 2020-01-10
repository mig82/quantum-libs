define(["./slideIn"], function(slideIn) {

	const numButtons = [
		"button0",
		"button1",
		"button2",
		"button3",
		"button4",
		"button5",
		"button6",
		"button7",
		"button8",
		"button9"
	];

	//TODO: Parse integer part with thousands separators.
	//var integerPart = "0";
	//var decimalPart = "0";
	var formatter;

	function getLocale(){
		return kony.i18n.getCurrentLocale().replace("_", "-");
	}

	function getDecimalSeparator(){
		return formatter.format(1.5)[1];
	}

	return {
		getValue: function(){
			return this.view.amountLabel.text;
		},

		togglePlaceholder: function(){
			if(this.view.amountLabel.text.length > 0){
				this.view.placeHolderLabel.setVisibility(false);
				this.view.amountFlex.forceLayout();
			}
			else{
				this.view.placeHolderLabel.setVisibility(true);
			}
		},

		hasDecimal: function(){
			return this.view.amountLabel.text.indexOf(getDecimalSeparator()) >= 0;
		},

		appendToAmount: function(entry){
			if(this.view.amountLabel.text === "0" && entry !== getDecimalSeparator()){
				this.view.amountLabel.text = "";
			}
			this.view.amountLabel.text += entry;
			this.togglePlaceholder();
		},

		onNumberPressed: function(number){
			var amountLabel = this.view.amountLabel;

			//Decimal part
			if(this.hasDecimal()){
				if(amountLabel.text.split(getDecimalSeparator())[1].length < this._maxDecimals){
					this.appendToAmount(number);
				}
			}
			//Integer part.
			else{
				//preceding 0 does not count -> if string is already "0".
				//trailing 0 counts.
				if(amountLabel.text === "0" && number === 0){
					//NOOP
				}
				else{
					//amountLabel.text += number;
					this.appendToAmount(number);
				}
			}
		},

		onDecimalPressed: function(){

			if(!this.hasDecimal()){

				var amountLabel = this.view.amountLabel;
				var decSep = getDecimalSeparator();

				if(amountLabel.text.length >= 1){
					//amountLabel.text += decSep;
					this.appendToAmount(decSep);
				}
				else{
					//amountLabel.text += "0" + decSep;
					this.appendToAmount("0" + decSep);
				}
			}
		},

		onDeletePressed: function(){

			var text = this.view.amountLabel.text;
			if(text.length>0){
				this.view.amountLabel.text = text.slice(0, text.length-1);
			}
			this.togglePlaceholder();
		},

		initFormatter: function(){
			/*global Intl*/
			formatter = new Intl.NumberFormat(getLocale(), {
				style: 'decimal',
				maximumSignificantDigits: 2,
				minimumSignificantDigits: 2
			});
		},

		wireButtons: function(){

			var view = this.view;

			numButtons.forEach((buttonId, index)=>{
				let button = view[buttonId];
				if(button){
					button.onTouchEnd = ()=>{
						//Note onNumberPressed must be exposed as a custom event.
						this.onNumberPressed(index);
					};
				}
			});

			//Note onDecimalPressed must be exposed as a custom event.
			this.view.decButton.onTouchEnd = ()=>{this.onDecimalPressed();};
			//Note onDeletePressed must be exposed as a custom event.
			this.view.delButton.onTouchEnd = ()=>{this.onDeletePressed();};
		},

		preShow: function(){

			//init formatter on preShow. Not on init in case the locale changes.
			this.initFormatter();
			this.view.amountLabel.text = "";
			this.view.placeHolderLabel.isVisible = true;

			//Move key pad out of sight for the animation to start on postShow.
			this.view.animationFlex.bottom = "-100%";

			//Localise the character for the decimal separator button.
			this.view.decButton.text = getDecimalSeparator();

			//Fix delete character U+232B does not work on Anroid.
			if(kony.os.isAndroid()){this.view.delButton.text = "C";}
		},

		postShow: function(){
			slideIn(this.view.animationFlex);
			this.wireButtons();
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
			kony.mvc.genAccessors(this, ["maxDecimals"]);
		}
	};
});
