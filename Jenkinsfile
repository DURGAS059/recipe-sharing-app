pipeline {
    agent any

    environment {
        DOCKER_USER = "durgasankaran"
        IMAGE_BACKEND = "receipe-sharing-app-backend"
        IMAGE_FRONTEND = "receipe-sharing-app-frontend"
    }

    stages {
        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $DOCKER_USER/$IMAGE_BACKEND:latest ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $DOCKER_USER/$IMAGE_FRONTEND:latest ./crisp'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_PASS'
                )]) {
                    sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                sh 'docker push $DOCKER_USER/$IMAGE_BACKEND:latest'
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh 'docker push $DOCKER_USER/$IMAGE_FRONTEND:latest'
            }
        }
    }
}