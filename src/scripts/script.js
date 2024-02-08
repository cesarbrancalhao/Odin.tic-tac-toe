const game = (() => {
    let scoreC = 0, scoreP = 0; 
    let fields = document.querySelectorAll('.fieldT');
    let score = document.querySelector('#score');
    const winningValues = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
    ];

    const selectField = (fieldNumber) => {
        if (checkForWin())
        return;

        let selectedField = fields[fieldNumber];
        if (selectedField.textContent !== " ")
            return;

        selectedField.textContent = "X";
        if (checkForWin())
        return;

        cpuSelectField();
        checkForWin();
    };

    const cpuSelectField = () => {
        let found = false;
        let checkedFields = [];
        while (checkedFields.length < 9){
            cpuField = Math.floor(Math.random() * 9);
            if (fields[cpuField].textContent === " "){
                fields[cpuField].textContent = "O";
                found = true;
                break;
            }

            if (!checkedFields.includes(cpuField))
                checkedFields = checkedFields.concat(cpuField);
        }
        if (!found)
            setDraw();
    }

    const checkForWin = () => {
        for (let comb of winningValues) {
            const [a, b, c] = comb;
            if (fields[a].textContent !== " " && 
                fields[a].textContent === fields[b].textContent &&
                fields[a].textContent === fields[c].textContent){         
                changeFields(false);
                if (fields[a].textContent === "X")
                    scoreP >= 2 ? gameWin('p') : increaseScore('p');
                if (fields[a].textContent === "O")
                    scoreC >= 2 ? gameWin('c') : increaseScore('c');
                return true;
            }
        }
        return false;
    };
    
    const gameWin = (winner) => {
        document.querySelector('.body').classList.remove('bg-gray-200');
        changeFields(false);
        resetHidden();
        if (winner === 'p') {
            increaseScore('p');
            document.querySelector('.body').classList.add('bg-green-300');
            document.querySelector('#winner').textContent = 'BOYAH!';
        }
        if (winner === 'c') {
            increaseScore('c');
            document.querySelector('.body').classList.add('bg-red-300');
            document.querySelector('#winner').textContent = 'LOSERRR!';
        }
    };

    const setDraw = () => {
        document.querySelector('#continue').textContent = "Continue";
        document.querySelector('.body').classList.add('bg-blue-300');
        document.querySelector('#winner').textContent = 'DRAW!';
    };

    const startNewGame = (reset) => {
        fields.forEach(field => field.textContent = " ");
        document.querySelector('#continue').textContent = " ";
        reset ? resetScore() : continueScore(true);
    };

    const resetScore = () => {
        resetBackground();
        scoreC = 0; scoreP = 0;
        score.textContent = " ";
        changeFields(true);
    };

    const continueScore = () => {
        resetBackground();
        changeFields(true);
        resetHidden();
    };

    const increaseScore = (player) => {
        player === 'p' ? scoreP++ : scoreC++;
        setTimeout(() => {
            score.textContent = 'Score: ' + scoreP + ' x ' + scoreC;
            if (scoreP !== 3 && scoreC !== 3)
                document.querySelector('#continue').textContent = "Continue";
        }, 200);
    };

    const resetBackground = () => {
        document.querySelector('.body').classList.remove('bg-red-300');
        document.querySelector('.body').classList.remove('bg-green-300');
        document.querySelector('.body').classList.remove('bg-blue-300');
        document.querySelector('.body').classList.add('bg-gray-200');
    };

    const resetHidden = () => {
        document.querySelector('#continue').textContent = " ";
        document.querySelector('#winner').textContent = " ";
    };

    const changeFields = (enable) => {
        enable ? enableFields() : disableFields();
    };

    const enableFields = () => {
        let i = 0;
        fields.forEach(field => {
            let o = i;
            field.onclick = () => { game.selectField(o) };
            i++;
        });
    };

    const disableFields = () => {
        fields.forEach(field => {
            field.onclick = () => {};
        });
    }
    
    return { selectField, startNewGame };
})();