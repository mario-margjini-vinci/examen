import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const ManageCarousel = () =>{
    clearPage();
    const intervalId = localStorage.getItem('intervalId');
    clearInterval(intervalId);
    renderManager();
}

function renderManager(){
    const main = document.querySelector('main');
    main.innerHTML = `
    <form id="manage">
        <div>
            <input type="number" id="seconds">  
            <label for="seconds">temps d'affichage de chaque citation (en secondes)</label> 
        </div>
        <div>
            <input type="submit" value ="valider">
        </div>
    </form>
    `
    const form = document.querySelector('#manage');
    const seconds = document.querySelector('#seconds').value;
    const milliseconds = (seconds*1000);
    form.addEventListener('submit',()=>{
        localStorage.setItem('timer',milliseconds);
        Navigate('/quoteCarousel');
    })

}

export default ManageCarousel;