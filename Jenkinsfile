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
        echo "Code already checked out by Jenkins"
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

    stage('Update GitOps Repo') {
    steps {
        container('kaniko') {
            withCredentials([usernamePassword(
                credentialsId: 'github-creds',
                usernameVariable: 'GIT_USER',
                passwordVariable: 'GIT_PASS'
            )]) {
                sh '''
                TAG=ci-${BUILD_NUMBER}

                git clone https://${GIT_USER}:${GIT_PASS}@github.com/Soham-Galaxy/k8s-gitops.git
                cd k8s-gitops

                sed -i "s|shopping-backend:.*|shopping-backend:$TAG|" apps/shopping-app/base/backend-deployment.yaml
                sed -i "s|shopping-frontend:.*|shopping-frontend:$TAG|" apps/shopping-app/base/frontend-deployment.yaml

                git config user.email "jenkins@local"
                git config user.name "jenkins"

                git add .
                git commit -m "CI: update shopping app images $TAG"
                git push
                '''
                }
          }
      }
    }

  }
}
