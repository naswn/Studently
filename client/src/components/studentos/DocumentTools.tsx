import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Camera, 
  Upload, 
  Download, 
  Palette, 
  Sliders, 
  Grid, 
  Check, 
  RefreshCw,
  Printer,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { ThemeMode } from '../../types/studentos';

interface DocumentToolsProps {
  theme: ThemeMode;
}

export const DocumentTools: React.FC<DocumentToolsProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'passport' | 'pdf-maker' | 'a4-builder'>('passport');

  // Passport Photo State
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // File upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setImageSrc(evt.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Render Passport Photo Canvas
  const renderSinglePassportPhoto = () => {
    if (!imageSrc || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      // 35x45mm passport ratio = 350x450px
      canvas.width = 350;
      canvas.height = 450;

      // Fill background color
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Apply brightness & contrast
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

      // Center crop & scale image to fill 350x450 canvas
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let startX = 0;
      let startY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvas.height * imgRatio;
        startX = (canvas.width - drawWidth) / 2;
      } else {
        drawHeight = canvas.width / imgRatio;
        startY = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(img, startX, startY, drawWidth, drawHeight);
      ctx.filter = 'none';

      // Draw subtle border around photo
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    };
  };

  // Render 4x6 Printable Grid (8 photos)
  const renderGridPassportPrint = () => {
    if (!imageSrc || !gridCanvasRef.current) return;
    const canvas = gridCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      // 4x6 inch print grid at 150 DPI = 600x900px
      canvas.width = 600;
      canvas.height = 900;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 8 photos (2 columns x 4 rows)
      const photoWidth = 240;
      const photoHeight = 310;
      const marginX = 40;
      const marginY = 30;

      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 2; col++) {
          const x = marginX + col * (photoWidth + marginX);
          const y = marginY + row * (photoHeight + 15);

          // Background
          ctx.fillStyle = bgColor;
          ctx.fillRect(x, y, photoWidth, photoHeight);

          // Draw photo inside
          ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
          
          const imgRatio = img.width / img.height;
          const photoRatio = photoWidth / photoHeight;

          let drawWidth = photoWidth;
          let drawHeight = photoHeight;
          let startX = x;
          let startY = y;

          if (imgRatio > photoRatio) {
            drawWidth = photoHeight * imgRatio;
            startX = x + (photoWidth - drawWidth) / 2;
          } else {
            drawHeight = photoWidth / imgRatio;
            startY = y + (photoHeight - drawHeight) / 2;
          }

          ctx.drawImage(img, startX, startY, drawWidth, drawHeight);
          ctx.filter = 'none';

          // Cutting guides line
          ctx.strokeStyle = '#94A3B8';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(x, y, photoWidth, photoHeight);
        }
      }
    };
  };

  React.useEffect(() => {
    if (imageSrc) {
      renderSinglePassportPhoto();
      renderGridPassportPrint();
    }
  }, [imageSrc, bgColor, brightness, contrast]);

  // Download handlers
  const downloadSinglePhoto = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'passport_photo_studentos.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const downloadGridPrint = () => {
    if (!gridCanvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'passport_4x6_grid_print.png';
    link.href = gridCanvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className={`p-6 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              📄 Passport Photo & Document Tools
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Crop official passport photos, change background colors, generate 4x6 print sheets, and format PDF documents.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={() => setActiveTab('passport')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'passport'
                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                : isDark ? 'bg-slate-950 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            Passport Photo Creator
          </button>
          <button
            onClick={() => setActiveTab('pdf-maker')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'pdf-maker'
                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                : isDark ? 'bg-slate-950 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            Image to PDF Converter
          </button>
        </div>
      </div>

      {/* TAB 1: PASSPORT PHOTO MAKER */}
      {activeTab === 'passport' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Controls */}
          <div className={`p-6 rounded-3xl border space-y-6 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className={`text-base font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Sliders className="w-5 h-5 text-cyan-400" />
              Upload & Studio Settings
            </h3>

            {/* Upload Button */}
            <div>
              <label className={`block text-xs font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                1. Select Student Photo
              </label>
              <label className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                isDark 
                  ? 'border-slate-800 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-slate-950' 
                  : 'border-slate-300 bg-slate-50 hover:border-cyan-500/50 hover:bg-white'
              }`}>
                <Upload className="w-8 h-8 text-cyan-400 mb-2" />
                <span className="text-xs font-bold text-slate-300">Click to upload photo</span>
                <span className="text-[10px] text-slate-500">JPG, PNG or WEBP (Max 5MB)</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            {/* Background Color Picker */}
            <div>
              <label className={`block text-xs font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                2. Studio Background Color
              </label>
              <div className="flex items-center gap-2">
                {[
                  { name: 'Pure White', hex: '#FFFFFF' },
                  { name: 'Off-White', hex: '#F8FAFC' },
                  { name: 'Passport Blue', hex: '#38BDF8' },
                  { name: 'Light Grey', hex: '#CBD5E1' }
                ].map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setBgColor(color.hex)}
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                      bgColor === color.hex ? 'ring-2 ring-cyan-400 scale-110' : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {bgColor === color.hex && <Check className="w-4 h-4 text-slate-900" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Brightness Adjustment */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Brightness:</span>
                <span className="text-cyan-400 font-extrabold">{brightness}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="140"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Contrast Adjustment */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Contrast:</span>
                <span className="text-cyan-400 font-extrabold">{contrast}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="140"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

          </div>

          {/* Right Preview Canvas Columns */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Single Photo Preview */}
            <div className={`p-6 rounded-3xl border ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  📸 Single Passport Photo (35x45mm)
                </h3>
                {imageSrc && (
                  <button
                    onClick={downloadSinglePhoto}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-emerald-600"
                  >
                    <Download className="w-4 h-4" /> Download Single
                  </button>
                )}
              </div>

              {imageSrc ? (
                <div className="flex flex-col items-center">
                  <canvas
                    ref={canvasRef}
                    className="w-48 h-60 rounded-xl shadow-xl border border-slate-700 object-cover"
                  />
                  <p className="text-[11px] text-slate-400 mt-3">
                    Standard 35mm x 45mm official size format
                  </p>
                </div>
              ) : (
                <div className="h-60 flex items-center justify-center text-slate-500 text-xs border-2 border-dashed border-slate-800 rounded-2xl">
                  Upload a photo to preview passport crop
                </div>
              )}
            </div>

            {/* 4x6 Print Grid Preview */}
            <div className={`p-6 rounded-3xl border ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  🖼️ 4x6 Printable Grid (8 Photos)
                </h3>
                {imageSrc && (
                  <button
                    onClick={downloadGridPrint}
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-cyan-600"
                  >
                    <Printer className="w-4 h-4" /> Download Printable 4x6 Sheet
                  </button>
                )}
              </div>

              {imageSrc ? (
                <div className="flex flex-col items-center">
                  <canvas
                    ref={gridCanvasRef}
                    className="w-64 h-96 rounded-xl shadow-xl border border-slate-700 bg-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-3">
                    Ready to print on standard 4x6 inch photo paper at any print studio
                  </p>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-slate-500 text-xs border-2 border-dashed border-slate-800 rounded-2xl">
                  Upload photo to generate 8-photo printable sheet
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: IMAGE TO PDF CONVERTER */}
      {activeTab === 'pdf-maker' && (
        <div className={`p-8 rounded-3xl border text-center ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <FileCheck className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Image to PDF Document Merger
          </h3>
          <p className={`text-xs max-w-md mx-auto mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Upload photos of your assignments, certificate scans, or notes to merge them into a single clean PDF document.
          </p>

          <div className="max-w-md mx-auto mt-6">
            <label className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-3xl cursor-pointer transition-all ${
              isDark ? 'border-slate-800 bg-slate-950/60 hover:border-cyan-500/50' : 'border-slate-300 bg-slate-50 hover:border-cyan-500/50'
            }`}>
              <Upload className="w-10 h-10 text-cyan-400 mb-2" />
              <span className="text-sm font-bold text-slate-200">Select Multiple Images</span>
              <span className="text-xs text-slate-500 mt-1">Converts JPG/PNG directly into A4 PDF pages</span>
              <input type="file" multiple accept="image/*" className="hidden" />
            </label>
          </div>
        </div>
      )}

    </div>
  );
};
