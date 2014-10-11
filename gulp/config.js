global.SRC_FOLDER = 'src';
global.BUILD_FOLDER = 'build';
global.RELEASE_FOLDER = 'release';
global.TMP_FOLDER = 'tmp';

global.config = {
    paths: {
        src: {
            index: SRC_FOLDER + '/templates/*.jade',
            assets: [SRC_FOLDER + '/assets/**/*', '!' + SRC_FOLDER + '/assets/images/**/*'],
            images: SRC_FOLDER + '/assets/images/**/*',
            scripts: SRC_FOLDER + '/app/**/*.js',
            styles: SRC_FOLDER + '/styles/app.less',
            stylesGlob: SRC_FOLDER + '/styles/**/*.less',
            templates: SRC_FOLDER + '/app/**/*.jade',
            templatesHTML: SRC_FOLDER + '/app/**/*.html',
            templatesCompiled: TMP_FOLDER,
            livereload: [BUILD_FOLDER + '/**/*', '!' + BUILD_FOLDER + '/assets/**/*'],
            modules: './' + SRC_FOLDER + '/app/index.js'
        },
        dest: {
            build: {
                styles: BUILD_FOLDER + '/assets',
                scripts: BUILD_FOLDER + '/assets',
                images: BUILD_FOLDER + '/assets/images',
                assets: BUILD_FOLDER + '/assets',
                index: BUILD_FOLDER,
                server: BUILD_FOLDER
            },
            release: {
                styles: RELEASE_FOLDER + '/assets',
                scripts: RELEASE_FOLDER + '/assets',
                images: RELEASE_FOLDER + '/assets/images',
                assets: RELEASE_FOLDER + '/assets',
                index: RELEASE_FOLDER,
                server: RELEASE_FOLDER
            }
        }
    },
    filenames: {
        build: {
            styles: 'bundle.css',
            scripts: 'bundle.js'
        },
        release: {
            styles: 'bundle.min.css',
            scripts: 'bundle.min.js'
        },
        templates: {
            compiled: 'templates.js',
            angular: {
                moduleName: 'app.templates',
                prefix: '',
                stripPrefix: 'app/'
            }
        }
    },
    ports: {
        staticServer: 3000,
        livereloadServer: 35729
    },
    cookie: {
        secret: "AH%#@$LKFADS)@#%@$:LJKDCXZVC}X{CBCVNAFDADSKFSJD"
    },
    auth: {
        facebook: {
            "clientID": "730865793639949",
            "callbackURL": "http://maziaj.herokuapp.com/login/auth/facebook/callback"
        },
        google: {
            authorizationURL: "https://accounts.google.com/o/oauth2/auth",
            tokenURL: "https://accounts.google.com/o/oauth2/token",
            clientID: "662372396489-5jtc6km803bhrdienkp08s63as45hpa5.apps.googleusercontent.com",
            callbackURL: "http://maziaj.herokuapp.com/login/auth/google/return"
        }
    },
    user: {
        model: {
            provider: "",
            display_name: "",
            accounts: []
        }
    }
};
