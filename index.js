require("dotenv").config();
const PROTO_PATH = __dirname + "/encrypt.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
let encrypt_proto = grpc.loadPackageDefinition(packageDefinition);


let client = new encrypt_proto.PbkdUtilities(
  process.env.GRPC_SERVER,
  grpc.credentials.createInsecure()
);

client.Encrypt(
  { stringToEncrypt: "hi", password: "123" },
  function (err, response) {
    if (err) {
      // process error
      console.log(err);
    } else {
      // process response
      console.log(response);
    }
  }
);
