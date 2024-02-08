const game = (() => {
    let scoreC = 0, scoreP = 0; 
    let fields = document.querySelectorAll('.fieldT');

    const selectField = (fieldNumber) => {
        let selectedField = fields[fieldNumber];
        if (selectedField.textContent !== " ")
            return;
        
        if (checkForWin())
            return;

        selectedField.textContent = "X";

        if (checkForWin())
        return;


        //cpuSelectField();
        //checkForWin();
    };

    const checkForWin = () => {
        const winningValues = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let comb of winningValues) {
            const [a, b, c] = comb;
            if (fields[a].textContent !== " " && 
                fields[a].textContent === fields[b].textContent &&
                fields[a].textContent === fields[c].textContent){
                
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
        
        if (winner === 'p') {
            increaseScore('p');
            resetHidden();
            document.querySelector('.body').classList.add('bg-green-300');
            document.querySelector('#winner').textContent = 'BOYAH!';
        }
        
        if (winner === 'c') {
            document.querySelector('.body').classList.add('bg-red-500');
        }
};

    const startNewGame = (reset) => {
        fields.forEach(field => field.textContent = " ");
        reset ? (resetScore(), resetHidden()) : '';
    };

    const resetScore = () => {
        scoreC = 0; scoreP = 0;
    };

    const increaseScore = (player) => {
        player === 'p' ? scoreP++ : scoreC++;
        debugger
        setTimeout(() => {
            let score = document.querySelector('#score');
            score.textContent = 'Score: ' + scoreP + ' x ' + scoreC;
            document.querySelector('#continue').textContent = 'Continue';
        }, 200);
    };

    const resetHidden = () => {
        document.querySelector('#continue').textContent = " ";
    };
    
    return { selectField, startNewGame };
})();