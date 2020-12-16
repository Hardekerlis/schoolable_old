openssl genpkey -out private.pem -algorithm RSA -pkeyopt rsa_keygen_bits:4096
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
