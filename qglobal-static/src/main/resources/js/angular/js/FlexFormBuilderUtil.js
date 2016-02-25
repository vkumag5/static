function FlexFormBuilderUtil() {
}
var flexFormRaterAgeGroupHandler = new FlexFormRaterAgeGroupHandler();
FlexFormBuilderUtil.getFormNameOfCopy = function(existingFormName) {
	var PATTERN = /^(.*)-copy(?:\((\d+)\))?$/g;
	var match = existingFormName.match(PATTERN);
	var formName = existingFormName.replace(PATTERN, "$1");
	if (match && match !== "") {
		var copyNum = existingFormName.replace(PATTERN, "$2");
		if (copyNum && copyNum !== "") {
			return formName + "-copy(" + (parseInt(copyNum) + 1) + ")";
		} else {
			return formName + "-copy(2)";
		}
	}
	return formName + "-copy";
};

FlexFormBuilderUtil.isFormNamePresent = function(formName) {
	if (formName && formName.length > 0) {
		return true;
	}
	return false;
};

FlexFormBuilderUtil.getAgeGroupRelatedName = function(selectedAgeGroupIds, ageGroups, selectedRater) {
	var ageGroupNameSection = "";
	for (var i = 0; i < selectedAgeGroupIds.length; i++) {
		var id = selectedAgeGroupIds[i];
		if(selectedRater.toLowerCase() === flexFormRaterAgeGroupHandler.selfRaterId && id.toLowerCase() == flexFormRaterAgeGroupHandler.ageGroupIdsJson.cId){
			id = (flexFormRaterAgeGroupHandler.ageGroupIdsJson.csId).toUpperCase();
			} else if(selectedRater.toLowerCase() === flexFormRaterAgeGroupHandler.selfRaterId && id.toLowerCase() == flexFormRaterAgeGroupHandler.ageGroupIdsJson.pId) {
				id = (flexFormRaterAgeGroupHandler.ageGroupIdsJson.psId).toUpperCase();
			}
		if (i > 0) {
			ageGroupNameSection = ageGroupNameSection + " and ";
		} else {
			ageGroupNameSection = ageGroupNameSection + " ";
		}
		var ageGroupName = FlexFormBuilderUtil.getAgeGroupNameBasedOnId(ageGroups, id);
		ageGroupNameSection = ageGroupNameSection + ageGroupName;
	}
	return ageGroupNameSection;
}

FlexFormBuilderUtil.getAgeGroupNameBasedOnId = function (ageGroups, id) {
	for ( var j = 0; j < ageGroups.length; j++) {
		if (id == ageGroups[j].identifier) {
			return ageGroups[j].name;
		}
	}
	return "";
}
