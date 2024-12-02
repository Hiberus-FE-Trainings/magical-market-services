export type Item = {
  id: string
  name: string
  description: string
  category: string
  price: number
  approval_status: "Pending" | "Approved" | "Rejected"
  image_url: string
  seller_id: number
}

export type ContextWithParams = {
  params: { [key: string]: string | undefined }
}
