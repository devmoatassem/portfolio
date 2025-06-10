window.addEventListener('DOMContentLoaded', function () {
    // Fetch the text file
    fetch('about.txt')
      .then(response => response.text())
      .then(data => {
        // Update the HTML content with the file content
        var fileContentElement = document.getElementById('file-content');
        fileContentElement.textContent = data;
      })
      .catch(error => {
        console.log('Error:', error);
      });
  });
  