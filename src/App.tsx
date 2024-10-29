import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

import styles from './App.module.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

import { ITask } from './interfaces/Task';
import Modal from './components/Modal';

function App() {

  const [taskList, setTaskList] = React.useState<ITask[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id
      })
    );
  };

  const openModal = (): void => {
    setIsModalOpen(true);
  }

  const closeModal = (): void => {    
    setIsModalOpen(false);
  }

  const editTask = (task: ITask): void => {
    openModal();
    setTaskToUpdate(task);
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = {id, title, difficulty}; 

    const updatedItems = taskList.map(task => {
      return task.id === updatedTask.id ? updatedTask : task;      
    })

    setTaskList(updatedItems);

    setIsModalOpen(false);
  }


  return (
    <div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <TaskForm
          btnText="Adicionar Tarefa"
          taskList={taskList}
          setTaskList={setTaskList} 
          task={taskToUpdate}
          handleUpdate={updateTask}/>
      </Modal>

      <Header />
      <main className={styles.main}>

        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm
            btnText={isModalOpen ? "Editar Tarefa" : "Adicionar Tarefa"}
            taskList={taskList}
            setTaskList={setTaskList} 
            />
        </div>

        <div>
          <h2>Suas Tarefas</h2>
          <TaskList
            taskList={taskList}
            handleDelete={deleteTask}  
            handleEdit={editTask}/>
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default App;
