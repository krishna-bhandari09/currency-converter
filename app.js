const base_URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api"


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg")

for(let select of dropdowns){
    for (currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name ==="from" && currcode ==="USD"){
            newOption.selected = "selected"
        } else  if (select.name ==="to" && currcode ==="INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);
        
    }
    select.addEventListener("change", (evt) =>{
updateFlag(evt.target);
    })
}

const updateFlag = (element) =>{
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src = newSrc;
}

btn.addEventListener("click", async(evt) =>{
evt.preventDefault();
let amount = document.querySelector(".amount input");
let amtVal = amount.value;
if(amtVal == "" || amtVal<1){
    amtVal=1;
    amount.value=1;
}
let URL = `${base_URL}/${toCurr.value}_${fromCurr.value}.json`;
let response = await fetch(URL);
let data = await response.json();
console.log(data);

let rate = data.rate;
console.log(rate);

let finalAmt = amtVal * rate;
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;

})