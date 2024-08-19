
import { clearPage } from '../../utils/render';
import image from '../../img/tingey-injury-law-firm-unsplash-low-res.jpg';



const QuoteCarousel = async () => {
    clearPage();
    afficherCitation();
}

async function afficherCitation() {
    const main = document.querySelector('main');
    const response = await fetch('/api/quotes');

    if(!response.ok) {
        main.innerHTML = `
        <div class="alert alert-danger" role="alert">
          An error occurred when fetching the questions
        </div>
        `
    }

    const quotes =await response.json();

    let index = 0;
    const max = quotes.length;
    let affichage = false;
    const timer = localStorage.getItem('timer') ? localStorage.getItem('timer') : 5000;

    const intervalId = setInterval(()=>{
        const updateQuote = async () => {
            localStorage.setItem('intervalId',intervalId);
            if(affichage === false) {
                main.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h1>${quotes[index].thinker}</h1>
                        <p class="card-text">${quotes[index].quote}</p>
                        <img src="${quotes[index].image}" class="card-img-top" alt"...">
                    </div>
                </div>
                `;
                affichage = true;
            }else{
                index +=1;
                if(index === max) {
                    main.innerHTML = `<p>Rechargez la page si vous souhaitez réafficher le carrousel des citations ! </p>`
                    clearInterval(intervalId);
                } else {
                    const imageExist = await imageExists(quotes[index].image);
                    const imageUrl = imageExist ? quotes[index].image : image;
                    main.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                            <p class="card-text">${quotes[index].thinker}</p>
                            <p class="card-text">${quotes[index].quote}</p>
                            <img src="${imageUrl}" class="card-img-top" alt="...">
                        </div>
                    </div>`;
                }
            }
        }
        updateQuote();
    },timer)
 
}

async function imageExists(url){
    try{
        const response = await fetch(url, {
            method: 'HEAD', 
            mode: 'no-cors' 
          });
        return response.ok
    }catch (error){
        return false;
    }
}

export default QuoteCarousel;