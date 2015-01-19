var loadTestData = {
	r: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},
    bar: function () {
        return this.r(1, 10);
    },
	go: function (records) {
        
		for (var i=0;i<records;i++)
		{
			var cat = houseTally.categories.at(this.r(0, houseTally.categories.length - 1));
			
            var p = {
				name: houseTally.houses.at(this.r(0, houseTally.houses.length - 1)).get("name"),
				user: "echadwickb@gmail.com",
				time: this.r(1370062800000, new Date().getTime()),
				points: this.r(0, 100),
				category1: cat.get("category1"),
				category2: cat.get("category2")
			};
			
			$.ajax({
				url: "api/points",
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify(p),
				dataType: "json",
				success: function () {
					console.info(p);
				},
				error: function () {
					console.error(p);
				}
			});
		}
	}
}