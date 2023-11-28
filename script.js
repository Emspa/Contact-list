function createContact() {
  let nameInput = document.getElementById('contact-name');
  let numberInput = document.getElementById('contact-number');
  let name = nameInput.value;
  let number = numberInput.value;

  if (name && number) {
    let listItem = contacts(name, number);
    document.getElementById('contact-list').appendChild(listItem);
    nameInput.value = '';
    numberInput.value = '';

    errorMessage('');
  } else {
    errorMessage('Får ej skapa tom kontakt');
  }
}


function contacts(name, number) {
  let listItem = document.createElement('li');
  listItem.innerHTML = `
    <input type="text" class="contact-item-name" value="${name}" disabled />
    <input type="text" class="contact-item-number" value="${number}" disabled />
    <button type="button" class="edit-contact">Ändra</button>
    <button type="button" class="delete-contact">Radera</button>
  `;
  return listItem;
}

function errorMessage(message) {
  let error = document.getElementById('error-message');
  error.innerHTML = message;

}


function editContacts(button) {
  let name = button.parentElement.querySelector('.contact-item-name');
  let number = button.parentElement.querySelector('.contact-item-number');

  if (button.textContent === 'Ändra') {
    name.removeAttribute('disabled');
    number.removeAttribute('disabled');
    button.textContent = 'Spara';
  } else if (button.textContent === 'Spara') {
    if (name.value && number.value) {
      name.setAttribute('disabled', 'true');
      number.setAttribute('disabled', 'true');
      button.textContent = 'Ändra';
      errorMessage(''); 
    } else {
      errorMessage('Får ej spara tom kontakt');
    }
  }
}



function deleteContact(button) {
  let listItem = button.parentNode;
  listItem.remove();
}

function deleteAllContacts() {
  let contactList = document.getElementById('contact-list');
  let listItems = contactList.querySelectorAll('li');

  for (let i = 0; i < listItems.length; i++) {
    contactList.removeChild(listItems[i]);
  }
}



document.getElementById('add-contact').addEventListener('click', createContact);

document.getElementById('contact-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-contact')) {
    deleteContact(e.target);
  } else if (e.target.classList.contains('edit-contact')) {
    editContacts(e.target);
  }
});

document.getElementById('delete-all-btn').addEventListener('click', deleteAllContacts);
