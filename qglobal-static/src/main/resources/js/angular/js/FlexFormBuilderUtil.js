function FlexFormBuilderUtil() {
}

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

FlexFormBuilderUtil.isFormStatusActive = function(formStatus) {
	if (formStatus && formStatus === 'Active') {
		return true;
	}
	return false;
};
