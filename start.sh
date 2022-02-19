export KEYSTORE=./keystore/48a14902f92638baae060efc6e6841ca72a3f57c.keystore.json
read -p passwd: -s PASSWD
export PASSWD
echo
node ./main.js
