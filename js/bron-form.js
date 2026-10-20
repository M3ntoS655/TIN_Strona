const bronTable = document.querySelector('.tabela-broni');
const deleteDialog = document.querySelector('#delete-dialog');
const selectedBronModel = document.querySelector('#selected-bron-model');
const status = document.querySelector('#status');

let bronRowToDelete = null;

bronTable.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action="delete"]');
  if (!button || !bronTable.contains(button)) return;

  bronRowToDelete = button.closest('tr');
  const model = bronRowToDelete.querySelector('[data-bron-model]').textContent.trim();

  selectedBronModel.textContent = model;
  deleteDialog.returnValue = '';
  deleteDialog.showModal();
});

deleteDialog.addEventListener('close', () => {
  if (deleteDialog.returnValue === 'delete' && bronRowToDelete) {
    const model = bronRowToDelete.querySelector('[data-bron-model]').textContent.trim();

    bronRowToDelete.remove();
    status.textContent = `Usunięto broń: ${model}.`;
  }

  bronRowToDelete = null;
});

const form = document.querySelector('#bronForm');

const typ = document.querySelector('#typ');
const model = document.querySelector('#model');
const kolor = document.querySelector('#kolor');
const cena = document.querySelector('#cena');



form.addEventListener('submit', event => {

    event.preventDefault();

    clearErrors();
    
    const modelTekst = model.value.trim();

    const typValid = validateTextField(typ, 'typError', 'typ');
    const modelValid = validateTextField(model, 'modelError', 'model');
    const kolorValid = validateTextField(kolor, 'kolorError', 'kolor');
    const cenaValid = validateCenaField(cena, 'cenaError', 'cena');

    const formValid =
        typValid &&
        modelValid &&
        kolorValid &&
        cenaValid;

    if (formValid) {
        

        status.textContent = `Pomyślnie dodano broń: ${modelTekst}.`;

        if (addBronDialog) {
            addBronDialog.close();
        }

        form.reset();
        successMessage.textContent = '';
    } else {
        successMessage.textContent = '';
    }
});

typ.addEventListener('blur', () => {
    clearFieldError(typ, 'typError');
    validateTextField(typ, 'typError', 'typ');
});

model.addEventListener('blur', () => {
    clearFieldError(model, 'modelError');
    validateTextField(model, 'modelError', 'model');
});

kolor.addEventListener('blur', () => {
    clearFieldError(kolor, 'kolorError');
    validateTextField(kolor, 'kolorError', 'kolor');
});

cena.addEventListener('blur', () => {
    clearFieldError(cena, 'cenaError');
    validateCenaField(cena, 'cenaError', 'cena');
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


function validateCenaField(inputElement, errorIdElement, fieldName = 'Pole') {

    inputElement.value = inputElement.value.trim();
    const value = inputElement.value;
    const numValue = parseFloat(value);

    if (inputElement.validity.valueMissing || value === "") {

        showError(
            inputElement,
            errorIdElement,
            `${fieldName} jest wymagane.`
        );

        return false;
    }

    else if (isNaN(numValue) || numValue < 0) {

        showError(
            inputElement,
            errorIdElement,
            `${fieldName} musi być poprawną liczbą większą lub równą 0.`
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

const addBronButton = document.querySelector('.button-add-bron');
const addBronDialog = document.querySelector('#add-bron-dialog');
const cancelButton = document.querySelector('#anuluj');

if (addBronButton && addBronDialog) {
    addBronButton.addEventListener('click', () => {

        if (form) form.reset();
        clearErrors();
        
        addBronDialog.showModal();
    });
}

if (cancelButton && addBronDialog) {
    cancelButton.addEventListener('click', (event) => {

        event.preventDefault(); 
        
        addBronDialog.close();
    });
}

const editBronDialog = document.querySelector('#edit-bron-dialog');
const cancelEditButton = document.querySelector('#editAnuluj');

bronTable.addEventListener('click', (event) => {
    const editButton = event.target.closest('button[data-action="edit"]');
    if (!editButton || !bronTable.contains(editButton)) return;
        
    if (editBronDialog) {
        clearErrors();
        editBronDialog.showModal();
    }
});

if (cancelEditButton && editBronDialog) {
    cancelEditButton.addEventListener('click', (event) => {

        event.preventDefault(); 
        
        editBronDialog.close();
    });
}

const editForm = document.querySelector('#editBronForm');

const editTyp = document.querySelector('#editTyp');
const editModel = document.querySelector('#editModel');
const editKolor = document.querySelector('#editKolor');
const editCena = document.querySelector('#editCena');



editForm.addEventListener('submit', event => {

    event.preventDefault();

    clearErrors();
    
    const editModelTekst = editModel.value.trim();

    const editTypValid = validateTextField(editTyp, 'editTypError', 'Typ');
    const editModelValid = validateTextField(editModel, 'editModelError', 'Model');
    const editKolorValid = validateTextField(editKolor, 'editKolorError', 'Kolor');
    const editCenaValid = validateCenaField(editCena, 'editCenaError', 'Cena');

    const editFormValid =
        editTypValid &&
        editModelValid &&
        editKolorValid &&
        editCenaValid;

    if (editFormValid) {
        

        status.textContent = `Pomyślnie zedytowano broń: ${editModelTekst}.`;

        if (editBronDialog) {
            editBronDialog.close();
        }

        editForm.reset();
    }
});

editTyp.addEventListener('blur', () => {
    validateTextField(editTyp, 'editTypError', 'Typ');
});

editModel.addEventListener('blur', () => {
    validateTextField(editModel, 'editModelError', 'Model');
});

editKolor.addEventListener('blur', () => {
    validateTextField(editKolor, 'editKolorError', 'Kolor');
});


editCena.addEventListener('blur', () => {
    validateCenaField(editCena, 'editCenaError', 'Cena');
});

editForm.addEventListener('reset', () => {
    clearErrors();
});

let rowToEdit = null;

bronTable.addEventListener('click', (event) => {
  const editButton = event.target.closest('button[data-action="edit"]');
  if (!editButton || !bronTable.contains(editButton)) return;

  rowToEdit = editButton.closest('tr');

  const cells = rowToEdit.querySelectorAll('td');
  const typVal = rowToEdit.querySelector('[data-bron-typ]').textContent.trim();
  const modelVal = rowToEdit.querySelector('[data-bron-model]').textContent.trim();
  const kolorVal = rowToEdit.querySelector('[data-bron-kolor]').textContent.trim();
  const cenaVal = cells[4].textContent.trim();

  if (editTyp) editTyp.value = typVal;
  if (editModel) editModel.value = modelVal;
  if (editKolor) editKolor.value = kolorVal;
  if (editCena) editCena.value = cenaVal;

  if (editBronDialog) {
    clearErrors();
    editBronDialog.showModal();
    }
});