const cohortsURL = '../data/cohorts.json';
const usersURL = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressURL = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';

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

dropdown.addEventListener('change', (evt) => {
  dataUsers(evt.target.value);
});

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
//DROPDOWN ORDER
let orderSelect = document.getElementById('order');

orderSelect.addEventListener('change', (e) =>{
options.sortBy = orderSelect.value;
dataUsers();
});

// FIN DROPDOWN ORDER


const filterName = document.getElementById('writeNamesUsers'); // Llama al input de búsqueda

countryOnChange = () => {
  let cohortFilter = window.cohorts.filter(item => (item.id.slice(0, 3) == dropdownOne.value));
  cohortSelect(cohortFilter);
}
const options = {cohort: {}, cohortData: {users: [], progress: []}, sortBy: '', orderDirection: '', search: ''}

//IMPRIME USUARIOS DE LIM PRECORE 2018
function dataUsers(selectedCohort) { //Detecta la cohort de preadmisión e imprime sus users en el HTML
  if (selectedCohort !== "lim-2018-03-pre-core-pw") {
    return;
  }
    const cohort = cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    // const options = {cohort: cohort, cohortData: {users: users, progress: progress}, sortBy: '', orderDirection: '', search: filterName.value}
    options.cohort = cohort;
    options.cohortData.users = users;
    options.cohortData.progress = progress;
    // options.sortBy = orderSelect.value;
    options.search = filterName.value;
    let userStats = processCohortData(options);

    // console.log("window.usersWithStats",window.usersWithStats);  
    let tableContainer = document.createElement('div');
    tableContainer.classList = "container-table"
    let table = document.createElement('table');
    table.classList = "table";
    let tableHead = document.createElement('tr');
    tableHead.classList = "thead-dark";
    tableHead.innerHTML += '<th>Alumnas</th><th>Completitud general</th><th>Ejecicios completados</th><th>%</th><th>L. completadas</th><th>% Lecturas</th><th>Quizzes completados</th><th>% Quizzes</th><th>scoreSum</th><th>scoreAvg</th>';
    table.appendChild(tableHead);

    userStats.forEach(user => {
      // console.log(user);
      let tableRow = document.createElement('tr');
      tableRow.innerHTML += '<td>' + user.name + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.percent + '</td>';
      // tableRow.innerHTML += '<td>' + user.stats.exercises.total + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.exercises.completed + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.exercises.percent + '</td>';
      // tableRow.innerHTML += '<td>' + user.stats.reads.total + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.reads.completed + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.reads.percent + '</td>';
      // tableRow.innerHTML += '<td>' + user.stats.quizzes.total + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.quizzes.completed + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.quizzes.percent + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.quizzes.scoreSum + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.quizzes.scoreAvg + '</td>';
      table.appendChild(tableRow);

    })

    tableContainer.appendChild(table);
    six.appendChild(tableContainer);
}




// function login(form){
//   if(form.id.value == 'Yavet'){
//     if(form.pass.value == 'Cespedes'){
//       location="index.html"
//     }
//   }
//   else{
//     alert("Ingrese usuario y contrseña correctos");
//   }
// }
