'use strict'

const User = use('App/Models/User');

class AuthController {


    async register({request, auth, response, session}){
        const email = request.input('email')
        const username = request.input('username')
        const password = request.input('password')

        let user = new User()
        user.email = email
        user.password = password
        user.username = username

        await user.save()

        session.flash({successMessage: 'You have registered successfully'})

        let accessToken = await auth.generate(user)
        
        return response.redirect('/auth/login')

    }


    async login({request, auth, response, view, session}){
        const email = request.input('email')
        const password = request.input('password')

        try {
            if(await auth.attempt(email, password)){
                let user = await User.findBy('email', email)

                let accessToken = await auth.generate(user)

                session.flash({successMessage: 'Login success'})
                return response.route('/home');
                
                // return response.json({ user: user, access_token: accessToken })
            }
   
        } catch (error) {
            return response.redirect('/');
        }
        
    }

    async logout({request, auth, response}){
        await auth.logout()

        return response.route('/')
        
    }
}

module.exports = AuthController
