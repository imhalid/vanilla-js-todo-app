window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#task");

  for (var i = 0; i < window.localStorage.length; i++) {
    const task = input.value;

    // create a new div element
    const task_el = document.createElement("div");
    // add class to the new div element
    task_el.classList.add("task");

    // create a new div element
    const task_content_el = document.createElement("div");
    // add class to the new div element
    task_content_el.classList.add("content");

    // create child div element
    task_el.appendChild(task_content_el);

    // create a new input element ant add attributes
    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly");

    // create child element
    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerHTML = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerHTML = "Delete";

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);

    // add local storage to the list

    // get the task id from local storage
    const item = (task_input_el.value += localStorage.getItem(
      localStorage.key(i)
    ));

    // Edit Task
    // https://stackoverflow.com/questions/63453950/how-to-update-saved-input-value-in-local-storage-when-it-is-showed-and-edited-in

    ["change", "click"].forEach((e) => {
      task_edit_el.addEventListener(e, (e) => {
        if (task_edit_el.innerText.toLowerCase() === "edit") {
          e.preventDefault();
          task_input_el.removeAttribute("readonly");
          task_input_el.focus();
          task_edit_el.innerText = "Save";
          localStorage.removeItem(task_input_el.value);
        } else {
          e.preventDefault();
          task_input_el.setAttribute("readonly", "readonly");
          task_edit_el.innerText = "Edit";

          localStorage.setItem(task_input_el.value, task_input_el.value);
        }
      });
    });

    // task_edit_el.addEventListener("click", (e) => {

    //   if (task_edit_el.innerText.toLowerCase() === "edit") {
    //     e.preventDefault();

    //     task_input_el.removeAttribute("readonly");
    //     task_input_el.focus();
    //     task_edit_el.innerText = "Save";
    //   } else {
    //     e.preventDefault();
    //     task_input_el.setAttribute("readonly", "readonly");
    //     task_edit_el.innerText = "Edit";
    //   }
    // });

    // Delete task

    task_delete_el.addEventListener("click", (e) => {
      e.preventDefault();
      // remove task from local storage
      list_el.removeChild(task_el);
      // remove item with id from local storage
      localStorage.removeItem(localStorage.key(i));
      window.localStorage.removeItem(item);
    });

    // list local storage
    // localStorage.getItem(localStorage.key(i));
    // task_input_el.value += item;
  }

  // ---------------------------------------------------------------------------------------------------------------------

  // Add Task
  form.addEventListener("submit", (e) => {
    // e.preventDefault();

    const task = input.value;
    input.value = "";
    // create random id
    // const id = Math.floor(Math.random() * 1000000);

    if (!task) {
      alert("pls fill");
      return;
    }

    window.localStorage.setItem(task, task);
  });
});
