/**
 * Barcode scanner quick investigation app
 * Web, Windows Universal, iOS, Android
 */

const scanBtn = document.querySelector('.scan-btn');
const scannerArea = document.querySelector('#scanner');

/**
 * Application entry point
 */
const app = {

    /**
     * Init app
     */
    init() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    /**
     * Run app logic when device is ready
     */
    onDeviceReady() {
        barcodeScanner.init();
    }

};

/**
 * Barcode scanner
 */
const barcodeScanner = {

    /**
     * Init scanner in button click
     */
    init() {
        scanBtn.addEventListener('click', this.scanBarCode.bind(this));
    },

    /**
     * Detect platform
     */
    scanBarCode() {
        scannerArea.innerHTML = 'OK';
        if(device.platform.toLowerCase() === 'browser') {
            this.scanWebCode();
        } else {
            scannerArea.innerHTML = 'Android';
            this.scanNativeCode();
            scannerArea.innerHTML = 'DONE';
        }
    },

    /**
     * Scan barcode
     * phonegap-plugin-barcodereader for devices only
     */
    scanNativeCode() {

        cordova.plugins.barcodeScanner.scan(result => {
            scannerArea.innerHTML  = result.text + '|' + result.format;
        }, error => {
            scannerArea.innerHTML = error;
            console.log('Scanning failed: ' + error);
        }, {
            preferFrontCamera : true, // iOS and Android
            showFlipCameraButton : true, // iOS and Android
            showTorchButton : true, // iOS and Android
            torchOn: true, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt : 'Place a barcode inside the scan area', // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            orientation : 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : true, // iOS
            disableSuccessBeep: false // iOS and Android
        });

    },

    /**
     * Scan barcode
     * Quagga.js library for Web only
     */
    scanWebCode() {

        Quagga.init({
            numOfWorkers: 0,
            locator: {
                patchSize: 'medium',
                halfSample: true
            },
            locate: true,
            frequency: 10,
            inputStream : {
                name : 'Live',
                type : 'LiveStream',
                target: scannerArea,
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: 'environment',
                }
            },
            decoder : {
                readers : ['ean_reader']
            }
        }, err => {
            if (err) {
                console.log(err);
                return;
            }

            Quagga.start();

            Quagga.onDetected(data => {
                console.log(data.codeResult);
                Quagga.offDetected();
                scannerArea.innerHTML  = JSON.stringify(data.codeResult);
            });
        });

    }

};

// Init app
app.init();
