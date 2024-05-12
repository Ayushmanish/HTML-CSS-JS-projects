const dropdownselects=document.querySelectorAll(".dropdown select")
const btn=document.querySelector('#exchange')
const fromcurr=document.querySelector('.from select')
const tocurr=document.querySelector('.to select')
const msg=document.querySelector('.msg')

for(let select of dropdownselects){
    for(currcode in countryList){
        let newOption=document.createElement('option')
        newOption.innerText=currcode
        newOption.value=currcode
        if(select.name==='from' && currcode==='USD')
        {
            newOption.selected='selected'
        }
        else if(select.name==='to' && currcode==='INR')
        {
            newOption.selected='selected'
        }
        select.append(newOption)
    }

    select.addEventListener('change',(evt)=>{
        //let element=evt.target
        //console.log(element.value)
        //console.log(element)
        updateFlag(evt.target)
    })
}

const updateFlag=(element)=>{
    let currcode=element.value
    let countrycode=countryList[currcode]
    let newSrc=`https://flagsapi.com/${countrycode}/shiny/64.png`
    let img=element.parentElement.querySelector("img")
    img.src=newSrc
}

const exchangeRate= async()=>{
    let amount=document.querySelector('.amount input')
    //console.log(amount)
    let amt=amount.value
    if(amt==''||amt<=0){
        amt=1
        amount.value='1'
    }
    const URL=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromcurr.value.toLowerCase()}.json`
    let response=await fetch(URL)
    let data=await response.json()
    let fromcurr1=fromcurr.value.toLowerCase()
    let tocurr1=tocurr.value.toLowerCase()
    let value=data[fromcurr1][tocurr1]
    let finalAmount=value*amt
    msg.innerText=`${amt} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`

}

btn.addEventListener('click',(evt)=>{
    evt.preventDefault()
    exchangeRate()
})

window.addEventListener('load',()=>{
    exchangeRate()
})