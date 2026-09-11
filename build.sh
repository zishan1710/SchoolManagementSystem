#!/bin/bash

# School Management Application - Build Script
# This script helps build and run the entire application

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "\n${GREEN}========================================${NC}"
    echo -e "${GREEN}$1${NC}"
    echo -e "${GREEN}========================================${NC}\n"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Main menu
show_menu() {
    echo -e "${YELLOW}Select an option:${NC}"
    echo "1. Build Backend Only"
    echo "2. Build Frontend Only"
    echo "3. Build Both (Frontend & Backend)"
    echo "4. Run Backend (requires PostgreSQL)"
    echo "5. Run Frontend"
    echo "6. Run Both with Docker Compose"
    echo "7. Clean Build (remove artifacts)"
    echo "8. Exit"
    echo ""
    read -p "Enter choice [1-8]: " choice
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check Java
    if command -v java &> /dev/null; then
        JAVA_VERSION=$(java -version 2>&1 | grep "version" | cut -d' ' -f3 | cut -d'.' -f1)
        print_success "Java $JAVA_VERSION found"
    else
        print_error "Java is not installed"
        return 1
    fi
    
    # Check Maven
    if command -v mvn &> /dev/null; then
        print_success "Maven found"
    else
        print_warning "Maven is not installed. Install it to build backend."
    fi
    
    # Check Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v)
        print_success "Node.js $NODE_VERSION found"
    else
        print_warning "Node.js is not installed. Install it to build frontend."
    fi
    
    # Check Docker
    if command -v docker &> /dev/null; then
        print_success "Docker found"
    else
        print_warning "Docker is not installed. Install it to use Docker Compose."
    fi
}

# Build Backend
build_backend() {
    print_header "Building Backend"
    
    if ! command -v mvn &> /dev/null; then
        print_error "Maven is required to build backend"
        return 1
    fi
    
    cd backend
    print_success "Building Spring Boot application..."
    mvn clean package -DskipTests
    
    if [ $? -eq 0 ]; then
        print_success "Backend built successfully"
        cd ..
        return 0
    else
        print_error "Backend build failed"
        cd ..
        return 1
    fi
}

# Build Frontend
build_frontend() {
    print_header "Building Frontend"
    
    if ! command -v npm &> /dev/null; then
        print_error "Node.js and npm are required to build frontend"
        return 1
    fi
    
    cd frontend
    print_success "Installing dependencies..."
    npm install
    
    print_success "Building React application..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Frontend built successfully"
        cd ..
        return 0
    else
        print_error "Frontend build failed"
        cd ..
        return 1
    fi
}

# Run Backend
run_backend() {
    print_header "Running Backend"
    
    cd backend
    
    # Check if JAR exists
    if [ ! -f "target/school-management-backend-1.0.0.jar" ]; then
        print_warning "JAR file not found. Building..."
        if ! build_backend; then
            return 1
        fi
    fi
    
    print_success "Starting Spring Boot application on port 8080..."
    java -jar target/school-management-backend-1.0.0.jar
    cd ..
}

# Run Frontend
run_frontend() {
    print_header "Running Frontend"
    
    if ! command -v npm &> /dev/null; then
        print_error "Node.js and npm are required"
        return 1
    fi
    
    cd frontend
    
    if [ ! -d "node_modules" ]; then
        print_warning "Dependencies not installed. Installing..."
        npm install
    fi
    
    print_success "Starting React application on port 3000..."
    npm start
    cd ..
}

# Run with Docker Compose
run_docker_compose() {
    print_header "Running with Docker Compose"
    
    if ! command -v docker-compose &> /dev/null && ! command -v docker &> /dev/null; then
        print_error "Docker and Docker Compose are required"
        return 1
    fi
    
    print_success "Starting all services..."
    docker-compose up --build
}

# Clean build
clean_build() {
    print_header "Cleaning Build Artifacts"
    
    print_success "Removing backend build artifacts..."
    cd backend
    mvn clean
    cd ..
    
    print_success "Removing frontend build artifacts..."
    cd frontend
    rm -rf node_modules build
    cd ..
    
    print_success "Clean complete"
}

# Main execution
main() {
    clear
    echo -e "${GREEN}"
    echo "╔═══════════════════════════════════════╗"
    echo "║  School Management Application        ║"
    echo "║  Build & Run Script                   ║"
    echo "╚═══════════════════════════════════════╝"
    echo -e "${NC}"
    
    check_prerequisites
    
    while true; do
        show_menu
        case $choice in
            1)
                build_backend
                ;;
            2)
                build_frontend
                ;;
            3)
                build_backend && build_frontend
                ;;
            4)
                run_backend
                ;;
            5)
                run_frontend
                ;;
            6)
                run_docker_compose
                ;;
            7)
                clean_build
                ;;
            8)
                print_success "Exiting..."
                exit 0
                ;;
            *)
                print_error "Invalid option"
                ;;
        esac
    done
}

# Run main function
main
