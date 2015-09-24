var FlexFormRaterAgeGroupHandler = Class.create({
	initialize: function() {
	},
	getAgeGroupIdListBasedOnRater: function(itemSet, raterId) {
		var ageGroupBasedOnRater = [];
		for (var i = 0; i < itemSet.length; i++) {
			var item = itemSet[i];
			if ($.inArray(raterId, item.category) >=0) {
				ageGroupBasedOnRater = $.unique(ageGroupBasedOnRater.concat(item.ageGroup));
			}
		}
		return ageGroupBasedOnRater;
	},
	getStudentRaterId: function(raterList) {
		for (var i = 0; i < raterList.length; i++) {
			var raterVal = raterList[i];
			if (raterVal.name === "Student" || raterVal.name === "student") {
				return raterVal.identifier;
			}
		}
		return;
	},
	getStudentRaterName: function(raterList) {
		for (var i = 0; i < raterList.length; i++) {
			var raterVal = raterList[i];
			if (raterVal.name === "Student" || raterVal.name === "student") {
				return raterVal.name;
			}
		}
		return;
	}
});