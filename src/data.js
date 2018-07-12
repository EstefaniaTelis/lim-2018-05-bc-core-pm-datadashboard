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
//2da función
window.sortUsers = (users, orderBy, orderDirection) => {
  //Compare users by name ASC
  let comparedNames = (a, b) => {
    if (a.name < b.name) {
      return -1;   
    }
    if (a.name > b.name) {
      return 1;
    } else return 0;
  }

//Compare users by name DESC
let comparedNamesDesc = (a, b) => -comparedNames(a, b);

//Compare users by percent ASC
let comparePercent = (a, b) => {
  if (a.stats.percent < b.stats.percent) {
    return -1;
  } else if (a.stats.percent > b.stats.percent) {
    return 1;
  } else return 0;
}
//Compare users by percent DESC
let comparePercentDesc = (a, b) => -comparePercent(a, b);
//Compare EXCERCISES by percent ASC
let compareExercisesPercent = (a, b) => {
  if (a.stats.exercises.percent < b.stats.exercises.percent) {
    return -1;
  } else if (a.stats.exercises.percent > b.stats.exercises.percent) {
    return 1;
  } else return 0;
}
//Compare EXCERCISES by percent DESC
let compareExercisesPercentDesc = (a, b) => -compareExercisesPercent(a, b);
//Compare QUIZZES by percent ASC
let compareQuizzesPercent = (a, b) => {
  if (a.stats.quizzes.percent < b.stats.quizzes.percent) {
    return -1;
  } else if (a.stats.quizzes.percent > b.stats.quizzes.percent) {
    return 1;
  } else return 0;
}
//Compare QUIZZES by percent DESC
let compareQuizzesPercentDesc = (a, b) => -compareQuizzesPercent(a, b);

//Compare QUIZZES by scoreAVG ASC
let compareQuizzesScoreAvg = (a, b) => {
  if (a.stats.quizzes.scoreAvg < b.stats.quizzes.scoreAvg) {
    return -1;
  } else if (a.stats.quizzes.scoreAvg > b.stats.quizzes.scoreAvg) {
    return 1;
  } else return 0;
}
//Compare QUIZZES by scoreAVG DESC
let compareQuizzesScoreAvgDesc = (a, b) => -compareQuizzesScoreAvg(a, b);

//Compare READS by percent ASC
let compareReadsPercent = (a, b) => {
  if (a.stats.reads.percent < b.stats.reads.percent) {
    return -1;
  } else if (a.stats.reads.percent > b.stats.reads.percent) {
    return 1;
  } else return 0;
}
//Compare READS by percent DESC
let compareReadsPercentDesc = (a, b) => -compareReadsPercent(a, b);
let orderedUsers = users;
if (orderBy === "name") {
  if (orderDirection === "ASC") {
    orderedUsers.sort(comparedNames)
  } else orderedUsers.sort(comparedNamesDesc)
}
if (orderBy === "percent") {
  if (orderDirection === "ASC") {
    orderedUsers.sort(comparePercent)
  } else orderedUsers.sort(comparePercentDesc)
}
if (orderBy === "exercisesPercent") {
  if (orderDirection === "ASC") {
    orderedUsers.sort(compareExercisesPercent)
  } else orderedUsers.sort(compareExercisesPercentDesc)
}
if (orderBy === "quizzesPercent") {
  if (orderDirection === "ASC") {
    orderedUsers.sort(compareQuizzesPercent)
  } else orderedUsers.sort(compareQuizzesPercentDesc)
}
if (orderBy === "quizzesScoreAvg") {
  if (orderDirection === "ASC") {
    orderedUsers.sort(compareQuizzesScoreAvg)
  } else orderedUsers.sort(compareQuizzesScoreAvgDesc)
}
if (orderBy === "readsPercent") {
  if (orderDirection === "ASC") {
    orderedUsers.sort(compareReadsPercent);
  } else orderedUsers.sort(compareReadsPercentDesc)
}
return orderedUsers;
};

///////////////// processCohortData(options)
window.filterUsers = (users, search) => {
  const filterUsers = users.filter(userFilter => userFilter.name.toLowerCase().indexOf(search.toLowerCase())>-1 )
  return filterUsers;
}

window.processCohortData = (options) => {
  const courses = Object.keys(options.cohort.coursesIndex); //Devuelve un array con las 
  let estudiantes = computeUsersStats(options.cohortData.users,options.cohortData.progress, courses); //enviando las propiedades users,progress,courses.
  let estudiantesOrdenados = sortUsers(estudiantes, options.orderBy, options.orderDirection);
  
  let filtrandoUsuarios = filterUsers(estudiantesOrdenados, options.search);

  return filtrandoUsuarios;
}