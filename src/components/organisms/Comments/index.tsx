import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillWarning } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { toast } from "react-toastify";

import { Spinner } from "@atoms";
import { LargeLogoImg } from "@img/logos";
import { AlertDialog } from "@molecules";
import { useSession } from "@store";
import { ptbr, routes } from "@utils";

import { Skeleton } from "./components";
import * as S from "./styles";
import {
  Editing,
  IComment,
  ICommentForm,
  IEditingForm,
  IReplyForm,
  Modal,
  OnCreate,
  OnRemove,
  OnReport,
  OnUpdate,
} from "./types";

type Props = {
  comments: IComment[];
  onCreate: OnCreate;
  onUpdate: OnUpdate;
  onRemove: OnRemove;
  onReport: OnReport;
  isLoading: boolean;
};

export const Comments = ({ comments, onCreate, onRemove, onReport, onUpdate, isLoading }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentIdToReply, setCommentIdToReply] = useState<string>(null);
  const [modal, setModal] = useState<Modal>(null);
  const [editing, setEditing] = useState<Editing>(null);

  const replyRef = useRef<HTMLDivElement>(null);

  const { user } = useSession();
  const { push } = useRouter();

  const commentForm = useForm<ICommentForm>();
  const replyForm = useForm<IReplyForm>();
  const editingForm = useForm<IEditingForm>();

  const clearAfterRemove = () => {
    if (!modal?.replyId) {
      if (modal.commentId === editing?.commentId) {
        setEditing(null);
        editingForm.reset();
        return;
      }

      if (modal.commentId === commentIdToReply) {
        setCommentIdToReply(null);
        replyForm.reset();
      }
    }

    setModal(null);
  };

  const onRemoveHandler = async () => {
    setModal((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      if (modal?.commentId && !modal?.replyId) await onRemove.comment(modal.commentId);

      if (modal?.replyId) await onRemove.reply(modal.replyId);

      clearAfterRemove();
      toast.success("Comentário removido com sucesso!");
    } catch {
      toast.error("Ocorreu um erro ao tentar remover o comentário.");

      setModal((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const onReportHandler = async () => {
    setModal((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      if (modal?.commentId && !modal?.replyId) await onReport.comment(modal?.commentId);

      if (modal?.replyId) await onReport.reply(modal?.replyId);

      setModal(null);
      toast.success("Comentário reportado com sucesso!");
    } catch (err) {
      setModal((prev) => ({
        ...prev,
        isLoading: false,
      }));

      const errorMessage = ptbr.errors.posts.comments.report(err as string);

      if (!errorMessage) {
        toast.error("Ocorreu um erro ao tentar reportar o comentário.");
        return;
      }

      toast.warn(errorMessage);
    }
  };

  const onReplyHandler = async ({ reply }: IReplyForm) => {
    setIsSubmitting(true);

    try {
      await onCreate.reply(commentIdToReply as string, reply);

      setCommentIdToReply(null);
      replyForm.reset();
      toast.success("Comentário respondido com sucesso!");
    } catch {
      toast.error("Ocorreu um erro ao tentar responder o comentário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCommentHandler = async ({ comment }: ICommentForm) => {
    setIsSubmitting(true);

    try {
      await onCreate.comment(comment);

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
      commentForm.setValue("comment", "");
      toast.success("Comentário criado com sucesso!");
    } catch {
      toast.error("Ocorreu um erro ao tentar criar o comentário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClickReply = (commentId: string) => {
    setCommentIdToReply(commentId);
    setEditing(null);

    setTimeout(() => {
      replyRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }, 100);
  };

  const onEditHandler = async ({ editing: description }: IEditingForm) => {
    setIsSubmitting(true);

    try {
      if (editing?.commentId && !editing?.replyId) await onUpdate.comment(editing.commentId, description);

      if (editing?.replyId) await onUpdate.reply(editing.replyId, description);

      setEditing(null);
      editingForm.reset();
      toast.success("Comentário editado com sucesso!");
    } catch {
      toast.error("Ocorreu um erro ao tentar editar o comentário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCanEditRemoveOrAnswer = (commentId: string, authorId: string, isReply?: boolean) => {
    // Block unlogged user actions
    if (user?.id !== authorId) return false;

    // Block actions in current editing REPLY
    if (isReply && editing?.replyId === commentId) return false;

    // Allow actions in comments if user is editing a reply
    if (!isReply && editing?.replyId) return true;

    // Block actions in current editing COMMENT
    if (editing?.commentId === commentId) return false;

    return true;
  };

  const getCanReport = (commentId: string, authorId: string, isReply?: boolean) => {
    // Block unlogged user actions
    if (user?.id !== authorId) return true;

    // Block actions in current editing REPLY
    if (isReply && editing?.replyId === commentId) return false;

    // Allow actions in comments if user is editing a reply
    if (!isReply && editing?.replyId) return true;

    // Block actions in current editing COMMENT
    if (editing?.commentId === commentId) return false;

    return false;
  };

  if (!user) {
    return (
      <S.Container>
        <h2>Comentários</h2>

        <S.InfoBanner data-cy="login-redirect" onClick={() => push(routes.authentication.login)}>
          Faça Login para interagir com os comentários!
        </S.InfoBanner>

        {comments?.map((comment) => (
          <S.Comment key={comment.id}>
            <S.MainCommentary>
              <S.Infos>
                <S.Avatar src={LargeLogoImg} width={50} height={50} alt="Avatar" />
                <S.Content>
                  <S.Username href={"/"}>{comment?.customer?.name || comment?.manager?.name}</S.Username>

                  <span>{comment.description}</span>
                </S.Content>
              </S.Infos>
            </S.MainCommentary>

            <S.ReplyContainer>
              {comment.replies.map((reply) => (
                <S.Reply key={reply.id}>
                  <S.Infos>
                    <S.Avatar src={LargeLogoImg} width={50} height={50} alt="User avatar" />
                    <S.Content>
                      <S.Username href={"/"}>{reply?.customer?.name || reply?.manager?.name}</S.Username>

                      <span>{reply.description}</span>
                    </S.Content>
                  </S.Infos>
                </S.Reply>
              ))}
            </S.ReplyContainer>
          </S.Comment>
        ))}
      </S.Container>
    );
  }

  if (isLoading) {
    return (
      <S.Container>
        <h2>Comentários</h2>

        <Skeleton />
      </S.Container>
    );
  }

  return (
    <>
      <S.Container>
        <h2>Comentários</h2>

        {isSubmitting && (
          <S.SpinnerContainer>
            <Spinner size={40} />
          </S.SpinnerContainer>
        )}

        <S.CommentCreationContainer>
          <S.TextCreationArea data-cy="comment" placeholder="O que você está pensando?" {...commentForm.register("comment")} />
          <S.ButtonsContainer>
            <S.Button
              data-cy="comment-submit"
              onClick={commentForm.handleSubmit(onCommentHandler)}
              disabled={!commentForm.watch("comment")?.trim()}
            >
              Comentar
            </S.Button>
          </S.ButtonsContainer>
        </S.CommentCreationContainer>

        {comments?.map((comment) => (
          <S.Comment key={comment.id}>
            <S.MainCommentary>
              <S.Infos>
                <S.Avatar src={LargeLogoImg} width={50} height={50} alt="Avatar" />
                <S.Content>
                  <S.Username
                    title={comment?.customer?.name || comment?.manager?.name}
                    href={`/usuario/${comment?.customer?.id || comment?.manager?.id}`}
                  >
                    {comment?.customer?.name || comment?.manager?.name}
                  </S.Username>

                  {editing?.commentId === comment.id && !editing?.replyId ? (
                    <S.CommentCreationContainer>
                      <S.TextCreationArea
                        data-cy="edit-comment"
                        {...editingForm.register("editing")}
                        placeholder="Digite seu comentário..."
                      />
                      <S.ButtonsContainer>
                        <S.Button $buttonTheme="cancel" onClick={() => setEditing(null)}>
                          Cancelar
                        </S.Button>
                        <S.Button
                          data-cy="edit-comment-submit"
                          disabled={!editingForm.watch("editing")?.trim()}
                          onClick={editingForm.handleSubmit(onEditHandler)}
                        >
                          Confirmar
                        </S.Button>
                      </S.ButtonsContainer>
                    </S.CommentCreationContainer>
                  ) : (
                    <span>{comment.description}</span>
                  )}

                  <S.Actions>
                    <>
                      <S.ReplyButton data-cy="reply-button" onClick={() => onClickReply(comment.id)}>
                        Responder <S.ArrowDown />
                      </S.ReplyButton>
                      <div>
                        {getCanEditRemoveOrAnswer(comment.id, comment?.customer?.id) && (
                          <>
                            <S.Edit
                              title="Editar"
                              data-cy="edit-comment-button"
                              onClick={() => {
                                setCommentIdToReply(null);
                                replyForm.reset();

                                setEditing({
                                  commentId: comment.id,
                                });
                                editingForm.setValue("editing", comment.description);
                              }}
                            >
                              <HiOutlinePencil />
                            </S.Edit>

                            <S.Delete
                              title="Excluir"
                              data-cy="delete-comment"
                              onClick={() =>
                                setModal({
                                  action: "remove",
                                  commentId: comment.id,
                                  isLoading: false,
                                })
                              }
                            >
                              <BsFillTrash3Fill />
                            </S.Delete>
                          </>
                        )}
                        {getCanReport(comment.id, comment?.customer?.id, false) && (
                          <S.Report
                            title="Denunciar"
                            data-cy="report-comment"
                            onClick={() =>
                              setModal({
                                action: "report",
                                commentId: comment.id,
                                isLoading: false,
                              })
                            }
                          >
                            <AiFillWarning />
                          </S.Report>
                        )}
                      </div>
                    </>
                  </S.Actions>
                </S.Content>
              </S.Infos>
            </S.MainCommentary>

            <S.ReplyContainer>
              {comment.replies.map((reply) => (
                <S.Reply key={reply.id}>
                  <S.Infos>
                    <S.Avatar src={LargeLogoImg} width={50} height={50} alt="User avatar" />
                    <S.Content>
                      <S.Username
                        title={reply?.customer?.name || reply?.manager?.name}
                        href={`/usuario/${reply?.customer?.id || reply?.manager?.id}`}
                      >
                        {reply?.customer?.name || reply?.manager?.name}
                      </S.Username>

                      {editing?.replyId === reply.id ? (
                        <S.CommentCreationContainer>
                          <S.TextCreationArea
                            data-cy="edit-reply"
                            placeholder="Digite sua resposta..."
                            $isReply
                            {...editingForm.register("editing")}
                          />
                          <S.ButtonsContainer>
                            <S.Button $isReply $buttonTheme="cancel" onClick={() => setEditing(null)}>
                              Cancelar
                            </S.Button>
                            <S.Button
                              $isReply
                              data-cy="edit-reply-submit"
                              disabled={!editingForm.watch("editing")?.trim()}
                              onClick={editingForm.handleSubmit(onEditHandler)}
                            >
                              Confirmar
                            </S.Button>
                          </S.ButtonsContainer>
                        </S.CommentCreationContainer>
                      ) : (
                        <span>{reply.description}</span>
                      )}

                      <S.Actions $isReply>
                        {getCanEditRemoveOrAnswer(reply.id, reply?.customer?.id, true) && (
                          <>
                            <S.Edit
                              title="Editar"
                              data-cy="edit-reply-button"
                              onClick={() => {
                                setCommentIdToReply(null);
                                replyForm.reset();

                                setEditing({
                                  commentId: comment.id,
                                  replyId: reply.id,
                                });
                                editingForm.setValue("editing", reply.description);
                              }}
                            >
                              <HiOutlinePencil />
                            </S.Edit>

                            <S.Delete
                              title="Excluir"
                              data-cy="delete-reply"
                              onClick={() =>
                                setModal({
                                  action: "remove",
                                  commentId: comment.id,
                                  replyId: reply.id,
                                  isLoading: false,
                                })
                              }
                            >
                              <BsFillTrash3Fill />
                            </S.Delete>
                          </>
                        )}

                        {getCanReport(reply.id, reply?.customer?.id, true) && (
                          <S.Report
                            title="Denunciar"
                            data-cy="report-reply"
                            onClick={() =>
                              setModal({
                                action: "report",
                                commentId: comment.id,
                                replyId: reply.id,
                                isLoading: false,
                              })
                            }
                          >
                            <AiFillWarning />
                          </S.Report>
                        )}
                      </S.Actions>
                    </S.Content>
                  </S.Infos>
                </S.Reply>
              ))}

              {commentIdToReply === comment.id && (
                <S.CommentCreationContainer $isReply ref={replyRef}>
                  <S.TextCreationArea data-cy="reply" placeholder="Digite sua resposta..." {...replyForm.register("reply")} />
                  <S.ButtonsContainer>
                    <S.Button
                      $buttonTheme="cancel"
                      onClick={() => {
                        setCommentIdToReply(null);
                        replyForm.reset();
                      }}
                    >
                      Cancelar
                    </S.Button>
                    <S.Button
                      data-cy="reply-submit"
                      disabled={!replyForm.watch("reply")?.trim()}
                      onClick={replyForm.handleSubmit(onReplyHandler)}
                    >
                      Confirmar
                    </S.Button>
                  </S.ButtonsContainer>
                </S.CommentCreationContainer>
              )}
            </S.ReplyContainer>
          </S.Comment>
        ))}
      </S.Container>

      <AlertDialog
        isOpen={Boolean(modal)}
        confirmationText={modal?.action === "report" ? "Denunciar" : "Remover"}
        isLoading={modal?.isLoading}
        onClose={() => setModal(null)}
        onConfirm={modal?.action === "remove" ? onRemoveHandler : onReportHandler}
        description={`Realmente deseja ${modal?.action === "report" ? "denunciar" : "remover"} o comentário?`}
      />
    </>
  );
};
