
import createModule from './createElements';

const {
  createTitle,
  createButtonsGroup,
  createForm,
  createTable,
  createRow,
} = createModule;


export const renderToDo = (appContainer, name) => {
  const title = createTitle();
  const form = createForm();
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-danger me-1',
      type: 'button',
      text: 'Удалить',
    },
    {
      className: 'btn btn-success',
      type: 'button',
      text: 'Завершить',
    },
  ]);
  const tableWrapper = createTable();

  appContainer.append(title, form, tableWrapper);
  return {
    form,
    tableWrapper,
    btnDel: buttonGroup.btns[0],
    btnComplete: buttonGroup.btns[1],
    list: tableWrapper.table.tbody,
  };
};


export const renderRows = (elem, data, number) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);

  return allRow;
};

