const form = document.querySelector('#klientForm');

const imie = document.querySelector('#imie');
const nazwisko = document.querySelector('#nazwisko');
const pesel = document.querySelector('#pesel');
const numer = document.querySelector('#numer');



form.addEventListener('submit', event => {

    event.preventDefault();

    clearErrors();
    
    const imieTekst = imie.value.trim();
    const nazwiskoTekst = nazwisko.value.trim();

    const imieValid = validateTextField(imie, 'imieError', 'imie');
    const nazwiskoValid = validateTextField(nazwisko, 'nazwiskoError', 'nazwisko');
    const peselValid = validatePeselField(pesel, 'peselError', 'pesel');
    const numerValid = validateNumerField(numer, 'numerError', 'numer');

    const formValid =
        imieValid &&
        nazwiskoValid &&
        peselValid &&
        numerValid;

    if (formValid) {
        

        status.textContent = `Pomyślnie dodano klienta: ${imieTekst} ${nazwiskoTekst}.`;

        if (addKlientDialog) {
            addKlientDialog.close();
        }

        form.reset();
        successMessage.textContent = '';
    } else {
        successMessage.textContent = '';
    }
});

imie.addEventListener('blur', () => {
    clearFieldError(imie, 'imieError');
    validateTextField(imie, 'imieError', 'imie');
});

nazwisko.addEventListener('blur', () => {
    clearFieldError(nazwisko, 'nazwiskoError');
    validateTextField(nazwisko, 'nazwiskoError', 'nazwisko');
});

pesel.addEventListener('blur', () => {
    clearFieldError(pesel, 'peselError');
    validatePeselField(pesel, 'peselError', 'pesel');
});

pesel.addEventListener('input', () => {
    pesel.value = pesel.value.replace(/\D/g, '');
});

numer.addEventListener('blur', () => {
    clearFieldError(numer, 'numerError');
    validateNumerField(numer, 'numerError', 'numer');
});

numer.addEventListener('input', () => {
    numer.value = numer.value.replace(/\D/g, '');
});


form.addEventListener('reset', () => {

    clearErrors();
    successMessage.textContent = '';
});


function validateTextField(inputElement, errorIdElement, fieldName = 'Pole') {

    inputElement.value = inputElement.value.trim();
    const value = inputElement.value;

    if (inputElement.validity.valueMissing || value === "") {

        showError(
            inputElement,
            errorIdElement,
            `${fieldName} jest wymagane.`
        );

        return false;
    }

    else if (value.length < 2) {

        showError(
            inputElement,
            errorIdElement,
            `${fieldName} musi zawierać co najmniej 2 znaki.`
        );

        return false;
    }

    else if (value.length > 50) {

        showError(
            inputElement,
            errorIdElement,
            `${fieldName} może zawierać maksymalnie 50 znaków.`
        );

        return false;
    }
    else{
        clearFieldError(inputElement, errorIdElement);
        return true;  
    }

}

function validatePeselField(inputElement, errorIdElement, fieldName = 'Pole') {

    inputElement.value = inputElement.value.trim();
    const value = inputElement.value;

    if (inputElement.validity.valueMissing || value === "") {

        showError(
            inputElement,
            errorIdElement,
            `${fieldName} jest wymagane.`
        );

        return false;
    }

    else if (value.length < 11) {

        showError(
            inputElement,
            errorIdElement,
            `${fieldName} musi zawierać co najmniej 11 znaki.`
        );

        return false;
    }

    else if (value.length > 11) {

        showError(
            inputElement,
            errorIdElement,
            `${fieldName} może zawierać maksymalnie 11 znaków.`
        );

        return false;
    }
    else{
        clearFieldError(inputElement, errorIdElement);
        return true;  
    }
}

function validateNumerField(inputElement, errorIdElement, fieldName = 'Pole') {

    inputElement.value = inputElement.value.trim();
    const value = inputElement.value;

    if (inputElement.validity.valueMissing || value === "") {

        showError(
            inputElement,
            errorIdElement,
            `${fieldName} jest wymagane.`
        );

        return false;
    }

    else if (value.length < 9) {

        showError(
            inputElement,
            errorIdElement,
            `${fieldName} musi zawierać co najmniej 9 znaki.`
        );

        return false;
    }

    else if (value.length > 9) {

        showError(
            inputElement,
            errorIdElement,
            `${fieldName} może zawierać maksymalnie 9 znaków.`
        );

        return false;
    }
    else{
        clearFieldError(inputElement, errorIdElement);
        return true;  
    }
}


function showError(input, errorId, message) {

    const error = document.querySelector(`#${errorId}`);

    error.textContent = message;

    input.classList.add('invalid');

    input.setAttribute(
        'aria-invalid',
        'true'
    );
}


function clearFieldError(input, errorId) {

    const error = document.querySelector(`#${errorId}`);

    error.textContent = '';

    input.classList.remove('invalid');

    input.removeAttribute('aria-invalid');
}


function clearErrors() {

    document
        .querySelectorAll('.error')
        .forEach(error => {
            error.textContent = '';
        });

    document
        .querySelectorAll('.invalid')
        .forEach(input => {

            input.classList.remove('invalid');

            input.removeAttribute(
                'aria-invalid'
            );
        });
}


const studentsTable = document.querySelector('#tabela-klientow');
const deleteDialog = document.querySelector('#delete-dialog');
const selectedKlientName = document.querySelector('#selected-klient-name');
const status = document.querySelector('#status');

