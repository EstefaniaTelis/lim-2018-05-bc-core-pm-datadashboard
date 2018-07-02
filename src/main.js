const cohortsURL = 'http://127.0.0.1:5500/data/cohorts.json';
const usersURL = 'http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressURL = 'http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/progress.json';

window.usersWithStats = []
const getData = (callback) => {
  fetch(usersURL)
    .then((responseU) => {
      fetch(progressURL)
        .then((responseP) => {
          fetch(cohortsURL)
            .then((responseC) => {
              Promise.all([responseU.json(), responseP.json(), responseC.json()])
                .then(dataArr => {
                  [window.users, window.progress, window.cohorts] = dataArr; //uso en ecs6
                  callback(users, progress, cohorts);
                })
            })
        })
    })
}
const callbackGetData = (users, progress, cohorts) => {
  cohortSelect(cohorts);

  // esta seria la forma global (todos los cohorts)
  // let courses = [];
  // cohorts.forEach( cohort => {
  //   // console.log(cohort.coursesIndex)
  //   courses.push(cohort.coursesIndex)
  // })
  const cohort = cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
  const courses = Object.keys(cohort.coursesIndex);
  // console.log(users);
  window.usersWithStats = computeUsersStats(users, progress, courses)

  // console.log(users)
}

getData(callbackGetData); // promise.all de los fetch con todos los datos

// INICIO DROPDOWN PAISES
let dropdownOne = document.getElementById('countryDropdown'); //Asociando JS y HTML
dropdownOne.length = 0;
let defaultOptionCountry = document.createElement('option'); //Definiendo el option por defecto
defaultOptionCountry.text = 'Selecciona una ciudad';
dropdownOne.add(defaultOptionCountry);
dropdownOne.selectedIndex = 0;

const countrySelector = (optionCountry) => { // Función que asignma nombres de países
  let country = [
    { value: "lim", text: "Lima" },
    { value: "scl", text: "Santiago" },
    { value: "cdm", text: "Ciudad de México" },
    { value: "spl", text: "Sao Paulo" }
  ];

  country.forEach(item => {
    optionCountry = document.createElement('option');
    optionCountry.text = item.text;
    optionCountry.value = item.value;
    dropdownOne.add(optionCountry);
  })
};
countrySelector(dropdownOne);
//FIN DROPDOWN PAISES

//INICIO DROPDOWN COHORTS
let dropdown = document.getElementById('cohortsDropdown'); //Asociando JS y HTML

const cohortSelect = (cohort) => {
  dropdown.length = 0;
  let defaultOption = document.createElement('option'); //Definiendo el option por defecto
  defaultOption.text = 'Selecciona una cohort';
  // console.log(window.cohort);
  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  for (let i = 0; i < cohort.length; i++) {
    option = document.createElement('option');
    option.text = cohort[i].id;
    option.value = cohort[i].id;
    dropdown.add(option);
  }
}
//FIN DROPDOWN COHORTS

countryOnChange = () => {
  let cohortFilter = window.cohorts.filter(item => (item.id.slice(0, 3) == dropdownOne.value));
  cohortSelect(cohortFilter);
}

//IMPRIME USUARIOS DE LIM PRECORE 2018
function dataUsers() { //Detecta la cohort de preadmisión e imprime sus users en el HTML
  let lim = document.getElementById('cohortsDropdown').value;
  // console.log(lim);
  if (lim === "lim-2018-03-pre-core-pw") {
    // console.log("window.usersWithStats",window.usersWithStats);  
    let tableContainer = document.createElement('div');
    tableContainer.classList = "container-table"
    let table = document.createElement('table');
    table.classList = "table";
    let tableHead = document.createElement('tr');
    tableHead.classList = "thead-dark";
    tableHead.innerHTML += '<th>Alumnas</th><th>Completitud general</th><th>Total de ejecicios</th><th>Ejecicios completados</th><th>%</th><th>Lecturas</th><th>L. completadas</th><th>% Lecturas</th><th>Nro Quizzes</th><th>Quizzes completados</th><th>% Quizzes</th><th>scoreSum</th><th>scoreAvg</th>';
    table.appendChild(tableHead);

    window.usersWithStats.forEach(user => {
      // console.log(user);
      let tableRow = document.createElement('tr');
      tableRow.innerHTML += '<td>' + user.name + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.percent + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.exercises.total + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.exercises.completed + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.exercises.percent + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.reads.total + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.reads.completed + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.reads.percent + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.quizzes.total + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.quizzes.completed + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.quizzes.percent + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.quizzes.scoreSum + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.quizzes.scoreAvg + '</td>';
      table.appendChild(tableRow);

    })

    tableContainer.appendChild(table);
    six.appendChild(tableContainer);

  }
}

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
