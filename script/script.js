const state = {
    taskList: [],
};
// dom manipulation
const taskModal = document.querySelector(".task__modal__body");

const taskContent = document.querySelector(".task__content");
// store data in localstorage

const htmlTaskContent = ({ id, title, description, type, url }) => `
          
  <div class='col-md-6 col-lg-4 mt-3 '  id=${id} key=${id}>
    <div class='card shadow-sm task__card'>
      <div class='card-header d-flex gap-2 justify-content-end task__card__header'>
        <button type='button' class='btn btn-outline-info mr-2' name=${id} onclick="editTask.apply(this, arguments)">
          <i class='fas fa-pencil-alt' name=${id}></i>
        </button>
        <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick="deleteTask.apply(this, arguments)">
          <i class='fas fa-trash-alt' name=${id}></i>
        </button>
      </div>
      <div class='card-body'>
        ${
          url
            ? `<img width='100%' height='200px' style='object-fit: cover; object-position: center'  src=${url} alt='card image ' class='card-image-top md-3 rounded-lg' />`
            : `<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src="https://tse3.mm.bing.net/th?id=OIP.LZsJaVHEsECjt_hv1KrtbAHaHa&pid=Api&P=0" alt='card image cap' class='card-image-top md-3 rounded-lg' />`
        }
        <h4 class='task__card__title'>${title}</h4>
        <p class='description trim-3-lines text-muted' data-gram_editor='false'>
          ${description}
        </p>
        <div class='tags text-white d-flex flex-wrap'>
          <span class='badge bg-primary m-1'>${type}</span>
        </div>
      </div>
      <div class='card-footer'>
        <button 
        type='button' 
        class='btn btn-outline-primary float-right' 
        data-bs-toggle='modal'
        data-bs-target='#showtask'
        id=${id}
        onclick='openTask.apply(this, arguments)'>
          Open Task
        </button>
      </div>
    </div>
  </div>
`;
// to create card on ui



// to display details on different modal
const htmlModalContent = ({ id, title, description, type, url }) => {
    const date = new Date(parseInt(id));
    return `
<div id=${id}>

       ${
        url ?`<img width='100%' src=${url} alt='card image here' class='img-fluid place__holder__image mb-3'/>` 
        :`<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src="https://tse3.mm.bing.net/th?id=OIP.LZsJaVHEsECjt_hv1KrtbAHaHa&pid=Api&P=0" alt='card image cap' class='card-image-top md-3 rounded-lg' />`
       }
<strong class='text-sm text-muted'>Created on ${date.toDateString()}</strong>
</div>
<h2 class='my-3'>${title}</h2>
<span class='badge bg-primary m-1'>${type}</span>
<p class='lead'>${description}</p>
`;
};

const updateLocalStorage = () => {
  localStorage.setItem("task", JSON.stringify({
        tasks: state.taskList,
    })
    );
};

// get data from localstorage

const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);

    if (localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardData) => {
  taskContent.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
    });
};

// after clicking on button save task we need to submit it
const handleSubmit = (event) => {
  // console.log("button clicked");
    const id = `${Date.now()}`;
    const input = {
      url: document.getElementById("imageurl").value,
              title: document.getElementById("tasktitle").value,
              type: document.getElementById("tasktype").value,
              description: document.getElementById("taskdiscription").value,
    };
    // console.log({...input,id});
    if (input.title === "" || input.type === "" || input.description === "") {
      return alert("Please Fill All The Fields");
    }
    
    // updated task list - for 1st go
    state.taskList.push({ ...input, id });
    // console.log(state.taskList);
    // update the same on localStorage too
    updateLocalStorage();
    taskContent.insertAdjacentHTML(
      "beforeend",
      htmlTaskContent({
        ...input,
        id,
      })
    );
  };


// to open task in modal
const openTask = (e)=>{
  if(!e) e= window.event;


  const getTask = state.taskList.find(({id})=> id === e.target.id
  );
  taskModal.innerHTML = htmlModalContent(getTask);
};

