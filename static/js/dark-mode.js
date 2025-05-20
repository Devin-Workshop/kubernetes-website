/* handle dark/light mode for the entire site */
jQuery(function($) {
  function getUserPreference() {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return 'auto';
  }

  function setTheme(theme) {
    localStorage.setItem('theme', theme);
    
    $('body').removeClass('theme-dark theme-light theme-auto');
    
    $('body').addClass('theme-' + theme);
    
    $('.switch-theme').attr('data-theme', theme);
  }

  function createToggleButton() {
    let currentTheme = getUserPreference();
    let button = $('<button class="btn switch-theme" data-theme="' + currentTheme + '" aria-label="Toggle dark/light mode"><i class="fas fa-moon"></i></button>');
    
    $('.navbar-nav').append(
      $('<li class="nav-item mr-4 mb-2 mb-lg-0">').append(button)
    );
    
    button.show();
    
    button.on('click', function() {
      let currentTheme = $(this).attr('data-theme');
      let newTheme = currentTheme === 'dark' ? 'light' : 
                    currentTheme === 'light' ? 'auto' : 'dark';
      setTheme(newTheme);
    });
  }

  function initTheme() {
    let savedTheme = getUserPreference();
    
    if (savedTheme === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      $('body').addClass('theme-auto theme-dark');
    } else {
      $('body').addClass('theme-' + savedTheme);
    }
    
    createToggleButton();
    
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (getUserPreference() === 'auto') {
          $('body').toggleClass('theme-dark', e.matches);
        }
      });
    }
  }

  initTheme();
});
