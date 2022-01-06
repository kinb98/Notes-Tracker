let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    localStorage.clear();
    ulEl.innerHTML = "";
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  for (let i = 0; i < leads.length; i++) {
    const listItem = document.createElement("li");
    const paragraph = document.createElement("p");
    const copyButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const container = document.createElement("cont");
    paragraph.id = `ele${i}`;
    paragraph.innerText = leads[i];
    copyButton.className = "btn ind-btn";
    deleteButton.className = "btn ind-btn";
    copyButton.innerHTML = '<i class="fa fa-copy"></i></button>';
    deleteButton.innerHTML = '<i class="fa fa-trash"></i></button';
    deleteButton.addEventListener("click", function () {
      deleteText(`ele${i}`);
    });
    copyButton.addEventListener("click", function () {
      copyToClipboard(`ele${i}`);
    });
    listItem.appendChild(paragraph);
    container.appendChild(copyButton);
    container.appendChild(deleteButton);
    listItem.appendChild(container);
    ulEl.appendChild(listItem);
  }
}

deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
  ulEl.innerHTML = "";
});

inputBtn.addEventListener("click", function () {
  localStorage.clear();
  ulEl.innerHTML = "";
  //myLeads = [];
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

function copyToClipboard(element) {
  let test = document.getElementById(element).innerText;
  console.log(test);
  navigator.clipboard.writeText(test);
}

function deleteText(element) {
  let ele = document.getElementById(element).innerText;
  let index = myLeads.indexOf(ele);
  myLeads.splice(index, 1);
  localStorage.clear();
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  leadsFromLocalStorage = myLeads;
  ulEl.innerHTML = "";
  render(myLeads);
}
