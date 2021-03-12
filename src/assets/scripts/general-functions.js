function ShowNotificationMessage(message) {
    document.getElementById("messageText").innerHTML = "";
    document.getElementById("messageText").innerHTML = message;
    console.log(message);
    let myModal = new bootstrap.Modal(document.getElementById('messageModal'), {})
        myModal.toggle();
}
function ShowNotificationMessage1(message) {
    document.getElementById("messageText1").innerHTML = "";
    document.getElementById("messageText1").innerHTML = message;
    console.log(message);
    let myModal = new bootstrap.Modal(document.getElementById('messageModal1'), {})
        myModal.toggle();
}

function ShowRemoveConfirmationModal() {
    let myModal = new bootstrap.Modal(document.getElementById('removeConfirmationModal'), {})
    myModal.toggle();
}
function closeModal(modalId) {
    console.log("entramos" + modalId);
    let myModal = new bootstrap.Modal(document.getElementById(modalId), {})
    myModal.dispose();
}