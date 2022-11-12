//The function that hides the loading spinner if you provide its id
export const hideLoadingSpinner = (id) => {

    document.getElementById(id).style.display = "none"
}