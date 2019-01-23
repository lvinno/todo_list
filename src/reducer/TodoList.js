
const initialState = {
    displayMode:"normal",
    windowSize:1300,
    userInput:"",
    counter:3,
    list:[
        {
            id:0,
            content:"This is my Todo list app",
            isFinish: false
        },
        {
            id:1,
            content:"You can try to click the task to finish it",
            isFinish: false
        }
        ,
        {
            id:2,
            content:"And try different buttons to display different kind of tasks",
            isFinish: false
        }

    ]
}


function TodoList (state=initialState,action){
    if(action.type === "add_todo_task"){
        let newState = state;
        newState.list.push(action.value);
        newState.counter++;
        newState.userInput = "";
        return newState;
    }

    if(action.type === "window_size_change"){
        let newState = state;
        newState.windowSize = action.value;
        return newState;
    }

    if(action.type === "clear_all_task"){
        let newState = state;
        newState.list = [];
        newState.counter = 0;
        return newState;
    }

    if(action.type === "user_input_change"){
        let newState = state;
        newState.userInput = action.value;
        return newState;
    }

    if(action.type === "task_delete"){
        let newState = state;
        newState.list = newState.list.filter((item)=>{
            return item.id !== action.value;
        })
        return newState;
    }

    if(action.type === "finish_mode"){
        let newState = state;
        newState.list = newState.list.map((item)=>{
            if(item.id === action.value){
                let newitem = {
                    id:item.id,
                    content:item.content,
                    isFinish:!item.isFinish
                }
                 return newitem;
             }else{
                 return item;
            }
        })
        return newState;
    }

    if(action.type === "display_mode_change"){
        let newState = state;
        newState.displayMode  = action.value;
        return newState;
    }
    return state;
}

export default TodoList;