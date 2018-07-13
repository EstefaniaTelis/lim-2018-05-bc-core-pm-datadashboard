////////////////////// BASICS
const cohortsURL = '../data/cohorts.json';
const usersURL = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressURL = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const options = { cohort: {}, cohortData: { users: [], progress: [] }, orderBy: '', orderDirection: '', search: '' }


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

//////////////////////////////////////// INICIO DROPDOWN PAISES
let dropdownOne = document.getElementById('countryDropdown'); //Asociando JS y HTML
dropdownOne.length = 0;
let defaultOptionCountry = document.createElement('option'); //Definiendo el option por defecto
defaultOptionCountry.text = 'Selecciona una ciudad';
dropdownOne.add(defaultOptionCountry);
dropdownOne.selectedIndex = 0;

const countrySelector = (optionCountry) => { // Función que asigna nombres de países
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

countryOnChange = () => {
  let cohortFilter = window.cohorts.filter(item => (item.id.slice(0, 3) == dropdownOne.value));
  cohortSelect(cohortFilter);
}
////////////////////////////////////////FIN DROPDOWN PAISES

////////////////////////////////////////INICIO DROPDOWN COHORTS
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
////////////////////////////////////////FIN DROPDOWN COHORTS

//////////////////////////////////////// DETECTA E IMPRIME USUARIOS DE LIM PRECORE 2018
function dataUsers(selectedCohort) { 
  if (selectedCohort !== "lim-2018-03-pre-core-pw") {
    return;
  }
  const cohort = cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
  const courses = Object.keys(cohort.coursesIndex);
  options.cohort = cohort;
  options.cohortData.users = users;
  options.cohortData.progress = progress;
  let userStats = processCohortData(options);
  tableCreater(userStats);
}

////////////////////////////////////////DROPDOWN ORDER
let orderSelect = document.getElementById('order');
let orderDirectionSelected = document.getElementById('orderDirection');

orderSelect.addEventListener('change', (e) => {
  const valueSelect = orderSelect.value
  cohorts.forEach(elementCohort => {
    if (elementCohort.id === valueSelect) {
      options.cohort = elementCohort;
    }
  })
  options.orderBy = orderSelect.value;
});

orderDirectionSelected.addEventListener('change', () => {
  options.orderDirection = orderDirectionSelected.value;
  let userStats = processCohortData(options);
  tableCreater(userStats);
});

//////////////////////////////////////// FIN DROPDOWN ORDER

/////// INPUT DE FILTER
const filterName = document.getElementById('writeNamesUsers'); // Llama al input de búsqueda
const searchButton = document.getElementById('searchName'); // llama al botón de búsqueda

searchButton.addEventListener('click', () => {
  options.search = filterName.value;
  let userStats = processCohortData(options);
  tableCreater(userStats);
});

/////// FIN DEL INPUT DE FILTER

//////////////////////////////////////// FUNCIÓN QUE CREA LA TABLA
let tableCreater = (userStats) => {

  let tableContainer = document.createElement('div');
  six.innerHTML = '';
<<<<<<< HEAD
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
=======
    tableContainer.classList = "container-table"
    let table = document.createElement('table');
    table.classList = "table";
    let tableHead = document.createElement('tr');
    tableHead.classList = "thead-dark";
    tableHead.innerHTML += '<th>Alumnas</th><th>Completitud total</th><th>%</th><th>% Lecturas</th><th>% Quizzes</th><th>scoreAvg</th>';
    table.appendChild(tableHead);
  
    
    userStats.forEach(user => {
      // console.log(user);
      let tableRow = document.createElement('tr');
      tableRow.innerHTML += '<td>' + user.name + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.percent + '</td>';
      // tableRow.innerHTML += '<td>' + user.stats.exercises.total + '</td>';
      // tableRow.innerHTML += '<td>' + user.stats.exercises.completed + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.exercises.percent + '</td>';
      // tableRow.innerHTML += '<td>' + user.stats.reads.total + '</td>';
      // tableRow.innerHTML += '<td>' + user.stats.reads.completed + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.reads.percent + '</td>';
      // tableRow.innerHTML += '<td>' + user.stats.quizzes.total + '</td>';
      // tableRow.innerHTML += '<td>' + user.stats.quizzes.completed + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.quizzes.percent + '</td>';
      // tableRow.innerHTML += '<td>' + user.stats.quizzes.scoreSum + '</td>';
      tableRow.innerHTML += '<td>' + user.stats.quizzes.scoreAvg + '</td>';
      table.appendChild(tableRow);
>>>>>>> f0de6c9ee0e46a5931af3e94d1212067df1b55ae

  })

  tableContainer.appendChild(table);
  six.appendChild(tableContainer);
}
//////////////////////////////////////// FIN DE TABLE CREATER


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
