import { readFileSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'Beslenme_Programi.txt')
    const content = readFileSync(filePath, 'utf-8')
    
    return NextResponse.json({ 
      success: true, 
      content,
      lastModified: new Date().toISOString()
    })
  } catch (error) {
    console.error('Beslenme programı okunamadı:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Dosya okunamadı' 
    }, { status: 500 })
  }
}