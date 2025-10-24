import AuthController from '#controllers/auth_controller'
import TimeLinesController from '#controllers/time_lines_controller'
import TweetsController from '#controllers/tweets_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.on('/').render('pages/home').as('home')

router.get('/login', [AuthController, 'login']).as('auth.login')

router
  .group(() => {
    router.get('/register', [AuthController, 'register']).as('register')
    router.post('/store', [AuthController, 'store']).as('store')
    router.post('/verify-code', [AuthController, 'verify_code']).as('verify.code')
    router.get('/verify', [AuthController, 'verify_page']).as('verify.page')
    router.post('/login_step2', [AuthController, 'logigStep2']).as('auth.login_step2')
    router.post('/toLogin', [AuthController, 'toLogin']).as('auth.toLogin')
    router.post('/logout', [AuthController, 'logout']).as('auth.logout')
  })
  .prefix('/auth')


  
router
  .group(() => {
    router.post('/store', [TweetsController, 'store']).as('tweet.store')
    router.get('/delete/{id}', [TweetsController, 'delete']).as('tweet.delete')
    router.get('/edite/{id}', [TweetsController, 'edite']).as('tweet.edite')
    router.get('/update/{id}', [TweetsController, 'update']).as('tweet.update')
  })
  .prefix('/tweet').use(middleware.auth())


router
  .group(() => {
    router.get('/profile/{id}', [TweetsController, 'edite']).as('user.profile')
    router.get('/edite/{id}', [TweetsController, 'update']).as('user.edite')
  })
  .prefix('/user').use(middleware.auth())

router.get('time_line/show_data', [TimeLinesController, 'show_data']).as('time_line.show_data').use(middleware.auth())
