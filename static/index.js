(function(){
    const form = document.querySelector('.form');
    const obj = {};
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        Array.from(form.elements).forEach((elem) => {
            if (elem.name && elem.value) {
                obj[elem.name] = elem.value;
            }
        })
        console.log(obj);
    })
    
})()