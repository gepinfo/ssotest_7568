const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy
import mongoose = require('mongoose');
import { UserSchema } from '../models/User';
const signinmodel = mongoose.model('User', UserSchema);
import { SigninDao } from '../daos/SigninDao';
let signindao = new SigninDao();
import { VaultConfig } from '../config/VaultConfig/facebookvault'; 
let vaultsso = new VaultConfig();

export class facebooklogin 
{ 
    constructor()
    {
        passport.initialize();
        passport.session();
    }

    public vaultfacebookObject;

    public facebookconfig()
    {
        passport.use(new facebookStrategy(this.vaultfacebookObject,(token, refreshToken, profile, done) => 
        {
            // facebook will send back the token and profile
            console.log('test', profile)
            let fbId = profile.id;
            // asynchronous
            console.log('log come', token, refreshToken);
            // find the user in the database based on their facebook id
            signinmodel.findOne({ 'fbId' : fbId }, (err, user) => 
            {
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);
                // if the user is found, then log them in
                if (user) 
                {
                    console.log("user found")
                    console.log(user)
                    return done(null, user); // user found, return that user
                } 
                else 
                {
                    // if there is no user found with that facebook id, create them
                    var newUser  = new signinmodel();
                    // set all of the facebook information in our user model
                    newUser.fbId = profile.id; // set the users facebook id                   
                    newUser.Idtoken = ''; // we will save the token that facebook provides to the user                    
                    newUser.username  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.firstname = profile.name.givenName
                    newUser.lastname = profile.name.familyName
                    if(profile.emails)
                    {
                        newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    }
                    // newUser.avatar = profile.photos[0].value
                    // save our user to the database
                    console.log('newUser fix it', newUser)
                    newUser.save(function(err) 
                    {
                        if (err)
                            throw err;
                        signindao.facebookdao(newUser, (response) => 
                        {
                            console.log('complete data ', response)
                            // if successful, return the new user
                            return done(null, response);
                        });                        
                    });
                }
            });
        }));

        passport.serializeUser((user, done) => 
        {
            console.log('serial', user);
            done(null, user);
        });

        // used to deserialize the user
        passport.deserializeUser((user, done) => 
        {
            signinmodel.findById(user._id, function(err, user) 
            {
              done(err, user);
            });
            console.log('desrial', user._id);
            done(null, user)
        });
    }

    public vaultconfig(callback)
    {
        vaultsso.facebookvaultConfig((response) => 
        {
            this.vaultfacebookObject = 
            {
                clientID: response.clientid,
                clientSecret: response.clientsecret,
                callbackURL: response.callbackUrl,
                profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email'],
            }
            passport.authenticate("facebook", { scope: ["public_profile"], })
            if(response) 
            {
                this.facebookconfig()
                callback(response.callbackUrl)
            }
        });
    }
}