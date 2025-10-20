
import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')


router.get("/register",[AuthController,"register"]).as("register")
router.post("/store",[AuthController,"register"]).as("store")






