import express from 'express'
import { Messages as Controller } from '../controllers'

const router = express.Router()

router.route('/')
    .post(Controller.post)

export default router