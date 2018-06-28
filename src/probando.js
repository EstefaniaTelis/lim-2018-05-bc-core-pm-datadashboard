const cohortsURL = 'http://127.0.0.1:5500/data/cohorts.json';
const usersURL = 'http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressURL = 'http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/progress.json';

const getData = (callback) => {
    fetch(usersURL)
      .then((responseU) => {
        fetch(progressURL)
          .then((responseP) => {
            fetch(cohortsURL)
              .then((responseC) => {
                Promise.all([responseU.json(), responseP.json(), responseC.json()]).then(dataArr => {
                  const [users, progress, cohorts] = dataArr;
                  callback && callback(users, progress, cohorts);
                })
              })
          })
      })

   }
   
   const callbackGetData = (users, progress, cohorts) => {
    console.log('BEGIN')
    console.log(users, progress, cohorts)
    console.log('END')

    // users.forEach(user => {
    // console.log(user.id);
     
    // });

   }
   
   getData(callbackGetData)
   
//    const usuarioYid = progress(users.id);
//    console.log(usuarioYid);

// getData = (users, progress, cohorts) => {
// users.forEach(user => {
// console.log(user.name);
// }
// )};