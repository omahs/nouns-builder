import React, { BaseSyntheticEvent } from 'react'
import { Button } from '@zoralabs/zord'

import AnimatedModal from 'src/components/Modal/AnimatedModal'
import { useFormStore } from 'src/stores/useFormStore'
import { flatten } from 'src/utils/helpers'

import Playground from '../Artwork/PreviewModal/Playground'

const PreviewArtwork: React.FC = () => {
  const { ipfsUpload } = useFormStore()

  const images = React.useMemo(() => {
    if (!ipfsUpload) return

    const entries = Object.entries(ipfsUpload)
    const uploads = entries.reduce((acc: any[] = [], cv) => {
      acc.push(cv[1])

      return acc
    }, [])

    const flat = uploads.reduce((acc: any[] = [], cv) => {
      if (!cv || typeof cv !== 'object') return
      const image = flatten(cv)
      acc.push({
        cid: image.cid,
        name: image.name,
        trait: image.trait,
        uri: image.uri,
        url: image.url,
        content: cv.content,
      })

      return acc
    }, [])

    return flat
  }, [ipfsUpload])

  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)

  return (
    <>
      <Button
        width="100%"
        onClick={(e: BaseSyntheticEvent) => {
          e.stopPropagation()
          setIsOpenModal(true)
        }}
      >
        Preview Artwork
      </Button>
      {images && (
        <AnimatedModal
          open={isOpenModal}
          close={() => setIsOpenModal(false)}
          size={'large'}
        >
          <Playground images={images} />
        </AnimatedModal>
      )}
    </>
  )
}

export default PreviewArtwork