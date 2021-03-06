// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById("todo-container");
  var addTodoForm = document.getElementById("add-todo");
  var state = [];
  var updatedId;
  if (!localStorage.getItem("myList")) {
    // Code for localStorage/sessionStorage.
    state = [
      { id: -3, description: "first todo" },
      { id: -2, description: "second todo" },
      { id: -1, description: "third todo" }
    ]; // this is our initial todoList
    window.localStorage.id = 0;
  } else {
    // Sorry! No Web Storage support..
    console.log(localStorage.getItem("myList"));
    state = JSON.parse(localStorage.getItem("myList"));
  }

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement("li");
    // you will need to use addEventListener

    // this adds the delete button
    var deleteButtonNode = document.createElement("button");
    deleteButtonNode.className = "btn-delete";
    deleteButtonNode.textContent = "X";
    deleteButtonNode.addEventListener("click", function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    // add span holding description
    var todoSpan = document.createElement("span");
    todoSpan.id = "span" + todo.id;
    todoSpan.textContent = todo.description;
    if (todo.done) {
      todoSpan.setAttribute("style", "text-decoration :line-through;");
    }
    todoNode.appendChild(todoSpan);

    var strike = document.createElement("strike");
    todoSpan.addEventListener("click", function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });

    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function(event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?
      event.preventDefault();

      var description = document.getElementsByName("description")[0].value;

      var newObj = {};
      newObj.description = description;
      // hint: todoFunctions.addTodo
      var newState = todoFunctions.addTodo(state, newObj); // ?? change this!
      update(newState);
      document.getElementsByName("description")[0].value = "";
      document.getElementsByName("description")[0].focus();
    });
  }

  function sortByNewerId(a, b) {
    var keyA = a.id;
    var keyB = b.id;
    // Compare the 2 ids
    if (keyA < keyB) return 1;
    return -1;
  }

  // you should not need to change this function
  var update = function(newState) {
    state = newState;
    state = todoFunctions.sortTodos(state, sortByNewerId);
    window.localStorage.myList = JSON.stringify(state);
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement("ul");

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();
