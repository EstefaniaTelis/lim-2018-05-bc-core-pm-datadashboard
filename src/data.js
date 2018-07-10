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
  

window.filterUsers = (users, search) => {
  const filterUsers = users.filter(userFilter => userFilter.name.toLowerCase().indexOf(search.toLowerCase())>-1 )
  return filterUsers;

  console.log(filterUsers);
}

window.processCohortData = (options) => {
  const courses = Object.keys(options.cohort.coursesIndex);//Devuelve un array con las 
  let estudiantes = computeUsersStats(options.cohortData.users,options.cohortData.progress, courses);//enviando las propiedades users,progress,courses.
  //let estudiantesOrdenados = sortUsers(estudiantes, options.sortBy, options.orderDirection);
  
  let filtrandoUsuarios = filterUsers(estudiantes, options.search);

  return filtrandoUsuarios;
}