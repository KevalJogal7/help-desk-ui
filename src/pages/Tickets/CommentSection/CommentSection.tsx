import { useEffect, useRef, useState } from 'react'
import { TextField, Tooltip } from '@mui/material'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import { addComment, deleteComment, getComments } from '../../../services/comment.service'
import type { Comment } from '../../../models/comment'
import { authStorage } from '../../../services/storage.service'
import ConfirmationDialog from '../../../components/ConfirmationDialog'
import { TicketStatus, type Ticket } from '../../../models/ticket'
import {
  CommentAuthor,
  CommentAvatar,
  CommentBubble,
  CommentCount,
  CommentInputRow,
  CommentList,
  CommentMeta,
  CommentMetaRight,
  CommentRow,
  CommentSectionRoot,
  CommentSectionTitle,
  CommentText,
  CommentTime,
  DeleteButton,
  EmptyComments,
  SectionTitle,
  SenderAvatar,
  SendButton,
} from './CommentSection.styles'
import { formatTime, getInitials } from '../../../utils/utility'

const CommentSection = (ticket: Ticket) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const currentUser = authStorage.getUserName() ?? ''

  useEffect(() => {
    getComments(ticket.ticketId).then(setComments)
  }, [ticket.ticketId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [comments])

  const handleSend = async () => {
    const trimmed = text.trim()
    if (!trimmed || ticket.statusId === TicketStatus.CLOSED) return
    setSending(true)
    try {
      await addComment({ ticketId: ticket.ticketId, comment: trimmed })
    } finally {
      setText('')
      setSending(false)
      getComments(ticket.ticketId).then(setComments)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget || ticket.statusId === TicketStatus.CLOSED) return
    try {
      await deleteComment(deleteTarget)
    } finally {
      setDeleteTarget(null)
      getComments(ticket.ticketId).then(setComments)
    }
  }

  return (
    <>
      <CommentSectionRoot>

        {/* Header */}
        <CommentSectionTitle>
          <ChatBubbleOutlineRoundedIcon fontSize="small" color="primary" />
          <SectionTitle variant="subtitle1">
            Comments
            {comments.length > 0 && (
              <CommentCount component="span" variant="caption">
                ({comments.length})
              </CommentCount>
            )}
          </SectionTitle>
        </CommentSectionTitle>

        {/* Comment list */}
        {comments.length === 0 ? (
          <EmptyComments>No comments yet. Be the first to comment.</EmptyComments>
        ) : (
          <CommentList>
            {comments.map((c) => {
              const ownerProp = c.isOwner ? 'true' : 'false'
              return (
                <CommentRow key={c.commentId} isOwner={ownerProp}>
                  <CommentAvatar isOwner={ownerProp}>
                    {getInitials(c.commentBy)}
                  </CommentAvatar>

                  <CommentBubble isOwner={ownerProp}>
                    <CommentMeta>
                      <CommentAuthor>{c.isOwner ? 'You' : c.commentBy}</CommentAuthor>
                      <CommentMetaRight>
                        <Tooltip title={new Date(c.createdOn).toLocaleString()}>
                          <CommentTime>{formatTime(c.createdOn)}</CommentTime>
                        </Tooltip>
                        {c.isOwner && !c.isDeleted && ticket.statusId !== TicketStatus.CLOSED && (
                          <Tooltip title="Delete comment">
                            <DeleteButton size="small" onClick={() => setDeleteTarget(c.commentId)}>
                              <DeleteOutlineRoundedIcon sx={{ fontSize: 15 }} />
                            </DeleteButton>
                          </Tooltip>
                        )}
                      </CommentMetaRight>
                    </CommentMeta>
                    <CommentText isDeleted={c.isDeleted ? 'true' : 'false'}>
                      {c.isDeleted ? 'This comment has been deleted.' : c.comment}
                    </CommentText>
                  </CommentBubble>
                </CommentRow>
              )
            })}
            <div ref={bottomRef} />
          </CommentList>
        )}

        {/* Input row */}
        {ticket.statusId !== TicketStatus.CLOSED && (
          <CommentInputRow>
            <SenderAvatar>{getInitials(currentUser)}</SenderAvatar>
            <TextField
              fullWidth
              size="small"
              multiline
              maxRows={4}
              placeholder="Write a comment… (Enter to send, Shift+Enter for new line)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={sending}
            />
            <Tooltip title="Send (Enter)">
              <span>
                <SendButton onClick={handleSend} disabled={!text.trim() || sending}>
                  <SendRoundedIcon sx={{ fontSize: 18 }} />
                </SendButton>
              </span>
            </Tooltip>
          </CommentInputRow>
        )}

      </CommentSectionRoot>

      <ConfirmationDialog
        open={Boolean(deleteTarget)}
        title="Delete Comment"
        message="Are you sure you want to delete this comment?"
        confirmLabel="Delete"
        variant="error"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}

export default CommentSection
