const clearAll = () => {
  const list = JSON.parse(localStorage.getItem('list'));
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

module.exports = { clearAll };