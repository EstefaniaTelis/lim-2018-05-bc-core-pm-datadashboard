fetch(cohortURL)  
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
    console.error('Fetch Error -', err)
  }),

function dataUsers(usersURL){
   let lim= document.getElementById('cohortsDropdown').value;
   console.log(lim);
   if(lim === "lim-2018-03-pre-core-pw")
   {
     fetch(usersURL)
     .then(function(users) {
       return users.json();
     })
     .then((dataUsers2)=>{
       for(var i=0;i<dataUsers2.length;i++){
         const p=document.createElement('p');
         p.innerText=dataUsers2[i].id;
         six.appendChild(p);
       }
     }
    )
   }
 }
 //////////////////////////////////////////////////////////////////
  // responseU.json().then(users => {
              //   responseP.json().then(progress => {
              //     responseC.json().then(cohorts => {
              //       callback && callback(users, progress, cohorts);
              //     })
              //   })
              // })
/////////////////////////////////////////////////////////////////
// const users = dataArr[0]
                // const progress = dataArr[1]
                // const cohorts = dataArr[2]