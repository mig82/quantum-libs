define(function() {

	var supported = true;
	var configMap = {};
	var localise = kony.i18n.getLocalizedString2 || kony.i18n.getLocalizedString;

	function isBiometricSupported() {
		//I'm using == on purpose because I don't know if this returns string or number.
		//TODO: Use kony.localAuthentication.getBiometryType to determine whether it's faceId or touchId that's supported.
		return 5000 == kony.localAuthentication.getStatusForAuthenticationMode(
			constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID
		);
	}

	return {

		login: function() {
			kony.localAuthentication.authenticate(
				constants.LOCAL_AUTHENTICATION_MODE_TOUCH_ID,
				(code) => {
					this.toggleIcon(false);
					if(code == 5000){
						//Exposed as a custom event.
						this.onSuccess();
					}
					else{
						//Exposed as a custom event.
						this.onFailure();
					}
				},
				configMap
			);
		},

		toggleIcon: function(touched) {
			if (touched) {
				this.view.iconImage.src = 'face_id_touched.png';
			} else {
				this.view.iconImage.src = 'face_id.png';
			}
		},

		onPressed: function() {
			if(supported){
				this.toggleIcon(true);
				this.login();
			}
		},

		preShow: function(){
			//this.view.isVisible = supported;
		},

		//Expose as custom method to allow form to react accordingly.
		isSupported: function(){
			return supported;
		},

		postShow: function(){
			this.view.iconImage.onTouchEnd = this.onPressed;
		},

		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			supported = isBiometricSupported();
			configMap = {
				'promptMessage': localise(this._promptMessage),
				'fallbackTitle': localise(this._fallbackMessage)
			};
			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
		},

		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

			//Exposed as a custom properties
			defineGetter(this, "promptMessage", () => {return this._promptMessage;});
			defineSetter(this, "promptMessage", (promptMessage) => {this._promptMessage = promptMessage;});

			defineGetter(this, "fallbackMessage", () => {return this._fallbackMessage;});
			defineSetter(this, "fallbackMessage", (fallbackMessage) => {this._fallbackMessage = fallbackMessage;});

		}
	};
});