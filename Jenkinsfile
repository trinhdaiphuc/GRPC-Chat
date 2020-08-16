pipeline {
    agent none

    stages {
        stage('Test') {
            agent {
                docker {
                    image 'go:1.14-alpine'
                    args '-u 0:0 -v /tmp:/root/.cache'
                }
            }
            steps {
                echo 'Installing dependencies'
                sh 'go version'
                sh 'go get -u golang.org/x/lint/golint'
                sh 'go mod download'
                withEnv(["PATH+GO=${GOPATH}/bin"]){
                    echo 'Running vetting'
                    sh 'go vet ./...'
                    echo 'Running linting'
                    sh 'golint ./...'
                    echo 'Running test'
                    sh 'go test -v ./...'
                }
            }
        }
        
    }
    post {
        always {
            emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                to: "${params.RECIPIENTS}",
                subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
            
        }
    }  
}