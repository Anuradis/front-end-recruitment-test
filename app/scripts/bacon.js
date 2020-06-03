const baconBtn = document.querySelector('.bacon-btn');
const sectionCenter = document.querySelector('.section--bacon');

const addMoreBacon = () => {
  const baconImg = document.createElement('img')
  baconImg.setAttribute('alt', 'Bacon');
  baconImg.setAttribute('src', 'http://media.washtimes.com.s3.amazonaws.com/media/image/2015/02/23/bacon.jpg');
  baconImg.style.width = '100%';
  baconImg.style.height = '100%';
  sectionCenter.appendChild(baconImg);
}

baconBtn.addEventListener('click', addMoreBacon)
