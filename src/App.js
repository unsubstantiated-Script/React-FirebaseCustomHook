import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import { useHTTP } from "./hooks/useHTTP";

function App() {
	const [tasks, setTasks] = useState([]);

	//use the useCallback to avoid looping stuff when manipulating state outside of the component or useEffect
	//Guaranteeing this doesn't change all of the time

	//This object is okay to change all the time
	const { isLoading, error, sendRequest: fetchTasks } = useHTTP();

	useEffect(() => {
		const transformTasks = (tasksObj) => {
			const loadedTasks = [];

			for (const taskKey in tasksObj) {
				loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
			}
			setTasks(loadedTasks);
		};
		fetchTasks(
			{
				url: "https://tasklist-tester-default-rtdb.firebaseio.com/tasks.json",
			},
			transformTasks,
		);
	}, [fetchTasks]);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
}

export default App;
