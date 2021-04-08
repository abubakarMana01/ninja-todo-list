const addTodoForm = document.querySelector('.add-todo');
const searchForm = document.querySelector('.search-form');
const todos = document.querySelector('.todos');
const search = document.querySelector('#search-field');

let localTodos = localStorage.getItem('todos');
localTodos = JSON.parse(localTodos);

function generateHTMLTemplate(input) {
	let html = `
    <li>
        <p>${input}</p>
        <i class="far fa-trash-alt delete"></i>
    </li>
`;
	todos.innerHTML += html;
}

// Add from local storage
if (localStorage.todos != null) {
	localTodos.forEach(todo => {
		todos.innerHTML += `
        <li>
            <p>${todo}</p>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;
	});
} else {
	localTodos = [];
}

// add todos
addTodoForm.addEventListener('submit', e => {
	e.preventDefault();
	let input = addTodoForm.add.value.trim();
	if (input) {
		generateHTMLTemplate(input);
		addTodoForm.reset();
	}

	localTodos.push(input);
	localStorage.setItem('todos', JSON.stringify(localTodos));
});

// delete todos
todos.addEventListener('click', e => {
	if (e.target.classList.contains('delete')) {
		const itemToRemove = e.target.parentElement.children[0].textContent;
		let i;
		if (localTodos.includes(itemToRemove)) {
			localTodos = localTodos.filter((item, index) => {
				i = index;
				return item !== itemToRemove;
			});

			let temp = JSON.parse(localStorage.todos);
			temp = localTodos;

			localStorage.todos = JSON.stringify(temp);
		}
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
