const wypTable = document.querySelector('.tabela-wyp');
const deleteDialog = document.querySelector('#delete-dialog');
const selectedWypPesel = document.querySelector('#selected-wyp-editCena');
const selectedWypIdBroni = document.querySelector('#selected-wyp-id-broni');
const status = document.querySelector('#status');

let wypRowToDelete = null;

wypTable.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action="delete"]');
  if (!button || !wypTable.contains(button)) return;

  wypRowToDelete = button.closest('tr');
  const editCena = wypRowToDelete.querySelector('[data-wyp-editCena]').textContent.trim();
  const idBroni = wypRowToDelete.querySelector('[data-wyp-id-broni]').textContent.trim();

  selectedWypPesel.textContent = editCena;
  selectedWypIdBroni.textContent = idBroni;
  deleteDialog.returnValue = '';
  deleteDialog.showModal();
});

deleteDialog.addEventListener('close', () => {
  if (deleteDialog.returnValue === 'delete' && wypRowToDelete) {
    const editCena = wypRowToDelete.querySelector('[data-wyp-editCena]').textContent.trim();
    const idBroni = wypRowToDelete.querySelector('[data-wyp-id-broni]').textContent.trim();

    wypRowToDelete.remove();
    status.textContent = `Usunięto wypozyczenie klienta ${editCena} odnośnie broni o id ${idBroni}.`;
  }

  wypRowToDelete = null;
});

const form = document.querySelector('#wypForm');

const klient = document.querySelector('#klient');
const bron = document.querySelector('#bron');
const dataOd = document.querySelector('#data-od');
const dataDo = document.querySelector('#data-do');



form.addEventListener('submit', event => {

    event.preventDefault();

    clearErrors();
    
    const klientTekst = klient.value.trim();
    const bronTekst = bron.value.trim();

    const klientValid = validateSelectField(klient, 'klientError', 'klient');
    const bronValid = validateSelectField(bron, 'bronError', 'bron');
    const dataOdValid = validateDataField(dataOd, 'data-odError', 'data-od');
    const dataDoValid = validateDataField(dataDo, 'data-doError', 'data-do');

    const formValid =
        klientValid &&
        bronValid &&
        dataOdValid &&
        dataDoValid;

    if (formValid) {
        

        status.textContent = `Pomyślnie dodano wypozyczenie klienta: ${klientTekst} broni o id: ${bronTekst}.`;

        if (addWypDialog) {
            addWypDialog.close();
        }

        form.reset();
        successMessage.textContent = '';
    } else {
        successMessage.textContent = '';
    }
});

klient.addEventListener('blur', () => {
    clearFieldError(klient, 'klientError');
    validateSelectField(klient, 'klientError', 'klient');
});

bron.addEventListener('blur', () => {
    clearFieldError(bron, 'bronError');
    validateSelectField(bron, 'bronError', 'bron');
});

dataOd.addEventListener('blur', () => {
    clearFieldError(dataOd, 'data-odError');
    validateDataField(dataOd, 'data-odError', 'data-od');
});

dataOd.addEventListener('change', () => {
    if (dataOd.value) {
        dataDo.min = dataOd.value;
    }
});

dataDo.addEventListener('blur', () => {
    clearFieldError(dataDo, 'data-doError');
    validateDataField(dataDo, 'data-doError', 'data-do');
});

dataDo.addEventListener('change', () => {
    if (dataDo.value) {
        dataOd.max = dataDo.value;
    }
});

form.addEventListener('reset', () => {

    clearErrors();
    successMessage.textContent = '';
});

