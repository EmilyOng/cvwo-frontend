import { useState, useEffect } from 'react'
import { Task } from 'types/task'
import { State } from 'types/state'
import { TaskAPI, CreatingTask, EditingTask } from 'api/task'

export function useTasks(boardId: number | null) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const api = new TaskAPI()
  const [tasks, setTasks] = useState<Task[]>([])

  function updateTasks(tasks: Task[]) {
    setTasks(tasks)
  }

  useEffect(() => {
    if (!boardId) {
      return
    }
    setTasks([])
    setLoading(true)
    api
      .getTasks(boardId)
      .then((res) => {
        if (res.error) {
          setError(res.error)
        } else {
          setTasks(res)
        }
      })
      .finally(() => setLoading(false))
    return () => {
      // Clean-up
      setLoading(false)
      setError('')
      setTasks([])
    }
  }, [boardId])

  return {
    loading,
    error,
    tasks,
    updateTasks
  }
}

export function useCreateTask() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const api = new TaskAPI()

  function createTask(task: CreatingTask) {
    setLoading(true)
    return api
      .createTask(task)
      .then((res) => {
        if (res.error) {
          setError(res.error)
          return null
        }
        return res
      })
      .finally(() => setLoading(false))
  }

  return {
    loading,
    error,
    createTask
  }
}

export function useEditTask() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const api = new TaskAPI()

  function editTask(task: EditingTask) {
    setLoading(true)
    return api
      .editTask(task)
      .then((res) => {
        if (res.error) {
          setError(res.error)
          return null
        }
        return res
      })
      .finally(() => setLoading(false))
  }

  return {
    loading,
    error,
    editTask
  }
}

export type TasksByStateID = Record<number, Task[]>

export function orderTasksByState(tasks: Task[], states: State[]) {
  if (states.length === 0 || tasks.length === 0) {
    return {}
  }
  const orderedTasks = states.reduce((acc, state) => {
    acc[state.id] = []
    return acc
  }, {} as TasksByStateID)
  tasks.forEach((task) => orderedTasks[task.stateId].push(task))
  return orderedTasks
}

export function useDeleteTask() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const api = new TaskAPI()

  function deleteTask(taskId: number) {
    setLoading(true)
    return api
      .deleteTask(taskId)
      .then((res) => {
        if (res.error) {
          setError(res.error)
          return null
        }
        return taskId
      })
      .finally(() => setLoading(false))
  }

  return {
    loading,
    error,
    deleteTask
  }
}
