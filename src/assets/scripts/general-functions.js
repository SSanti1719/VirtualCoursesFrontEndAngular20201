function ShowNotificationMessage(message){
    document.querySelector("#messageText").innerHTML=message;
    var myModal = new bootstrap.Modal(document.getElementById('messageModal'),{})
    myModal.toggle();
}