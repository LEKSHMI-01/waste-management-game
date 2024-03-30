document.addEventListener("DOMContentLoaded", function() {
    const wastes = document.querySelectorAll('.waste');
    const pile1 = document.getElementById('pile1');
    const pile2 = document.getElementById('pile2');
    const gameOverMessage = document.getElementById('game-over-message');

    let gameCompleted = false;

    wastes.forEach(waste => {
        waste.addEventListener('dragstart', dragStart);
        waste.addEventListener('dragend', dragEnd);
        waste.addEventListener('mouseenter', showWasteName);
        waste.addEventListener('mouseleave', hideWasteName);
    });

    pile1.addEventListener('dragover', dragOver);
    pile1.addEventListener('dragenter', dragEnter);
    pile1.addEventListener('dragleave', dragLeave);
    pile1.addEventListener('drop', drop);

    pile2.addEventListener('dragover', dragOver);
    pile2.addEventListener('dragenter', dragEnter);
    pile2.addEventListener('dragleave', dragLeave);
    pile2.addEventListener('drop', drop);

    function dragStart() {
        this.classList.add('dragging');
    }

    function dragEnd() {
        this.classList.remove('dragging');
        if (!gameCompleted) {
            checkPiles();
        }
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        this.classList.add('hovered');
    }

    function dragLeave() {
        this.classList.remove('hovered');
    }

    function drop() {
        if (gameCompleted) return;

        const draggedWaste = document.querySelector('.dragging');
        this.appendChild(draggedWaste);
        checkPiles();
    }

    function checkPiles() {
        const biofuels = ['wheat-straw', 'paper-waste', 'algea', 'food-waste'];
        const plastics = ['pet-bottles', 'cosmetics', 'ldpe-cover', 'plastic-medical'];

        const pile1Contents = Array.from(pile1.children).map(child => child.id);
        const pile2Contents = Array.from(pile2.children).map(child => child.id);

        const isBiofuelPileCorrect = biofuels.every(waste => pile1Contents.includes(waste));
        const isPlasticPileCorrect = plastics.every(waste => pile2Contents.includes(waste));

        if (isBiofuelPileCorrect && isPlasticPileCorrect) {
            gameCompleted = true;
            showGameOverMessage();
            alert("Level Complete! Congratulations!");
        }
    }

    function showGameOverMessage() {
        gameOverMessage.style.display = 'block';
    }

    function showWasteName() {
        const wasteName = this.dataset.name; // Retrieve the waste name from the dataset
        const nameElement = document.createElement('div');
        nameElement.className = 'waste-name';
        nameElement.textContent = wasteName;
        this.appendChild(nameElement);
    }

    function hideWasteName() {
        const nameElement = this.querySelector('.waste-name');
        if (nameElement) {
            this.removeChild(nameElement);
        }
    }
});
