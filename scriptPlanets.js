let currentPageUrl = 'https://swapi.dev/api/planets/'

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

        responseJson.results.forEach((planet) => {
            const card = document.createElement("div")
            const planetImg = checkPlanetForImg(planet.url.replace(/\D/g, ""))
            card.style.backgroundImage = `url(${planetImg})`
            card.className = "cards"

            const planetNameBg = document.createElement("div")
            planetNameBg.className = "planet-name-bg"

            const planetName = document.createElement("span")
            planetName.className = "planet-name"
            planetName.innerText = `${planet.name}`

            planetNameBg.appendChild(planetName)
            card.appendChild(planetNameBg)

          card.onclick = () => {
            const modal = document.getElementById('modal')
            modal.style.visibility = "visible"

            const modalContent = document.getElementById('modal-content');
            modalContent.innerHTML = '';

            const planetImage = document.createElement("div");
            planetImage.style.backgroundImage = `url(${planetImg})`
            planetImage.className = "planet-image"

            const name = document.createElement("span");
            name.className = "planet-details";
            name.innerText = `Nome: ${planet.name}`

            const population = document.createElement('span');
            population.className = "planet-details";
            population.innerText = `Populacao: ${planet.population}`

            const rotacaoPeriodo = document.createElement('span');
            rotacaoPeriodo.className = "planet-details";
            rotacaoPeriodo.innerText = `Periodo de rotacao: ${planet.rotation_period}`

            const orbitalPeriodo = document.createElement('span');
            orbitalPeriodo.className = "planet-details";
            orbitalPeriodo.innerText = `Periodo orbital : ${planet.orbital_period}`

            const diametro = document.createElement('span');
            diametro.className = "planet-details";
            diametro.innerText = `Diametro : ${planet.diameter}`


            modalContent.appendChild(planetImage)
            modalContent.appendChild(name)
            modalContent.appendChild(population)
            modalContent.appendChild(rotacaoPeriodo)
            modalContent.appendChild(orbitalPeriodo)
            modalContent.appendChild(diametro)
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
    console.log('Check Planets')
    console.log(code)
    const planetsImg = {
      1:"https://static.wikia.nocookie.net/ptstarwars/images/f/f6/Tatoooinefull.jpg",
      20:"https://static.wikia.nocookie.net/starwarscavalryofdarkness/images/b/bd/ImagesCA533VT4.jpg",
      22:"https://static.wikia.nocookie.net/ptstarwars/images/3/3a/Corellia-SWCT.webp",
      23: "https://static.wikia.nocookie.net/ptstarwars/images/c/c3/Rodia_canon.png",
      24:"https://static.wikia.nocookie.net/starwars/images/8/8d/Nal-hutta.png",
      25:"https://static.wikia.nocookie.net/starwars/images/a/a5/Dantooine_Resistance.jpg",
      26:"https://static.wikia.nocookie.net/starwars/images/3/36/Ord_Mantell_EotECR.png",
      27:"https://img.swcombine.com//galaxy/planets/custom/large/6269.gif",
      29:"https://static.wikia.nocookie.net/starwars/images/4/40/Trandosha-PL.png",
      30:"https://static.wikia.nocookie.net/star-wars-extended-universe/images/5/5f/Alderaan.png",
      31:"https://static.wikia.nocookie.net/starwars/images/0/04/Dac-AORCR.png",
      32:"https://static.wikia.nocookie.net/starwars/images/0/0c/Chandrila-AoRCR.png",
      33:"https://static.wikia.nocookie.net/star-wars-extended-universe/images/9/91/Sullust.png",
      34:"https://static.wikia.nocookie.net/starwars/images/d/d6/Toydaria-TCW.png",
      35:"https://static.wikia.nocookie.net/starwars/images/0/00/Malastare_TEA.jpg",
      36:"https://static.wikia.nocookie.net/starwars/images/3/34/DathomirJFO.jpg",
      37:"https://static.wikia.nocookie.net/starwars/images/9/96/Ryloth-Homecoming.png",
      38:"https://static.wikia.nocookie.net/starwars/images/f/f6/Aleen_NEGAS.jpg",
      39:"https://static.wikia.nocookie.net/starwars/images/b/be/Vulpter_FF7.jpg",
      40:"https://static.wikia.nocookie.net/starwars/images/3/3a/TroikenQuermia.jpg",
      41:"https://static.wikia.nocookie.net/starwars/images/3/31/Tund_TEA.jpg",
      42:"https://static.wikia.nocookie.net/starwars/images/7/75/HaruunKalCSWE.jpg",
      43:"https://static.wikia.nocookie.net/jedipedia/images/d/df/Cerea_NEGAS.jpg",
      44:"https://static.wikia.nocookie.net/jedipedia/images/0/0c/GleeAnselm.jpg",
      45:"https://static.wikia.nocookie.net/starwars/images/c/c5/Iridonia.jpg",
      46:"",
      47:"https://static.wikia.nocookie.net/starwars/images/f/f1/Iktotch_FDNP.png",
      48:"https://static.wikia.nocookie.net/starwars/images/2/29/Quermia_NEGAS.jpg",
      49:"https://static.wikia.nocookie.net/starwars/images/9/9b/Dorin-FDCR.png",
      50:"https://static.wikia.nocookie.net/starwars/images/d/d7/Champala_NEGAS.jpg",
      51:"https://static.wikia.nocookie.net/star-wars-pathfinder/images/e/e0/Mirial.jpg",
      52:"https://static.wikia.nocookie.net/starwars/images/b/b2/Serenno-Massacre.png",
      53:"http://eleven-thirtyeight.com/wp-content/uploads/2016/02/lolasayu.png",
      54:"https://static.wikia.nocookie.net/starwars/images/6/66/Zolan.jpg",
      55:"https://static.wikia.nocookie.net/starwars/images/9/9f/Ojom.jpg",
      56:"https://static.wikia.nocookie.net/jedipedia/images/c/cd/Skako.jpg",
      57:"https://static.wikia.nocookie.net/starwars/images/1/19/Muunilinst.jpg",
      58:"https://static.wikia.nocookie.net/shaniverse/images/6/65/Shili.jpg",
      59:"https://static.wikia.nocookie.net/starwars/images/c/c1/Kalee_TEA.jpg",
      60:"https://static.wikia.nocookie.net/starwars/images/8/82/Umbara_TVE.png"
    }
    //`https://starwars-visualguide.com/assets/img/characters/${planet.url.replace(/\D/g, "")}.jpg`
    return planetsImg[code] || `https://starwars-visualguide.com/assets/img/planets/${code}.jpg`
  }
