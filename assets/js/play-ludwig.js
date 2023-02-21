import { playLudwigProgram } from './ludwig.js';

for (const exampleDiv of document.querySelectorAll('.example')) {
    const program = exampleDiv.textContent.trim()
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
    buttonChild.classList.add("btn")
    buttonChild.classList.add("btn-secondary")

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

