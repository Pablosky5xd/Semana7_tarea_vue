<template>
    <div class="add-task-container">
        <h1>Añadir Tarea</h1>
        <!-- Campo de entrada para agregar nueva tarea -->
        <div class="input-group">
            <input 
                v-model="newTask" 
                @keyup.enter="addTask" 
                placeholder="Añadir nueva tarea" 
                class="task-input"
            />
            <button @click="addTask" class="add-button">Añadir</button>
        </div>

        <!-- Mostrar solo las tareas nuevas -->
        <div v-if="newTasks.length > 0" class="task-list">
            <div v-for="task in newTasks" :key="task.id" class="task-item">
                <span :class="{ completed: task.completed }">{{ task.todo }}</span>
                <div class="task-actions">
                    <button @click="toggleTaskCompletion(task)" class="complete-btn">
                        {{ task.completed ? 'Desmarcar' : 'Completar' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "AddTask",
    data() {
        return {
            newTask: "", // Campo de entrada para la nueva tarea
            newTasks: [], // Lista para las tareas nuevas
        };
    },
    methods: {
        // Agregar una nueva tarea mediante POST
        async addTask() {
            if (this.newTask.trim() === "") return;

            try {
                const response = await axios.post('https://dummyjson.com/todos/add', {
                    todo: this.newTask,
                    completed: false,
                    userId: 1, // Este campo puede cambiar según la API
                });

                // Agregar la nueva tarea a la lista de tareas nuevas
                this.newTasks.unshift(response.data);
                this.newTask = ""; // Limpiar el campo de entrada
            } catch (error) {
                console.error("Error al agregar tarea:", error);
                alert("No se pudo agregar la tarea.");
            }
        },

        // Cambiar el estado de una tarea
        toggleTaskCompletion(task) {
            task.completed = !task.completed;
        },
    }
};
</script>

<style scoped>
.add-task-container {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    font-family: 'Arial', sans-serif;
    background-color: #f4f7fc;
    border-radius: 8px;
}

h1 {
    text-align: center;
    color: #4CAF50;
    margin-bottom: 20px;
}

.input-group {
    display: flex;
    margin-bottom: 10px;
}

.task-input {
    flex-grow: 1;
    padding: 8px;
    margin-right: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.add-button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 16px;
}

.add-button:hover {
    background-color: #45a049;
}

.task-list {
    margin-top: 20px;
}

.task-item {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.task-actions {
    display: flex;
    gap: 10px;
}

.complete-btn {
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #8BC34A;
    color: white;
    cursor: pointer;
}

.complete-btn:hover {
    background-color: #7bb53d;
}

.completed {
    text-decoration: line-through;
    color: #888;
}

span {
    font-size: 16px;
    color: #333;
    flex-grow: 1;
}
</style>
