## Barcode scanner investigation app

#### Platforms

* Web Browser
* Windows 10 Universal App
* iOS App
* Android App

#### How to build the same app with barcodescanner plugin correctly

* Install Cordova CLI `v6.0.0` only to correctly work with Windows 10 cameras: `npm install -g cordova@6.0.0`
* Install following plugins `cordova plugin add <name>`:
    * `cordova-plugin-android-permissions`
    * `cordova-plugin-camera`
    * `cordova-plugin-device`
    * `cordova-plugin-webrtc`
    * `cordova-plugin-barcodescanner`
    * `phonegap-plugin-barcodescanner`

* Install following platforms with strict versions `cordova platform add <name>`:
    * `browser`
    * `windows`
    * `android@6.4.0` (v6.4.0 only, because v7.0.0 officially contains a lot of bugs)
    * `ios`
* Run app for different platforms (permissions for camera will be requested inside app):
    * `cordova run browser`
    * `cordova run windows --arch="x86"` or `--arch="x64"`
    * `cordova run android` (first run will ask to modify security settings. Activate them and restart an app)
    * `cordova run ios`
    
#### Caveats for different platforms
* `Web Browser`
    * `phonegap-plugin-barcodescanner` doesn't work with browser platform correctly. We are using `Quagga.js` scanner library instead
* `Windows 10`
    * Don't forget to activate camera permissions in `Windows Settings -> Privacy -> Camera` for this app
* `Android`
    * Better to use API v25 in Emulator to work with app (install it if needed)
    * You can setup USB webcam in Emulator to scan barcodes during development (open `AVD -> Go to emulated device -> Advanced settings -> set "usb camera" options`)
