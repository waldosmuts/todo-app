// Filter Selection
// Show All
$("#filter-all").click(function (e) {
    e.preventDefault();
    $(".todo").show();
});
// Show Uncompleted
$("#filter-active").click(function (e) {
    e.preventDefault();
    $(".todo").show();
    $(".todo.checked").hide();
});
// Show Completed
$("#filter-done").click(function (e) {
    e.preventDefault();
    $(".todo").hide();
    $(".todo.checked").show();
});

// Filter Highlight
$(".filter button").click(function (e) {
    e.preventDefault();
    $(".filter button").removeClass("selected");
    $(e.currentTarget).addClass("selected");
});

// Check/Uncheck Todo
$(".checkbox").click(function (e) {
    e.preventDefault();
    $(e.currentTarget).toggleClass("checked");
    $(e.currentTarget.nextElementSibling).toggleClass("checked");
    $(e.currentTarget.parentElement).toggleClass("checked");
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

// Add New Todo
$("form").submit(function (e) {
    e.preventDefault();
    if (!($("form").hasClass("checked"))) {
        $(".todos").prepend(`
        <div class="todo">
            <button class="checkbox"></button>
            <span>${$("#todo-input").val()}</span>
            <button class="delete-todo" aria-label="Delete Todo">
                <img src="./images/icon-cross.svg" alt="" aria-hidden="true">
            </button>
        </div>`
        );
    } else {
        $(".todos").prepend(`
        <div class="todo checked">
            <button class="checkbox checked"></button>
            <span class="checked">${$("#todo-input").val()}</span>
            <button class="delete-todo" aria-label="Delete Todo">
                <img src="./images/icon-cross.svg" alt="" aria-hidden="true">
            </button>
        </div>`
        );
    }
    //Clears Input
    $("#todo-input").val("");
    updateItems();
});
