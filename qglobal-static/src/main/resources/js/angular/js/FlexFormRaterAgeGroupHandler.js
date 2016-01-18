var ageGroupIdsJson = {"pId":"p", "cId":"c", "aId":"a", "psId":"ps", "csId":"cs"};
var ageGroupSortOrder = ["p", "ps", "c", "cs", "a"];
var selfRaterId = "s";
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
		if(raterId.toLowerCase() === selfRaterId) {
			ageGroupBasedOnRater.push(ageGroupIdsJson.psId); //this is pushed as currently none of the items have "ps" as ageGroup id.
			for(var i = 0; i < ageGroupBasedOnRater.length; i++) {
				if(ageGroupBasedOnRater[i] === ageGroupIdsJson.pId) {
					ageGroupBasedOnRater[i] = ageGroupIdsJson.psId;
				} else if(ageGroupBasedOnRater[i] === ageGroupIdsJson.csId) {
					ageGroupBasedOnRater[i] = ageGroupIdsJson.csId;
				}
			}			
		}
		return $.unique(ageGroupBasedOnRater);
	},
	getStudentRater: function(raterList) {
		for (var i = 0; i < raterList.length; i++) {
			var raterVal = raterList[i];
			if ((raterVal.identifier).toLowerCase() === selfRaterId) {
				return raterVal;
			}
		}
		return;
	}
});