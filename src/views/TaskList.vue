<template>
    <div class="task-container">
        <h1>Lista de Tareas</h1>
        <!-- Botón para cargar las tareas -->
        <button @click="fetchTasks" class="load-tasks-btn">Cargar Tareas</button>

        <!-- Sección para mostrar las tareas -->
        <div v-if="tasks.length > 0" class="task-list">
            <div v-for="task in tasks" :key="task.id" class="task-item">
                <div class="task-content">
                    <h5 :style="{ textDecoration: task.completed ? 'line-through' : 'none' }" :class="{ completed: task.completed }">
                        {{ task.title }}
                    </h5>
                    <span>{{ task.completed ? 'Completada' : 'Pendiente' }}</span>
                </div>
                <div class="task-actions">
                    <button @click="toggleTaskCompletion(task)" class="complete-btn">
                        {{ task.completed ? 'Desmarcar' : 'Completar' }}
                    </button>
                    <button @click="deleteTask(task)" class="delete-btn">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "TaskList",
    data() {
        return {
            tasks: [] // Lista de tareas
        };
    },
    methods: {
        // Obtener tareas desde la API JSONPlaceholder
        async fetchTasks() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
                this.tasks = response.data.slice(0, 10); // Limitar a las primeras 10 tareas para pruebas
            } catch (error) {
                console.error("Error al cargar las tareas:", error);
                alert("Error al cargar las tareas. Intenta nuevamente.");
            }
        },

        // Cambiar el estado de una tarea entre completada y no completada
        toggleTaskCompletion(task) {
            task.completed = !task.completed;
        },

        // Eliminar una tarea específica de la lista
        deleteTask(task) {
            this.tasks = this.tasks.filter((t) => t.id !== task.id);
        },
    },
};
</script>

<style scoped>
.task-container {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    background-color: #f4f7fc;
    border-radius: 8px;
}

h1 {
    text-align: center;
    color: #4CAF50;
    margin-bottom: 20px;
}

.load-tasks-btn {
    display: block;
    width: 200px;
    margin: 20px auto;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
}

.load-tasks-btn:hover {
    background-color: #45a049;
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

.task-content h5 {
    font-size: 18px;
    margin-bottom: 10px;
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

.complete-btn {
    background-color: #8BC34A;
    color: white;
}

.complete-btn:hover {
    background-color: #7bb53d;
}

.delete-btn {
    background-color: #FF5722;
    color: white;
}

.delete-btn:hover {
    background-color: #e64a19;
}

.completed {
    text-decoration: line-through;
    color: #888;
}

span {
    display: block;
    margin-top: 5px;
    font-size: 14px;
    color: #555;
}
</style>
