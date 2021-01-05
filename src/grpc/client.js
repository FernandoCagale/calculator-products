const PROTO_PATH = __dirname +'/proto/calculator.proto';
const grpc = require('grpc');
const protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const Calculator = grpc.loadPackageDefinition(packageDefinition).grpc;
const client = new Calculator.Calculator(process.env.GRPC, grpc.credentials.createInsecure());
module.exports = client