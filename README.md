## Microservices in MERN: Ticketing Application

### About
This application is built using MERN stack and microservices to be deployed in kubernetes cluster.
Microservices Ticketing Application to sell and buy tickets.

### Functionality
This project is a StubHub clone application and based on Stephen Grider [Microservices Course](https://www.udemy.com/course/microservices-with-node-js-and-react/), where the users can sell and buy tickets for entertaiment events. 

### Architecture

<img src="pictures/architecture.jpeg?raw=true" width="900">

### Overall Function

<img src="pictures/Overall_Function.png?raw=true" width="900">

### App Connection

<img src="pictures/App_Connection.png?raw=true" width="900">

### NATS Services 

<img src="pictures/NATS_Services.png?raw=true" width="900">

### Application Features and Microservices List:

- Authentication // User Auth
- Tickets // Selling Tickets
- Orders // Creation and Editing
- Expiration // Orders Monitoring and Expiration
- Payment // Credit Card Payments

## Tech Stack

The list of the main techs used in this project.

### Backend

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [NATS Streaming Server](https://docs.nats.io/nats-streaming-concepts/intro)
- [Mongo](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Redis](https://redis.io/)
- [JWT - Json Web Tokens](https://jwt.io/)
- [Stripe for Payments](https://stripe.com/)
- [Ingress Nginx](https://kubernetes.github.io/ingress-nginx/)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)

### Frontend

- [Next.js](https://nextjs.org/)
- [React](https://pt-br.reactjs.org/)

### CI/CD

- [Github](https://github.com/)
- [Github Actions](https://github.com/features/actions)

### Hosting

- [Digital Ocean](https://www.digitalocean.com/products/kubernetes/) 

### Run Locally: KIND (default dev environment)

```
### Install docker, kubectl, etc.

### Instal KIND 

$ curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.14.0/kind-linux-amd64 && chmod +x ./kind && sudo mv ./kind /usr/local/bin/kind

### Create cluster (CNI=Calico, Enable ingress)

cd infra/KIND/
kind create cluster --name ticketing --config cluster-config.yaml
kind get kubeconfig --name="ticketing" > admin.conf
export KUBECONFIG=./admin.conf 
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml
kubectl -n kube-system set env daemonset/calico-node FELIX_IGNORELOOSERPF=true
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

### Set environmental variables inside your kubernetes cluster (example)
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=thisissupersecretjwtkey
kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=sk_test_51HjfSGCqMWa1qdglqmD9HYWyp1cvvUC4FoYEXW0mAkV8t8P0Kx26VY4psazschjhZF8juqAvuuaU19Iwwbx4ZKce00hcIwBHN
kubectl create secret generic stripe-pub-key --from-literal NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=sk_test_51HjfSGCqMWa1qdglqmD9HYWyp1cvvUC4FoYEXW0mAkV8t8P0Kx26VY4psazschjhZF8juqAvuuaU19Iwwbx4ZKce00hcIwBHN

### Deploy all services
kubectl apply -f infra/k8s/
kubectl apply -f infra/k8s-dev/

### Get IP address to access your application
$ kubectl get ing
NAME          CLASS    HOSTS           ADDRESS     PORTS   AGE
ingress-srv   <none>   ticketing.dev   localhost   80      42m

### Setup /etc/hosts
$ grep ticket /etc/hosts
127.0.0.1 ticketing.dev 

Open your browser and type http://ticketing.dev. 
```

Snapshot of Application:

<img src="pictures/ticketing-sign-up.png?raw=true" width="600">
<img src="pictures/ticketing-create-a-ticket.png?raw=true" width="600">
<img src="pictures/ticketing-tickets.png?raw=true" width="600">
<img src="pictures/ticketing-purches.png?raw=true" width="800">
<img src="pictures/ticketing-orders.png?raw=true" width="600">

### Run Locally: minikube
```
### Install and run minikube and docker
minikube start
sudo service docker start

### Add ingress nginx addon
minikube addons enable ingress

### Install ingress nginx using bare-metal yaml file
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.0/deploy/static/provider/baremetal/deploy.yaml

### Set environmental variables inside your kubernetes cluster(example)
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=thisissupersecretjwtkey
kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=sk_test_51HjfSGCqMWa1qdglqmD9HYWyp1cvvUC4FoYEXW0mAkV8t8P0Kx26VY4psazschjhZF8juqAvuuaU19Iwwbx4ZKce00hcIwBHN
kubectl create secret generic stripe-pub-key --from-literal NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=sk_test_51HjfSGCqMWa1qdglqmD9HYWyp1cvvUC4FoYEXW0mAkV8t8P0Kx26VY4psazschjhZF8juqAvuuaU19Iwwbx4ZKce00hcIwBHN

### Deploy all services
kubectl apply -f infra/k8s/
kubectl apply -f infra/k8s-dev/

### Get IP address to access your application
$ kubectl get ing
NAME          CLASS    HOSTS           ADDRESS     PORTS   AGE
ingress-srv   <none>   ticketing.dev   localhost   80      42m

### Setup /etc/hosts
$ grep ticket /etc/hosts
127.0.0.1 ticketing.dev 

### Open your browser and type  http://ticketing.dev 
```
Snapshot of Application (see above)

### Run Locally: Docker Desktop

### Pre-Requirements Installations

- [Docker Desktop](https://docs.docker.com/get-docker/)
- Enable Kubernetes in the Docker Desktop
- [Install Ingress Nginx](https://kubernetes.github.io/ingress-nginx/deploy/)
- [Install Skaffold](https://skaffold.dev/docs/install/) - Optional
- [Create a Stripe Account](https://dashboard.stripe.com/register) - Optional
- Add ticketing.dev to your hosts file pointing to 127.0.0.1 (Mac & Linux /etc/hosts and Linux)

```
### Create the required secrets (example)
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=thisissupersecretjwtkey
kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=sk_test_51HjfSGCqMWa1qdglqmD9HYWyp1cvvUC4FoYEXW0mAkV8t8P0Kx26VY4psazschjhZF8juqAvuuaU19Iwwbx4ZKce00hcIwBHN
kubectl create secret generic stripe-pub-key --from-literal NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=sk_test_51HjfSGCqMWa1qdglqmD9HYWyp1cvvUC4FoYEXW0mAkV8t8P0Kx26VY4psazschjhZF8juqAvuuaU19Iwwbx4ZKce00hcIwBHN

Note: If you have Stripe Account
kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=<REPLACE_HERE_YOUR_PRIVATE_STRIPE_KEY>
If you don't have a Stripe Account
kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=123456

#### Skaffold (Optional)

# If Skaffold is installed
skaffold dev

If Skaffold is not installed
kubectl apply -f infra/k8s-dev
kubectl apply -f infra/k8s

### Setup /etc/hosts
$ grep ticket /etc/hosts
127.0.0.1 ticketing.dev 

### Open your browser and type  http://ticketing.dev 
```
Snapshot of Application (see above)

### Notes: skafold/etc.

```
Download Skafold (Refer to https://skaffold.dev/docs/install/)
Open a console for each microservice:
Run `npm install` for the dependencies
Inside each console run `docker build -t your-docker-id/microservice-name .` to create an image
Run `docker push your-docker-id/microservice-image` for each image you created to push them to Docker Hub
Go to each .yaml file inside ./infra and change all davarski references to your-docker-id
Open a console inside the root folder and run `skaffold dev`, this will run all the deployment config files
If the first time fail, shut it down a re-run it
Add 127.0.0.1 ticketing.dev on the last line of your hosts file
Open a web browser and go to ticketing.dev, the react app should be running
```


### Clean (KIND example)
```
kind delete cluster --name=ticketing
```
