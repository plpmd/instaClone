import 'dotenv/config'

export default {
  "expo": {
    "name": "InstagramClone",
    "slug": "InstagramClone",
    "scheme": "InstagramClone",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "android.permission.RECORD_AUDIO"
      ],
      "androidStatusBar": {
        "barStyle": "light-content",
        "backgroundColor": "#00000000",
        "translucent": true
      }
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      "expo-router",
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "025f46bc-a021-4375-9963-826d18319e3f"
      },
      "apiKey": process.env.FIREBASE_API_KEY,
      "authDomain": process.env.FIREBASE_AUTH_DOMAIN,
      "projectId": process.env.FIREBASE_PROJECT_ID,
      "storageBucket": process.env.FIREBASE_STORAGE_BUCKET,
      "messagingSendId": process.env.FIREBASE_MESSAGING_SENDER_ID,
      "appId": process.env.FIREBASE_APP_ID,
      "databaseURL": process.env.FIREBASE_DATABASE_URL
    },
    "owner": "plpmd"
  }
}
