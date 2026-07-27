$routesDir = "src\routes"
$files = Get-ChildItem -Path $routesDir -Include "*.tsx","*.ts" -Recurse

$conflictedFiles = @()
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if ($content -and $content.Contains("<<<<<<< HEAD")) {
        $conflictedFiles += $file.FullName
        Write-Host "CONFLICT: $($file.FullName)"
    }
}

Write-Host "Total conflicted files: $($conflictedFiles.Count)"

# For each conflicted file: keep the second version (after =======, before >>>>>>>)
foreach ($filePath in $conflictedFiles) {
    $content = Get-Content $filePath -Raw
    
    # Pattern to match conflict blocks and keep the second version (our commit)
    # <<<<<<< HEAD\n...first...\n=======\n...second...\n>>>>>>> hash
    $pattern = '<<<<<<< HEAD\r?\n(.*?)\r?\n=======\r?\n(.*?)\r?\n>>>>>>> [^\r\n]+\r?\n?'
    
    # Use -replace to keep only the second part
    $fixed = [regex]::Replace($content, '(?s)<<<<<<< HEAD\r?\n.*?=======\r?\n(.*?)>>>>>>> [^\r\n]+\r?\n?', '$1')
    
    Set-Content -Path $filePath -Value $fixed -NoNewline -Encoding UTF8
    Write-Host "Fixed: $filePath"
}
