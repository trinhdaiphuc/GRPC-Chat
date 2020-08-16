pipeline {
    agent none

    stages {
        stage('Test') {
            agent any
            tools {
                go 'go1.14'
            }
            environment {
                GO114MODULE = 'on'
                CGO_ENABLED = 0 
                GOPATH = "${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_ID}"
            }
            steps {
                echo 'Installing dependencies'
                sh 'go version'
                sh 'go get -u golang.org/x/lint/golint'
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