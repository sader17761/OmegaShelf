$(document).ready(function() {
  $(window).scroll(function() {
    var scrollCount = $(this).scrollTop();
    $('.sideBar').css({
      'transform': 'translate(0px, ' + scrollCount + 'px)'
    });
  });
});
