pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('yourname-dockerhub-creds')
        DOCKER_IMAGE = "yourdockerhubusername/facts-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
        NAMESPACE = "yourname-ns"
    }
    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/Muffi10/facts',
                    branch: 'main'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE:$IMAGE_TAG ."
                }
            }
        }
        stage('Push Docker Image to DockerHub') {
            steps {
                script {
                    sh """
                    echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin
                    docker push $DOCKER_IMAGE:$IMAGE_TAG
                    docker logout
                    """
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                    sed 's|IMAGE_PLACEHOLDER|$DOCKER_IMAGE:$IMAGE_TAG|g' deployment.yaml > k8s-deployment-generated.yaml
                    kubectl apply -f k8s-deployment-generated.yaml
                    echo "Waiting to get the service IP..."
                    sleep 10
                    kubectl get po -n $NAMESPACE
                    kubectl get svc -n $NAMESPACE
                    """
                }
            }
        }
    }
    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}