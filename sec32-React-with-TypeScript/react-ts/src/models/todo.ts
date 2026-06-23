// not a .tsx file because we r not creating any components here
// wanna describe the types of data that the Todo component can receive

class Todo {   // can also use it as a type besides creating objects with it
    id: string;
    text: string;

    constructor(todoText: string) {
        this.text = todoText;
        this.id = new Date().toISOString();
    }
}

export default Todo;