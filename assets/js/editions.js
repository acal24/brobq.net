(() => {
  const dialog = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const close = document.getElementById('close-lightbox');
  document.querySelectorAll('.photo-button img').forEach((img) => {
    img.closest('button').addEventListener('click', () => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      dialog.showModal();
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
})();