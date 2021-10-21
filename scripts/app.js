$(document).ready(function () {
    let filter = "all";

    // Filter Selection
    // Show All
    $("#filter-all").click(function (e) {
        e.preventDefault();
        $(".todo").show();
        filter = "all";
    });
    // Show Uncompleted
    $("#filter-active").click(function (e) {
        e.preventDefault();
        $(".todo").show();
        $(".todo.checked").hide();
        filter = "active";
    });
    // Show Completed
    $("#filter-completed").click(function (e) {
        e.preventDefault();
        $(".todo").hide();
        $(".todo.checked").show();
        filter = "completed";
    });

    // Filter Highlight
    $(".filter button").click(function (e) {
        e.preventDefault();
        $(".filter button").removeClass("selected");
        $(e.currentTarget).addClass("selected");
    });

    // Refreshes Selected Filter
    function updateFilters() {
        if (filter === "all") {
            $("#filter-all").trigger("click");
        } else if (filter === "active") {
            $("#filter-active").trigger("click");
        } else {
            $("#filter-completed").trigger("click");
        }
    }

    // Check/Uncheck Todo
    $(".checkbox").click(function (e) {
        e.preventDefault();
        $(e.currentTarget).toggleClass("checked");
        $(e.currentTarget.nextElementSibling).toggleClass("checked");
        $(e.currentTarget.parentElement).toggleClass("checked");
        updateFilters();
    });

    // Delete Todo
    $(".delete-todo").click(function (e) {
        e.preventDefault();
        e.currentTarget.parentElement.remove();
    });

    // Clear Completed Todos
    $(".todo-footer button").click(function (e) {
        e.preventDefault();
        $(".todo").remove(".checked");
    });

    // Updates Items Left
    function updateItems() {
        $("#items-left").text($(".todo").length - $(".todo.checked").length);
    }

    $("body").click(function (e) {
        e.preventDefault();
        updateItems();
    });

    // New Todo Template
    const newTodoTemplate = $(".todo").first();

    // Adds New Todo
    $("form").submit(function (e) {
        e.preventDefault();
        const newTodo = newTodoTemplate.clone(true);
        if ($("#todo-input").val() !== "") {
            newTodo.contents()[3].innerText = $("#todo-input").val();
            // Checks If Todo Is Checked
            if (!($("form").hasClass("checked"))) {
                newTodo.removeClass("checked");
                newTodo.contents().removeClass("checked");
            }
            newTodo.appendTo(".todos");
            // Clears Input
            $("#todo-input").val("");
            // Updates Stats
            updateItems();
            updateFilters();
        }
    });

    //Switches Theme
    $("#switch-theme").click(function (e) {
        e.preventDefault();
        $("body").toggleClass("dark");
        if ($("body").hasClass("dark")) {
            $("#switch-theme img").attr("src", "./images/icon-sun.svg");
        } else {
            $("#switch-theme img").attr("src", "./images/icon-moon.svg");
        }
    });

    //Drag And Drop
    let dragSrcEl = null;

    function handleDragStart(e) {
        this.style.opacity = "0.4";
        // Stores Data
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", this.innerHTML);
    }

    function handleDragEnd(e) {
        this.style.opacity = "1";
        //Removes CLass When Drag Event Ends
        $.each(todos, function (i) {
            todos[i].classList.remove('over');
        })
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDrop(e) {
        e.stopPropagation(); // stops the browser from redirecting.
        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            resetEvents(dragSrcEl);
            this.innerHTML = e.dataTransfer.getData('text/html');
            resetEvents(this);
        }
        return false;
    }

    let todos = $(".todo");

    $.each(todos, function (i) {
        todos[i].addEventListener('dragstart', handleDragStart);
        todos[i].addEventListener('dragenter', handleDragEnter);
        todos[i].addEventListener('dragover', handleDragOver);
        todos[i].addEventListener('dragleave', handleDragLeave);
        todos[i].addEventListener('drop', handleDrop);
        todos[i].addEventListener('dragend', handleDragEnd);
    });
});

// Reset Events On Dragged Items
function resetEvents(el) {
    $(".checkbox", el).click(function (e) {
        e.preventDefault();
        $(e.target).toggleClass("checked");
        $(e.target.nextElementSibling).toggleClass("checked");
        $(e.target.parentElement).toggleClass("checked");
    })
    $(".delete-todo", el).click(function (e) {
        e.preventDefault();
        e.target.parentElement.remove();
    })
}