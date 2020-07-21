let lightMode = localStorage.getItem('lightmode');
const lightToggle = document.querySelector('#light-mode-toggle');

const enableLightMode = () => {
    //add class
    document.body.classList.add('lightmode');
    //set the local storage
    localStorage.setItem('lightMode', 'Enabled');
}

const disableLightMode = () => {
    //add class
    document.body.classList.remove('lightmode');
    //set the local storage to null (disabled)
    localStorage.setItem('lightMode', null);
}

if (lightMode === 'Enabled') {
   enableLightMode(); 
}

lightToggle.addEventListener('click', () => {
    lightMode = localStorage.getItem('lightMode');
    console.log("I've been cliiiiicked!")
    if (lightMode !== 'Enabled') {
        enableLightMode();
    } else {
        disableLightMode();
        console.log("disabling light mode");
    }
})