function validateSelectField(inputElement, errorIdElement, fieldName = 'Pole') {

    const value = inputElement.value;

    if (inputElement.validity.valueMissing || value === "") {

        showError(
            inputElement,
            errorIdElement,
            `${fieldName} jest wymagane.`
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
    
    clearFieldError(inputElement, errorIdElement);
    return true;  
}


function validateDataField(inputElement, errorIdElement, fieldName = 'Pole') {

    const value = inputElement.value;

    const selectedDate = new Date(value);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (inputElement.validity.valueMissing || value === "") {

        showError(
            inputElement,
            errorIdElement,
            `${fieldName} jest wymagane.`
        );

        return false;
    }

    else if (selectedDate < today) {
        showError(
            inputElement,
            errorIdElement,
            `${fieldName} nie może być wcześniejsza niż dzisiejsza data.`
        );
        return false;
    }

    else{
        clearFieldError(inputElement, errorIdElement);
        return true;  
    }
}

function validateDataEditField(inputElement, errorIdElement, fieldName = 'Pole') {

    const value = inputElement.value;
    
    if (inputElement.validity.valueMissing || value === "") {

        showError(
            inputElement,
            errorIdElement,
            `${fieldName} jest wymagane.`
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

const addWypButton = document.querySelector('.button-add-wyp');
const addWypDialog = document.querySelector('#add-wyp-dialog');
const cancelButton = document.querySelector('#anuluj');

if (addWypButton && addWypDialog) {
    addWypButton.addEventListener('click', () => {

        if (form) form.reset();
        clearErrors();
        
        addWypDialog.showModal();
    });
}

if (cancelButton && addWypDialog) {
    cancelButton.addEventListener('click', (event) => {

        event.preventDefault(); 
        
        addWypDialog.close();
    });
}

const editWypDialog = document.querySelector('#edit-wyp-dialog');
const cancelEditButton = document.querySelector('#editAnuluj');

wypTable.addEventListener('click', (event) => {
    const editButton = event.target.closest('button[data-action="edit"]');
    if (!editButton || !wypTable.contains(editButton)) return;
        
    if (editWypDialog) {
        clearErrors();
        editWypDialog.showModal();
    }
});

if (cancelEditButton && editWypDialog) {
    cancelEditButton.addEventListener('click', (event) => {

        event.preventDefault(); 
        
        editWypDialog.close();
    });
}

const editForm = document.querySelector('#editWypForm');

const editKlient = document.querySelector('#editKlient');
const editBron = document.querySelector('#editBron');
const editDataOd = document.querySelector('#editDataOd');
const editDataDo = document.querySelector('#editDataDo');
const editDataOddania = document.querySelector('#editDataOddania');
const editCena = document.querySelector('#editCena');



editForm.addEventListener('submit', event => {

    event.preventDefault();

    clearErrors();
    
    const editKlientTekst = editKlient.value.trim();
    const editBronTekst = editBron.value.trim();

    const editKlientValid = validateSelectField(editKlient, 'editKlientError', 'Klient');
    const editBronValid = validateSelectField(editBron, 'editBronError', 'Bron');
    const editDataOdValid = validateDataEditField(editDataOd, 'editDataOdError', 'DataOd');
    const editDataDoValid = validateDataEditField(editDataDo, 'editDataDoError', 'DataDo');
    const editDataOddaniaValid = validateCenaField(editDataOddania, 'editDataOddaniaError', 'DataOddania');
    const editCenaValid = validateCenaField(editCena, 'editCenaError', 'Cena');

    const editFormValid =
        editKlientValid &&
        editBronValid &&
        editDataOdValid &&
        editDataDoValid &&
        editDataOddaniaValid &&
        editCenaValid;

    if (editFormValid) {
        

        status.textContent = `Pomyślnie zedytowano wypożyczenie klienta: ${editKlientTekst} broni o id ${editBronTekst}.`;

        if (editWypDialog) {
            editWypDialog.close();
        }

        editForm.reset();
    }
});

editKlient.addEventListener('blur', () => {
    validateSelectField(editKlient, 'editKlientError', 'Klient');
});

editBron.addEventListener('blur', () => {
    validateSelectField(editBron, 'editBronError', 'Bron');
});

editDataOd.addEventListener('blur', () => {
    validateDataEditField(editDataOd, 'editDataOdError', 'DataOd');
});

editDataOd.addEventListener('change', () => {
    if (editDataOd.value) {
        editDataDo.min = editDataOd.value;
        editDataOddania.min = editDataOd.value;
    }
});

editDataDo.addEventListener('blur', () => {
    validateDataEditField(editDataDo, 'editDataDoError', 'DataDo');
});

editDataDo.addEventListener('change', () => {
    if (editDataDo.value) {
        editDataOd.max = editDataDo.value;
        editDataOddania.min = editDataDo.value;
    }
});

editDataOddania.addEventListener('blur', () => {
    validateCenaField(editDataOddania, 'editDataOddaniaError', 'DataOddania');
});

editDataOddania.addEventListener('change', () => {
    if (editDataOddania.value) {
        editDataDo.max = editDataOddania.value;
    }
});

editCena.addEventListener('blur', () => {
    validateCenaField(editCena, 'editCenaError', 'Cena');
});

editCena.addEventListener('input', () => {
    editCena.value = editCena.value.replace(/\D/g, '');
});

editForm.addEventListener('reset', () => {
    clearErrors();
});

let rowToEdit = null;

wypTable.addEventListener('click', (event) => {
  const editButton = event.target.closest('button[data-action="edit"]');
  if (!editButton || !wypTable.contains(editButton)) return;

  rowToEdit = editButton.closest('tr');

  const cells = rowToEdit.querySelectorAll('td');
  const KlientVal = rowToEdit.querySelector('[data-wyp-pesel]').textContent.trim();
  const BronVal = rowToEdit.querySelector('[data-wyp-id-broni]').textContent.trim();
  const DataOdVal = cells[2].textContent.trim();
  const DataDoVal = cells[3].textContent.trim();
  const DataOddaniaVal = cells[4].textContent.trim();
  const CenaVal = cells[5].textContent.trim();

  if (editKlient) editKlient.value = KlientVal;
  if (editBron) editBron.value = BronVal;
  if (editDataOd) editDataOd.value = formatDateForInput(DataOdVal);
  if (editDataDo) editDataDo.value = formatDateForInput(DataDoVal);
  if (editDataOddania) editDataOddania.value = formatDateForInput(DataOddaniaVal);
  if (editCena) editCena.value = CenaVal;

  if (editWypDialog) {
    clearErrors();
    editWypDialog.showModal();
    }
});

function formatDateForInput(dateStr) {
    if (!dateStr || dateStr.trim() === "") return "";
    const parts = dateStr.split('-');
    if (parts.length === 3 && parts[0].length === 2) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
}
