function loadRepos() {
   fetch('https://api.github.com/users/testnakov/repos')
      .then(res => res.text())
      .then(data => {
         const output = document.getElementById('res');
         output.textContent = data;
      }
);
}