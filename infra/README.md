https://stackoverflow.com/questions/61365202/nginx-ingress-service-ingress-nginx-controller-admission-not-found
Delete ingress-nginx-admission config.</br>
I get:</br>
<u>Error from server (InternalError): error when creating "STDIN": Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io": Post https://ingress-nginx-controller-admission.ingress-nginx.svc:443/networking/v1beta1/ingresses?timeout=10s: no endpoints available for service "ingress-nginx-controller-admission"</u>

```
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
```
