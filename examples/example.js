var dnssec = require('../lib/main.js'),
    consts = require('native-dns-packet').consts;

var request = new dnssec.DNSSECQuery({
        name: "ietf.org.",
        type: 'A'
    }
);

var resolver = new dnssec.DNSSECResolver(request);
resolver.debug = false;
resolver.loadTrustAnchors(". IN DS 20326 8 2 E06D44B80B8F1D39A95C0B0D7C65D08458E880409BBC683457104237C7F8EC8D");
resolver.on('complete', function (response) {
    console.log('Completed Resolution with Security Status: ' + response.securityStatus);
    var i, rec;
    for(i=0; i < response.sections.answer.length; i++) {
        rec = response.sections.answer[i];
        console.log("ANSWER[" + i + "]: " + rec.getName().toString() + " (" + consts.qtypeToName(rec.getType()) + "): " + rec.first().address);
    }
    for(i=0; i < response.sections.authority.length; i++) {
        rec = response.sections.authority[i];
        console.log("AUTHORITY[" + i + "]: " + rec.getName().toString() + " (" + consts.qtypeToName(rec.getType()) + ")");
    }
    for(i=0; i < response.sections.additional.length; i++) {
        rec = response.sections.additional[i];
        console.log("ADDITIONAL[" + i + "]: " + rec.getName().toString() + " (" + consts.qtypeToName(rec.getType()) + ")");
    }
    process.exit();
});

resolver.resolve();