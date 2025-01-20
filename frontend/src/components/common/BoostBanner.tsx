import styled from 'styled-components';

import { ASSETS } from '@constants/assets';

const BoostBanner = () => {
  return (
    <BannerLink href="https://boostcamp.connect.or.kr/" target="_blank" rel="noopener noreferrer">
      <Banner src={ASSETS.IMAGES.BANNER.CLIENT} alt="Client Banner" />
    </BannerLink>
  );
};

export default BoostBanner;

const BannerLink = styled.a`
  display: block;
  margin-top: 24px;
  border-radius: 7px;
  overflow: hidden;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Banner = styled.img`
  width: 100%;
  aspect-ratio: 16 / 2;
  object-fit: cover;
  display: block;
`;
