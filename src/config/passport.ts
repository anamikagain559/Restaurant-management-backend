/* eslint-disable @typescript-eslint/no-explicit-any */
import bcryptjs from "bcryptjs";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { envVars } from "./env";


passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email: string, password: string, done) => {
        try {
            console.log("Login attempt for:", email);
            const isUserExist = await User.findOne({ email }).select("+password")

            if (!isUserExist || !isUserExist.password) {
                console.log("User or password missing. User exists:", !!isUserExist, "Hash exists:", !!isUserExist?.password);
                return done(null, false, { message: "Invalid email or password" });
            }

            console.log("User found. Has password:", !!isUserExist.password);

            const isPasswordMatched = await bcryptjs.compare(password, isUserExist.password)

            if (!isPasswordMatched) {
                console.log("Password mismatch for:", email);
                return done(null, false, { message: "Invalid email or password" })
            }

            console.log("Login successful for:", email);
            return done(null, isUserExist)

        } catch (error) {
            console.log("Passport Local Strategy Error:", error);
            done(error)
        }
    })
)

passport.use(
    new GoogleStrategy(
        {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRET,
            callbackURL: envVars.GOOGLE_CALLBACK_URL
        }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {

            try {
                const email = profile.emails?.[0].value;

                if (!email) {
                    return done(null, false, { mesaage: "No email found" })
                }

                let user = await User.findOne({ email })

                if (!user) {
                    user = await User.create({
                        email,
                        name: profile.displayName,
                        picture: profile.photos?.[0].value,
                        role: Role.USER,
                        isVerified: true,
                        auths: [
                            {
                                provider: "google",
                                providerId: profile.id
                            }
                        ]
                    })
                }

                return done(null, user)


            } catch (error) {
                console.log("Google Strategy Error", error);
                return done(error)
            }
        }
    )
)

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id)
})

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch (error) {
        console.log(error);
        done(error)
    }
})
