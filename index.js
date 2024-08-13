import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let answer = await inquirer.prompt([
        {
            type: "input",
            name: "task",
            message: "Enter a task to add:",
            validate: function (input) {
                if (input.trim() === "") {
                    return "Task cannot be empty.";
                }
                return true;
            }
        }
    ]);
    todos.push(answer.task);
    let addAnotherTask = await inquirer.prompt([
        {
            type: "confirm",
            name: "addAnother",
            message: "Add another task?",
            default: false,
        }
    ]);
    condition = addAnotherTask.addAnother;
}
