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
                    sudo npm run prebuild
                    sudo npm run build
                    sudo cp ./versions.json ./dist
                    sudo docker-compose down
                    sudo docker-compose up -d'''
                }
            }
        }
    }
}
// npm run prebuild && npm run build && docker-compose down && docker-compose up
// sudo rm -rf build
// sudo npm run build
// sudo cp ./.env ./dist