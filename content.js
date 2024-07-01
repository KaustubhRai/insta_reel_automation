let actionButton = null;

function addSingleActionButton() {
  if (!actionButton) {
    actionButton = document.createElement('button');
    actionButton.className = 'custom-action-button';
    actionButton.textContent = 'Action';
    actionButton.addEventListener('click', handleButtonClick);
    document.body.appendChild(actionButton);
  }
}

function handleButtonClick(event) {
  console.log('Side Action button clicked!');
  // Add your custom action here
  clickThreeDotMenu()
    .then(() => clickReportButton())
    .then(() => clickSpamButton())
    .then(() => clickCloseButton())
    .catch(err => console.error('Error:', err));
}

function clickThreeDotMenu() {
    return new Promise((resolve, reject) => {
      const threeDotButton = document.querySelector('svg[aria-label="More"]').parentElement;
      if (threeDotButton) {
        threeDotButton.click();
        resolve();
      } else {
        reject('Three dot menu button not found.');
      }
    });
  }
  
function clickReportButton() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const reportButton = Array.from(document.querySelectorAll('span'))
        .find(span => span.textContent === 'Report');
      if (reportButton) {
        reportButton.click();
        resolve();
      } else {
        reject('Report button not found.');
      }
    }, 500); // Delay to ensure the menu is open
  });
}
  
function clickSpamButton() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const spamButton = Array.from(document.querySelectorAll('div'))
        .find(div => div.textContent === "It's spam");
      if (spamButton) {
        spamButton.click();
        resolve();
      } else {
        reject('Spam button not found.');
      }
    }, 700); // Delay to ensure the report menu is open
  });
}

function clickCloseButton() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const closeButton = Array.from(document.querySelectorAll('button'))
        .find(button => button.textContent === 'Close');
      if (closeButton) {
        closeButton.click();
        resolve();
      } else {
        reject('Close button not found.');
      }
    }, 3000); // Delay to ensure the spam confirmation dialog is open
  });
}

// Remove any action buttons from reels
function removeReelButtons() {
  const reelButtons = document.querySelectorAll('button:not(.custom-action-button)');
  reelButtons.forEach(button => {
    if (button.textContent.toLowerCase() === 'action') {
      button.remove();
    }
  });
}

// Run the functions
addSingleActionButton();

// Use MutationObserver to watch for DOM changes
const observer = new MutationObserver(() => {
  removeReelButtons();
  if (!document.body.contains(actionButton)) {
    addSingleActionButton();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Clean up on unload
window.addEventListener('unload', () => {
  observer.disconnect();
}, { once: true });