// Saves options to chrome.storage
function save_options() {
  var romaji = document.getElementById('romaji').checked;
  var n5 = document.getElementById('n5').checked;
  var n4 = document.getElementById('n4').checked;
  var n3 = document.getElementById('n3').checked;
  var n2 = document.getElementById('n2').checked;
  var n1 = document.getElementById('n1').checked;
  chrome.storage.sync.set({
    showRomaji: romaji,
    n5: n5,
    n4: n4,
    n3: n3,
    n2: n2,
    n1: n1,
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
    showRomaji: false,
    n5: true,
    n4: false,
    n3: false,
    n2: false,
    n1: false,
  }, function(items) {
    document.getElementById('romaji').checked = items.showRomaji;
    document.getElementById('n5').checked = items.n5;
    document.getElementById('n4').checked = items.n4;
    document.getElementById('n3').checked = items.n3;
    document.getElementById('n2').checked = items.n2;
    document.getElementById('n1').checked = items.n1;
  });

  $("#save").click(function(event) {
    save_options();
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
