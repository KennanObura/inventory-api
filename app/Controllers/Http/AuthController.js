'use strict'

const User = use('App/Models/User');

class AuthController {


    async register({request, auth, response}){
        const email = request.input('email')
        const username = request.input('username')
        const password = request.input('password')

        let user = new User()
        user.email = email
        user.password = password
        user.username = username

        await user.save()

        let accessToken = await auth.generate(user)
        return response.json({ "user": user, "access_token": accessToken })

    }


    async login({request, auth, response, view}){
        const email = request.input('email')
        const password = request.input('password')

        try {
            if(await auth.attempt(email, password)){
                let user = await User.findBy('email', email)

                let accessToken = await auth.generate(user)

                return response.redirect('/home');
                
                // return response.json({ user: user, access_token: accessToken })
            }
   
        } catch (error) {
            return response.redirect('/');
        }
        
    }

    async logout({request, auth, response}){
        
    }
}

module.exports = AuthController
