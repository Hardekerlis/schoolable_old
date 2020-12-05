
#!/bin/bash

kubectl apply -f ./cert-manager.yml
wait
kubectl apply -f ./ca-key-pair.yml
wait
kubectl apply -f ./ca-issuer.yml
wait

echo "finished";
