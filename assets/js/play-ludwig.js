import { playLudwigProgram } from '/js/ludwig.js';

for (const exampleDiv of document.querySelectorAll('div.example')) {
    const program = exampleDiv.textContent
    exampleDiv.textContent = ''

    const codeChild = document.createElement('code')
    const buttonChild = document.createElement('button')
    const errorChild = document.createElement('p')

    exampleDiv.appendChild(codeChild)
    exampleDiv.appendChild(buttonChild)
    exampleDiv.appendChild(errorChild)

    codeChild.textContent = program
    codeChild.classList.add('hljs')

    buttonChild.textContent = 'Play'
    buttonChild.classList.add('btn')

    buttonChild.addEventListener('click', () => {
        errorChild.textContent = '';
        playLudwigProgram(codeChild.textContent, error => errorChild.textContent = error)
    })
}

const textarea = document.querySelector('textarea.playground')
if (textarea != null){
    const errorMessageElement = document.querySelector('#error-messages')
    console.log(document.querySelector('#playground-play'))
    document.querySelector('#playground-play').addEventListener('click', () => {
        errorMessageElement.textContent = ''
        const textarea = document.querySelector('textarea.playground')
        playLudwigProgram(textarea.value, error => errorMessageElement.textContent = error)
    })
}

