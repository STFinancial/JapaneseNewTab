// Saves options to chrome.storage
function save_options() {
  var romaji = document.getElementById('romaji').checked;
  chrome.storage.sync.set({
    showRomaji: romaji,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value showRomaji = false.
  chrome.storage.sync.get({
    showRomaji: false
  }, function(items) {
    document.getElementById('romaji').checked = items.showRomaji;
  });

  $("#save").click(function(event) {
    save_options();
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
