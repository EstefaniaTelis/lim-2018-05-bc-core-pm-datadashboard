window.computeUsersStats = (users, progress, courses) => {
  
  let usersWithStats = [];
  let i = 0
  users.forEach(user => {

    let newUser = user;
    newUser.progress = progress[user.id]
    newUser.stats = {
      percent: 0,
      exercises: {
        total: 0,
        completed: 0,
        percent: 0
      },
      quizzes: {
        total: 0,
        completed: 0,
        percent: 0,
        scoreSum: 0,
        scoreAvg: 0
      },
      reads: {
        total: 0,
        completed: 0,
        percent: 0
      }
    }

    if (newUser.progress['intro'] && newUser.progress['intro']['units'] && newUser.role === "student") {
      let unitsUser = Object.keys(newUser.progress['intro']['units'])
      // console.log(unitsUser);
      let puntuacion = 0
      let unitsUserMap = [];

      unitsUser.forEach(unit => {
        // console.log(newUser.progress['intro']['units'][unit]);
        unitsUserMap[unit] = newUser.progress['intro']['units'][unit];
        // console.log(unitsUserMap[unit]);
        let unitParts = Object.keys(unitsUserMap[unit]['parts']);
        // console.log(unitParts);
        let partsMap = [];
        // console.log(partsMap);

        unitParts.forEach(part => {
          partsMap[part] = unitsUserMap[unit]['parts'][part];
          // AQUI CALCULAMOS EL STATS POR CADA USUARIO

          if (partsMap[part].type === "practice") {
            newUser.stats.exercises.total++

            if (partsMap[part].completed == 1) {
              newUser.stats.exercises.completed++
            }
            newUser.stats.exercises.percent = Math.round((newUser.stats.exercises.completed * 100) / newUser.stats.exercises.total)
          }
          // console.log(partsMap[part].type); 
          if (partsMap[part].type === "read") {
            newUser.stats.reads.total++

            if (partsMap[part].completed == 1) {
              newUser.stats.reads.completed++

            }
            newUser.stats.reads.percent = Math.round((newUser.stats.reads.completed * 100) / newUser.stats.reads.total)

          }
          if (partsMap[part].type === "quiz") {
            newUser.stats.quizzes.total++

            if (partsMap[part].completed == 1) {
              newUser.stats.quizzes.completed++
              puntuacion += partsMap[part].score
            }
            newUser.stats.quizzes.percent = Math.round((newUser.stats.quizzes.completed * 100) / newUser.stats.quizzes.total)

          }
        })
        unitsUserMap[unit]['parts'] = partsMap
      })

      newUser.stats.quizzes.scoreSum = puntuacion; // todas las puntuaciones
      newUser.stats.quizzes.scoreAvg = Math.round(puntuacion / newUser.stats.quizzes.completed);  // todas las puntiacion / el total de quizzes completados
        if (newUser.stats.quizzes.completed === 0){
          newUser.stats.quizzes.scoreAvg = 0;
        }

      // console.log(unitsUserMap); 
      newUser.progress['intro']['units'] = unitsUserMap;
      // console.log(newUser.stats);
      newUser.stats.percent = newUser.progress['intro'].percent
    }
    usersWithStats[i] = newUser
    i++
  })
  // console.log(usersWithStats)
  // console.log(usersWithStats[0]);
  return usersWithStats
}
////2da función
// window.sortUsers = (users, orderBy, orderDirection) => {
//   //Compare users by name ASC
//   let comparedNames = (userA, userB) => {
//     if (userA.name < userB.name) {
//       return -1;   
//     }
//     if (userA.name > userB.name) {
//       return 1;
//     } else return 0;
//   }

// //Compare users by name DESC
// let comparedNamesDesc = (userA, userB) => -comparedNames(userA, userB);

