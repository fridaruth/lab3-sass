document.addEventListener('DOMContentLoaded', () => {
    const bounceBTN = document.getElementById('bounce-btn');
    const bounceIMG = document.getElementById('bounce-img');

    // kolla om elementen finns
    if (bounceBTN && bounceIMG) {
       bounceBTN.addEventListener('click', () => {
            bounceIMG.classList.add('animated-cat');

            setTimeout(() => {
                bounceIMG.classList.remove('animated-cat');
            }, 3000)
        });
    }
});