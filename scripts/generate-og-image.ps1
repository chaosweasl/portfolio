# Generates the default Open Graph / Twitter Card image (1200x630) for the site.
# Uses Windows GDI+ (System.Drawing), so it requires no npm dependencies.
# Run from the repo root:  powershell -NoProfile -ExecutionPolicy Bypass -File scripts\generate-og-image.ps1

Add-Type -AssemblyName System.Drawing

$width  = 1200
$height = 630

$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Catppuccin Mocha palette
$base   = [System.Drawing.Color]::FromArgb(255, 30, 30, 46)    # #1e1e2e
$mantle = [System.Drawing.Color]::FromArgb(255, 49, 50, 68)    # #313244
$mauve  = [System.Drawing.Color]::FromArgb(255, 203, 166, 247) # #cba6f7
$text   = [System.Drawing.Color]::FromArgb(255, 205, 214, 244) # #cdd6f4
$subtext= [System.Drawing.Color]::FromArgb(255, 166, 173, 200) # #a6adc8

# Background gradient
$rect  = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $rect, $base, $mantle,
    [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal
)
$g.FillRectangle($brush, $rect)
$brush.Dispose()

# Decorative border
$pen = New-Object System.Drawing.Pen($mauve, 2)
$g.DrawRectangle($pen, 40, 40, 1120, 550)
$pen.Dispose()

# Primary name
$fontName  = New-Object System.Drawing.Font("Consolas", 88, [System.Drawing.FontStyle]::Bold)
$nameBrush = New-Object System.Drawing.SolidBrush($mauve)
$g.DrawString("chaosweasl", $fontName, $nameBrush, 64, 200)
$fontName.Dispose()
$nameBrush.Dispose()

# Subtitle
$fontSub  = New-Object System.Drawing.Font("Segoe UI", 34, [System.Drawing.FontStyle]::Regular)
$subBrush = New-Object System.Drawing.SolidBrush($text)
$g.DrawString("Serban-Daniel Iacob - Software Developer", $fontSub, $subBrush, 64, 348)
$fontSub.Dispose()
$subBrush.Dispose()

# URL
$fontUrl  = New-Object System.Drawing.Font("Consolas", 24, [System.Drawing.FontStyle]::Regular)
$urlBrush = New-Object System.Drawing.SolidBrush($subtext)
$g.DrawString("chaosweasl.com", $fontUrl, $urlBrush, 64, 530)
$fontUrl.Dispose()
$urlBrush.Dispose()

$g.Dispose()

$outPath = Join-Path (Get-Location) "static\og-image.png"
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Output "Generated $outPath"
