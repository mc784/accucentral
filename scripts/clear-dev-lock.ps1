Param(
  [string]$Port = "3000",
  [string]$Workspace = ""
)

if ([string]::IsNullOrWhiteSpace($Workspace)) {
  $Workspace = (Get-Location).Path
}

Write-Host "Workspace:" $Workspace
Write-Host "Checking for listeners on port $Port"
$conn = $null
try { $conn = Get-NetTCPConnection -LocalPort [int]$Port -ErrorAction SilentlyContinue } catch {}

if ($conn) {
  $processIdentifier = $conn.OwningProcess
  Write-Host ("Found process on port {0} (PID {1}). Attempting to stop..." -f $Port, $processIdentifier)
  try {
    Stop-Process -Id $processIdentifier -Force -ErrorAction Stop
    Write-Host ("Stopped process {0}" -f $processIdentifier)
  } catch {
    Write-Host ("Failed to stop process {0}: {1}" -f $processIdentifier, $_)
  }
} else {
  Write-Host "No process is listening on port $Port"
}

$lockPath = Join-Path $Workspace ".next\dev\lock"
Write-Host "Removing Next.js dev lock at: $lockPath"
if (Test-Path $lockPath) {
  try {
    Remove-Item -Force $lockPath
    Write-Host "Removed lock file"
  } catch {
    Write-Host "Failed to remove lock file: $_"
  }
} else {
  Write-Host "No lock file present"
}

$cachePath = Join-Path $Workspace ".next\cache"
if (Test-Path $cachePath) {
  Write-Host "Clearing Next.js cache at: $cachePath"
  try {
    Remove-Item -Recurse -Force $cachePath
    Write-Host "Cache cleared"
  } catch {
    Write-Host "Failed to clear cache: $_"
  }
} else {
  Write-Host "No cache directory present"
}

Write-Host "Done. You can now run: npm run dev"
