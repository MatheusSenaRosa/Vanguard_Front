/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useQuery } from "react-query";

import { Header, Footer, Comments } from "@organisms";
import { usePostServices } from "@services";
import { JavascriptIcon, JavaIcon } from "@svg/technologies";

import * as S from "./styles";

interface ITechnology {
  title: string;
  classes: string[];
  icon: any;
  id: number;
}

interface IClasses {
  className: string | string[];
}

export const ClassTemplate = ({ className }: IClasses) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<any>(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState<any>(false);

  const handleDropDownToggle = (cardId: number) => {
    setIsDropDownOpen((prevState: any) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };

  console.log(className);

  const mocks: ITechnology[] = [
    {
      title: "Javascript",
      classes: ["Aula 1 de JS - Como criar um arquivo html", "Aula 2 de JS - Como criar um arquivo js"],
      icon: <JavascriptIcon />,
      id: 1,
    },
    {
      title: "Java",
      classes: ["Aula 1 de JV - Como criar um arquivo html", "Aula 2 de JV - Como criar um arquivo jv"],
      icon: <JavaIcon />,
      id: 2,
    },
  ];

  const {
    deleteComment,
    createComment,
    updateComment,
    reportComment,
    createReply,
    deleteReply,
    updateReply,
    reportReply,
    getComments,
  } = usePostServices();

  const { data, isLoading, refetch, ...queryRest } = useQuery(`Post:Comments-${2}`, () => getComments("2"), {
    refetchOnWindowFocus: false,
  });

  const removeCommentHandler = async (commentId: number) => {
    await deleteComment(commentId);
    await refetch();
  };

  const removeReplyHandler = async (replyId: number) => {
    await deleteReply(replyId);
    await refetch();
  };

  const createCommentHandler = async (description: string) => {
    await createComment({
      description,
      postId: "2",
    });
    await refetch();
  };

  const updateCommentHandler = async (commentId: number, description: string) => {
    await updateComment({ commentId, description });
    await refetch();
  };

  const reportCommentHandler = async (commentId: number) => {
    await reportComment(commentId);
    await refetch();
  };

  const createReplyHandler = async (commentId: number, description: string) => {
    await createReply({
      description,
      commentId,
    });
    await refetch();
  };

  const updateReplyHandler = async (replyId: number, description: string) => {
    await updateReply({ replyId, description });
    await refetch();
  };

  const reportReplyHandler = async (replyId: number) => {
    await reportReply(replyId);
    await refetch();
  };

  const isCommentsError = queryRest.isError || queryRest.isLoadingError || queryRest.isRefetchError;

  return (
    <>
      <Header />

      <S.Main>
        <S.SideBar $isSideBarOpen={isSideBarOpen}>
          <S.SideBarToggleButton onClick={() => setIsSideBarOpen((prev: boolean) => !prev)}>
            <S.SideBarToggleButtonIcon $dropDownState={isSideBarOpen} />
          </S.SideBarToggleButton>
          {mocks.map((mock) => (
            <S.TechnologyCard key={mock.id} $isSideBarOpen={isSideBarOpen}>
              <S.TechnologyCardTitle onClick={() => handleDropDownToggle(mock.id)}>
                <S.TechnologyCardPresentation>
                  <span>{mock.title}</span>
                  {mock.icon}
                </S.TechnologyCardPresentation>
                <S.Dropdown title="Expandir">
                  <S.DropdownButtonIcon $dropDownState={isDropDownOpen[mock.id]} />
                </S.Dropdown>
              </S.TechnologyCardTitle>
              <S.ClassList $isDropDownOpen={isDropDownOpen[mock.id]}>
                {mock.classes.map((mockClass, i) => (
                  <S.TechnologyCardItem key={i} $isCurrentClass={false}>
                    {mockClass}
                  </S.TechnologyCardItem>
                ))}
              </S.ClassList>
            </S.TechnologyCard>
          ))}
        </S.SideBar>
        <S.Content>
          <S.ContentTitle>Trilha front-end</S.ContentTitle>
          <S.ClassTitle>Aula 1 de JS - como criar um arquivo js</S.ClassTitle>

          <S.Video width="100%" height="600" controls>
            <source src="/caminho/do/seu/video.mp4" type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </S.Video>

          <S.ClassText>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard
            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          </S.ClassText>

          {!isCommentsError && (
            <Comments
              isLoading={isLoading}
              comments={data}
              onCreate={{
                comment: createCommentHandler,
                reply: createReplyHandler,
              }}
              onRemove={{
                comment: removeCommentHandler,
                reply: removeReplyHandler,
              }}
              onReport={{
                comment: reportCommentHandler,
                reply: reportReplyHandler,
              }}
              onUpdate={{
                comment: updateCommentHandler,
                reply: updateReplyHandler,
              }}
            />
          )}
        </S.Content>
      </S.Main>
      <Footer />
    </>
  );
};
