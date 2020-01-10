define(function () {
	function toggleSkins(touchedButton, tabButtons){
		for (var tabButton of tabButtons) {
			if(tabButton.id === touchedButton.id){
				//touchedButton.skin = 'selectedTabButtonSkin';
				tabButton.skin = "sknLblFooterMenuMedium";
			}
			else{
				//touchedButton.skin = 'normalTabButtonSkin';
				tabButton.skin = "sknLblFooterMenuMediumInactive";
			}
		}
	}
    return toggleSkins;
});
