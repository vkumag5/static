var FlexFormRaterAgeGroupHandler = Class.create({	
	initialize: function() {
		this.ageGroupIdsJson = {"pId":"p", "cId":"c", "aId":"a", "psId":"ps", "csId":"cs"};
		this.ageGroupSortOrder = ["p", "ps", "c", "cs", "a"];
		this.selfRaterId = "s";
	},
	getAgeGroupIdListBasedOnRater: function(itemSet, raterId) {
		var ageGroupBasedOnRater = [];
		for (var i = 0; i < itemSet.length; i++) {
			var item = itemSet[i];
			if ($.inArray(raterId, item.category) >=0) {
				ageGroupBasedOnRater = $.unique(ageGroupBasedOnRater.concat(item.ageGroup));
			}
		}
		if(raterId.toLowerCase() === this.selfRaterId) {
			ageGroupBasedOnRater.push(this.ageGroupIdsJson.psId); //this is pushed as currently none of the items have "ps" as ageGroup id.
			for(var i = 0; i < ageGroupBasedOnRater.length; i++) {
				if(ageGroupBasedOnRater[i] === this.ageGroupIdsJson.pId) {
					ageGroupBasedOnRater[i] = this.ageGroupIdsJson.psId;
				} else if(ageGroupBasedOnRater[i] === this.ageGroupIdsJson.cId) {
					ageGroupBasedOnRater[i] = this.ageGroupIdsJson.csId;
				}
			}			
		}
		return $.unique(ageGroupBasedOnRater);
	},
	getStudentRater: function(raterList) {
		for (var i = 0; i < raterList.length; i++) {
			var raterVal = raterList[i];
			if ((raterVal.identifier).toLowerCase() === this.selfRaterId) {
				return raterVal;
			}
		}
		return;
	},
	getOriginalAgeGroupIdBasedOnRater: function(ageGroupId, rater) {
		if (rater.toLowerCase() === this.selfRaterId) {
			if (ageGroupId.toLowerCase() === this.ageGroupIdsJson.psId) {
				return (this.ageGroupIdsJson.pId).toUpperCase();
			} else if (ageGroupId.toLowerCase() === this.ageGroupIdsJson.csId) {
				return (this.ageGroupIdsJson.cId).toUpperCase();
			}
		}
		return ageGroupId;
	}
});