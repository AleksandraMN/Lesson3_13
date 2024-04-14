

const getStorage = (name) => {
  const data = localStorage.getItem(`${name}`) ?
    JSON.parse(localStorage.getItem(`${name}`)) : [];
  return data;
};

const setStorage = (name, row) => {
  const data = getStorage(`${name}`);
  data.push(row);
  localStorage.setItem(`${name}`, JSON.stringify(data));
};

const removeStorage = (el, name) => {
  const data = getStorage(`${name}`);

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === `${el}`) {
      data.splice(i, 1);
    }
  }
  localStorage.setItem(`${name}`, JSON.stringify(data));
};

const changeStorage = (el, name) => {
  const data = getStorage(`${name}`);

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === `${el}`) {
      data[i].status = 'Выполнена';
    }
  }
  localStorage.setItem(`${name}`, JSON.stringify(data));
};

export default {
  getStorage,
  setStorage,
  removeStorage,
  changeStorage,
};
