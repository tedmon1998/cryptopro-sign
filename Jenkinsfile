pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                script {
                    sh 'sudo cp -rf /var/lib/jenkins/workspace/criptopro/* /home/edro/cryptopro/'
                    sh 'sudo rm -rf /var/lib/jenkins/workspace/criptopro/*'
                }
            }
        }
        stage('Docker building') {
            steps {
                script {
                    sh '''cd /home/edro/cryptopro
                    sudo npm install --legacy-peer-deps
                    sudo rm -rf build
                    sudo docker-compose down
                    sudo docker-compose up -d'''
                }
            }
        }
    }
}