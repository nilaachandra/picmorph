'use client'

import { useState, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import imageCompression from 'browser-image-compression'
import Hero from './Hero'
import { AiFillPicture, AiOutlineLoading } from "react-icons/ai";
import { LuGithub } from "react-icons/lu";
import Footer from './footer'


function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function ImageConverter() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png')
  const [quality, setQuality] = useState<number>(80)
  const [convertedImage, setConvertedImage] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState<string>('')
  const [convertedSize, setConvertedSize] = useState<string>('')
  const [manualWidth, setManualWidth] = useState<string>('')
  const [manualHeight, setManualHeight] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setOriginalSize(formatFileSize(file.size))
      setConvertedImage(null)
      setConvertedSize('')
      setManualWidth('')
      setManualHeight('')
    }
  }, [])

  const handleConvert = useCallback(async () => {
    setIsLoading(true);
    if (!selectedImage) return

    const options = {
      maxSizeMB: 0.9, // 900KB limit
      maxWidthOrHeight: Math.max(
        manualWidth ? parseInt(manualWidth) : Infinity,
        manualHeight ? parseInt(manualHeight) : Infinity
      ),
      useWebWorker: true,
      fileType: `image/${format}`,
      quality: quality / 100,
    }

    try {
      const compressedFile = await imageCompression(selectedImage, options)
      const reader = new FileReader()
      reader.onloadend = () => {
        setConvertedImage(reader.result as string)
        setConvertedSize(formatFileSize(compressedFile.size))
      }
      reader.readAsDataURL(compressedFile)
      setIsLoading(false)
    } catch (error) {
      console.error('Error converting image:', error)
      setIsLoading(false)
    }
  }, [selectedImage, format, quality, manualWidth, manualHeight])

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <nav className='w-full flex justify-between items-center'>
        <div className='flex items-center gap-1 bg-white rounded-md text-[#e21d48] px-2'>
          <AiFillPicture size={24} />
          <h1 className="text-2xl font-bold">PicMorph</h1>
        </div>
        <div className='flex items-center flex-col'>
          <a href=''><LuGithub size={18} /></a>
          <span className='text-xs'>⭐ on GitHub</span>
        </div>
      </nav>
      <Hero />
      <div className="space-y-4">
        <div>
          <Label htmlFor="format">Upload a Picture</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-[#e21d48]"
          />
        </div>
        {previewUrl && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Preview:</h2>
            <img
              ref={imageRef}
              src={previewUrl}
              alt="Preview"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
            <p className="mt-2 text-sm text-[#e21d48]">Original Size: {originalSize}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="format">Format</Label>
            <Select onValueChange={(value: 'png' | 'jpeg' | 'webp') => setFormat(value)}>
              <SelectTrigger id="format" className='text-[#e21d48]'>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent className='text-[#e21d48]'>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpeg">JPG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-5 items-start'>
            <Label htmlFor="quality">Quality: {quality}%</Label>
            <Slider
              id="quality"
              min={1}
              max={100}
              step={1}
              value={[quality]}
              onValueChange={(value) => setQuality(value[0])}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="width">Width (px)</Label>
            <Input
              id="width"
              type="number"
              placeholder="Auto"
              className='text-[#e21d48]'
              value={manualWidth}
              onChange={(e) => setManualWidth(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="height">Height (px)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Auto"
              className='text-[#e21d48]'
              value={manualHeight}
              onChange={(e) => setManualHeight(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleConvert} disabled={!selectedImage}>
          {isLoading ? <><AiOutlineLoading className='mr-2 h-4 w-4 animate-spin' />Converting...</> : <>Convert</>}
        </Button>
        {convertedImage && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2 ">Converted Image:</h2>
            <img src={convertedImage} alt="Converted" className="max-w-full h-auto rounded-lg shadow-md" />
            <p className="mt-2 text-sm text-[#e21d48]">Converted Size: {convertedSize}</p>
            <div className="mt-2 flex items-center space-x-4">
              <a
                href={convertedImage}
                download={`picmorph.${format}`}
                className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Download
              </a>
              <p className="text-sm text-[#e21d48]">
                Size reduction: {originalSize && convertedSize
                  ? `${((1 - (parseInt(convertedSize) / parseInt(originalSize))) * 100).toFixed(2)}%`
                  : 'N/A'}
              </p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
