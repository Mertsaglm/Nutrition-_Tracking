#!/bin/bash

echo "🚀 Beslenme Takip Sistemi Kurulumu Başlıyor..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js bulunamadı. Lütfen Node.js'i yükleyin: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm bulunamadı. Lütfen npm'i yükleyin."
    exit 1
fi

echo "✅ Node.js ve npm bulundu"

# Install dependencies
echo "📦 Bağımlılıklar yükleniyor..."
npm install

# Fix security vulnerabilities
echo "🔒 Güvenlik güncellemeleri yapılıyor..."
npm audit fix

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local dosyası bulunamadı"
    echo "📝 .env.example dosyasını .env.local olarak kopyalayın ve Gemini API anahtarınızı ekleyin"
    cp .env.example .env.local
    echo "🔑 Gemini API anahtarınızı .env.local dosyasına ekleyin"
else
    echo "✅ .env.local dosyası mevcut"
fi

echo ""
echo "🎉 Kurulum tamamlandı!"
echo ""
echo "🚀 Uygulamayı başlatmak için:"
echo "   npm run dev"
echo ""
echo "🌐 Uygulama şu adreste çalışacak:"
echo "   http://localhost:3000"
echo ""
echo "📚 Daha fazla bilgi için README.md dosyasını okuyun"