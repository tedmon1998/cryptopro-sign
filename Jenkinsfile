pipeline {
    agent any
    stages {
        stage('Deploy') {
            script {
                sh 'sudo cp -rf /var/lib/jenkins/workspace/criptopro/* /home/edro/cryptopro/'
                sh 'sudo rm -rf /var/lib/jenkins/workspace/criptopro/*'
            }
        }
        stage('Docker building') {
            script {
                sh 'cd /home/edro/cryptopro && sudo docker-compose down && sudo docker-compose up -d'
            }
        }
    }
}