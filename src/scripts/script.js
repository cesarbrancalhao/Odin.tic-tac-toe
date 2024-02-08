const game = (() => {

    let fields = document.querySelectorAll('.fieldT');

    const selectField = (fieldNumber) => {

        let selectedField = fields[fieldNumber];

        if (selectedField.textContent !== " ")
            return;

        selectedField.textContent = "X";

        let isWin = false//checkForWin();

        if (isWin)
            return;

        // cpuSelectField();
        // checkForWin();
    };

    const startNewGame = () => {
        fields.forEach(field => field.textContent = " ");
    };
    

    return { selectField, startNewGame };
})();