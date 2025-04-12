'use client'
import { getDictionary } from '@/get-dictionary'
import TextWithImage from './ui/TextWithImage'

export default function VitaminSection({
  dictionary
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['vitamin']
}) {
  return (
    <TextWithImage
      title={dictionary.title}
      subtitle={dictionary.description}
      imageSrc="/assets/vitamin.png"
      imagePosition="left"
      imageAlt="Vitamin"
      backgroundColor="#fcfcfc"
    />
  )
}
