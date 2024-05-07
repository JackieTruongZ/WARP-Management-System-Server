import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import passport from "passport";
import UserService from "@/services/users.service";

class PassportConfig {
    protected userService: UserService;
    constructor() {
        this.configureGoogleStrategy();
        this.configureSerialization();
        this.userService = new UserService();
    }

    private configureGoogleStrategy(): void {
        passport.use(
            new GoogleStrategy(
                {
                    clientID: "505404240106-iq0kbjto829t8h3uj8p6lui8akn51t39.apps.googleusercontent.com",
                    clientSecret: "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",
                    callbackURL: "/auth/google/callback",
                    scope: ["profile", "email"],
                },
                (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {

                    // Check if google profile exist.
                    if (profile.id) {

                        this.userService.passportLoginHandle(profile, done);

                    }
                }
            )
        );
    }

    private configureSerialization(): void {
        passport.serializeUser<any, any>((user: any, done: (err: any, id?: any) => void) => {
            done(null, user);
        });

        passport.deserializeUser<any, any>((user: any, done: (err: any, user?: any) => void) => {
            done(null, user);
        });
    }
}

export default new PassportConfig();