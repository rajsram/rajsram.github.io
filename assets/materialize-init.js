function initMatComp() {
    initMatModal();
    initMatSlide();
    initMatCollapsible();
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
function initMatCollapsible() {
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems);
      });
}