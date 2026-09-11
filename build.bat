@echo off
REM School Management Application - Build Script for Windows

setlocal enabledelayedexpansion

cls
echo.
echo ==========================================
echo School Management Application
echo Build and Run Script (Windows)
echo ==========================================
echo.

:menu
echo.
echo Select an option:
echo 1. Build Backend Only
echo 2. Build Frontend Only
echo 3. Build Both (Frontend and Backend)
echo 4. Run Backend
echo 5. Run Frontend
echo 6. Run Both Separately (open in new windows)
echo 7. Clean Build
echo 8. Exit
echo.

set /p choice="Enter choice [1-8]: "

if "%choice%"=="1" goto build_backend
if "%choice%"=="2" goto build_frontend
if "%choice%"=="3" goto build_both
if "%choice%"=="4" goto run_backend
if "%choice%"=="5" goto run_frontend
if "%choice%"=="6" goto run_both
if "%choice%"=="7" goto clean_build
if "%choice%"=="8" goto exit_script

echo Invalid option
goto menu

:build_backend
echo.
echo Building Backend...
echo.
cd backend
call mvn clean package -DskipTests
if %ERRORLEVEL% EQU 0 (
    echo.
    echo Backend built successfully!
) else (
    echo.
    echo Backend build failed!
)
cd ..
goto menu

:build_frontend
echo.
echo Building Frontend...
echo.
cd frontend
call npm install
call npm run build
if %ERRORLEVEL% EQU 0 (
    echo.
    echo Frontend built successfully!
) else (
    echo.
    echo Frontend build failed!
)
cd ..
goto menu

:build_both
call :build_backend
call :build_frontend
goto menu

:run_backend
echo.
echo Starting Backend on http://localhost:8080/api
echo.
cd backend
if not exist "target\school-management-backend-1.0.0.jar" (
    echo.
    echo JAR file not found. Building...
    call mvn clean package -DskipTests
)
java -jar target\school-management-backend-1.0.0.jar
cd ..
goto menu

:run_frontend
echo.
echo Starting Frontend on http://localhost:3000
echo.
cd frontend
if not exist "node_modules" (
    echo.
    echo Installing dependencies...
    call npm install
)
call npm start
cd ..
goto menu

:run_both
echo.
echo Opening Backend in new window...
start "School Management - Backend" cmd /k "cd backend && title Backend - localhost:8080 && mvn spring-boot:run"

echo.
echo Opening Frontend in new window...
start "School Management - Frontend" cmd /k "cd frontend && title Frontend - localhost:3000 && npm start"

echo.
echo Both applications are starting in separate windows
echo.
goto menu

:clean_build
echo.
echo Cleaning build artifacts...
echo.

echo Cleaning backend...
cd backend
call mvn clean
cd ..

echo Cleaning frontend...
cd frontend
if exist "node_modules" rmdir /s /q node_modules
if exist "build" rmdir /s /q build
cd ..

echo.
echo Clean complete!
echo.
goto menu

:exit_script
echo.
echo Exiting...
exit /b 0
