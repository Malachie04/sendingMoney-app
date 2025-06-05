


document.addEventListener('DOMContentLoaded', () => {
  const id = localStorage.getItem('selectedId');
  if (!id) return;

  const data = JSON.parse(localStorage.getItem(id));

  if (data) {
    document.querySelector('.imagedupopup').src = data[1];   
    document.querySelector('.title-de-la-serie').textContent = data[0];
    document.querySelector('.overview').textContent = data[3];
  }
});
