
import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as("home")


router.get("/register",[AuthController,"register"]).as("register")
router.post("/store",[AuthController,"store"]).as("store")

router.post('/verify-code', [AuthController,"verify_code"]).as('verify.code')
router.get('/verify', [AuthController,"verify_page"]).as('verify.page')







