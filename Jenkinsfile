pipeline {

  agent {
    kubernetes {
      inheritFrom 'kaniko-agent'
    }
  }

  environment {
    BACKEND_IMAGE = "soham22202/shopping-backend"
    FRONTEND_IMAGE = "soham22202/shopping-frontend"
    TAG = "ci-${BUILD_NUMBER}"
  }

  stages {

    stage('Checkout Code') {
      steps {
        git 'https://github.com/Soham-Galaxy/shopping-app.git'
      }
    }

    stage('Build Backend Image') {
      steps {
        container('kaniko') {
          sh '''
          /kaniko/executor \
            --context $WORKSPACE/backend \
            --dockerfile $WORKSPACE/backend/Dockerfile \
            --destination $BACKEND_IMAGE:$TAG
          '''
        }
      }
    }

    stage('Build Frontend Image') {
      steps {
        container('kaniko') {
          sh '''
          /kaniko/executor \
            --context $WORKSPACE/frontend \
            --dockerfile $WORKSPACE/frontend/Dockerfile \
            --destination $FRONTEND_IMAGE:$TAG
          '''
        }
      }
    }

  }
}
