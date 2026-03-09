@echo off
REM ================================================
REM SGI ATLAS - Local Development Server
REM ================================================

setlocal enabledelayedexpansion

echo.
echo ========================================
echo  SGI ATLAS - Development Server
echo ========================================
echo.

REM Verificar se está no diretório correto
if not exist "public_html\" (
    echo ERRO: Diretório 'public_html' não encontrado!
    echo Este script deve ser executado no diretório raiz do projeto.
    pause
    exit /b 1
)

REM Detectar porta
set PORT=8000
if not "%1"=="" set PORT=%1

echo ✅ Iniciando servidor PHP...
echo.
echo 🌐 Servidor disponível em: http://localhost:%PORT%
echo.
echo 📋 Credenciais de Teste:
echo    Email: usuario@tiiuai.com.br
echo    Senha: 123456
echo.
echo 📁 Diretório raiz: public_html/
echo.
echo 💡 Dica: Abra http://localhost:%PORT% no navegador
echo.
echo ⏹️  Pressione Ctrl+C para parar o servidor
echo.
echo ========================================
echo.

REM Iniciar servidor
php -S localhost:%PORT% -t public_html

pause
