let salaires = document.querySelectorAll(".calcul_form_trio_mois .calcul_form_input")
let averageCalculated = document.getElementById("resultcalc")
let montantPrimes = document.getElementById("montantprimes")
let startDateInput = document.getElementById("start_date")
let endDateInput = document.getElementById("end_date")
let toInsertDates = document.querySelector(".calcul_form_trio_mois")
let disclaimerDates = document.querySelector(".calcul_form_trio_mois > b")
let anciennete = document.getElementById("anciennete")
let createNewPeriodLeft = document.getElementById("newperiodleft")
let createNewPeriodRight = document.getElementById("newperiodright")
let startDateValue;
let endDateValue;
var countLeft = 0
var countRight = 0
function checkDates(){
    if(startDateValue != undefined && endDateValue!= undefined && startDateValue < endDateValue){
        return true
    } 
    else 
    {
        return false
    }
}

function createHTMLSingle(date){
    var options = {year: 'numeric', month: 'long' };
    return '<div class="calcul_form_mois calcul_form_margin"><p>'+ date.toLocaleDateString('fr-FR', options) + '</p><div class="input_euro_ctnr"><input class="calcul_form_input" type="number"><p>euros</p></div></div>'
}
function handleDate(){
    var arr = new Array();
    var dt = new Date(startDateValue);
    while (dt <= endDateValue) {
        console.log(dt)
        arr.push(new Date(dt));
        dt.setMonth(dt.getMonth() + 1);
    }
    console.log(arr)
    return arr;
}
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild; 
  }
function createNewPeriod(){
    return createElementFromHTML('<div style="margin-top:10px" class="calcul_form_trio"><p>De</p><input class="calcul_form_input" type="number" placeholder="Mois"><input class="calcul_form_input" type="number" placeholder="Année"><p>à</p><input class="calcul_form_input" type="number" placeholder="Mois"><input class="calcul_form_input" type="number" placeholder="Année"></div>')
}
function constructDatesHTML(dates){
    myHTML = document.createElement("div")
    myHTML.className = "calcul_form_input_ctnr calcul_form_margin"
    if(dates.length > 12){
        processedDates = dates.slice(dates.length-12, dates.length)
    }
    else {
        processedDates = dates
    }
    for(var i = 0; i < processedDates.length; i++){
        singleHTML = createHTMLSingle(processedDates[i])
        myHTML.innerHTML += singleHTML
    }
    return myHTML
}
function isAllOk(){
    var allOk = 0
    for(var i = 0; i < salaires.length; i++){
        if(salaires[i].value.length > 0){
            allOk = allOk + 1
        }
    }
    if(allOk === salaires.length){
        return true
    } else {
        return false
    }
}
function calcAverage(){
    var nb_months = salaires.length
    var total12months = 0
    for(var i = 0; i < salaires.length; i++){
        total12months = total12months + parseInt(salaires[i].value)
    }
    var total3months = parseInt(salaires[salaires.length - 1].value) + parseInt(salaires[salaires.length - 2].value) + parseInt(salaires[salaires.length - 3].value)  + (montantPrimes.value && montantPrimes.value.length > 0 && parseInt(montantPrimes.value) != NaN ? parseInt(montantPrimes.value) : 0)
    average12 = total12months/nb_months
    average3 = total3months/3
    if(average12 > average3){
        return average12
    } else {
        return average3
    }
}

function refreshSalaires(){
    salaires = document.querySelectorAll(".calcul_form_trio_mois .calcul_form_input")
    for(var i = 0; i < salaires.length; i++){
        salaires[i].addEventListener("change",() => {
            if(isAllOk()){
                averageCalculated.value =  calcAverage().toString()
            }
        })
    }
}
function dateManage(){
    if(checkDates()){
        toInsertDates.innerHTML = ""
        allDates = handleDate()
        console.log(allDates)
        ancienneteValue = allDates.length/12
        anciennete.value = ancienneteValue
        html_structure = constructDatesHTML(allDates)
        toInsertDates.appendChild(html_structure)
        refreshSalaires()
    }
}
startDateInput.addEventListener("change",()=>{
    startDateValue = new Date(startDateInput.value)
    dateManage()
})
endDateInput.addEventListener("change",()=>{
    endDateValue = new Date(endDateInput.value)
    dateManage()
})
montantPrimes.addEventListener("change", ()=>{
    if(isAllOk()){
        averageCalculated.value = calcAverage().toString()
    }
})
createNewPeriodLeft.addEventListener("click",()=>{
    if(countLeft < 3){
        createNewPeriodLeft.parentNode.insertBefore(createNewPeriod(),createNewPeriodLeft)
        countLeft = countLeft + 1
    }
    if(countLeft == 2){
        createNewPeriodLeft.remove()
    }
})
createNewPeriodRight.addEventListener("click",()=>{
    if(countRight < 3){
        createNewPeriodRight.parentNode.insertBefore(createNewPeriod(),createNewPeriodRight)
        countRight = countRight + 1
    }
    if(countRight == 2){
        createNewPeriodRight.remove()
    }
})

