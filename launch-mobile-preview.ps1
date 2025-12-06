# Launch Edge in mobile emulation mode for Accucentral testing
# Double-click this file to open Edge with DevTools in mobile view

$url = "http://localhost:3000/patient/book"

Write-Host "🚀 Launching Accucentral in Mobile Preview Mode..." -ForegroundColor Green
Write-Host "📱 Waiting for dev server to be ready..." -ForegroundColor Cyan

# Wait for localhost to be ready (max 30 seconds)
$maxAttempts = 30
$attempt = 0
$serverReady = $false

while ($attempt -lt $maxAttempts -and -not $serverReady) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method Head -TimeoutSec 1 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            $serverReady = $true
        }
    } catch {
        Start-Sleep -Seconds 1
        $attempt++
    }
}

if ($serverReady) {
    Write-Host "✅ Server ready! Opening Edge..." -ForegroundColor Green
    # Launch Edge with DevTools and device emulation
    # --auto-open-devtools-for-tabs opens F12 automatically
    Start-Process "msedge.exe" -ArgumentList "--auto-open-devtools-for-tabs", $url
} else {
    Write-Host "⚠️  Server not ready yet. Opening Edge anyway..." -ForegroundColor Yellow
    Start-Process "msedge.exe" -ArgumentList "--auto-open-devtools-for-tabs", $url
}

Write-Host ""
Write-Host "✅ Edge opened!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Quick steps:" -ForegroundColor Yellow
Write-Host "   1. Press F12 to open DevTools"
Write-Host "   2. Click the 📱 device icon (top-left of DevTools)"
Write-Host "      OR Press Ctrl+Shift+D for device emulation"
Write-Host "   3. Select 'iPhone 12 Pro' from dropdown"
Write-Host ""
Write-Host "💡 Keep this Edge window dedicated for mobile testing!" -ForegroundColor Cyan
