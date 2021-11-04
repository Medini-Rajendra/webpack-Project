const editTask = (task) => {
  const list = JSON.parse(localStorage.getItem('list'));
  list.forEach((element) => {
    if (element.index === task.index) {
      element.desc = task.desc;
    }
  });
  localStorage.setItem('list', JSON.stringify(list));
};

const updatetask = (task, e, description) => {
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
};

const removeTask = (index) => {
  const listdel = JSON.parse(localStorage.getItem('list'));
  const newlistdel = listdel.filter((ind) => ind.index !== index);
  if (newlistdel.length > 0) {
    let i = 1;
    newlistdel.forEach((element) => {
      element.index = i;
      i += 1;
    });
  }
  localStorage.setItem('list', JSON.stringify(newlistdel));
};

module.exports = { removeTask, updatetask, editTask };