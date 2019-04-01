import '../styles/styles.scss';

// url-loader test
// import pinIcon from '../assets/images/pin.png';
// var pinImg = document.getElementById('pin');
// pinImg.src = pinIcon;

// file-loader test
// import natureImage from '../assets/images/nature.jpg';
// var natureImg = document.getElementById('nature');
// natureImg.src = natureImage;

const getViewportWidth = () => window.innerWidth;

const breakpoints = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

function toggleMobileMenu() {
  if (window.matchMedia(`(min-width: ${breakpoints.sm})`).matches) {
    return;
  }

  const header = document.getElementsByClassName('s-header')[0];
  header.classList.contains('expanded') ?
    header.classList.remove('expanded') :
    header.classList.add('expanded');
}

window.toggleMobileMenu = toggleMobileMenu;

// Hide or show menu on ScrollUp/Down
let lastScroll = 0;
const header = document.getElementsByClassName('s-header')[0];
window.addEventListener('scroll', e => {
  const ws = window.scrollY;
  if (window.scrollY > 160 && ws > lastScroll) {
    // scroll up
    header.classList.add('s-header--hide');
    header.classList.remove('expanded');
  } else {
    header.classList.remove('s-header--hide'); // scroll down
    window.scrollY > 160 ?
      header.classList.add('s-header--scroll') :
      header.classList.remove('s-header--scroll');
  }
  lastScroll = ws <= 0 ? 0 : ws;
});

const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    const formData = new FormData(e.target);
    const json = JSON.stringify({
      from: formData.get('from'),
      remarks: formData.get('remarks')
    })

    fetch('https://sangoo.herokuapp.com/contact', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json,
      })
      .then(() => {
        document.getElementsByName('contact-form')[0].reset();
      })
      .catch(error => console.error(error));

    e.preventDefault()
  });
}