pipeline {
    environment {
    registry = 'raghava447/ecomm-authsrv'
    registryCredential = 'dockerhub'
    dockerImage = ''
    }

    agent any
    stages {
            stage('Cloning our Git') {
                steps {
                git 'https://github.com/raghavanfsd/ecomm-graphql-microservices.git'
                }
            }

            stage('testing the repo') {
                steps {
                    script {
                        nodejs(nodeJSInstallationName: 'nodejs') {
                            sh 'pwd'
                            dir('auth') {
                                sh 'npm install'
                                sh 'npm test'
                            }
                            sh 'pwd'
                        }
                    }
                }
            }

            stage('Building Docker Image') {
                steps {
                    script {
                        sh 'pwd'
                        dir('auth') {
                          dockerImage = docker.build registry + ':latest'
                        }
                        sh 'pwd'
                    }
                }
            }

            stage('Deploying Docker Image to Dockerhub') {
                steps {
                    script {
                        docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                        }
                    }
                }
            }

            stage('Deplyoing to Kubernetes cluster') {
                steps {
                    script {
                        withKubeConfig(credentialsId: 'kubeconfig') {
                            withCredentials(bindings: [usernamePassword(credentialsId: registryCredential, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                                sh 'pwd'
                                dir('infra/k8s') {
                                    sh 'kubectl rollout restart deployment auth-deploy'
                                }
                                sh 'pwd'
                            }
                        }
                    }
                }
            }

            stage('Cleaning Up') {
                steps{
                  sh 'docker rmi --force $registry:latest'
                }
            }
        }
    }
