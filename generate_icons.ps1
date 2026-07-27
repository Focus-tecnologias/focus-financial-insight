Add-Type -AssemblyName System.Drawing

$srcPath = 'C:\Users\adria\Documents\antigravity\calm-hertz\focus-financial-insight-main\public\icon.png'
$src = [System.Drawing.Image]::FromFile($srcPath)

$jobs = @(
    @{ size = 512; name = 'icon-512.png' },
    @{ size = 192; name = 'icon-192.png' },
    @{ size = 180; name = 'apple-touch-icon.png' }
)

foreach ($job in $jobs) {
    $size = $job.size
    $name = $job.name

    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Background: clean white
    $g.Clear([System.Drawing.Color]::White)

    # Reduce logo to 70% of canvas, centered (15% padding each side)
    $iconSize = [int]($size * 0.70)
    $offset = [int](($size - $iconSize) / 2)

    $destRect = New-Object System.Drawing.Rectangle($offset, $offset, $iconSize, $iconSize)
    $g.DrawImage($src, $destRect)

    $outPath = "C:\Users\adria\Documents\antigravity\calm-hertz\focus-financial-insight-main\public\$name"
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()

    Write-Host "Created: $name"
}

$src.Dispose()
Write-Host "Done!"
