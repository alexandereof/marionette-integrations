
const DIRECTORY_OF_CONFIGURATIONS = '/home/alexander/indiboxConfiguration';
var restify = require('restify'),
    fs = require('fs'),
    conections = [],
    ARRAY_OF_FILES = [];
ARRAY_OF_PROCESSED_FILES = [];


setInterval(function () {
    fs.readdir(DIRECTORY_OF_CONFIGURATIONS, (err, data) => {
        let arrayFiles = [];
        if (err) {

        } else {
            data.forEach(function (fileName) {
                var q = ARRAY_OF_PROCESSED_FILES.find(function (file) {
                    return fileName === file.name;
                });
                if (q) {
                    return;
                }
                var p = ARRAY_OF_FILES.find(function (file) {
                    return fileName === file.name;
                });

                if (!p) {
                    ARRAY_OF_FILES.push({ name: fileName });
                }
            });
        }
    });
}, 30000);

//-SERVER DEFINITIONS-------------------------------------------------------
const server = restify.createServer({
    name: 'raspiConf',
    version: '1.0.0'
});

//-PLUGINS SERVER ACTIVE ---------------------------------------------------
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
//--------------------------------------------------------------------------
//END-POINTS----------------------------------------------------------------
server.get('files/', function (req, res, next) {
    res.contentType = 'json';
    res.send({data: ARRAY_OF_FILES});
    return next();
});
server.get('fileProcessed/', function (req, res, next) {
    res.contentType = 'json';
    res.send(ARRAY_OF_PROCESSED_FILES);
    return next();
});
server.get('config/', function (req, res, next) {
    var file = ARRAY_OF_FILES.pop(),
        path = DIRECTORY_OF_CONFIGURATIONS + '/:file';
    try {
        if (!file) {
            res.contentType = 'json';
            res.send({ error: "empty configuration" });

        } else {
            ARRAY_OF_PROCESSED_FILES.push(file);
            res.contentType = 'json';
            res.send(JSON.parse(fs.readFileSync(path.replace(':file', file.name))));
        }

    } catch (error) {
        res.send({ error: 'error when attemps to read the file', fileName: file.name });
    }
    return next();
});

server.get(new RegExp('\/public\/?.*\/'), restify.plugins.serveStatic({
    directory: __dirname,
    default: 'index.html'
}));

//-------------------------------------------------------------------
server.listen(8888, function () {
    console.log('%s listening at %s', server.name, server.url);
});

