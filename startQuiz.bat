@echo off
set PROJECT_PATH=%USERPROFILE%\Desktop\v3a-scanntech-quiz
cd /d "%PROJECT_PATH%"
start cmd /k "pnpm dev"
timeout /t 10

REM Solicita ao usuário para escolher o navegador, com fallback para Edge se nenhum input for dado.
set /p BROWSER="Enter your browser executable name (e.g., chrome, firefox, iexplore) or press Enter to use Edge: "
if "%BROWSER%"=="" set BROWSER=msedge

REM Abre o navegador escolhido em modo quiosque.
if /i "%BROWSER%"=="chrome" (
    start chrome --new-window --kiosk http://localhost:3000
) else if /i "%BROWSER%"=="firefox" (
    start firefox --kiosk http://localhost:3000
) else if /i "%BROWSER%"=="msedge" (
    REM Certifique-se de que o caminho para o Edge está correto e que o Edge está instalado.
    start msedge --kiosk http://localhost:3000 --edge-kiosk-type=fullscreen
) else if /i "%BROWSER%"=="iexplore" (
    echo Internet Explorer não suporta modo quiosque diretamente.
    start iexplore http://localhost:3000
) else (
    echo Modo quiosque não configurado para este navegador. Abrindo normalmente.
    start %BROWSER% http://localhost:3000
)

timeout /t 5