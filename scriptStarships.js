let currentPageUrl = 'https://swapi.dev/api/starships/'

window.onload = async () => {
    try {
        await loadPlanets(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', loadNextPage);
  
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', loadPreviousPage);
};

async function loadPlanets(url){
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; //Limpar os resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((starships) => {
            const card = document.createElement("div")
            const starshipsImg = checkPlanetForImg(starships.url.replace(/\D/g, ""))
            card.style.backgroundImage = `url(${starshipsImg})`
            card.className = "cards"

            const starshipsNameBg = document.createElement("div")
            starshipsNameBg.className = "starships-name-bg"

            const starshipsName = document.createElement("span")
            starshipsName.className = "starships-name"
            starshipsName.innerText = `${starships.name}`

            starshipsNameBg.appendChild(starshipsName)
            card.appendChild(starshipsNameBg)

          card.onclick = () => {
            const modal = document.getElementById('modal')
            modal.style.visibility = "visible"

            const modalContent = document.getElementById('modal-content');
            modalContent.innerHTML = '';

            const starshipsImage = document.createElement("div");
            starshipsImage.style.backgroundImage = `url(${starshipsImg})`
            starshipsImage.className = "starships-image"

            const name = document.createElement("span");
            name.className = "starships-details";
            name.innerText = `Nome: ${starships.name}`

            const model = document.createElement('span');
            model.className = "starships-details";
            model.innerText = `Modelo: ${starships.model}`

            const cost = document.createElement('span');
            cost.className = "starships-details";
            cost.innerText = `Custo: ${starships.cost_in_credits}`

            const speed = document.createElement('span');
            speed.className = "starships-details";
            speed.innerText = `Velocidade: ${starships.max_atmosphering_speed}`

            const crew = document.createElement('span');
            crew.className = "starships-details";
            crew.innerText = `Equipe minima: ${starships.crew}`


            modalContent.appendChild(starshipsImage)
            modalContent.appendChild(name)
            modalContent.appendChild(model)
            modalContent.appendChild(cost)
            modalContent.appendChild(speed)
            modalContent.appendChild(crew)
          }

            mainContent.appendChild(card)

        });

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous? "visible" : "hidden";
        nextButton.style.visibility = responseJson.next? "visible" : "hidden";
        
        currentPageUrl = url;

    } catch(error) {
        console.log(error)
        alert('Error ao carregar os planetas')
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;
  
    try {
      const nextButton = document.getElementById('next-button');
      nextButton.disabled = true;
      const response = await fetch(currentPageUrl);
      const responseJson = await response.json();
  
      await loadPlanets(responseJson.next);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar a próxima página');
    }
  }
  
  async function loadPreviousPage() {
    if (!currentPageUrl) return;
  
    try {
      const backButton = document.getElementById('back-button');
      backButton.disabled = true;
      const response = await fetch(currentPageUrl);
      const responseJson = await response.json();
  
      await loadPlanets(responseJson.previous);
    } catch (error) {
      console.log(error);
      alert('Erro ao carregar a página anterior');
    }
  }

  function hideModal(){
    const modal = document.getElementById('modal')
    modal.style.visibility = "hidden"
  }
  
  function checkPlanetForImg(code){
    console.log(code)
    const planetsImg = {
      2:"https://img.swcombine.com//ships/7/large.png",
      3:"https://img.swcombine.com//ships/134/large.jpg",
      17:"https://img.swcombine.com//ships/31/large.png",
      32:"https://img.swcombine.com//ships/76/large.jpg",
      49:"https://img.swcombine.com//ships/60/large.jpg",
      52:"https://img.swcombine.com//ships/91/large.png",
      58:"https://img.swcombine.com//ships/147/large.png",
      59:"https://img.swcombine.com//ships/239/large.jpg",
      61:"https://img.swcombine.com//ships/128/large.png",
      63:"https://img.swcombine.com//ships/263/large.png",
      64:"https://img.swcombine.com//ships/129/large.jpg",
      65:"https://img.swcombine.com//ships/140/large.jpg",
      66:"https://img.swcombine.com//ships/118/large.jpg",
      68:"https://static.wikia.nocookie.net/starwars/images/a/a7/CISMunificent-TCW.png",
      74:"https://img.swcombine.com//ships/122/large.png",
      75:"https://img.swcombine.com//ships/126/large.png"
    }
    //`https://starwars-visualguide.com/assets/img/characters/${planet.url.replace(/\D/g, "")}.jpg`
    return planetsImg[code] || `https://starwars-visualguide.com/assets/img/starships/${code}.jpg`
  }
