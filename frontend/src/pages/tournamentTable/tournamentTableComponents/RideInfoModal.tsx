import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react'
import React, { FC } from 'react'
import { ModalProps } from '../../../../types'
import { TableRowsType } from '../tournamentTableUtils'
type RideInfoModalProps = {modalProps:ModalProps,ride:TableRowsType}
export const RideInfoModal:FC<RideInfoModalProps> = ({modalProps,ride}) => {
    const {isOpen,onOpen,onOpenChange} = modalProps
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">dupa</ModalHeader>
              <ModalBody>
                <p>{ride.czas}</p>
                <p>{ride.gokart}</p>
                <p>{ride.pozycja}</p>
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}
