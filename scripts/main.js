// import { Person, Sender, Receiver, sender } from './person.js';
//Variable
let selectedUser;
//Tableau
let selectedUsers = [];



//Object

const transactionHTML = document.querySelector('.card-transaction');
const detailtransactionTHML = document.querySelector('.details');
const printTHML = document.querySelector('.print');
const printerTHML = document.querySelector('.printer');
const chooseReceiversHTML = document.querySelector('.choose-receivers');
const selectUSerHTML = document.querySelector('.select-receivers');
const btnconfirmerHtml=document.querySelector('.confirmer');


//Fonctions

async function getSeriesByList(list, page) {
  url = `https://api.themoviedb.org/3/tv/${list}?api_key=${apikey}&language=fr-FR&page=${page}`;
  try {
    let data = await fetch(url);
    let result = await data.json();
    return result;
  } catch (error) {
    return error;
  }
}

// async function displayAll(categoy) {
//     localStorage.clear();
//     wrapperFimlHTML.innerHTML=``;
//     let result = await getSeriesByList(categoy,currentPage);
//     let myrest = result.results;
//     let fimlHTML;

//     console.log(myrest);

//     paginationHTML.innerHTML=`Page ${result.page} sur ${result.total_pages}`;
//     // console.log(result.total_pages);


//     myrest.forEach(serie => {
//         const filmdetail = [
//             serie.name,        
//             `${imgUrl}${serie.poster_path}`,
//             serie.popularity,
//             serie.overview,
//             serie.first_air_date,
//         ];
//         localStorage.setItem(serie.id, JSON.stringify(filmdetail));
//     });
//     for(let film of myrest){
//         fimlHTML=`
//             <div class="card" data-id=${film.id}>
//                 <h2 class="title">${film.name}</h2>
//                 <img src="${imgUrl}${film.poster_path}" alt="image">
//                 <div class="popularity"><span>${film.popularity}</span></div>
//             </div>
//         `;
//         wrapperFimlHTML.innerHTML+=fimlHTML;
//     }

// }


// buttons.addEventListener('click', (event) => {
//     const elementClicked = event.target;
//     if (elementClicked.tagName !== 'BUTTON') return;
//     const allButtons = buttons.querySelectorAll('button');
//     allButtons.forEach(btn => btn.classList.remove('active'));


//     elementClicked.classList.add('active');


//     const nomClasse = elementClicked.className.replace('active', '').trim();

//     currentCategorie=nomClasse;
//     currentPage=1;
//     if (nomClasse) {
//         displayAll(currentCategorie); 
//     }
// });

// nextAndprevHTML.addEventListener('click', (event) => {
//     event.preventDefault();
//     const clickedButton = event.target.closest('button'); 

//     if (!clickedButton) return;

//     if (clickedButton.classList.contains('next')) {
//         currentPage++;
//     } else if (clickedButton.classList.contains('previous')) {
//         if (currentPage > 1) {
//             currentPage--;
//         }
//     }


//     // const nextButton = document.querySelector('.next');
//     const prevButton = document.querySelector('.previous');

//     if (currentPage <= 1) {
//         prevButton.style.opacity = '0';
//         prevButton.disabled = true;
//     } else {
//         prevButton.style.opacity = '1';
//         prevButton.disabled = false;
//     }

//     displayAll(currentCategorie); 
// });



// wrapperFimlHTML.addEventListener('click', (event) => {
//   const cardElement = event.target.closest('.card');

//   if (!cardElement || !wrapperFimlHTML.contains(cardElement)) return;

//     idElement = cardElement.dataset.id;
//   cardInfo = JSON.parse(localStorage.getItem(idElement));


// //   console.log(cardInfo);

//   if (cardInfo) {
//     imagepopuHTML.src = cardInfo[1];
//     titreserieHTML.innerHTML = cardInfo[0];
//     overviewHtml.innerHTML = cardInfo[3];
//     popupHTML.style.display='flex';
//   }
// });


// closepopupHTML.addEventListener('click',(event)=>{
//     event.preventDefault();
//     popupHTML.style.display='none';
// });


// ouvrirpageHTML.addEventListener('click', (event) => {
// //cardInfo
//   console.log(cardInfo);
//   console.log(idElement);

//   if (cardInfo) {
//     imagepopuHTML.src = cardInfo[1];
//     titreserieHTML.innerHTML = cardInfo[0];
//     overviewHtml.innerHTML = cardInfo[3];
//     popupHTML.style.display='flex';
//   }
// });

// ouvrirpageHTML.addEventListener('click', (event) => {
//   event.preventDefault();

//   if (idElement && cardInfo) {
//     // je stocke l'ID actif
//     localStorage.setItem('selectedId', idElement);

//     // j'ouvre la nouvelle page
//     window.location.href = '../serieinfo.html';
//   }
// });



