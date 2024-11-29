pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'development', url: 'https://github.com/boostcampwm-2024/web28-DDara.git'
            }
        }

        stage('Set up Environment') {
            steps {
                script {
                    sh '''
                    echo "DB_HOST=${DB_HOST}" > backend/.env
                    echo "DB_PORT=${DB_PORT}" >> backend/.env
                    echo "DB_USER=${DB_USER}" >> backend/.env
                    echo "DB_PASSWORD=${DB_PASSWORD}" >> backend/.env
                    echo "DB_NAME=${DB_NAME}" >> backend/.env
                    echo "JWT_SECRET=${JWT_SECRET}" >> backend/.env
                    '''
                }
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    sh '''
                    docker-compose up -d --build
                    '''
                }
            }
        }
    }
}
