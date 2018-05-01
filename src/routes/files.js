import express from 'express'
import { Files as Controller } from '../controllers'

const router = express.Router()

router.route('/')
    .post(Controller.post)

export default router