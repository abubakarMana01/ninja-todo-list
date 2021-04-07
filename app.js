const addTodoForm = document.querySelector('.add-todo');
const searchForm = document.querySelector('.search-form');
const todos = document.querySelector('.todos');
const search = document.querySelector('#search-field');

function generateHTMLTemplate(input) {
	let html = `
    <li>
        <p>${input}</p>
        <i class="far fa-trash-alt delete"></i>
    </li>
`;
	todos.innerHTML += html;
}

addTodoForm.addEventListener('submit', e => {
	e.preventDefault();
	let input = addTodoForm.add.value.trim();
	if (input) {
		generateHTMLTemplate(input);
		addTodoForm.reset();
	}
});

// delete todos
todos.addEventListener('click', e => {
	if (e.target.classList.contains('delete')) {
		e.target.parentElement.remove();
	}
});

// search todo
searchForm.addEventListener('submit', e => {
	e.preventDefault();
});

search.addEventListener('keyup', () => {
	Array.from(todos.children).forEach(todo => {
		if (
			todo.textContent
				.trim()
				.toLowerCase()
				.includes(search.value.toLowerCase())
		) {
			todo.classList.remove('filtered');
		}
		if (
			!todo.textContent
				.trim()
				.toLowerCase()
				.includes(search.value.toLowerCase())
		) {
			todo.classList.add('filtered');
		}
	});
});
