const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const animationToggle = document.getElementById('animation-toggle');
const stillSource = document.getElementById('poem-still');
const poemImage = document.getElementById('poem-image');
let paused = motionPreference.matches;

function updateAnimation() {
  stillSource.media = paused ? 'all' : 'not all';
  poemImage.src = paused ? 'static/images/poem-poster.webp' : 'static/images/chunjiang-long.gif';
  animationToggle.textContent = paused ? 'Play animation' : 'Pause animation';
}

animationToggle.hidden = false;
animationToggle.addEventListener('click', () => {
  paused = !paused;
  updateAnimation();
});
motionPreference.addEventListener('change', (event) => {
  paused = event.matches;
  updateAnimation();
});
updateAnimation();

const copyButton = document.getElementById('copy-bibtex');
const copyStatus = document.getElementById('copy-status');
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.getElementById('citation').textContent);
    copyStatus.textContent = 'Citation copied.';
  } catch {
    copyStatus.textContent = 'Please select and copy the citation above.';
  }
});
