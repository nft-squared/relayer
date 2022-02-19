const { IPAddTask } = require("./IPPoolShdow");
const { verifyTypeData } = require("./EIP712");
const { ownerOf } = require("./IPVerifier");

const EQ = (addr1, addr2) => addr1.toLowerCase() == addr2.toLowerCase();

exports.handler = async (event, context) => {
  console.log(event);
  let data = {};

  // Lambda Proxy Integration
  if (event && event.body) {
    try {
      data = JSON.parse(event.body);
      console.log(data);
      console.log(typeof data);
    } catch (e) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message:
            "There was an error parsing the JSON data posted to this endpoint",
          error: e,
        }),
      };
    }
  }

  let { domain, message, signature } = data;

  try {
    // Initialize Mongo Client if necessary
    const { chainId, verifyingContract } = domain;
    const { token, tokenID, targetChainID, targetIPPool, nonce } = message;
    const account = verifyTypeData("Authorize", domain, message, signature);
    if (!EQ(account, verifyingContract))
      throw new Error(`invalid account: ${account} != ${verifyingContract}`);
    const owner = await ownerOf(token, tokenID);
    if (!EQ(account, owner))
      throw new Error(`invalid owner: ${account} != ${owner}`);
    return IPAddTask(token, tokenID, verifyingContract);
  } catch (e) {
    // Report errors related with connection, auth, DB write, etc
    console.log(e);
    return {
      statusCode: 409,
      body: JSON.stringify(e),
    };
  }
};
