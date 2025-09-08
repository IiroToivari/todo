import { selectAllTasks, insertTask, deleteTaskById } from '../models/Task.js'
import {ApiError} from '../helper/ApiError.js'

export const getTasks = async (req, res,next) => {
 try {
 const result = await selectAllTasks()
 return res.status(200).json(result.rows || [])
 } catch (error) {
 return next(error)
 }
}
export const postTask = async (req, res, next) => {
  const { task } = req.body
  console.log("Task to create:", task)

  try {
    if (!task || !task.description || task.description.trim().length === 0) {
      
      return next(new ApiError("Task description is required", 400))
    }

    const result = await insertTask(task.description)
    return res.status(201).json({
      id: result.rows[0].id,
      description: result.rows[0].description,
    })
  } catch (error) {
    return next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await deleteTaskById(id)

    if (result.rowCount === 0) {
      return next(new ApiError("Task not found", 404))
    }

  res.status(200).json(result.rows[0])
  } catch (err) {
    next(err)
  }
}

export { getTasks, postTask, deleteTask }

