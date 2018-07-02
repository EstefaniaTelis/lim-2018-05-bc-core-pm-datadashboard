let pintadoCohort = document.getElementById('seleccionandoCohorts'); //Asociando JS y HTML
pintadoCohort.length = 0;

let defaultOption = document.createElement('option'); //Define option predeterminada
defaultOption.text = 'Selecciona una cohort';

pintadoCohort.add(defaultOption);
pintadoCohort.selectedIndex = 0;


fetch(cohortsURL)  //fetch de cohorts
 .then(function(response) {  
     if (response.status !== 200) {  
       console.warn('Oops, parece que hubo un problema. Status Code: ' +
         response.status);  
       return;  
     }
     response.json()
     .then(function(data) {  
       let option;
       for (let i = 0; i < data.length; i++) {
         option = document.createElement('option');
           option.text = data[i].id;
           option.value = data[i].id;
           pintadoCohort.add(option);
       }    
     });
   }  
 )  

 .catch(function(err) {  
   console.error('Fetch Error -', err);  
 });
function dataUsers(){ //Detecta la cohort de preadmisión e imprime sus users en el HTML
  let lim = document.getElementById('seleccionandoCohorts').value;
  console.log(lim);
  if(lim === "lim-2018-03-pre-core-pw")
  {
    fetch(usersURL) //fetch de users
    .then(function(users) {
      return users.json();
    })

    .then((dataUsers2)=>{
     const table= document.createElement('table');
     const tableHead = document.createElement('tr');
     tableHead.innerHTML += '<th>Alumnas</th><th>ID</th>';
     table.appendChild(tableHead);

      for(let i=0;i<dataUsers2.length;i++){
       
       const tableRow = document.createElement('tr');
       tableRow.innerHTML += '<td>'+dataUsers2[i].name+'</td>';
       tableRow.innerHTML += '<td>'+dataUsers2[i].id+'</td>';
       table.appendChild(tableRow);

   
      }
      six.appendChild(table);
     
    })
  }
}

// const = getDataJSON = (callBack) => { 
//   fetch('http://127.0.0.1:5500/data/cohorts.json')
//     .then((responseC) => {
//       fetch('http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/users.json')
//         .then((responseU) => {
//           fetch('http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/progress.json')
//            .then((responseP) => {
//               Promise.all([responseC.json(), responseP.json(), responseU.json()])
//               .then(data => {
//                   const [responseC, responseP, responseU] = data;
//                   callBack[cohorts, users, progress];
//               })
//           })
//       })
//   })

// window.computeUsersStats = (users, progress, courses) => {
//     let stats = {users, progress, courses};
//     let usersWithStats = " ";

//     return usersWithStats [{
//         "stats": {
//             "percent": 0, //Número entero entre 0 y 100 que indica el porcentaje de completitud general del usuario con respecto 
//                       //a todos los cursos asignados a su cohort.
//             "excercises": {
//                 "total": 0, //Número total de ejercicios autocorregidos presentes en cursos del cohort.
//                 "completed": 0, //Número de ejercicios autocorregidos completados por el usuario.
//                 "percent": 0 //Porcentaje de ejercicios autocorregidos completados.
//             },
//             "reads": {
//                 "total": 0, //Número total de lecturas presentes en cursos del cohort.
//                 "completed": 0, //Número de lecturas completadas por el usuario.
//                 "percent": 0 //Porcentaje de lecturas completadas.  
//             },
//             "quizzes": {
//                 "total": 0, //Número total de quizzes presentes en cursos del cohort.
//                 "completed": 0, //Número de quizzes completadas por el usuario.
//                 "percent": 0, //Porcentaje de quizzes completadas.
//                 "scoreSum": 0, //Suma de todas las puntuaciones (score) de los quizzes completados.
//                 "scoreAvg": 0 //Promedio de puntuaciones en quizzes completados.
//             },

//         }

//     }]

// }

function login(form){
  if(form.id.value == 'Yavet'){
    if(form.pass.value == 'Cespedes'){
      location="index.html"
    }
  }
  else{
    alert("Ingrese usuario y contrseña correctos");
  }
}