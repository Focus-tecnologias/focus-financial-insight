$srcDir = "src"
$files = Get-ChildItem -Path $srcDir -Include "*.tsx","*.ts","*.css" -Recurse

$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if ($content -and $content.Contains("<<<<<<< HEAD")) {
        $fixed = [regex]::Replace($content, '(?s)<<<<<<< HEAD\r?\n.*?=======\r?\n(.*?)>>>>>>> [^\r\n]+\r?\n?', '$1')
        Set-Content -Path $file.FullName -Value $fixed -NoNewline -Encoding UTF8
        Write-Host "Fixed: $($file.Name)"
        $count++
    }
}
Write-Host "Total fixed: $count"
