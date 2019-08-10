function initMatComp() {
    initMatModal();
    initMatSlide();
  }
  function initMatModal() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.modal');
      M.Modal.init(elems);
    });
  }
  function initMatSlide() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.sidenav');
      M.Sidenav.init(elems);
    });
  }