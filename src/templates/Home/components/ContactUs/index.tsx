import Link from "next/link";

import * as Icons from "@svg/socialMedias";

import * as S from "./styles";

export const ContactUs = () => (
  <S.Container>
    <S.Content>
      <h2>Nossas redes sociais</h2>

      <S.SocialMedia>
        <Link href="/">
          <S.SocialMediaLinkContent>
            WhatsApp <Icons.WhatsappIcon />
          </S.SocialMediaLinkContent>
        </Link>

        <Link href="/">
          <S.SocialMediaLinkContent>
            Facebook <Icons.FacebookIcon />
          </S.SocialMediaLinkContent>
        </Link>

        <Link href="/">
          <S.SocialMediaLinkContent>
            Youtube <Icons.YoutubeIcon />
          </S.SocialMediaLinkContent>
        </Link>

        <Link href="/">
          <S.SocialMediaLinkContent>
            Email <Icons.OutlookIcon />
          </S.SocialMediaLinkContent>
        </Link>

        <Link href="/">
          <S.SocialMediaLinkContent>
            Tik tok <Icons.TiktokIcon />
          </S.SocialMediaLinkContent>
        </Link>

        <Link href="/">
          <S.SocialMediaLinkContent>
            Instagram <Icons.InstagramIcon />
          </S.SocialMediaLinkContent>
        </Link>

        <Link href="/">
          <S.SocialMediaLinkContent>
            Twitter <Icons.TwitterIcon />
          </S.SocialMediaLinkContent>
        </Link>
      </S.SocialMedia>
    </S.Content>
  </S.Container>
);
