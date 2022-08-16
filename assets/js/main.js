const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

const criaLi = () => {
  const li = document.createElement('li')
  return li
}

const limpaCampo = () => {
  inputTarefa.value = ''
  inputTarefa.focus()
}

const criaBotaoApagar = li => {
  li.innerText += ' '
  const btnApagar = document.createElement('button')
  btnApagar.innerText = 'apagar'
  // botaoApagar.classList.add('apagar')
  btnApagar.setAttribute('class', 'apagar')
  btnApagar.setAttribute('title', 'Apagar esta tarefa')
  li.appendChild(btnApagar)
}

inputTarefa.addEventListener('keypress', e => {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
  }
  // console.log(e)
})

const criaTarefa = textoInput => {
  const li = criaLi()
  li.innerText = textoInput
  tarefas.appendChild(li)
  limpaCampo()
  criaBotaoApagar(li)
  salvarTarefas()
}

btnTarefa.addEventListener('click', () => {
  if (!inputTarefa.value) return
  criaTarefa(inputTarefa.value)
})

document.addEventListener('click', e => {
  const el = e.target
  // const classEl = el.className
  // console.log(classEl)

  if (el.classList.contains('apagar')) {
    el.parentElement.remove()
    salvarTarefas()
  }
})

const salvarTarefas = () => {
  const liTarefas = tarefas.querySelectorAll('li')
  const listaDeTarefas = []

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText
    tarefaTexto = tarefaTexto.replace('apagar', '').trim()
    // console.log(tarefaTexto)
    listaDeTarefas.push(tarefaTexto)
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas)
  // JSON é um formato de texto usado para guardar dados, comumente usado para salvar dados entre sistemas
  // console.log(tarefasJson)
  localStorage.setItem('tarefas', tarefasJSON)
}

const adicionaTarefasSalvas = () => {
  if (!localStorage.getItem('tarefas')) return
  const tarefas = localStorage.getItem('tarefas')
  const tarefasSalvas = JSON.parse(tarefas)

  for (let tarefa of tarefasSalvas) {
    criaTarefa(tarefa)
  }
}

adicionaTarefasSalvas()
