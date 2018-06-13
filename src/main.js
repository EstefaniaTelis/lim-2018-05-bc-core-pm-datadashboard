<<<<<<< HEAD
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
=======
//Jalando data de progress JSON
fetch('http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/progress.json')
    .then(function(progress) {
        return progress.json();
    })
    .then(function(progress) {
        console.log(progress);
    
    });

//Jalando data de cohorts JSON
fetch('http://127.0.0.1:5500/data/cohorts.json')
    .then(function(cohorts) {
        return cohorts.json();
    })
    .then(function(cohorts) {
        console.log(cohorts);
    
    });
    
    //Jalando data de users JSON
fetch('http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/users.json')
    .then(function(users) {
        return users.json();
    })
    .then(function(users) {
        console.log(users);
    
    });
>>>>>>> 3d62a3fecf1cb61b6d11508d4b8882cdab1d85ed
