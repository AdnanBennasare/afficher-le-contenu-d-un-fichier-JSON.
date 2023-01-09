let arr = [];
function getData() {  //  get data from the file and give it to th myArray variable
    $.ajax({

        url: "films.json",  // specifiyning the path of the json file
        success: function (data) {
          

            arr = data;  //asigning data to my Array
            arr.forEach(function(arrayItem,arrayIndex,array){
                array[arrayIndex].titre = array[arrayIndex].titre.toLowerCase();
                 // turning my array.titre into lower case so i can search both uppercase and lower case
            });

            createtable(arr); // build table and replace the parameter with myArray


        },
    });
}

getData()

document.querySelectorAll("th").forEach( (ele) => { // for every th element onclick
    ele.onclick = function(){
       
        if (ele.querySelector("i").classList.contains('fa-sort-down')) {
            sortsfromZtoA(ele.id) // if i in th contains "fa-sort-down" meaning facing down sorting Z TO A
            ele.innerHTML = `
         ${ele.textContent}<i class="fa-solid fa-sort-up"></i>
        `
        // replacing the text content by it self and adding i UP

        } else {  // if i in th contains "fa-sort-up" meaning facing up sorting A TO Z

            sortsfromAtoZ(ele.id)
        ele.innerHTML = `
         ${ele.textContent}<i class="fa-solid fa-sort-down"></i>
        `
        // replacing the text content by it self and adding i down
        }
    }
});

//==================sorting A to Z =======================
        // ---------sortin acen------------
function sortsfromAtoZ(value) {   
    arr.sort(function(a, b) {
 if (a[value].toLowerCase() < b[value].toLowerCase()) {
        return -1
    } else if (a[value].toLowerCase() > b[value].toLowerCase()) {
        return 1        
    } else {
        return 0
    }
    });
    createtable(arr);
}
//==================sorting Z to A =======================
        // ---------sortin desiding------------
function sortsfromZtoA(value) {   
    arr.sort(function(a, b) {        
    if (a[value].toLowerCase() < b[value].toLowerCase()) {
        return 1 
    } else if (a[value].toLowerCase() > b[value].toLowerCase()) {
        return -1                 
    } else {
         return 0
    }   
    });
     createtable(arr);
}

//================== Creating the Table =======================

var i;
function createtable(arr) {
    let tablecontent = document.getElementById('tablecontent');
    tablecontent.innerHTML = "";

    for (i = 0; i < arr.length; i++) {
        let row = `<tr>
        <td><img src="${arr[i].image}" alt="" width="90"></td>
        <td>${arr[i].titre}</td>
        <td>${arr[i].durée} m</td>
        <td>${arr[i].production}</td>
        <td>${arr[i].réalisateur}</td>
        <td>${arr[i].cinema}</td>
        <td>`
        for (j = 0; j < arr[i].Acteurs.length; j++) { // for loop for acteurs names lastname and nationality
            row += `<li>  ${arr[i].Acteurs[j].name} ${arr[i].Acteurs[j].prenom} ${arr[i].Acteurs[j].nationality}</li>`
        }
        row +=`</td>
</tr> `
        tablecontent.innerHTML += row    
    }
}


searched = [] // search Items array

document.getElementById('inputvalue').addEventListener("keyup", function(e){ //input seach on key up 
searched.length = 0 ;
    arr.forEach(function(arrayItem,arrayIndex,array){ // enterin evrey titre value 
        if(array[arrayIndex].titre.startsWith(e.target.value) || array[arrayIndex].titre.includes(e.target.value)){
            searched.push(array[arrayIndex]) // pushing the items whom was found in mysearched
        }
})

createtable(searched); // creating thr table again

})
