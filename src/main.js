fetch ("http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/progress.json" )
        .then(function(progress){
        return progress.json();
        })
        .then(function(progress){
        console.log(progress);
        });
        
fetch ("http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/users.json" )
        .then(function(users){
        return users.json();
        })
        .then(function(users){
        console.log(users);
        });