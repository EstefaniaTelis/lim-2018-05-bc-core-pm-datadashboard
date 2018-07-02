const cohortsURL = 'http://127.0.0.1:5500/data/cohorts.json';
const usersURL = 'http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressURL = 'http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/progress.json';

const getDataJson = (callback) => {
  fetch(cohortsURL)
    .then((reponseC) => {
    })
}

// window.computeUsersStats = (users, progress, courses) => {
//   let dateE //objeto con 3 propiedades
//   {
//     total= 0 ;
//     completed = 0;
//     percent = 0
//   }
//   let dateR //objeto con 3 propiedades
//   {
//     total= 0;
//     completed=0;
//     percent = 0;
//     }
//   let dateQ //objeto con 5 propiedades
//   {
//   total=0;
//   completed = 0;
//   percent = 0;
//   scoreSum = 0;
//   scoreAvg = 0;
//   }
//   users.array.forEach(user => {
//   if (user.d) {  }

  
// });}