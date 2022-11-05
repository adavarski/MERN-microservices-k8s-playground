## Create JWT Secret in Kubernetes using the commands
```bash
$ kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<JWT_KEY>
```

## Create STRIPE_KEY Secret in Kubernetes using the commands
```bash
$ kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=<STRIPE_KEY>
```

## Create NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in Kubernetes using the commands
```bash
$ kubectl create secret generic stripe-pub-key --from-literal NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY>
```