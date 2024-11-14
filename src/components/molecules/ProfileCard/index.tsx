import { User } from "phosphor-react";
import { useMemo, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi";

import { months } from "@utils";

import { EditProfileModal } from "./components/EditProfileModal";
import * as S from "./styles";
import { IMe } from "./types";
import { formatUserLocation } from "./utils";

type Props = {
  data: IMe;
  readOnly?: boolean;
  refetch?: () => void;
};

export const ProfileCard = ({ data, readOnly, refetch }: Props) => {
  const [isModal, setIsModal] = useState(false);

  const onCloseModal = () => {
    refetch();
    setIsModal(false);
  };

  const formattedData = useMemo(() => {
    const hasSocialMediaValue = data?.linkedIn || data?.gitHub;
    const monthIndex = data.createdAt.getMonth();
    const year = data.createdAt.getFullYear();
    const createdAt = `${months[monthIndex]} de ${year}`;

    return {
      hasSocialMedia: hasSocialMediaValue,
      createdAt,
      location: formatUserLocation(data),
    };
  }, [data]);

  const { hasSocialMedia, createdAt, location } = formattedData;

  return (
    <>
      <S.ProfileCard>
        {!readOnly && (
          <S.EditButton data-cy="edit" title="Editar" onClick={() => setIsModal(true)}>
            <HiOutlinePencil />
          </S.EditButton>
        )}
        {false && (
          <S.ProfilePicture
            width={120}
            height={120}
            src="https://pps.whatsapp.net/v/t61.24694-24/352705332_856588909308652_8621470647072170993_n.jpg?ccb=11-4&oh=01_AdSOuWOPe9Ws9r5y6w87CSBJMJTWUMMLwKuZ2U5SAhMT_A&oe=64B29AD5"
            alt="Foto de perfil"
          />
        )}

        {true && (
          <S.EmptyProfilePicture>
            <User />
          </S.EmptyProfilePicture>
        )}

        <div>
          <h3>{data.name}</h3>
          <h4>{data.occupation?.description}</h4>
          {data?.localization.country && <h4>{location}</h4>}

          {hasSocialMedia && (
            <S.ProfileMedia>
              {data.linkedIn && (
                <a href={data.linkedIn} target="_blank" title="LinkedIn">
                  <FaLinkedin />
                </a>
              )}

              {data.gitHub && (
                <a href={data.gitHub} target="_blank" title="GitHub">
                  <FaGithub />
                </a>
              )}
            </S.ProfileMedia>
          )}

          <h4>Conta criada em {createdAt}</h4>
        </div>
      </S.ProfileCard>
      {data && <EditProfileModal me={data} isOpen={isModal} onClose={onCloseModal} />}
    </>
  );
};
