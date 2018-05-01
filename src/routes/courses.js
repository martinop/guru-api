import express from 'express'
import { Courses as Controller } from '../controllers'

const router = express.Router()

router.route('/:userId')
    .get(Controller.get)

router.route('/:courseId/data')
    .get(Controller.getData)

export default router