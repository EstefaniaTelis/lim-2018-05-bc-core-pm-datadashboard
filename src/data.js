let dropdown = document.getElementById('cohortsDropdown');
dropdown.length = 0;

let select1 = document.getElementById('opcion1');
select1.addEventListener("click", ()=>{
}
)
let defaultOption = document.createElement('option');
defaultOption.text = 'Selecciona una cohort';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

const cohortURL = 'http://127.0.0.1:5500/data/cohorts.json';
const usersURL = 'http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressURL ='http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/progress.json';

  fetch(cohortURL)
  .then(function(response) {  
      if (response.status !== 200) {  
        console.warn('Oops, parece que hubo un problema. Status Code: ' + 
          response.status);  
        return;  
      }
      response.json().then(function(data) {  
        let option;
    	for (let i = 0; i < data.length; i++) {
          option = document.createElement('option');
      	  option.text = data[i].id;
      	  option.value = data[i].id;
      	  dropdown.add(option);
    	}    
      }); 
    })
// const callbackGetCohort = (cohorts) => {
//   console.log('BEGIN')
//   console.log(cohorts)
//   console.log('END')
// }

 const getData = (callback) => {
      fetch(usersURL)
        .then((responseU) => {
          fetch(progressURL)
            .then((responseP) => {
             Promise.all([responseU.json(), responseP.json()]).then(dataArr => {
                [window.users, window.progress] = dataArr; //uso en ecs6
                window.userGlobal = dataArr[0];
                callback(users, progress);
            })
        })
    })
}
const callbackGetData = (users, progress) => {
  console.log('BEGIN')
  console.log(users, progress)
  console.log('END')
}

getData(callbackGetData);

const callCohortsData = (users) =>{
  console.log(cohorts);
}


//Añadir comentarioContraer 