// delete task
const  deleteTask =(e)=>{
  if(!e) e= window.event;

  const targetId = e.target.getAttribute("name");
  // console.log(targetId);

  const type = e.target.tagName;
  // console.log(type);

  const removeTask = state.taskList.filter(({id})=> id !== targetId);
  // console.log(removeTask);

state.taskList = removeTask;
updateLocalStorage();

if(type ==="BUTTON"){
  // this will help to go back to the parent node of button and delete it by (removeChild)
  return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode.parentNode
  );
}
 e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
  e.target.parentNode.parentNode.parentNode.parentNode
 );

};

// edit task

const editTask = (e)=>{
  if(!e) e=window.event;

  const targetId = e.target.id;
  const type = e.target.tagName;

  let parentNode;
  let taskList;
  let taskdescription;
  let tasktype;
  let submitButton;
  
  if(type ==="BUTTON"){
    parentNode= e.target.parentNode.parentNode;
    
  }else{
    parentNode = e.target.parentNode.parentNode.parentNode
  }

  taskTitle = parentNode.childNodes[3].childNodes[3];
  // console.log(taskTitle);
 taskdescription = parentNode.childNodes[3].childNodes[5];
//  console.log(taskdescription);
 tasktype = parentNode.childNodes[3].childNodes[7].childNodes[1];
//  console.log(tasktype);
 submitButton = parentNode.childNodes[5].childNodes[1];
//  console.log(submitButton);


taskTitle.setAttribute("contenteditable", "true");
taskdescription.setAttribute("contenteditable","true");
tasktype.setAttribute("contenteditable","true");

// need to implements
submitButton.setAttribute('onclick' , "saveEdit.apply(this,arguments)");
submitButton.removeAttribute("data-bs-toggle");
submitButton.removeAttribute("data-bs-target");
submitButton.innerHTML = "save changes";

};

const saveEdit = (e)=>{
  if(!e) e= window.event;
  const targetId = e.target.id;
  const parentNode = e.target.parentNode.parentNode;



const   taskTitle = parentNode.childNodes[3].childNodes[3];
 const  taskdescription = parentNode.childNodes[3].childNodes[5];
const  tasktype = parentNode.childNodes[3].childNodes[7].childNodes[1];
const submitButton = parentNode.childNodes[5].childNodes[1];

 const updateEdit = {
  taskTitle: taskTitle.innerHTML,
  taskdescription: taskdescription.innerHTML,
  tasktype:tasktype.innerHTML,
 };

 let stateCopy = state.taskList;
 stateCopy= stateCopy.map((task)=>
 task.id ===targetId 
 ?{
  id:task.id,
 title:updateEdit.taskTitle,
 description:updateEdit.taskdescription,
 type:updateEdit.tasktype,
}: task
 );
 state.taskList = stateCopy;
 updateLocalStorage();


 //change button tag to oepn task
 taskTitle.setAttribute("contenteditable", "false");
taskdescription.setAttribute("contenteditable","false");
tasktype.setAttribute("contenteditable","false");

// need to implements
submitButton.setAttribute("onclick" , "openTask.apply(this,arguments)");
submitButton.setAttribute("data-bs-toggle","modal");
submitButton.setAttribute("data-bs-target","#showtask");
submitButton.innerHTML = "Open task";
 };
  
const searchTask =(e)=>{
  if(!e) e= window.event;

while(taskContent.firstChild){
  taskContent.removeChild(taskContent.firstChild);
}
// console.log( taskContent.removeChild(taskContent.firstChild));
const resultData =   state.taskList.filter(({title})=> 
title.toLowerCase().includes(e.target.value.toLowerCase())
);
 
resultData.map((cardData)=> 
taskContent.insertAdjacentHTML("beforeend", htmlTaskContent(cardData))
);
};