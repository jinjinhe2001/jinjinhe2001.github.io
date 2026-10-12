// Respect reduced-motion: do not autoplay the generation video; the player controls stay available.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const video = document.getElementById('generation-video');
function applyMotionPreference() {
  if (motionPreference.matches) {
    video.removeAttribute('autoplay');
    video.pause();
  }
}
motionPreference.addEventListener('change', applyMotionPreference);
applyMotionPreference();

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
