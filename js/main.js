let nameAdd = document.querySelector('.inpAddname');
let mailAdd = document.querySelector('.inpAddmail');
let phoneAdd = document.querySelector('.inpAddphone');
let imageAdd = document.querySelector('.inpAddurl');
let btnAdd = document.querySelector('.btnAdd');
let list = document.querySelector('ul');




// ! ------------------- Create ------------------------
createNum ()
function createNum (){
  if(!localStorage.getItem('contact-data')){
    localStorage.setItem('contact-data','[]')
  }
  let data = JSON.parse(localStorage.getItem('contact-data'));
 list.innerHTML = ''
  data.forEach((elem,index)=>{
    list.innerHTML += `
    <li>
      ${elem.name}
      ${elem.mail}
      ${elem.phone}
      <img src="${elem.image}" alt="">
      <button id="btnDel" onclick="deleteContact(${index})">delete</button>
      <button onclick="editContact(${index})">Edit</button>
    </li> `});
}


btnAdd.addEventListener('click',()=>{
  if(nameAdd.value.trim()=='' || mailAdd.value.trim() ==''||phoneAdd.value.trim()==""){
    alert('Заполните поле ')
    return
  }
  let objAdd = {
    name:nameAdd.value,
    mail:mailAdd.value,
    phone:phoneAdd.value,
    image:imageAdd.value
  }
  let data = JSON.parse(localStorage.getItem('contact-data'));
  data.push(objAdd)
  localStorage.setItem('contact-data' , JSON.stringify(data))
  nameAdd.value =""
  mailAdd.value = ''
  phoneAdd.value = ''
  imageAdd.value =''

  createNum();
   
})




function deleteContact(index) {
  let data = JSON.parse(localStorage.getItem("contact-data"));
  data.splice(index, 1);
  localStorage.setItem("contact-data", JSON.stringify(data));
  createNum();
}

let modal = document.querySelector('.modal')
let editInp1 =document.querySelector('.editInp1')
let editInp2 =document.querySelector('.editInp2')
let editInp3 =document.querySelector('.editInp3')
let editInp4 =document.querySelector('.editInp4')
let modalSave = document.querySelector('.modalSave')
let modalClose = document.querySelector('.modalClose')

function editContact(index) {
  modal.style.display = "block"
  let data = JSON.parse(localStorage.getItem('contact-data'));
  editInp1.value = data[index].name
  editInp2.value = data[index].mail
  editInp3.value = data[index].phone
  editInp4.value = data[index].image

  editInp1.setAttribute('id',index)

  modalClose.addEventListener('click',()=>{
    modal.style.display ='none'
  
  })
  
  modalSave.addEventListener('click',()=>{
    let id = editInp1.id;
  
    let data = JSON.parse(localStorage.getItem('contact-data'))
  
    let newObj = {
      name:editInp1.value,
      mail:editInp2.value,
      phone:editInp3.value,
      image:editInp4.value
    }
    data.splice(id,1,newObj)
  
    localStorage.setItem('contact-data',JSON.stringify(data))

    modal.style.display ='none'
   
    createNum()})
}

