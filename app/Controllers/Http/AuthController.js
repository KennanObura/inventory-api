'use strict'

const User = use('App/Models/User');

class AuthController {


    async register({ request, auth, response, session }) {
        const email = request.input('email')
        const username = request.input('username')
        const password = request.input('password')

        let user = new User()
        user.email = email
        user.password = password
        user.username = username

        await user.save()



        session.flash({ successMessage: 'You have registered successfully' })

        let accessToken = await auth.generate(user)

        return response.redirect('/auth/login')

    }


    async login({ request, auth, response, view, session }) {
        const parameter = request.only(['email', 'password'])

        try {
            if (!parameter)//check if user inputs provided
                return response.status(404).json({ data: 'Resource not found' })

            //assign user token
            const token = await auth.attempt(parameter.email, parameter.password)
         
            session.flash({ successMessage: 'Login success' })

            response.setHeader('Authorization', 'Bearer ' + token)
            return response.route('/home');
            // response-headers->set('Authorization', 'Bearer '.$request->bearerToken());

        } catch (error) {
            return response.status(400).json({
                status: 'error',
                message: 'Problem occured while trying to sigin. Please try again.'
            })

        }

    }

    async logout({ request, auth, response }) {
        await auth.logout()

        return response.route('/')

    }
}

module.exports = AuthController
