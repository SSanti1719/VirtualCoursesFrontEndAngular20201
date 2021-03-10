function ShowNotificationMessage(message){
    document.querySelector("#messageText").innerHTML=message;
    let myModal = new bootstrap.Modal(document.getElementById('messageModal'),{})
    myModal.toggle();
}

function ShowRemoveConfirmationModal(){
    let myModal = new bootstrap.Modal(document.getElementById('removeConfirmationModal'),{})
    myModal.toggle();
}