const serverUrl = "https://5c01dd5ad526f900134722f2.mockapi.io";

export const toDoItemsApiUrl = id => 
    id ? `${serverUrl}/todo_list/${id}` : `${serverUrl}/todo_list`;