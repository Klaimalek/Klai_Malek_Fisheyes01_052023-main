function initModalContact() {
  const btnContact = document.getElementsByClassName('contact_button').focus();
  btnContact[0].addEventListener('click', launchModal);
}
//------------------- launch modal form------------------------
function launchModal(photographer) {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  main.setAttribute('aria-hidden', false);
  modal.setAttribute('aria-hidden', true);
  btnclose.focus();
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
  if (lastnameValue.length <= 2) {
    MessageErreurLastname.style.display = 'inline';
    LastnameIputEvent.focus();
    return false;
  } else if (lastnameValue.length >= 2) {
    MessageErreurLastname.style.display = 'none';
    LastnameIputEvent.focus();
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

  isOK.push(validName(inputFirstName));
  isOK.push(validLastname(LastnameIputEvent));
  isOK.push(validMail(inputMail));
  isOK.push(validCommit(inputCommit));
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