async function envoyerNotificationDiscord(nom, montant) {
  const webhookUrl = `https://discord.com/api/webhooks/1379746306595229816/cHCng6LgPAWFr6l2HUyQOV9Gc0fa4fH519jVnx22bWnkuMDJVRXGgmInwvZSCJUdppsl`;

  const payload = {
    content: `💸 ${nom} a simulé un envoi de ${montant} EUR via l'app.`,
    username: "Alpha", // Optionnel : nom affiché dans Discord
    avatar_url: "https://th.bing.com/th/id/OIP.w3pChPezjOrlCa-iq3TyNQHaG6?r=0&rs=1&pid=ImgDetMain" // Optionnel : image du bot
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log("✅ Notification envoyée dans Discord !");
    } else {
      console.error("❌ Erreur lors de l'envoi :", response.status);
    }
  } catch (error) {
    console.error("❌ Erreur réseau :", error);
  }
}

console.log('efds');
//  console.log( envoyerNotificationDiscord('Malachie',50));

async function envoyerMail(nom, emailDestinataire, montant) {


  (function () {
    emailjs.init({
      publicKey: "JJCjd3YGNXc93dVUw",
    });
  })();

  const templateParams = {
    nom_utilisateur: nom,
    email: emailDestinataire,
    montant_envoye: montant
  };

  try {
    const response = await emailjs.send('service_gmail', 'template_transfer', templateParams);
    console.log('✅ Email envoyé avec succès !', response.status, response.text);
  } catch (error) {
    console.error('❌ Échec de l’envoi de l’email :', error);
  }
}

async function envoi() {
  await envoyerMail('Alphonse', 'malakialphonse@gmail.com', 50);
}
// envoi();

function envoyerMail1(nom, emailDestinataire, montant) {

  const templateParams = {
    nom_utilisateur: nom,
    email: emailDestinataire,
    montant_envoye: montant
  };


  emailjs.send('no-reply', 'template_98v4vfv', templateParams)
    .then(function (response) {
      console.log('✅ Email envoyé avec succès !', response.status, response.text);
    }, function (error) {
      console.error('❌ Échec de l’envoi de l’email :', error);
    });
}

// envoyerMail1('Alphonse', 'alphamlc993@gmail.com', 15550);

//PayPal

function lancerSimulation() {
  console.log("▶️ Simulation déclenchée. Affichage du bouton PayPal...");

  if (typeof paypal === "undefined") {
    console.error("❌ SDK PayPal non chargé.");
    return "❌ SDK PayPal non chargé.";
  }

  paypal.Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: { value: '15.00' }
        }]
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        console.log(details);
        console.log("✅ Paiement simulé par :", details.payer.name.given_name);
        alert("✅ Merci " + details.payer.name.given_name + ", paiement simulé !");
      });
    },
    onError: function (err) {
      console.error("❌ Erreur lors de la simulation :", err);
      return "❌ Erreur lors de la simulation : " + err;
    }
  }).render('#paypal-button-container');

  return "✅ Simulation déclenchée et bouton PayPal affiché.";
}

// console.log(lancerSimulation());

console.log(crypto.randomUUID());

async function getLocalDevise(countryCode) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    const data = await response.json();
    const currencies = data[0].currencies;
    const currencyCode = Object.keys(currencies)[0]; // ex: "EUR", "USD"
    const symbol = currencies[currencyCode].symbol;

    return { currencyCode, symbol }; // Tu peux retourner les deux
  } catch (error) {
    console.error("Erreur lors de la récupération de la devise :", error);
    return null;
  }
}

async function convertEURToLocal(currencyCode, amount) {
  try {
    const response = await fetch(`https://api.exchangerate.host/convert?access_key=36e6912d7e080d12288e1f665ceda5e8&from=EUR&to=${currencyCode}&amount=${amount}`);
    const data = await response.json();
    console.log(data);
    console.log(data);
    
    return data.result;
  } catch (error) {
    console.error("Erreur de conversion :", error);
    return null;
  }
}


async function genererUtilisateurs(nombre) {
  try {
    const response = await fetch(`https://randomuser.me/api/?results=${nombre}`);
    const data = await response.json();

    data.results.forEach((user, index) => {
      console.log(`👤 Utilisateur ${index + 1}`);
      console.log(`Nom : ${user.name.first} ${user.name.last}`);
      console.log(`Email : ${user.email}`);
      console.log(`Pays : ${user.location.country}`);
      console.log(`Photo : ${user.picture.thumbnail}`);
      console.log('---------------------------');
    });

    return data.results;
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des utilisateurs :', error);
  }
}


// Appel de la fonction
// genererUtilisateurs(5);

//Composant

localStorage.clear();

