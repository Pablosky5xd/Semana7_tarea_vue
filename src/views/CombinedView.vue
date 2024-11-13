<template>
    <div class="task-container">
        <h1>Lista de Tareas</h1>
        <!-- Sección para mostrar las tareas cargadas -->
        <div class="task-list">
            <div v-for="task in tasks" :key="task.id" class="task-item">
                <div class="task-content">
                    <p :class="{ completed: task.completed }">{{ task.todo || task.name }}</p>
                </div>
                <div class="task-actions">
                    <button @click="toggleComplete(task)">
                        {{ task.completed ? 'Desmarcar' : 'Completar' }}
                    </button>
                    <button @click="deleteTask(task.id)">Eliminar</button>
                </div>
            </div>
        </div>
        
        <!-- Sección para agregar nuevas tareas -->
        <div class="add-task">
            <input v-model="newTask" @keyup.enter="addTask" type="text" placeholder="Agregar nueva tarea" />
            <button @click="addTask">Agregar tarea</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            tasks: [], // Lista de tareas
            newTask: "" // Campo de entrada para nueva tarea
        };
    },
    mounted() {
        this.fetchTasks(); // Cargar tareas cuando el componente se monte
    },
    methods: {
        // Obtener tareas desde la API
        async fetchTasks() {
            try {
                const response = await axios.get('https://dummyjson.com/todos');
                this.tasks = response.data.todos || response.data.slice(0, 10); // Ajustar según la API
            } catch (error) {
                console.error("Error al cargar tareas:", error);
                alert("No se pudieron cargar las tareas.");
            }
        },

        // Agregar una nueva tarea mediante la API
        async addTask() {
            if (this.newTask.trim() === "") return;

            try {
                const response = await axios.post('https://dummyjson.com/todos/add', {
                    todo: this.newTask,
                    completed: false,
                    userId: 1 // Este campo puede cambiar según la API
                });

                this.tasks.unshift(response.data); // Añadir la tarea al principio
                this.newTask = ""; // Limpiar el campo de entrada
            } catch (error) {
                console.error("Error al agregar tarea:", error);
                alert("No se pudo agregar la tarea.");
            }
        },

        // Cambiar el estado de una tarea entre completada y no completada
        toggleComplete(task) {
            task.completed = !task.completed;
        },

        // Eliminar una tarea específica de la API y la lista local
        async deleteTask(taskId) {
            try {
                await axios.delete(`https://dummyjson.com/todos/${taskId}`);
                this.tasks = this.tasks.filter((task) => task.id !== taskId); // Filtrar la tarea eliminada
            } catch (error) {
                console.error("Error al eliminar tarea:", error);
                alert("No se pudo eliminar la tarea.");
            }
        }
    }
};
</script>

<style scoped>
.task-container {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
}

h1 {
    text-align: center;
    color: #4CAF50;
    margin-bottom: 20px;
}

.task-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.task-item {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    width: 250px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease;
}

.task-item:hover {
    transform: scale(1.05);
}

.task-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.task-actions button {
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

.task-actions button.completed {
    background-color: #8BC34A;
    color: white;
}

.task-actions button:hover {
    opacity: 0.8;
}

.task-actions button:not(.completed) {
    background-color: #FF5722;
    color: white;
}

.add-task {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.add-task input {
    padding: 10px;
    width: 250px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-right: 10px;
}

.add-task button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.add-task button:hover {
    background-color: #45a049;
}

.completed {
    text-decoration: line-through;
    color: #888;
}
</style>
