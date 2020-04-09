// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function(){
   
   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
               response.json().then( function(json) {
                  let missionTarget = document.getElementById("missionTarget");
                  // Add HTML that includes the JSON data
                  missionTarget.innerHTML = `
                  <h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${json[0].name}</li>
                     <li>Diameter: ${json[0].diameter}</li>
                     <li>Star: ${json[0].star}</li>
                     <li>Distance from Earth: ${json[0].distance}</li>
                     <li>Number of Moons: ${json[0].moons}</li>
                  </ol>
                  <img src="${json[0].image}">
                  `;
               });
            });

   let form = document.querySelector("form");
   let faultyItems = document.getElementById('faultyItems');
   
   form.addEventListener("submit", function(event) {
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         console.log(pilotName.value);
         console.log(copilotName.value);
         console.log(cargoMass.value);
         console.log(fuelLevel.value);
         alert("All fields are required!");
               // stop the form submission
         event.preventDefault();
         return;
         //window.history.back();
         //returnToPreviousPage();
      }

      if(isNaN(Number(cargoMass.value)) || isNaN(Number(fuelLevel.value))){
         console.log(cargoMass.value);
         console.log(fuelLevel.value);
         alert("Cargo Mass and Fuel level must have only numbers");
         event.preventDefault();
         return;
      }
 
      var letters = /^[A-Za-z ]+$/;
      if(!pilotName.value.match(letters) || !copilotName.value.match(letters)){
         console.log(pilotName.value);
         console.log(copilotName.value);
         alert("pilot name and copilot name must containg only alphabets!");
         event.preventDefault();
         return;
      }

     // var letters = /^[a-zA-Z ]$/;
       //|| !letters.test(copilotName.value))  
      /*if (!letters.test(pilotName.value)){
         alert("pilot name and copilot name must containg only alphabets!");
         event.preventDefault();
      } */

      let launchStatus = document.getElementById('launchStatus');
      let fuelStatus = document.getElementById('fuelStatus');         
      let cargoStatus= document.getElementById('cargoStatus');
      let pilotStatus= document.getElementById('pilotStatus');
      let copilotStatus= document.getElementById('copilotStatus');
      
      pilotStatus.textContent = `Pilot ${pilotName.value} is ready for launch`;
      copilotStatus.textContent = `CoPilot ${copilotName.value} is ready for launch`;
      
      let isFuelLevelEnough = true;

      if(Number(fuelLevel.value) <10000){
         isFuelLevelEnough = false;
         faultyItems.style.visibility = "visible";
         fuelStatus.textContent = "not enough fuel for the journey";
         launchStatus.style.color = 'red';
         launchStatus.textContent = "Shuttle not ready for launch";
         event.preventDefault();
      }

      let isCargoMassRight = true;

      if (Number(cargoMass.value > 10000)){
         isCargoMassRight = false;
         faultyItems.style.visibility = "visible";
         cargoStatus.textContent = "there is too much mass for the shuttle to take off";
         launchStatus.style.color = "red";
         launchStatus.textContent = "Shuttle not ready for launch";
         event.preventDefault();
      }

     // if (pilotName.value === ""){}

      if (isCargoMassRight === true && isFuelLevelEnough === true){
         faultyItems.style.visibility = "visible";
         launchStatus.style.color = 'green';
         launchStatus.textContent = "Shuttle is ready for launch";
         event.preventDefault();   
      }
      
   });  


});
