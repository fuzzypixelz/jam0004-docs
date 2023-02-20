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

    buttonChild.onclick = () => {
        errorChild.textContent = '';
        playLudwigProgram(codeChild.textContent, error => errorChild.textContent = error)
    }
}
