
const btnContact = document.getElementById('btn-contact-Photographer');
btnContact.addEventListener('click',launchModal)
//------------------- launch modal form------------------------
function launchModal(photographer) {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  main.setAttribute('aria-hidden', false);
  modal.setAttribute('aria-hidden', true);
  //btnclose.focus();
}
//------------------------ close Modale-------------------
const btnclose = document.getElementById('btn-modal-close');
btnclose.addEventListener('click', closeModal);
function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';

}
// -----------------close la modale avec le clavier-----------------
window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeModal(e);
  }
});
//--------------------- validation du prénom-------------------
const inputFirstName = document.getElementById('first');
inputFirstName.addEventListener('input', function () {
  validName(inputFirstName);
});
function validName(inputFirstName) {
  const MessageErreurFirstName = document.getElementById('errorFirstname');
  const nameInputValue = inputFirstName.value;
  if (nameInputValue.length <= 2) {
    MessageErreurFirstName.style.display = 'inline';
    inputFirstName.focus();
    return false;
  } else if (nameInputValue.length >= 2) {
    MessageErreurFirstName.style.display = 'none';
    inputFirstName.focus();
    return true;
  }
}
//--------------------- validation du nom-------------------
const LastnameIputEvent =document.getElementById('lastName');
LastnameIputEvent.addEventListener('input', validLastname);
function validLastname (LastnameIputEvent) {
  const  MessageErreurLastname = document.getElementById('error-lastName');
  const lastnameValue = LastnameIputEvent.value;
  if (lastnameValue =='') {
    MessageErreurLastname.style.display = 'inline';
    LastnameIputEvent.focus();
    return false;
  } else {
    MessageErreurLastname.style.display = 'none';
    
    return true;
  }
};
// -------validation de mail ----------------------
const inputMail = document.getElementById('mail');
inputMail.addEventListener('input', function () {
  validMail();
});
function validMail(){
  const messageErrorMail = document.getElementById('errormail');
  const regEmail = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$',
    'g'
  );
  if (regEmail.test(inputMail.value)) {
    messageErrorMail.style.display = 'none';
    inputMail.focus();
    return true;
  } else if (!regEmail.test(inputMail.value)) {
    messageErrorMail.style.display = 'inline';
    inputMail.focus();
    return false;
  }
}
// --------------- validation commentaires
const inputCommit = document.getElementById('commit');
inputCommit.addEventListener('input', function () {
  validCommit();
});
function validCommit(){
  const messageErrorCommit= document.getElementById('errorcommit');
  const inputCommitValue = inputCommit.value;
  if (inputCommitValue.length <= 12) {
    messageErrorCommit.style.display = 'inline';
    inputCommit.focus();
    return false;
  } else if (inputCommitValue.length >= 12) {
    messageErrorCommit.style.display = 'none';
    inputCommit.focus();
    return true;
  }
}

const form = document.querySelector('form[name="reserve"]');//element pour l'envoi de formulaire
const successModal = document.getElementById('bground-success');
const confirmationValidation = document.getElementById('confirm-modal');
const btnSubmit = document.getElementById('btn-contact');

btnSubmit.addEventListener('click',validation);

function lunchModalSuccess(){
successModal.style.display='block';
//form.submit()
}
function validation () {
  let isOK = [];
  const inputFirstName = document.getElementById('first');
  const LastnameIputEvent =document.getElementById('lastName');
  const inputMail = document.getElementById('mail');
  const inputCommit = document.getElementById('commit');
  isOK.push(validName(inputFirstName));
  isOK.push(validLastname(LastnameIputEvent));
  isOK.push(validMail(inputMail));
  isOK.push(validCommit(inputCommit));
  console.log({'firstName':inputFirstName.value,'lastname':LastnameIputEvent.value,'mail':inputMail.value,'Message':inputCommit.value});
  if (isOK.includes(false)) {
    successModal.style.display='none';
    confirmationValidation.style.display = 'none';
  } else {
   lunchModalSuccess();
   confirmationValidation.style.display='block';

  }
};


form.addEventListener('submit', function (e) {
  e.preventDefault();
  validation();
});
setFocusOnlyInContainer('.modal','button[type="submit"]')



//Garder le focus uniquement dans les formulaires,
function setFocusOnlyInContainer(
  classContainer,
  classFirstElement,
  classLastElement,
) {
  document
    .querySelector(classContainer) //.modal
    .addEventListener('keydown', (event) => {
      //Si element change de place dans le container
      let firstElement = document.querySelector(classFirstElement);
      let lastElement = document.querySelector(classLastElement);
     
      let isTab = event.key == 'Tab' || event.keyCode == 9;
      if (event.shiftKey) {
        if (document.activeElement == firstElement) {
          firstElement.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement == lastElement) {
          lastElement.focus();
          event.preventDefault();
        }
      }
    });
}
