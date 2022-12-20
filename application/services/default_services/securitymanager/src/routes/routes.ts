import { Signincontroller } from '../controllers/Signincontrollers';
import { Consentcontroller } from '../controllers/Consentcontrollers';
const passport = require('passport');
import { facebooklogin } from '../passport/facebooklogin';
import { githublogin } from '../passport/githublogin';

export class Routes {
    private callConstructor:string;
    constructor() { 
        this.callConstructor = "callConstructor";
    }
    
    public signincontroller: Signincontroller = new Signincontroller()
    // public realmsignincontroller: RealmSignincontroller = new RealmSignincontroller()
    public consentcontroller: Consentcontroller = new Consentcontroller()


    public routes(app): void {

        app.route('/signup').post(this.signincontroller.signup);
        app.route('/login').post(this.signincontroller.login);
        app.route('/consent').put(this.consentcontroller.consent);
        app.route('/logout').post(this.signincontroller.logout);
        app.route('/googlesignin').post(this.signincontroller.googlecontroller);
        app.route('/getallusers').get(this.signincontroller.getallusers);
        app.route('/getuser/:id').get(this.signincontroller.getuserbyid);
        app.route('/getallroles').get(this.signincontroller.getallroles);
        app.route('/saveroles').post(this.signincontroller.saveroles);
        app.route('/deleteroles/:id').delete(this.signincontroller.deleteroles);
        app.route('/updateuser').put(this.signincontroller.updateuser);
        app.route('/updateuserid').put(this.signincontroller.updateuserid);
        app.route('/updateuserimg').put(this.signincontroller.updateUser);
        app.route('/deleteUser/:id').delete(this.signincontroller.deleteuser);

        //facebook login
app.route('/auth/facebook').get(this.signincontroller.authfacebookcontroller);
app.route('/facebook/callback').get(passport.authenticate('facebook'), async (user, res: Response) => 
{
  res.status(200);
  return res.redirect(`${process.env.CLIENTREDIRECT}/login?id=`+user.user._id + `&signintype=`+user.user.signintype); 
}); 

        //github login
app.route('/auth/github').get(this.signincontroller.authgithubcontroller);
app.route('/github/callback').get(passport.authenticate('github'), async (user, res: Response) => 
{
  res.status(200);
  return res.redirect(`${process.env.CLIENTREDIRECT}/login?id=`+user.user._id + `&signintype=`+user.user.signintype); 
});
    }
}