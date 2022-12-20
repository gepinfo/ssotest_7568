const passport = require('passport');
const githubStrategy = require('passport-github2').Strategy
import mongoose = require('mongoose');
import { UserSchema } from '../models/User';
const signinmodel = mongoose.model('User', UserSchema);
import { SigninDao } from '../daos/SigninDao';
let signindao = new SigninDao();
import { VaultConfig } from '../config/VaultConfig/githubvault';
let vaultsso = new VaultConfig();

export class githublogin 
{ 
    constructor()
    {
        passport.initialize();
        passport.session();
    }

    public vaultgithubObject;

    public githubconfig()
    {
        passport.use(new githubStrategy(this.vaultgithubObject,(token, refreshToken, profile, done) => 
        {
            // facebook will send back the token and profile
            console.log('test', profile)
            let githubId = profile.id;
            // asynchronous
            console.log('log come', token, refreshToken);
            // find the user in the database based on their github id
            signinmodel.findOne({ 'githubId' : githubId }, (err, user) => 
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
                    // if there is no user found with that github id, create them
                    var newUser  = new signinmodel();
                    // set all of the github information in our user model
                    newUser.githubId = profile.id; // set the users github id                   
                    newUser.Idtoken = ''; // we will save the token that github provides to the user                    
                    newUser.username  = profile.username; // look at the passport user profile to see how names are returned
                    newUser.firstname = profile.username;
                    newUser.lastname = profile.username;
                    if(profile._json.email)
                    {
                        newUser.email = profile.emails[0].value; // github can return multiple emails so we'll take the first
                    }
                    newUser.avatar = profile.photos[0].value
                    // save our user to the database
                    console.log('newUser fix it', newUser)
                    newUser.save(function(err) 
                    {
                        if (err)
                            throw err;
                        signindao.githubdao(newUser, (response) => 
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
        vaultsso.githubvaultConfig((response) => 
        {
            this.vaultgithubObject = 
            {
                clientID: response.clientid,
                clientSecret: response.clientsecret,
                callbackURL: response.callbackUrl,
                profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email'],
            }
            passport.authenticate("github", { scope: ["public_profile"], })
            if(response) 
            {
                this.githubconfig()
                callback(response.callbackUrl)
            }
        });
    }
}