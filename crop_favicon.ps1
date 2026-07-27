Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile('C:\Users\adria\.gemini\antigravity\brain\f3b638c1-be52-4b4d-9810-56849d8de8fb\media__1784741367176.png')

$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # We only consider pixels that are not fully transparent and not pure white
        if ($c.A -gt 10 -and ($c.R -lt 250 -or $c.G -lt 250 -or $c.B -lt 250)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$w = $maxX - $minX + 1
$h = $maxY - $minY + 1

$size = [math]::Max($w, $h)
# Add 10% padding so it looks good as an app icon
$padding = [int][math]::Round($size * 0.1) 

$finalSize = [int]($size + ($padding * 2))
$square = [System.Drawing.Bitmap]::new($finalSize, $finalSize)
$g = [System.Drawing.Graphics]::FromImage($square)
$g.Clear([System.Drawing.Color]::Transparent)

$destX = [int]($padding + [math]::Round(($size - $w) / 2))
$destY = [int]($padding + [math]::Round(($size - $h) / 2))
$srcRect = [System.Drawing.Rectangle]::new([int]$minX, [int]$minY, [int]$w, [int]$h)

$g.DrawImage($bmp, $destX, $destY, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$g.Dispose()
$bmp.Dispose()

$square.Save('C:\Users\adria\Documents\antigravity\calm-hertz\focus-financial-insight-main\public\icon.png', [System.Drawing.Imaging.ImageFormat]::Png)
$square.Dispose()
Write-Host "Favicon recortado com sucesso! Original bounds: $w x $h. New square: $finalSize x $finalSize"
