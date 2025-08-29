export interface AttachmentMapping {
  entityId: string,
  attachmentLevel: string
}


export interface DocumentType {
  level: string
  migrateToDMS: boolean
  description: string
  status: string
  oneBossId: number
  visibleToClientAttachment: boolean
  showInKYCSupervision: boolean
  showInDocumentSupervision: boolean
  availableInClientLevelAttachments: boolean

}

export interface AttachmentApiResponse {
  attachmentMappings: AttachmentMapping[]
  documentType: DocumentType
  clientUuid: string
  data: string | null
  description: string  // this is “Notes” entered by user
  status: string
  createdDate: string
  oneBossId: number
  visibleByClient: string

}