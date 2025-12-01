pipeline {
    agent any
    
    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['all', 'ui', 'api'],
            description: 'Select which test suite to run'
        )
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select browser for UI tests'
        )
        booleanParam(
            name: 'HEADED_MODE',
            defaultValue: false,
            description: 'Run tests in headed mode (visible browser)'
        )
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'main',
                    url: 'https://github.com/SaiHemanthMaddi/playwright-ui-api-framework.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                bat 'npm install'
                echo 'Installing Playwright browsers...'
                bat 'npx playwright install'
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    echo "Running ${params.TEST_SUITE} tests..."
                    
                    def headedFlag = params.HEADED_MODE ? '--headed' : ''
                    def browserFlag = "--project=${params.BROWSER}"
                    
                    if (params.TEST_SUITE == 'all') {
                        bat "npx playwright test ${headedFlag} ${browserFlag}"
                    } else if (params.TEST_SUITE == 'ui') {
                        bat "npx playwright test tests/ui ${headedFlag} ${browserFlag}"
                    } else if (params.TEST_SUITE == 'api') {
                        bat "npx playwright test tests/api ${browserFlag}"
                    }
                }
            }
        }
        
        stage('Generate Allure Report') {
            steps {
                echo 'Generating Allure report...'
                bat 'npm run allure:generate'
            }
        }
    }
    
    post {
        always {
            echo 'Archiving test results...'
            archiveArtifacts artifacts: 'allure-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-results/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
        }
        success {
            echo 'Tests passed successfully! ✅'
        }
        failure {
            echo 'Tests failed! ❌'
        }
    }
}
