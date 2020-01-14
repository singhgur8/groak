module.exports = {
    findCommonFood: function(usersArray) {
        var cuisineDish = "" // later make this an array of cuisine and dish name
        var cache = {}

        // Currently Logic only considers preferences and only the cuisine type!!
        // iterate through users, create a cache of their cusines and dishes
        // and

        for ( var i = 0; i < usersArray.length; i++ ){
            // usersArray[i].preferences is also an array so iterate through that
            // if a new cuisine comes up, then start the count off at one, otherwise increment the count

            for (var j = 0; j < usersArray[i].preferences.length; j++) {
                if (cache[usersArray[i].preferences[j].cuisine] === undefined) {
                    cache[usersArray[i].preferences[j].cuisine] = 1;
                } else {
                    cache[usersArray[i].preferences[j].cuisine]++
                }
            }
        }

        // Once I have a cache object, I will need to find the highest cusinsine and dish
        // for time being I could just make this simpler by not splitting the preferences up into two
        // but since each element of the preferences is an object, I should json strinigify it
        var largest = 0;
        for (var k in cache) {
            if (cache[k] > largest) {
                largest = cache[k]
                cuisineDish = k
            }
        }
        return cuisineDish;
    }
}