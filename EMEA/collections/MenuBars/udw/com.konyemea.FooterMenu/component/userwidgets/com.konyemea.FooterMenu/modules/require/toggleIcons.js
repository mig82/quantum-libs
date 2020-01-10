define(function () {

	function toggleIcons(touchedIcon, icons){

		icons.forEach((icon) => {
			if(icon.id === touchedIcon.id){
				switch(icon.id){

					case "imgHome":
						icon.src = "home_active.png";
						break;

					case "imgSearch":
						icon.src = "search_active.png";
						break;

					case "imgChat":
						icon.src = "chat_active.png";
						break;

					default: //imgOther
						icon.src = "other_active.png";
				}
			}
			else{
				switch(icon.id){

					case "imgHome":
						icon.src = "home_inactive.png";
						break;

					case "imgSearch":
						icon.src = "search_inactive.png";
						break;

					case "imgChat":
						icon.src = "chat_inactive.png";
						break;

					default: //imgOther
						icon.src = "other_inactive.png";
				}
			}
		});
	}
    return toggleIcons;
});