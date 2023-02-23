import { ChangeEvent, FormEvent, useId, useState } from 'react';
import { Circle, CheckCircle, Trash, PlusCircle } from 'phosphor-react';
import imgLogo from './assets/logo.svg';
import imgClipboard from './assets/clipboard.svg';
import style from './App.module.css';

interface TarrTodo {
	id: number;
	status: boolean;
	content: string;
}

//Components
function Empty() {
	return (
		<div className={style.empty}>
			<p>
				<img src={imgClipboard} />
			</p>
			<p>
				<strong>Você ainda não tem tarefas cadastradas</strong>
			</p>
			<p>Crie tarefas e organize seus itens a fazer</p>
		</div>
	);
}

export function App() {
	//States
	const [arrTodo, setArrTodo] = useState<TarrTodo[]>([]);
	const [newTodoText, setTodoText] = useState('');

	//Handlers
	function handleCreateNewTodo(event: FormEvent) {
		event.preventDefault();
		const id: number = (Math.random() * 46656) | 0;
		setArrTodo([...arrTodo, { id: id, status: false, content: newTodoText }]);
		setTodoText('');
	}
	function handleGetTodoChange(event: ChangeEvent<HTMLInputElement>) {
		event.target.setCustomValidity('');
		setTodoText(event.target.value);
	}
	function handleDeleteTodo(id: number) {
		const arrTodoWithoutDeleted = arrTodo.filter((todo: TarrTodo) => {
			return todo.id !== id;
		});
		setArrTodo(arrTodoWithoutDeleted);
	}
	function handleStatusTodo(id: number) {
		var foundIndex = arrTodo.findIndex((x) => x.id == id);
		console.log(foundIndex, arrTodo[foundIndex].status);
		arrTodo[foundIndex].status = arrTodo[foundIndex].status ? false : true;
		setArrTodo([...arrTodo]);
	}

	//Vars and consts
	const isNewTodoEmpty: boolean = newTodoText.length === 0;
	const count: number = arrTodo.filter((todo) => todo.status === true).length;
	const total: number = arrTodo.length;
	return (
		<div className='App'>
			<header className={style.header}>
				<img src={imgLogo} />
			</header>
			<main className={style.main}>
				<form onSubmit={handleCreateNewTodo}>
					<input
						placeholder='Adicione uma nova tarefa'
						value={newTodoText}
						onChange={handleGetTodoChange}
					/>
					<button type='submit' disabled={isNewTodoEmpty}>
						Criar <PlusCircle size={17} weight='bold' />
					</button>
				</form>
				<div className={style.status}>
					<div className='text-blue'>
						Tarefas criadas <span>{total}</span>
					</div>
					<div className='text-purple'>
						Concluídas{' '}
						<span>
							{count} de {total}
						</span>
					</div>
				</div>
				{total == 0 ? <Empty /> : ''}
				{arrTodo.map((todo) => (
					<div className={style.todo} key={todo.id}>
						<button type='button' onClick={() => handleStatusTodo(todo.id)}>
							{todo.status == true ? (
								<CheckCircle size={20} weight='fill' className={style.check} />
							) : (
								<Circle size={20} className={style.uncheck} />
							)}
						</button>
						<div className={todo.status === true ? style.done : ''}>{todo.content}</div>
						<button type='button' onClick={() => handleDeleteTodo(todo.id)}>
							<Trash size={24} className={style.delete} />
						</button>
					</div>
				))}
			</main>
		</div>
	);
}

