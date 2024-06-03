const columns = document.querySelectorAll('.column')

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLowerCase() === 'space') {
    setRandomColors() 
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type
  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i'
    ? event.target
    : event.target.children[0]
    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
    copyToClickboard(event.target.textContent)
  }

  }
)

function generateRandomColor() {
  const hexCode = '0123456789ABCDEF'
  let color =''
  for(let i=0; i < 6; i++) {
    color += hexCode[Math.floor(Math.random() * hexCode.length)]
  }
  return '#' + color
}

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : []

  columns.forEach((column, index) => {
    const isLocked = column.querySelector('i').classList.contains('fa-lock')
    const text = column.querySelector('h2')
    const button = column.querySelector('button')

    if (isLocked) {
      colors.push(text.tetxContent)
     return
     }

     const color = isInitial 
     ? colors[index] 
       ? colors[index]
       : chroma.random()
     : chroma.random()
     
     if (!isInitial) {
      colors.push(color)
     }
     

    text.textContent = color
    column.style.background = color 

    setTextColor(text,color)
    setTextColor(button,color)
  })

  updateColorsHash(colors)
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
  .map((column) => {
    return column.toString().substring(1) }
  )
  .join('-')
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
    .substring(1)
    .split('-')
    .map((color) => '#' + color  )

  }
   return []
}

setRandomColors(true)