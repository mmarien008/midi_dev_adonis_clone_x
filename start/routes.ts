
import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')


router.get("/register",[AuthController,"register"]).as("register")
router.post("/store",[AuthController,"store"]).as("store")

router.get("/send_email",[AuthController,"send_email"]).as("send_email")