selectUSerHTML.addEventListener('click', async (event) => {
  let me = 'id,noms,email,sexe,code_pays,pays,password,age,photo';

  // let sender=new sender();
  // localStorage.clear();
  let clickedElement = event.target;
  const wrapper = clickedElement.closest('.choose-wrapper');

  if (clickedElement.classList.contains('fa-user-plus')) {
    let mydata = await genererUtilisateurs(5);
    console.log(mydata);

    mydata.forEach((user) => {
      let users = `
        <div class="choose-wrapper" title="Selectionner" data-userID="${user.login.uuid}">
            <img src="${user.picture.large}" alt="img" class="img-size">
            <span>${user.name.first} ${user.name.last}</span>
        </div>
        
      `;
      localStorage.setItem(user.login.uuid, JSON.stringify(user));
      chooseReceiversHTML.innerHTML += users;
    });

  } else if (wrapper) {
    let uid = wrapper.dataset.userid;
    selectedUsers = [];
    selectedUsers.push(JSON.parse(localStorage.getItem(uid)));
    console.log(uid);
    console.log(selectedUsers);
    selectedUser = selectedUsers[0];
    console.log(selectedUser);

    document.querySelector('.display-img').src = selectedUser.picture.large;
    document.querySelector('.display-name').innerHTML = selectedUser.name.first + ' ' + selectedUser.name.last;
    document.querySelector('.display-mail').innerHTML = selectedUser.email;
    document.querySelector('.display-country').innerHTML = selectedUser.location.country;
    // document.querySelector('.display-currency').innerHTML=getLocalDevise(selectedUser.nat).symbol;
    const result = await getLocalDevise(selectedUser.nat);
    if (result) {
      document.querySelector('.display-currency').innerHTML = result.currencyCode + " | " + result.symbol;
    }
    console.log(selectedUser.nat);
    console.log(result.currencyCode);
    
    const montantConverti = await convertEURToLocal(result.currencyCode , 100);
    console.log(montantConverti.toFixed(2));


  }

});

document.querySelector('.montant-recev').addEventListener('input', (event) => {
  const input = event.target.value;

  // Si l'utilisateur tape une lettre (majuscule ou minuscule), on efface tout
  if (/[a-zA-Z]/.test(input)) {
    event.target.value = '';
    btnconfirmerHtml.style.display = 'none';
    document.querySelector('.montantRecevoir').innerHTML = '';
    return;
  }

  // Remplace virgule par point et essaie de parser le nombre
  let montantSaisie = parseFloat(input.replace(',', '.'));

  if (isNaN(montantSaisie)) {
    btnconfirmerHtml.style.display = 'none';
    document.querySelector('.montantRecevoir').innerHTML = '';
    return;
  }

  if (montantSaisie > 0) {
    btnconfirmerHtml.style.display = 'block';
    afficherConvertit(montantSaisie);
  } else {
    btnconfirmerHtml.style.display = 'none';
    document.querySelector('.montantRecevoir').innerHTML = '';
  }
});


async function afficherConvertit(montant) {
  const result = await getLocalDevise(selectedUser.nat);
  const montantConverti = await convertEURToLocal(result.currencyCode , montant);



  document.querySelector('.montantRecevoir').innerHTML=montantConverti.toFixed(2)+" "+result.symbol;
}

let isVisible = false;











printerTHML.addEventListener('click', (event) => {
  event.preventDefault();
  const options = {
    margin: 0.5,
    filename: 'recu_malaki.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(options).from(transactionHTML).save();
});

transactionHTML.addEventListener('click', (event) => {
  event.preventDefault();

  let clickedElement = event.target;
  if (!clickedElement.classList.contains('identity')) return;



  toggleSmooth(detailtransactionTHML);
  toggleSmooth(printTHML);
});



function toggleSmoothle(el) {
  if (el.classList.contains('display')) {
    // Masquer doucement
    el.style.maxHeight = el.scrollHeight + 'px';
    el.offsetHeight; // force le reflow
    el.style.opacity = '0';
    el.style.maxHeight = '0px';

    el.addEventListener('transitionend', function hideAfterTransition() {
      el.classList.remove('display');
      el.style.display = 'none';
      el.removeEventListener('transitionend', hideAfterTransition);
    });

  } else {
    // Afficher doucement
    el.classList.add('display');
    el.style.display = 'flex'; // on le remet dans le flux
    el.offsetHeight; // force reflow
    el.style.maxHeight = el.scrollHeight + 'px';
    el.style.opacity = '1';
  }
}


function toggleSmooth(el) {
  const isHidden = window.getComputedStyle(el).display === 'none';

  if (isHidden) {
    el.style.display = 'flex';
    el.style.height = 'auto';
    const targetHeight = el.scrollHeight + 'px';
    el.style.height = '0px';

    gsap.to(el, {
      height: targetHeight,
      opacity: 1,
      duration: 0.9,
      ease: "power2.out",
      onComplete: () => {
        el.style.height = 'auto'; // reset to auto after animation
      }
    });
  } else {
    gsap.to(el, {
      height: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        el.style.display = 'none';
      }
    });
  }
}


gsap.to(detailtransactionTHML, {
  height: "auto",
  opacity: 1,
  duration: 0.5,
  ease: "power2.out",
  onStart: () => detailtransactionTHML.style.display = 'flex'
});
// Pour masquer avec animation
gsap.to(detailtransactionTHML, {
  height: 0,
  opacity: 0,
  duration: 0.5,
  ease: "power2.in",
  onComplete: () => detailtransactionTHML.style.display = 'none'
});
