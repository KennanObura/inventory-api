'use strict'

const Users = use('App/Models/User');
const Suppliers = use('App/Models/Supplier');
const Products = use('App/Models/Product');

class DashboardController {

    async getUser({params, request, auth, response}){

    }

    async dashboardSummary({params, request, auth, response, view, session}){

        let productCount = await Products.getCount();
        let supplierCount = await Suppliers.getCount();
        let userCount = await Users.getCount();

        const summary = ({
            productCount : productCount,
            supplierCount : supplierCount,
            userCount : userCount,
            user : auth.username
        })

        // console.log(auth)
        // return response.json(summary)


        return view.render('index', {summary: summary})

    }


}

module.exports = DashboardController
