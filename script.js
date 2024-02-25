document.addEventListener('DOMContentLoaded', function () {
    // Initialize Materialize components
    M.Sidenav.init(document.querySelectorAll('.sidenav'), {edge: 'right'});

    M.FormSelect.init(document.querySelectorAll('select'));
    
    var dropdown = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdown, {
        onCloseStart: function() {
            var dropdownArrow = document.querySelector('.dropdown-arrow-trigger');
            dropdownArrow.innerText = 'arrow_drop_down';
        },
        coverTrigger: false
    });

    dropdown.forEach(function(drop) {
        drop.addEventListener('click', function() {
            var dropdownArrow = document.querySelector('.dropdown-arrow-trigger');
            var instance = M.Dropdown.getInstance(drop);
            if (instance && instance.isOpen) {
                dropdownArrow.innerText = 'arrow_drop_up';
            }
        });
    });

    function toggleMaterialboxed(add) {
        document.querySelectorAll('.komik img').forEach(img => {
            if (add) {
                img.classList.add('materialboxed');
            } else {
                img.classList.remove('materialboxed');
            }
        });
        M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    }

    function onImageClick(event) {
        toggleMaterialboxed(false);

        event.target.classList.add('materialboxed');
        let instance = M.Materialbox.init(event.target);

        instance.open();
        event.target.addEventListener('click', function (e) {
            if (instance.isOpen) {
                instance.close();
            }
        });
    }

    document.querySelectorAll('.komik-container .komik img').forEach(img => {
        img.addEventListener('click', onImageClick);
    });

    toggleMaterialboxed(true);

    var searchInput = document.getElementById('search-input');
    var komikContainer = document.querySelector('.komik-container');
    var searchResult = document.getElementById('search-result');

    var komikData = [
        { title: 'Fly Me To The Moon', rating: '4.5/5', stars: 4.5, image: 'img/flyMeToTheMoon.jpg' },
        { title: 'Flesh Out', rating: '3.5/5', stars: 3.5, image: 'img/fleshOut.jpg' },
        { title: 'Detective Conan Vol.15', rating: '4.5/5', stars: 4.5, image: 'img/detektifConan.jpg' },
        { title: 'Death Note', rating: '5/5', stars: 5, image: 'img/deathNote.jpg' },
        { title: 'Kaoru & Rin', rating: '4/5', stars: 4, image: 'img/kaoruRin.jpg' },
        { title: 'Aladdin', rating: '5/5', stars: 5, image: 'img/aladdin.jpg' }
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
