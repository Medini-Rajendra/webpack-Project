// import _ from 'lodash';
import './style.css';

class TodoList {
  constructor(desc, completed, index) {
    this.desc = desc;
    this.completed = completed;
    this.index = index;
  }

  static getList = () => JSON.parse(localStorage.getItem('list')) || [];

  static removeTask = (index) => {
    const listdel = TodoList.getList();
    const newlistdel = listdel.filter((ind) => ind.index !== index);
    if (newlistdel.length > 0) {
      let i = 1;
      newlistdel.forEach((element) => {
        element.index = i;
        i += 1;
      });
    }
    localStorage.setItem('list', JSON.stringify(newlistdel));
  }

  static updatetask = (task, e, description) => {
    if (e.target.checked) {
      task.completed = true;
      description.classList.add('done');
    } else {
      task.completed = false;
      description.classList.remove('done');
    }
    const oldList = JSON.parse(localStorage.getItem('list'));
    oldList.forEach((element) => {
      if (element.index === task.index) {
        element.completed = task.completed;
      }
    });
    localStorage.setItem('list', JSON.stringify(oldList));
  }

  static editTask = (task) => {
    const list = TodoList.getList();
    list.forEach((element) => {
      if (element.index === task.index) {
        element.desc = task.desc;
      }
    });
    localStorage.setItem('list', JSON.stringify(list));
  }

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
      TodoList.removeTask(task.index);
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
      TodoList.updatetask(task, e, title);
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
        TodoList.editTask(task);
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

  static clearAll = () => {
    const list = TodoList.getList();
    list.forEach((element) => {
      if (element.completed) {
        element.index = 0;
      }
    });
    const newList = list.filter((ind) => ind.index !== 0);
    if (newList.length > 0) {
      let i = 1;
      newList.forEach((element) => {
        element.index = i;
        i += 1;
      });
    }
    localStorage.setItem('list', JSON.stringify(newList));
    const allCheckboxes = Array.from(
      document.querySelectorAll('input[type="checkbox"]'),
    );
    allCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.parentNode.remove();
      }
    });
  };
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
  TodoList.clearAll();
});