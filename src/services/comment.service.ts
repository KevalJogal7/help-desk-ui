import { http } from '../api/http'
import type { Comment, AddCommentRequest } from '../models/comment'

export const getComments = async (ticketId: string): Promise<Comment[]> => {
  return http.get<Comment[]>(`/comment/list/${ticketId}`)
}

export const addComment = async (data: AddCommentRequest): Promise<Comment> => {
  return http.post<Comment>(`/comment/add`, data)
}

export const deleteComment = async (commentId: string): Promise<void> => {
  return http.delete<void>(`/comment/delete/${commentId}`)
}
