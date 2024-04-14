
import storageModule from './localStorage';
import createModule from './createElements';


const {createRow, createNumber} = createModule;

const {setStorage, removeStorage, getStorage, changeStorage} = storageModule;


export const addNewRow = (newRow, list, number) => {
  list.append(createRow(newRow));
};

export const validateForm = (form, input, buttons) => {
  if (input.value === '') { // блокирует кнопку сохранить
    buttons[0].setAttribute('disabled', 'true');
  }
  input.addEventListener('input', e => {
    if (input.value === '') { // блокирует кнопку сохранить
      buttons[0].setAttribute('disabled', 'true');
    } else {
      buttons[0].removeAttribute('disabled');
    }
  });
};

export const formControl = (form, list, name, data, number, input, buttons) => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newRow = Object.fromEntries(formData);
    newRow.task = input.value;
    newRow.status = 'В процессе';
    newRow.id = Math.random().toString().substring(2, 10); // id
    data = getStorage(name);
    list.append(createRow(newRow, number = data.length));
    setStorage(name, newRow); // записывает контакт в localStorage
    form.reset(); // очищает инпут после отправки
    buttons[0].setAttribute('disabled', 'true');// блокирует кнопку сохранить
  });
};

// очищает инпут
export const cleanInput = (form, input, buttons) => {
  buttons[1].addEventListener('click', () => {
    input.value === '';
    buttons[0].setAttribute('disabled', 'true');
  });
};

// удаление
export const deleteModal = (list, data, name, num, number) => {
  list.addEventListener('click', e => {
    const target = e.target;
    const el = target.parentElement.parentElement.childNodes[0].id;

    if (target.classList.contains('btn-danger')) {
      target.closest('.table-light').remove();
      removeStorage(el, name); // удаляет контакт из localStorage
      createNumber(list, num); // перенумерация задач
    }
  });
};
// завершить задачу
export const completeModal = (list, data, name) => {
  list.addEventListener('click', e => {
    const target = e.target;
    const el = target.parentElement.parentElement.childNodes[0].id;

    if (target.classList.contains('btn-success')) {
      target.parentElement.parentElement.
          childNodes[1].style.textDecoration = 'line-through';
      target.parentElement.parentElement.
          childNodes[2].textContent = 'Выполнена';
      changeStorage(el, name); // изменяет контакт из localStorage
    }
  });
};


