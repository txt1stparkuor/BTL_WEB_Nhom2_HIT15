document.addEventListener('DOMContentLoaded', function () {
    fetch('../../components/footer/index.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
            const footerScript = document.createElement('script');
            footerScript.src = '../../components/footer/script.js';
            document.body.appendChild(footerScript);
        });
})

