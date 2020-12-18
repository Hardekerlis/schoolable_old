Generate private key:<br>
openssl genpkey -out private.pem -algorithm RSA -pkeyopt rsa_keygen_bits:4096
<br>

Generate public key:<br>
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
