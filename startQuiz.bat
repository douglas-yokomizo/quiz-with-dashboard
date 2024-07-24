@echo off
set /p BROWSER="Enter your browser executable name (e.g., msedge, firefox, iexplore) or press Enter to use Chrome: "
if "%BROWSER%"=="" set BROWSER=chrome


cd "C:\Users\yokz\Documents\Phygital\v3a-scanntech-quiz"
start cmd /k "pnpm dev"
timeout /t 10

REM Adicionando opções de linha de comando para abrir em modo quiosque
if /i "%BROWSER%"=="chrome" (
    start chrome --new-window --kiosk http://localhost:3000
) else if /i "%BROWSER%"=="firefox" (
    start firefox --kiosk http://localhost:3000
) else if /i "%BROWSER%"=="msedge" (
    start msedge --kiosk http://localhost:3000
) else if /i "%BROWSER%"=="iexplore" (
    echo Internet Explorer não suporta modo quiosque diretamente.
    start iexplore http://localhost:3000
) else (
    echo Modo quiosque não configurado para este navegador. Abrindo normalmente.
    start %BROWSER% http://localhost:3000
)

timeout /t 5
exit