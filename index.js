const saveBtn = document.querySelector("#save-input")
const inputEl = document.querySelector("#input-el")
const tabBtn = document.querySelector("#save-tab")
const deleteBtn = document.querySelector("#delete-btn")
const ulEl = document.querySelector("#ul-el")
let urlItem = []
const urlLocalStorage = JSON.parse(localStorage.getItem("urlItem"))


if(urlLocalStorage){
    urlItem = urlLocalStorage
    render(urlItem)
}
tabBtn.addEventListener("click", function(){
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        urlItem.push(tabs[0].url)
        localStorage.setItem("urlItem", JSON.stringify(urlItem))
        render(urlItem)
    })
})
saveBtn.addEventListener("click", function(){
    urlItem.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("urlItem", JSON.stringify(urlItem))
    render(urlItem)
    console.log("clicked")
})

deleteBtn.addEventListener("dblclick", function(){
    urlItem = []
    localStorage.clear()
    render(urlItem)
})

function render(leads){
    listItem = ""
    for(i = 0; i < urlItem.length; i++){
        listItem += `
            <li>
            <a target="_blank" href='${leads[i]}'>${leads[i]}</a>
            </li>
        `
    }
    ulEl.innerHTML = listItem
}