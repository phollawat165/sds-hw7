import blogModel from '../models/blog'
import {
  NOT_FOUND_DATA, ERROR_DELETED, ERROR_UPDATED, ERROR_CREATION,
} from '../constants/errors/unsuccess'

import {
  SUCCESS_CREATED, SUCCESS_UPDATED, SUCCESS_DELETED,
} from '../constants/success'

const create = async (req, res) => {
  try {
    const response = await blogModel.create({ ...req.body })
    res.status(201).json(response)
  } catch (error) {
    throw ERROR_CREATION
  }
}

const updateBlogByID = async (req, res) => {
  const { ID } = req.params

  const data = await blogModel.findOne({ _id: ID })
  if (!data) {
    throw NOT_FOUND_DATA
  }

  try {
    await blogModel.findOneAndUpdate({ _id: ID }, { ...req.body })
    res.status(204).json(SUCCESS_UPDATED)
  } catch (error) {
    throw ERROR_UPDATED
  }
}

const deleteBlogByID = async (req, res) => {
  const { ID } = req.params

  const data = await blogModel.findOne({ _id: ID })
  if (!data) {
    throw NOT_FOUND_DATA
  }

  try {
    await blogModel.deleteOne({ _id: ID })
    res.status(200).json(SUCCESS_DELETED)
  } catch (error) {
    throw ERROR_DELETED
  }
}

const getBlogByID = async (req, res) => {
  const {
    ID,
  } = req.params
  const { view } = req.query

  const increment = view === 'true' ? { $inc: { view: 1 } } : {}

  const result = await blogModel.findOne({ _id: ID })
  console.log(result)
  if (!result) {
    throw NOT_FOUND_DATA
  }
  res.status(200).json(result)
}


const getBlog = async (limit = 20, page = 1) => {
  const skip = page === '0' ? page : (page - 1) * limit
  const options = {
    limit: page === '0' ? 0 : +limit,
    skip: +skip,
  }
  const query = {}

  const total = await blogModel.count()
  const data = await blogModel.findAggregate(query, options)
  return {
    total,
    pagination: {
      limit: options.limit,
      page: +page,
      total: options.limit ? Math.ceil(total / options.limit) : 0,
    },
    data,
  }
}

const findAll = async (req, res) => {
  const { limit, page } = req.query
  const result = await getBlog(limit, page)
  res.status(200).json(result)
}

export default {
  findAll,
  getBlogByID,
  create,
  updateBlogByID,
  deleteBlogByID,
}

