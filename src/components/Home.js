import { Heading, IconButton, VStack, useToast } from "@chakra-ui/react";
import TaskList from "./tasks";
import AddTask from "./AddTask";
import { FaSignOutAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import React from "react";
import { deleteTasks, getListTask, logout, saveTask, updateTasks } from '../service/Task';

function Home() {

    useEffect (() => {
      getData();
    }, [])

    function getData(){
        const users = JSON.parse(localStorage.getItem('usertoken'));
        if(users){
            let promise;
            promise = getListTask(users[0].id);
            promise
                .then(response => {
                    setTasks(response);
                }).catch(error => {
                    console.log(error)
                });
        }else{
            setTasks([])
        }
    }
    const toast = useToast();
    const [tasks, setTasks] = useState([]);

    // useEffect(() => {
    //     localStorage.setItem('tasks', JSON.stringify(tasks));
    // }, [tasks]);

    function deleteTask(id) {
        deleteTasks(id)
            .then(response => {
                if (response.message === 'success') {
                    toast({
                        title: 'Success',
                        position: 'top',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    });
                    console.log('Error');
                    // getData();
                }
            }).catch(error => {
                console.log(error)
                toast({
                    title: 'Error',
                    position: 'top',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }).finally(() => {
                console.log('success');
                getData();
            });
            
    }

    // function deleteTaskAll() {
    //     setTasks([]);
    // }

    function checkTask(id) {

        const newTasksCheck = tasks.map((task, index, array) => {
            if (task.id === id) {
                task.check = !task.check;
            }
            return task;
        });

        setTasks(newTasksCheck);
    }

    function updateTask(id, body, onClose) {

        const info = body.trim();

        if (!info) {
            toast({
                title: 'Enter your task',
                position: 'top',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            });

            return;
        }

        updateTasks(id, body)
            .then(response => {
                if (response.message === 'success') {
                    toast({
                        title: 'Success',
                        position: 'top',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    });
                    getData();
                }
            }).catch(error => {
                console.log(error)
                toast({
                    title: 'Error',
                    position: 'top',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            });
        onClose();
    }

    function checkout(){
        logout();
        window.location.replace(
            "http://localhost:3000/"
          );
        localStorage.clear();
    }

    function addTask(task) {
        const users = JSON.parse(localStorage.getItem('usertoken'));
        saveTask(task.title, users[0].id)
            .then(response => {
                if (response) {
                    toast({
                        title: 'Success',
                        position: 'top',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    });
                    getData();
                }
            }).catch(error => {
                console.log(error)
                toast({
                    title: 'Error',
                    position: 'top',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }).finally(getData());
        // setTasks([...tasks, task]);
    }

    // const { colorMode, toggleColorMode } = useColorMode();

    return (
        <VStack p={4} minH='100vh' pb={28}>
            {/* <IconButton
                icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
                isRound='true'
                size='md'
                alignSelf='flex-end'
                onClick={toggleColorMode}
            /> */}

            <IconButton
                icon={<FaSignOutAlt /> }
                isRound='true'
                size='md'
                alignSelf='flex-end'
                onClick={checkout}
            />

            <Heading
                p='5'
                fontWeight='extrabold'
                size='xl'
                bgGradient='linear(to-l, teal.300, blue.500)'
                bgClip='text'
            >
                Todo List
            </Heading>
            <AddTask addTask={addTask} />
            <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} checkTask={checkTask} />

            {/* <Flex position='absolute' bottom='5'>
                <Link href='https://github.com' target='_blank' >
                    <IconButton
                        icon={<FaGithub />}
                        isRound='true'
                        size='md'
                        m='1'
                    />
                </Link>
                <Link href='https://www.linkedin.com/in' target='_blank'>
                    <IconButton
                        icon={<FaLinkedin />}
                        isRound='true'
                        size='md'
                        m='1'
                    />
                </Link>
                <Link href='https://www.instagram.com' target='_blank'>
                    <IconButton
                        icon={<FaInstagram />}
                        isRound='true'
                        size='md'
                        m='1'
                    />
                </Link>
                <Link href='https://twitter.com' target='_blank'>
                    <IconButton
                        icon={<FaTwitter />}
                        isRound='true'
                        size='md'
                        m='1'
                    />
                </Link>
                <Link href='https://www.facebook.com' target='_blank'>
                    <IconButton
                        icon={<FaFacebook />}
                        isRound='true'
                        size='md'
                        m='1'
                    />
                </Link>
            </Flex> */}
        </VStack>
    );
}

export default Home;