// //Compare users by percent ASC
// let comparePercent = (userA, userB) => {
//   if (userA.stats.percent < userB.stats.percent) {
//     return -1;
//   } else if (userA.stats.percent > userB.stats.percent) {
//     return 1;
//   } else return 0;
// }
// //Compare users by percent DESC
// let comparePercentDesc = (userA, userB) => -comparePercent(userA, userB);
// //Compare EXCERCISES by percent ASC
// let compareExercisesPercent = (userA, userB) => {
//   if (userA.stats.exercises.percent < userB.stats.exercises.percent) {
//     return -1;
//   } else if (userA.stats.exercises.percent > userB.stats.exercises.percent) {
//     return 1;
//   } else return 0;
// }
// //Compare EXCERCISES by percent DESC
// let compareExercisesPercentDesc = (userA, userB) => -compareExercisesPercent(userA, userB);
// //Compare QUIZZES by percent ASC
// let compareQuizzesPercent = (userA, userB) => {
//   if (userA.stats.quizzes.percent < userB.stats.quizzes.percent) {
//     return -1;
//   } else if (userA.stats.quizzes.percent > userB.stats.quizzes.percent) {
//     return 1;
//   } else return 0;
// }
// //Compare QUIZZES by percent DESC
// let compareQuizzesPercentDesc = (userA, userB) => -compareQuizzesPercent(userA, userB);

// //Compare QUIZZES by scoreAVG ASC
// let compareQuizzesScoreAvg = (userA, userB) => {
//   if (userA.stats.quizzes.scoreAvg < userB.stats.quizzes.scoreAvg) {
//     return -1;
//   } else if (userA.stats.quizzes.scoreAvg > userB.stats.quizzes.scoreAvg) {
//     return 1;
//   } else return 0;
// }
// //Compare QUIZZES by scoreAVG DESC
// let compareQuizzesScoreAvgDesc = (userA, userB) => -compareQuizzesScoreAvg(userA, userB);

// //Compare READS by percent ASC
// let compareReadsPercent = (userA, userB) => {
//   if (userA.stats.reads.percent < userB.stats.reads.percent) {
//     return -1;
//   } else if (userA.stats.reads.percent > userB.stats.reads.percent) {
//     return 1;
//   } else return 0;
// }
// //Compare READS by percent DESC
// let compareReadsPercentDesc = (userA, userB) => -compareReadsPercent(userA, userB);

// if (orderBy === "name") {
//   if (orderDirection === "ASC") {
//     orderedUsers.sort(comparedNames)
//   } else orderedUsers.sort(comparedNamesDesc)
// }
// if (orderBy === "percent") {
//   if (orderDirection === "ASC") {
//     orderedUsers.sort(comparePercent)
//   } else orderedUsers.sort(comparePercentDesc)
// }
// if (orderBy === "exercises percent") {
//   if (orderDirection === "ASC") {
//     orderedUsers.sort(compareExercisesPercent)
//   } else orderedUsers.sort(compareExercisesPercentDesc)
// }
// if (orderBy === "quizzes percent") {
//   if (orderDirection === "ASC") {
//     orderedUsers.sort(compareQuizzesPercent)
//   } else orderedUsers.sort(compareQuizzesPercentDesc)
// }
// if (orderBy === "quizzes scoreAvg") {
//   if (orderDirection === "ASC") {
//     orderedUsers.sort(compareQuizzesScoreAvg)
//   } else orderedUsers.sort(compareQuizzesScoreAvgDesc)
// }
// if (orderBy === "reads percent") {
//   if (orderDirection === "ASC") {
//     orderedUsers.sort(compareReadsPercent);
//   } else orderedUsers.sort(compareReadsPercentDesc)
// }
// return orderedUsers;
// };

///////////////// processCohortData(options)

window.processCohortData = (options) => {
  const courses = Object.keys(options.cohort.coursesIndex);
  let estudiantes = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
  //estudiantes = sortUsers(estudiantes, options.orderBy, options.orderDirection);
  // if (options.search !== '') {
  //   estudiantes = filterUsers(estudiantes, options.search);
  // }
  return estudiantes;
}