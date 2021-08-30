import { useHTTP } from "../../hooks/useHTTP";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
	const { isLoading, error, sendRequest: sendTaskRequest } = useHTTP();

	const createTask = (taskText, taskData) => {
		const generatedId = taskData.name; // firebase-specific => "name" contains generated id
		const createdTask = { id: generatedId, text: taskText };

		props.onAddTask(createdTask);
	};

	const enterTaskHandler = async (taskText) => {
		sendTaskRequest(
			{
				url: "https://tasklist-tester-default-rtdb.firebaseio.com//tasks.json",
				method: "POST",
				body: { text: taskText },
				headers: {
					"Content-Type": "application/json",
				},
			},
			//allows to bind on this text call

			createTask.bind(null, taskText),
		);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;