let studentRowToDelete = null;

// Delegacja zdarzenia: jedna obsługa kliknięć dla wszystkich przycisków „Usuń”.
studentsTable.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action="delete"]');
  if (!button || !studentsTable.contains(button)) return;

  studentRowToDelete = button.closest('tr');
  const imie = studentRowToDelete.querySelector('[data-klient-name]').textContent.trim();
  const nazwisko = studentRowToDelete.querySelector('[data-klient-surname]').textContent.trim();
  const fullName = `${imie} ${nazwisko}`;

  selectedKlientName.textContent = fullName; // Bezpiecznie: nie interpretujemy HTML.
  deleteDialog.returnValue = '';          // Czyścimy wynik poprzedniego otwarcia.
  deleteDialog.showModal();               // Pokaż modalne okno dialogowe.
});

deleteDialog.addEventListener('close', () => {
  if (deleteDialog.returnValue === 'delete' && studentRowToDelete) {
    const imie = studentRowToDelete.querySelector('[data-klient-name]').textContent.trim();
    const nazwisko = studentRowToDelete.querySelector('[data-klient-surname]').textContent.trim();
    const fullName = `${imie} ${nazwisko}`;
    studentRowToDelete.remove();
    status.textContent = `Usunięto studenta: ${fullName}.`;
  }

  studentRowToDelete = null;
});

const addKlientButton = document.querySelector('.button-add-klient');
const addKlientDialog = document.querySelector('#add-klient-dialog');
const cancelButton = document.querySelector('#anuluj');

if (addKlientButton && addKlientDialog) {
    addKlientButton.addEventListener('click', () => {

        if (form) form.reset();
        clearErrors();
        
        addKlientDialog.showModal();
    });
}

if (cancelButton && addKlientDialog) {
    cancelButton.addEventListener('click', (event) => {

        event.preventDefault(); 
        
        addKlientDialog.close();
    });
}

const editKlientDialog = document.querySelector('#edit-klient-dialog');
const cancelEditButton = document.querySelector('#editAnuluj');

studentsTable.addEventListener('click', (event) => {
    const editButton = event.target.closest('button[data-action="edit"]');
    if (!editButton || !studentsTable.contains(editButton)) return;
        
    if (editKlientDialog) {
        clearErrors();
        editKlientDialog.showModal();
    }
});

if (cancelEditButton && editKlientDialog) {
    cancelEditButton.addEventListener('click', (event) => {

        event.preventDefault(); 
        
        editKlientDialog.close();
    });
}

const editForm = document.querySelector('#editKlientForm');

const editImie = document.querySelector('#editImie');
const editNazwisko = document.querySelector('#editNazwisko');
const editPesel = document.querySelector('#editPesel');
const editNumer = document.querySelector('#editNumer');



editForm.addEventListener('submit', event => {

    event.preventDefault();

    clearErrors();
    
    const editImieTekst = editImie.value.trim();
    const editNazwiskoTekst = editNazwisko.value.trim();

    const editImieValid = validateTextField(editImie, 'editImieError', 'Imie');
    const editNazwiskoValid = validateTextField(editNazwisko, 'editNazwiskoError', 'Nazwisko');
    const editPeselValid = validatePeselField(editPesel, 'editPeselError', 'Pesel');
    const editNumerValid = validateNumerField(editNumer, 'editNumerError', 'Numer');

    const editFormValid =
        editImieValid &&
        editNazwiskoValid &&
        editPeselValid &&
        editNumerValid;

    if (editFormValid) {
        

        status.textContent = `Pomyślnie zedytowano klienta: ${editImieTekst} ${editNazwiskoTekst}.`;

        if (editKlientDialog) {
            editKlientDialog.close();
        }

        editForm.reset();
    }
});

editImie.addEventListener('blur', () => {
    validateTextField(editImie, 'editImieError', 'Imię');
});

editNazwisko.addEventListener('blur', () => {
    validateTextField(editNazwisko, 'editNazwiskoError', 'Nazwisko');
});

editPesel.addEventListener('blur', () => {
    validatePeselField(editPesel, 'editPeselError', 'PESEL');
});

editPesel.addEventListener('input', () => {
    editPesel.value = editPesel.value.replace(/\D/g, '');
});

editNumer.addEventListener('blur', () => {
    validateNumerField(editNumer, 'editNumerError', 'Numer telefonu');
});

editNumer.addEventListener('input', () => {
    editNumer.value = editNumer.value.replace(/\D/g, '');
});

editForm.addEventListener('reset', () => {
    clearErrors();
});

let rowToEdit = null;

studentsTable.addEventListener('click', (event) => {
  const editButton = event.target.closest('button[data-action="edit"]');
  if (!editButton || !studentsTable.contains(editButton)) return;

  rowToEdit = editButton.closest('tr');

  const cells = rowToEdit.querySelectorAll('td');
  const peselVal = cells[0].textContent.trim();
  const imieVal = rowToEdit.querySelector('[data-klient-name]').textContent.trim();
  const nazwiskoVal = rowToEdit.querySelector('[data-klient-surname]').textContent.trim();
  const numerVal = cells[3].textContent.trim();

  if (editImie) editImie.value = imieVal;
  if (editNazwisko) editNazwisko.value = nazwiskoVal;
  if (editPesel) editPesel.value = peselVal;
  if (editNumer) editNumer.value = numerVal;

  if (editKlientDialog) {
    clearErrors();
    editKlientDialog.showModal();
    }
});