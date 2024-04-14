
import {renderToDo, renderRows} from './js/render';
import storageModule from './js/localStorage';
import {formControl, validateForm, cleanInput,
  deleteModal, completeModal} from './js/eventHandling';
import createModule from './js/createElements';

import './css/bootstrap.min.css';

const {
  createRow,
  createNumber,
} = createModule;

const {
  getStorage,
} = storageModule;


{
  const init = (classApp, name) => {
    const appContainer = document.querySelector(classApp);
    appContainer.classList.add('vh-100', 'w-100', 'd-flex',
        'align-items-center', 'justify-content-center', 'flex-column');
    const {
      form,
      list,
    } = renderToDo(appContainer, name);
    const input = form.querySelector('input');
    const buttons = form.querySelectorAll('button');
    const num = list.querySelectorAll('tr');
    createNumber(list, num);
    validateForm(form, input, buttons);

    // Функционал
    const number = 0;
    const data = getStorage(name);
    createRow(data, number);
    console.log(data);

    renderRows(list, data);
    formControl(form, list, name, data, number, input, buttons);
    cleanInput(form, input, buttons);
    deleteModal(list, data, name, num);
    completeModal(list, data, name);
  };

  // window.toDoInit = init;

  const loadingFunction = () => {
    document.addEventListener('DOMContentLoaded', () => {
      let str = '';
      while (str === '') {
        str = prompt(`Привет! Для входа в программу ToDo ` +
            `необходима авторизация. Напиши свое имя.`, '');
      }
      if (str === null) {
        return;
      } else {
        const name = str;
        console.log(name);

        init('.app-container', `${name}`);
      }
    });
  };
  loadingFunction();
}

