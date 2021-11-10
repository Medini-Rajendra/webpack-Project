// import _ from 'lodash';
import './style.css';

const listModuleimport = require('./callmodules.js');
const clearModuleimport = require('./removeall.js');

class TodoList {
  constructor(desc, completed, index) {
    this.desc = desc;
    this.completed = completed;
    this.index = index;
  }

  static getList = () => JSON.parse(localStorage.getItem('list')) || [];

  static newTask = (task) => {
    const listcontain = document.createElement('div');
    const title = document.createElement('h6');
    const chkbox = document.createElement('input');
    const remicon = document.createElement('i');
    listcontain.setAttribute('class', 'mb-2 mt-2 mx-3 d-flex flex-row');
    chkbox.setAttribute('class', 'mt-2');
    title.setAttribute('class', 'mt-1 px-2');
    remicon.className = 'mt-2 fas fa-trash-alt';
    remicon.classList.add('invisible');
    document.querySelector('.list-complete').insertBefore(listcontain, document.querySelector('.list-complete').firstChild);
    chkbox.type = 'checkbox';
    chkbox.name = 'chkboxlist';
    remicon.addEventListener('click', (e) => {
      listModuleimport.removeTask(task.index);
      e.target.parentNode.remove();
    });

    if (task.completed === true) {
      chkbox.checked = true;
      title.classList.add('done');
    } else {
      chkbox.checked = false;
      title.classList.remove('done');
    }
    chkbox.addEventListener('change', (e) => {
      listModuleimport.updatetask(task, e, title);
    });
    listcontain.appendChild(chkbox);
    listcontain.appendChild(title);
    listcontain.appendChild(remicon);
    document.querySelector('#listinputid').value = '';
    listcontain.addEventListener('mouseenter', () => {
      remicon.classList.remove('invisible');
    });
    listcontain.addEventListener('mouseleave', () => {
      remicon.classList.add('invisible');
    });
    title.innerText = task.desc;
    title.addEventListener('click', () => {
      title.setAttribute('contenteditable', 'true');
      title.addEventListener('keyup', () => {
        task.desc = title.innerText;
        listModuleimport.editTask(task);
      });
    });
  };

  static itertasks = () => {
    const getnewchk = JSON.parse(localStorage.getItem('list'));
    if (getnewchk !== null) {
      const list = JSON.parse(localStorage.getItem('list'));
      list.forEach((task) => {
        TodoList.newTask(task);
      });
    }
  }
}

const moveList = () => {
  const list = TodoList.getList();
  if (list.length >= 2) {
    let indval = list[0].index;
    for (let i = 1; i < list.length; i += 1) {
      if (list[i].index > indval) {
        indval = list[i].index;
      } else {
        const temp = list[i];
        list[i] = list[i - 1];
        list[i - 1] = temp;
      }
    }
  }
  localStorage.setItem('list', JSON.stringify(list));
};

const renderList = () => {
  moveList();
  TodoList.itertasks();
};
renderList();

const renderTask = () => {
  const list = JSON.parse(localStorage.getItem('list'));
  const inputText = document.querySelector('#listinputid').value;
  let index;
  if (list.length > 0) index = list[list.length - 1].index + 1;
  else index = 1;
  const tasky = new TodoList(inputText, false, index);
  const getlist = TodoList.getList();
  getlist.push(tasky);
  localStorage.setItem('list', JSON.stringify(getlist));
  TodoList.newTask(tasky);
};

document.querySelector('#submiticon').addEventListener('click', (e) => {
  const inptext = document.querySelector('#listinputid').value.trim();
  if (!inptext) {
    e.stopImmediatePropagation();
    return false;
  }
  renderTask();
  return true;
});

document.querySelector('#submiticon').addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    const value = document.querySelector('#listinputid').value.trim();
    if (!value) {
      e.stopImmediatePropagation();
      return false;
    }
    renderTask();
  }
  return true;
});

document.querySelector('.clearbutton').addEventListener('click', () => {
  clearModuleimport.clearAll();
});
