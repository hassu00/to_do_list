import inquirer from "inquirer";

let todos: string[] = [];
  async function addTask()  {
   // @ts-ignore
   const answer = await inquirer.prompt([
    {
      type: "input",
      name: "task",
      message: "Enter a task to add:",
      validate: function (input: string) {
        if (input.trim() === "") {
          return "Task cannot be empty.";
        }
        return true;
      },
    },
    {
      type: "confirm",
      name: "addAnother",
      message: "Add another task?",
      default: false,
    },
  ]);
  todos.push(answer.task);
  if (answer.addAnother ) {
    await addTask()
 }}
  
async function updateIndex() {
      // @ts-ignore
      let updateIndex = await inquirer.prompt([
          {
              type: "list",
              name: "updateIndex",
              message: "Choose the task to update:",
              choices:todos}, 
            {
              type: "input",
              name: "newTask",
              message: "Enter the updated task:",
            },
      ]);    
      const index = todos.indexOf(updateIndex.updateIndex)
      todos[index] = updateIndex.newTask;
    }   
async function deleteIndex() {
       // @ts-ignore
      let deleteIndex = await inquirer.prompt([{
          type:"list",
          name: "deleter",
          message: "Choose the task to delete:",
          choices: todos,
        }])
        todos.splice(todos.indexOf(deleteIndex.deleter), 1);
      }
     
      
 async function viewList() {
  console.log("Current tasks:", todos);
 }
      
 async function main() {
   await addTask();
 while (true) {
  console.log(`current tasks list:`,todos);
  
   // @ts-ignore
   let answer1 = await inquirer.prompt([
     {
       name: "changes",
       type: "list",
       message: "Do you want to change something or review the todo list?",
       choices: ["addmore","update", "delete", "view list","exit"],
     },
   ]);
    
     switch (answer1.changes) {
      case "addmore":
        await addTask()
        break;
        case "update":
          await updateIndex()
          break;
          case "delete":
            await deleteIndex()
            break;
          case "viewList":
            await viewList()
            break;
          case "exit":
            return;
   }
  }
}
 main()