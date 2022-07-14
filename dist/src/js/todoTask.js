// فرم وارد کردن تسک ها
const taskForm=document.querySelector('#taskForm');
// ورودی تسک ها 
const taskInput=document.querySelector('#taskInput');
// دکمه ثبت تسک
const addTask=document.querySelector('#addBtn');
// ورودی فیلترها
const filter=document.querySelector('#filter');
// لیست تسک های من
const todoTask=document.querySelector('#todoTask');
// آینم های لیست تسک های من
const taskListItem=document.querySelector('#taskListItem');
// لیست تسک های انجام شده
const taskListDone=document.querySelector('#taskListDone');
// آیتم های لیست تسک های انجام شده
const taskListItemDone=document.querySelector('#taskListItemDone');
// دکمه حذف همه تسک های من
const clearTask=document.querySelector('#clearTask');
// دکمه حذف تمام تسک های انجام شده
const clearTaskDone=document.querySelector('#clearTaskDone');

loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded' , getTasks);
    taskForm.addEventListener('submit', addTaskFunction);
    todoTask.addEventListener('click' , removeTaskFunction);
    todoTask.addEventListener('click' , doneTaskFunction);
    clearTask.addEventListener('click', removeAllTaskFunction);
    clearTaskDone.addEventListener('click', removeAllTaskDoneFunction);
    filter.addEventListener('keyup', filterTask);
}
// گرفتن داده های داخل لوکال استوریج 
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    let tasksDone;
    if(localStorage.getItem('tasksDone')===null){
        tasksDone=[];
    }
    else{
        tasksDone=JSON.parse(localStorage.getItem('tasksDone'));
    }
    tasks.forEach(function (task){
        const li =document.createElement('li');
        const delI=document.createElement('i');
        const doneI=document.createElement('i');
        li.className='list-group-item filter-task d-flex justify-content-between';
        li.id='taskListItem';
        li.appendChild(document.createTextNode(task));
        delI.className='del-item text-danger btn';
        delI.appendChild(document.createTextNode('delete'));
        doneI.className='task-done text-primary btn';
        doneI.appendChild(document.createTextNode('done'));
        const div=document.createElement('div');
        div.appendChild(doneI);
        div.appendChild(delI);
        li.appendChild(div);
        todoTask.appendChild(li);
    });
    tasksDone.forEach(function(tasksDone){
        const li =document.createElement('li');
        li.className='list-group-item filter-task d-flex justify-content-between text-success';
        li.id='taskListItem';
        li.appendChild(document.createTextNode(tasksDone));
        taskListDone.appendChild(li);
    })

}
// اضافه کردن تسک ها
function addTaskFunction(e){
    if(taskInput.value === ''){
        alert('برای افزودن تسک ابتدا تسک را واردکنید');
    }else{
        const newTask=taskInput.value;
        const li =document.createElement('li');
        const delI=document.createElement('i');
        const doneI=document.createElement('i');
        li.className='list-group-item filter-task d-flex justify-content-between';
        li.id='taskListItem';
        li.appendChild(document.createTextNode(newTask));
        delI.className='del-item text-danger btn';
        delI.appendChild(document.createTextNode('delete'));
        doneI.className='task-done text-primary btn';
        doneI.appendChild(document.createTextNode('done'));
        const div=document.createElement('div');
        div.appendChild(doneI);
        div.appendChild(delI);
        li.appendChild(div);
        todoTask.appendChild(li);
        storeTaskInLocalStorage(newTask);
        taskInput.value='';
        alert('تسک اضافه شد');
        // e.preventDefualt();
       
    }
   }
//    اضافه  کردن تسک هی من به لوکال استوریج
function storeTaskInLocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    alert("تسک ذخیره شد");
}
// اضافه کردن تسک های انجام شده به لوکال استوریج
function storeTaskDoneInLocalStorage(taskDone){
    let tasksDone;
    if(localStorage.getItem('tasksDone') === null){
        tasksDone=[];
    }else{
        tasksDone=JSON.parse(localStorage.getItem('tasksDone'));
    }
    tasksDone.push(taskDone);
    localStorage.setItem('tasksDone',JSON.stringify(tasksDone));
}
// حذف یک تسک از تسک های من
function removeTaskFunction(e){
    if(e.target.classList.contains("del-item")){
        if(confirm('آیا مطمِِئن هستید برای حذف تسک؟')){
          var task=e.target.parentElement.parentElement;
          e.target.parentElement.parentElement.remove();
            e.target.parentElement.innerHTML='';
            removeTaskFromLocalStorage(task);
        }
    }
}
// حذف تسک های من از لوکال استوریج
function removeTaskFromLocalStorage(taskListItem){
    let tasks;
    // console.log(taskListItem.textContent);
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task , index){
        // console.log(task);
        if(taskListItem.textContent=== task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
// حذف همه تسک ها از تسک های من
function removeAllTaskFunction(e){
    if(confirm('آیا مطمین هستید برا حذف همه تسک ها؟')){
        todoTask.innerHTML='';
        clearTaskFromLocalStorage();
    }
}
// حذف همه تسک های من از لوکال استوریج
function clearTaskFromLocalStorage(){
    let tasks;
    if(localStorage.getItem('tasks') !== null){
        tasks=[];
    }
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
// انچام دادن یک تسک
function doneTaskFunction(e){
    if(e.target.classList.contains("task-done")){
       
        const doneTask=e.target.parentElement.parentElement;
        e.target.parentElement.innerHTML='';
        doneTask.classList.add('text-success');
        const taskDone=doneTask.textContent;
        storeTaskDoneInLocalStorage(taskDone);
        taskListDone.appendChild(doneTask);
        removeTaskFromLocalStorage(doneTask);

    }
}
// حذف همه تسک های انجام شده
function removeAllTaskDoneFunction(e){
    if(confirm('آیا مطمین هستید برا حذف همه تسک ها؟')){
        taskListDone.innerHTML='';
        clearAllTasDonekFromLocalStorage();
    }
}
// حذف همه تسک های انجام شده از لوکال استوریج
function clearAllTasDonekFromLocalStorage(){
    let tasksDone;
    if(localStorage.getItem('tasksDone') !== null){
        tasksDone=[];
    }
    localStorage.setItem('tasksDone',JSON.stringify(tasksDone));
}
// فیلتر و جست و جوی تسک ها
function filterTask(e){
    const text=e.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll('.filter-task').forEach(function (task){
        const item=task.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.classList.add("d-flex");
        }else{
            task.classList.remove("d-flex");
            task.style.display='none';
        }
    });
}
