import { API_BASE_URL } from "../config";

const API_URL_TASK = API_BASE_URL;

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    const defaults = {headers: headers};
    console.log(options);
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};


export function getListTask(id){

    return request({
        url: API_URL_TASK + "list-task/" + id,
        method: 'GET'
    });

}

export function deleteTasks(id){

    return request({
        url: API_URL_TASK + "delete-task/" + id,
        method: 'DELETE'
    });

}


export function updateTasks(id, title){

    var raw = JSON.stringify({
        "title": title,
      })
    
    return request({
        url: API_URL_TASK + "update-task/" + id,
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    });

}


export function saveTask(title, userId){

    var raw = JSON.stringify({
        title: title,
        complete: true,
        user: userId
      })
    
    return request({
        url: API_URL_TASK + "create-task",
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });

}

export function findByUsername(username){
    return request({
        url: API_URL_TASK + "search-user?keyword=" + username,
        method: 'GET'
    });
}

export function logout(){
    
    return request({
        url: API_URL_TASK + "logout",
        method: 'POST',
        redirect: 'follow'
    });

}