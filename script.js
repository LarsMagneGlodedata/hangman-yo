document.addEventListener('DOMContentLoaded', () => {
    const figurer = document.querySelectorAll('.figurer')
    const bokstavContainer = document.getElementById('bokstavContainer')
    const form = document.getElementById('formWord')
    const word = document.getElementById('word')
    const wordContainer = document.getElementById('wordContainer')
    const wrongContainer = document.getElementById('wrongContainer')
    const gameOver = document.getElementById('gameOver')
    const reset = document.querySelectorAll('.reset')
    const winner = document.getElementById('winner')
    let wordData = []
    const letters = 'abcdefghijklmnopqrstuvwxyzøæå'.split('')
    let isWord = false
    let letter = 
    console.log(figurer.length)

    letters.forEach(item => {
        const bokstaver = document.createElement('button')
        bokstaver.classList.add('bokstaver')
        bokstaver.textContent = item
        bokstavContainer.appendChild(bokstaver)
    });

    let feil = 0

    const buttons = document.querySelectorAll('.bokstaver')
    buttons.forEach(button => {
        button.addEventListener('click', () => {
                if (isWord) {
                const clickedLetter = button.textContent
                const h2Letters = document.querySelectorAll('.letters')
                let foundMatch = false
                wordData.forEach((dataObject, index) => {
                    if (dataObject.char.toUpperCase() === clickedLetter.toUpperCase()) {
                        dataObject.guessed = true;
                        foundMatch = true;
                        if (h2Letters[index]) {
                            h2Letters[index].style.color = ''
                            button.style.display = 'none'
                        }
                    }
                })
                if (!foundMatch) {
                    button.style.display = 'none'
                    figurer[feil].style.opacity = '1'
                    feil++
                    console.log(feil)
                    const wrong = document.createElement('h2')
                    wrong.classList.add('wrongletter')
                    wrong.textContent = button.textContent
                    wrongContainer.appendChild(wrong)

                    if (feil === figurer.length) {
                        gameOver.style.display = 'flex'
                    }
                }
                const allGuessed = wordData.every(data => data.guessed)
                if (allGuessed) {
                    winner.style.display = 'flex'
                }
            }
        })
    })

    reset.forEach(reset => {
        reset.addEventListener('click', () => {
            buttons.forEach(item => {
                item.style.display = ''
            })

            figurer.forEach(item => {
                item.style.opacity = ''
            })

            gameOver.style.display = ''
            winner.style.display = ''
            word.style.display = ''
            wordData = []
            console.log(wordData)
            const h2 = document.querySelectorAll('.letters')
            h2.forEach(item => {
                item.remove()
            })

            const h2Wrong = document.querySelectorAll('.wrongletter')
            h2Wrong.forEach(item => {
                item.remove()
            })

            feil = 0
            isWord = false
        })
    })

    

    form.addEventListener('submit', function(event) {
        event.preventDefault()
        isWord = true
        console.log(isWord)
        wordData = word.value.split('').map((char, index) => {
            const isSpace = char === ' '
            return {
                char: char,
                value: char,
                position: index,
                guessed: isSpace
            }
        })
        word.value = ''
        word.style.display = 'none'
        console.log(wordData)
        wordData.forEach(item => {
            letter = document.createElement('h2')
            letter.classList.add('letters')
            letter.textContent = item.char
            letter.style.color = 'transparent'
            wordContainer.appendChild(letter)
        })
    })

})