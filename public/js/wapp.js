var base_url = 'https://wa.me/528110741639?text=';
$(document).ready(function() {
    $('a.wapp-redirect').each(function(i, el) {
        var text = el.getAttribute('wapp-text');
        el.setAttribute('href', encodeURI(base_url + text));
    });
});
