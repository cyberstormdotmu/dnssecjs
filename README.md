# DNSSECJS

DNSSEC Validating DNS Resolver for Javascript.

### Description
This is a DNSSEC Validating DNS Resolver that was ported to JS from [@ibauersach's](https://github.com/ibauersachs) 
[dnssecjava](https://github.com/ibauersachs/dnssecjava) project. Big thanks to Ingo for all of his hard work putting together 
his original project.

This library currently works with NodeJS and Cordova / Phonegap. In-browser compatibility is not yet available due to
browser sandboxing rules that would require a remote proxy server to be available.

### Installation
```bash
npm install dnssec
```

### Use
The **dnssec** library provides a Javascript DNSSEC-validating DNS resolver for use in NodeJS or Cordova / Phonegap based applications. For Cordova / 
Phonegap applications, the application must include the [cordova-plugin-chrome-apps-sockets-udp](https://github.com/MobileChromeApps/cordova-plugin-chrome-apps-sockets-udp)
 plugin. This library automatically determines which UDP provider to use based on the availability of the **dgram** (NodeJS) or 
**chrome.sockets.udp.*** (Cordova / Phonegap) libraries.

#### Cordova / Phonegap Use
In order to use this library within Cordova / Phonegap, you will need to run ```grunt``` to build a browserify-ed version of the library.
Once this is completed, include ```browser/dist/dnssec.standalone.js``` in your Cordova / Phonegap app in order to use the **dnssecjs** library.

#### DNSSECQuery
The **DNSSECQuery** type is passed an `opts` dictionary 
that requires at least the `name` and `type` keys be set. The `server` key can be set to a DNS server's if a specific DNS server is required, otherwise
 Google's Public DNS (8.8.8.8) is used by default.
 
#### DNSSECResolver
The **DNSSECResolver** object is created by passing a **DNSSECQuery** as the only parameter. In order to work, ICANN's Trust Anchors *MUST* be loaded using 
the `loadTrustAnchors()` method. The resolver also provides a `complete` event that will receive the resulting record along with the `securityStatus`. For 
basic usage, please see the example below and the linked [examples/example.js](examples/example.js).

### Example
```js
var dnssec = require('dnssec');

// Create DNSSEC Query
var request = new dnssec.DNSSECQuery({name: "ietf.org.", type: 'A'});

// Create Resolver and Load ICANN Trust Anchor (Retrieved from http://data.iana.org/root-anchors/root-anchors.xml)
var resolver = new dnssec.DNSSECResolver(request);
resolver.loadTrustAnchors(". IN DS 20326 8 2 E06D44B80B8F1D39A95C0B0D7C65D08458E880409BBC683457104237C7F8EC8D");

// Set 'complete' event handler to be called when a response is received
resolver.on('complete', function (response) {
    console.log('Completed Resolution with Security Status: ' + response.securityStatus);
    process.exit();
});

// Start the Query Resolver
resolver.resolve();
```

A more complete version of this example is located in [examples/example.js](examples/example.js).
