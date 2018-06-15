let dropdown = document.getElementById('cohortsDropdown');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Selecciona una cohort';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

fetch('http://127.0.0.1:5500/data/cohorts.json')  
  .then(  
    function(response) {  
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
    }  
  )  

  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });

function dataUsers(){
   var lim= document.getElementById('cohortsDropdown').value;
   console.log(lim);
   if(lim === "lim-2018-03-pre-core-pw")
   {
     fetch('http://127.0.0.1:5500/data/cohorts/lim-2018-03-pre-core-pw/users.json')
     .then(function(users) {
       return users.json();
     })
     .then((dataUsers2)=>{
       for(var i=0;i<dataUsers2.length;i++){
         const p=document.createElement('p');
         p.innerText=dataUsers2[i].name;
         six.appendChild(p);
       }
     }
    )
   }
 }