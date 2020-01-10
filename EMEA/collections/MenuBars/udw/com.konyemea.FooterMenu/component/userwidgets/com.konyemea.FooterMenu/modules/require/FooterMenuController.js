define(["toggleSkins", "toggleIcons"], function(toggleSkins, toggleIcons) {

	var tabButtons = [];
	var icons = [];
	const doNothing = ()=>{};

    return {

        navigateToForm: function(frmName) {
            var frmnav = new kony.mvc.Navigation(frmName);
            frmnav.navigate();
        },

		/*postShow: function() {
            this.view.flxHome.onTouchStart = this.onClickHomeMenu;
            this.view.flxSearchFor.onTouchStart = this.onClickSearchForMenu;
            this.view.flxChat.onTouchStart = this.onClickChatMenu;
            this.view.flxOther.onTouchStart = this.onClickOtherMenu;
        },*/
		onPressed: function(touchedButton){

			//First disable all buttons;
			tabButtons.forEach((button) => {
				button.onTouchEnd = doNothing;
			});

			var target = "";
			var touchedIcon;
			switch(touchedButton.id){
				case "flxHome":
					target = "home";
					touchedIcon = this.view.imgHome;
					break;
				case "flxSearch":
					target = "search";
					touchedIcon = this.view.imgSearch;
					break;
				case "flxChat":
					target = "chat";
					touchedIcon = this.view.imgChat;
					break;
				default: //"flxOther"
					target = "other";
					touchedIcon = this.view.imgOther;
			}
			toggleSkins(touchedButton, tabButtons);
			toggleIcons(touchedIcon, icons);
			this.navigateToForm(target);
		},

		preShow: function(){

			var view = this.view;

			tabButtons = [
				view.flxHome,
				view.flxSearch,
				view.flxChat,
				view.flxOther
			];

			icons = [
				view.imgHome,
				view.imgSearch,
				view.imgChat,
				view.imgOther
			];

			switch(this._selectedTab){
				case 'home':
					toggleSkins(view.flxHome, tabButtons);
					toggleIcons(view.imgHome, icons);
					break;

				case 'search':
					toggleSkins(view.flxSearch, tabButtons);
					toggleIcons(view.imgSearch, icons);
					break;

				case 'chat':
					toggleSkins(view.flxChat, tabButtons);
					toggleIcons(view.imgChat, icons);
					break;

				case 'other': //other
					toggleSkins(view.flxOther, tabButtons);
					toggleIcons(view.imgOther, icons);
					break;

				default: //none
					toggleSkins({}, tabButtons);
					toggleIcons({}, icons);
			}
		},
		postShow: function(){
			tabButtons.forEach((tabButton) => {
				//Add touch behaviour to each tab.
				tabButton.onTouchEnd = this.onPressed;
			});
		},

        constructor: function( /*baseConfig, layoutConfig, pspConfig*/ ) {
            this.view.postShow = this.postShow;
        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {
			kony.mvc.genAccessors(this, ["selectedTab"]);
		}
    };
});