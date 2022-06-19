// Variables //
const textArea = document.querySelector('textarea'); 
// Functions // 
let addChoice = (e) => {
    const input = e.target.value; 
    const output = input.split(',');
    let finalOutput = output.map(element => 
         element.trim()
    ); // Removes trailing spaces 
    finalOutput = finalOutput.filter(x => x!=""); // Remove empty strings
    // Initially clear HTML 
    choices.innerHTML = '';
    // Add HTML 
    finalOutput.forEach((str, i) => {
        choices.innerHTML += `<div class="choice">${str}</div>`;
    });
}

// Lock so that only one chooseRandom at a time can run. 
let lock = 0; 
let chooseRandom = async (e) => { 
    if (e.key === 'Enter') {
        e.preventDefault();
        if (lock) { 
            return; 
        }
        lock = 1; 
        const choices = document.querySelector('#choices').childNodes;
        const len = choices.length;

        // First remove finalChoice if any 
        for (let i = 0; i < len; i++) {
            choices[i].classList.remove("finalChoice");
        }

        
        let rand = Math.floor(Math.random() * (len-1)); // Return random index 

        const maxItrs = 3 * len; 
        const numItrs = Math.floor(Math.random() * ((maxItrs - len + 1))) + len; // Chooses random number of iterations, with maxItrs as the max and len as the min
        // Strobing effect that will choose a random 
        for (let i = 0; i < numItrs; i++) {
            choices[rand].classList.add("finalChoice");
            await new Promise(resolve => setTimeout(resolve, 100));
            if (i != numItrs-1) 
                choices[rand].classList.remove("finalChoice"); // Don't remove the class on the final choice 
            else 
                break; 

            const curRand = rand; 
            while (rand === curRand) {  // Choose a random number for next iteration
                rand = Math.floor(Math.random() * (len-1)); 
            }
        }
        lock = 0;

    }
    else {
        return;
    }
}
// Events // 
textArea.addEventListener('input', addChoice);
textArea.addEventListener('keypress', chooseRandom); 
