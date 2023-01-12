{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [...tasks.slice(0, taskIndex),
                ...tasks.slice(taskIndex+1)];
        render();
    };

  
    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task) => {
            if (task === tasks[taskIndex]) {
                return {...task, done: !task.done};
        }
                return task ;
            });
     render();   
    };
    
    const markAllTaskDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render ();
    }

    const markHideAllTasksDone = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
     }; 

    const hideAllTasksDone = () => {
        const hideAllDone = document.querySelector(".js-hideAllDoneButton");
        hideAllDone.addEventListener("click", () => {
            markHideAllTasksDone();
        });
    };

  
    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        }); 
    };

    const bindButtonEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDoneButton");
        if (markAllDoneButton) {markAllDoneButton.addEventListener("click", markAllTaskDone);
    };

    const toggleHideDoneTasksButton = document.querySelector(".js-hideAllTasksDone");
    if (toggleHideDoneTasksButton) {toggleHideDoneTasksButton.addEventListener("click", hideDoneTasks);}

    };


    const renderTasks = () => { 
        let tasksListHtmlString = "";

    for (const task of tasks) {
        tasksListHtmlString += `
    <li class="tasks__item ${task.done && hideDoneTasks ? "tasks__item--hidden" : ""} js-tasks"
        > 
        <button class="tasks__doneButton js-done">
        ${task.done ? "✔" : ""}
        </button>
       <span class="${ task.done ? " tasks__content--done" : ""}">
       ${task.content}
       </span>
        <button class="tasks__removeButton js-remove">🗑</button>
        </li>
        `; 
    };

    document.querySelector(".js-tasks").innerHTML = tasksListHtmlString;
    };

    const renderButtons = () => {
        let htmlString = "";
        if (tasks !== 0) {
          htmlString += `
            <button class="section__listButtons js-listButtons js-hideAllDoneButton">
              ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="section__listButtons js-markAllDoneButton" ${tasks.every(({ done }) => done) ? "disabled" : ""}> 
            Ukończ wszystkie
            </button>
          `;
        }
    
        document.querySelector(".js-listButtons").innerHTML = htmlString;
  
      };
    


    const render = () => {
       renderTasks();
       renderButtons();
       hideAllTasksDone();

        bindEvents();
        bindButtonEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskContent = newTaskInput.value.trim();
       
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskInput.value = "";
        }

        newTaskInput.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();

}