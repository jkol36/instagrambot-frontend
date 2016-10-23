function goToByScroll(section_id) {
  $("html, body").animate({
    scrollTop: $(section_id).offset().top - 50},
    'slow');
}

$(".scroll-to-link").on("click", function(e) {
  e.preventDefault();
  goToByScroll("#" + $(this).attr('target-section'));
});

function scrollIfHash() {
  if (window.location.hash) {
    goToByScroll(window.location.hash);
  }
}    
