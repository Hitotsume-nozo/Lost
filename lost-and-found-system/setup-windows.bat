@echo off
REM =============================================================================
REM  Lost & Found System - Windows Dependency Installer
REM  Author: Hitotsume-Nozo
REM  Date: August 1, 2026
REM =============================================================================

echo.
echo ============================================================================
echo   Lost ^& Found System - Windows Setup Script
echo   Installing all required dependencies for Database, Web, and AI layers
echo ============================================================================
echo.

REM Check for Administrator privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] This script must be run as Administrator!
    echo Please right-click and select "Run as Administrator".
    pause
    exit /b 1
)

REM Set execution policy for PowerShell scripts
powershell -Command "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"

REM =============================================================================
REM  1. CHECK & INSTALL PACKAGE MANAGERS
REM =============================================================================
echo [STEP 1/6] Checking Package Managers...

REM Check for Chocolatey
where choco >nul 2>nul
if %errorLevel% neq 0 (
    echo [INFO] Chocolatey not found. Installing...
    powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"
    echo [SUCCESS] Chocolatey installed.
) else (
    echo [OK] Chocolatey already installed.
)

REM Update Chocolatey
choco upgrade chocolatey -y

REM =============================================================================
REM  2. INSTALL DATABASE TOOLS (MySQL 8.0+)
REM =============================================================================
echo.
echo [STEP 2/6] Installing Database Tools (MySQL 8.0)...

where mysql >nul 2>nul
if %errorLevel% neq 0 (
    echo [INFO] MySQL not found. Installing via Chocolatey...
    choco install mysql -y --version=8.0.33
    echo [SUCCESS] MySQL installed.
    echo [ACTION] Please set your MySQL root password when prompted during first run.
) else (
    echo [OK] MySQL already installed.
    mysql --version
)

REM Install MySQL Workbench (Optional GUI)
echo [INFO] Installing MySQL Workbench (GUI Tool)...
choco install mysql-workbench -y

REM =============================================================================
REM  3. INSTALL NODE.JS & NPM (For Web Frontend)
REM =============================================================================
echo.
echo [STEP 3/6] Installing Node.js LTS & NPM...

where node >nul 2>nul
if %errorLevel% neq 0 (
    echo [INFO] Node.js not found. Installing LTS version...
    choco install nodejs-lts -y
    refreshenv
    echo [SUCCESS] Node.js installed.
) else (
    echo [OK] Node.js already installed.
    node --version
)

where npm >nul 2>nul
if %errorLevel% neq 0 (
    echo [ERROR] NPM not found despite Node installation. Please restart terminal.
) else (
    echo [OK] NPM already installed.
    npm --version
)

REM =============================================================================
REM  4. INSTALL PYTHON & AI DEPENDENCIES
REM =============================================================================
echo.
echo [STEP 4/6] Installing Python 3.11 & AI Libraries...

where python >nul 2>nul
if %errorLevel% neq 0 (
    echo [INFO] Python not found. Installing Python 3.11...
    choco install python311 -y
    refreshenv
    echo [SUCCESS] Python installed.
) else (
    echo [OK] Python already installed.
    python --version
)

REM Create Virtual Environment for AI
echo [INFO] Setting up Python Virtual Environment for AI...
if not exist "ai\venv" (
    mkdir ai 2>nul
    python -m venv ai\venv
    echo [SUCCESS] Virtual environment created at ai\venv
) else (
    echo [OK] Virtual environment already exists.
)

REM Activate Venv and Install AI Packages
echo [INFO] Installing AI/ML libraries (NumPy, Scikit-Learn, Sentence-Transformers)...
call ai\venv\Scripts\activate.bat
pip install --upgrade pip
pip install numpy scikit-learn sentence-transformers pandas requests
deactivate
echo [SUCCESS] AI dependencies installed.

REM =============================================================================
REM  5. INSTALL GIT & VS CODE (Development Tools)
REM =============================================================================
echo.
echo [STEP 5/6] Installing Development Tools...

where git >nul 2>nul
if %errorLevel% neq 0 (
    echo [INFO] Git not found. Installing...
    choco install git -y
    refreshenv
    echo [SUCCESS] Git installed.
) else (
    echo [OK] Git already installed.
    git --version
)

where code >nul 2>nul
if %errorLevel% neq 0 (
    echo [INFO] VS Code not found. Installing...
    choco install vscode -y
    echo [SUCCESS] VS Code installed.
) else (
    echo [OK] VS Code already installed.
)

REM Install VS Code Extensions
echo [INFO] Installing recommended VS Code extensions...
code --install-extension esbenp.prettier-vscode --force
code --install-extension dbaeumer.vscode-eslint --force
code --install-extension ms-python.python --force
code --install-extension bradlc.vscode-tailwindcss --force
code --install-extension cweijan.vscode-database-client2 --force

REM =============================================================================
REM  6. INSTALL WEB DEPENDENCIES
REM =============================================================================
echo.
echo [STEP 6/6] Installing Web Application Dependencies...

if exist "web-app\package.json" (
    cd web-app
    echo [INFO] Running npm install for Next.js project...
    call npm install --legacy-peer-deps
    echo [SUCCESS] Web dependencies installed.
    cd ..
) else (
    echo [WARNING] web-app/package.json not found. Skipping npm install.
    echo Please ensure you are in the correct project directory.
)

REM =============================================================================
REM  FINAL CONFIGURATION
REM =============================================================================
echo.
echo ============================================================================
echo   Installation Complete!
echo ============================================================================
echo.
echo [NEXT STEPS]
echo 1. Start MySQL Service:
echo    net start MySQL80
echo.
echo 2. Create Database:
echo    mysql -u root -p
echo    CREATE DATABASE lost_and_found;
echo    USE lost_and_found;
echo    source sql/schema/01_core_schema.sql;
echo    source sql/seed/01_seed_data.sql;
echo.
echo 3. Configure Environment:
echo    Copy web-app\.env.local.example to web-app\.env.local
echo    Update DB credentials in .env.local
echo.
echo 4. Run Web Server:
echo    cd web-app
echo    npm run dev
echo.
echo 5. Run AI Services (when needed):
echo    cd ai
echo    venv\Scripts\activate
echo    python vector_store.py
echo.
echo [DOCUMENTATION]
echo - See GUIDE.md for weekly implementation schedule
echo - See VERIFICATION_COMMANDS.md for testing steps
echo.
pause
