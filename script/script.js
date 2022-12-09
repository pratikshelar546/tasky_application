const state = {
    taskList: [],
};

// to create card on ui
const htmlTaskContent = ({ id, url, title, type, description }) => {
    return `<div class='col md-6 col-lg-4 mt-3' id=${id} key=${id}>
    <div class='card shadow-sm task__card'>
    <div class='card-header d-flex gap-2 justify-content-end task__card__header'>
    <button type='button' class='btn btn-outline-info mr-2' name=${id}>
    <i class='fa fa-pencil-alt name =${id}></i>
    </button>
    <button type='button' class="btn btn-outline-danger mr-2'name=${id}>
    <i class='fa fa-trash-alt' name=${id}></i>
    </button>
    </div>
    <div class='card-body'>
    ${
        url && `<img width='100%' class='card-image-top md-3 rounded-lg'/ alt='card image here' src=${url} ` 
    }
    <h4 class='task__title'>${title}</h4>
    <p class='task__description trim-3-lines text-muted' data-gram_editor='false'>${description}</p>
    <div class='tags text-white d-flex flex-wrap'>
    <span class='badge bg-primary m-1'>${type}</span>
    </div>
    </div>
    <div class='card-footer'>
    <button type='button' class='btn btn-outline-primary' float-right data-bs-toggle='modal' data-bs-toggle='#showTask' id=${id}></button>
    </div>
    </div>
    </div>`;
} 
console.log(htmlTaskContent);