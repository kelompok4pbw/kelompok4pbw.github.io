document.addEventListener('DOMContentLoaded', function () {
    // Initialize Materialize components
    M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), { coverTrigger: false});
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
    // Function to add or remove materialboxed class from all images
    function toggleMaterialboxed(add) {
        document.querySelectorAll('.komik img').forEach(img => {
            if (add) {
                img.classList.add('materialboxed');
            } else {
                img.classList.remove('materialboxed');
            }
        });
        // Reinitialize all materialboxed elements
        M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    }

    // Function to handle image click
    function onImageClick(event) {
        // Remove materialboxed class from all other images
        toggleMaterialboxed(false);

        // Add materialboxed class to the clicked image and initialize it
        event.target.classList.add('materialboxed');
        let instance = M.Materialbox.init(event.target);

        // Open the materialbox for the clicked image
        instance.open();
        event.target.addEventListener('click', function (e) {
            // Check if the Materialbox is open before trying to close it
            if (instance.isOpen) {
                instance.close();
            }
        });
    }

    // Attach click event to all images
    document.querySelectorAll('.komik-container .komik img').forEach(img => {
        img.addEventListener('click', onImageClick);
    });

    // Initial setup to add materialboxed class to all images
    toggleMaterialboxed(true);

    var searchInput = document.getElementById('search-input');
    var komikContainer = document.querySelector('.komik-container');
    var searchResult = document.getElementById('search-result');

    var komikData = [
        { title: 'Fly Me To The Moon', rating: '4.5/5', stars: 4.5, image: 'img/flyMeToTheMoon.jpg' },
        { title: 'Flesh Out', rating: '3.5/5', stars: 3.5, image: 'img/fleshOut.jpg' },
        { title: 'Detective Conan Vol.15', rating: '4.5/5', stars: 4.5, image: 'img/detektifConan.jpg' },
        { title: 'Death Note', rating: '5/5', stars: 5, image: 'img/deathNote.jpg' },
        { title: 'Kaoru & Rin', rating: '4/5', stars: 4, image: 'img/kaoruRin.jpg' }
    ];

    searchInput.addEventListener('input', function () {
        var searchTerm = searchInput.value.toLowerCase();
        searchResult.textContent = '';
        if (!searchTerm) return;

        var found = false;
        komikData.forEach((komik, index) => {
            const komikElement = document.querySelector(`.komik[data-index="${index}"]`);
            if (komik.title.toLowerCase().includes(searchTerm)) {
                komikElement.style.backgroundColor = 'rgb(245, 205, 212)';
                if (!found) {
                    komikElement.scrollIntoView({ behavior: 'smooth' });
                    found = true;
                }
            } else {
                komikElement.style.backgroundColor = 'white';
            }
        });

        if (!found) searchResult.textContent = 'Komik tidak ditemukan';
    });

});
