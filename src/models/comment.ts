export interface Comment {
  commentId: string
  ticketId: string
  comment: string
  commentBy: string
  createdOn: string
  isOwner: boolean
  isDeleted: boolean
}

export interface AddCommentRequest {
  ticketId: string
  comment: string
}
