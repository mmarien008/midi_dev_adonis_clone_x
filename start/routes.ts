
import { CommentaireFactory } from '#database/factories/commentaire_factory'
// import { UserFactory } from '#database/factories/tweet_factory'
// import { UserFactory } from '#database/factories/user_factory'
import router from '@adonisjs/core/services/router'


router.on('/').render('pages/home')

router.get("/teste",async()=>{
//    await UserFactory.create()
   await CommentaireFactory.create()
    // await UserFactory.with('tweets', 3).create()
})




