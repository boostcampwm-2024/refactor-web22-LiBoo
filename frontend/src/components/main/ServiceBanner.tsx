import { motion } from 'framer-motion';
import styled from 'styled-components';

const keywords = [
  { text: 'Conference', gradient: 'linear-gradient(90deg, #FF0066, #FF9999)' },
  { text: 'Development', gradient: 'linear-gradient(90deg, #FF6B00, #FFD700)' },
  { text: 'Growth', gradient: 'linear-gradient(90deg, #FFD700, #FFFF66)' },
  { text: 'Innovation', gradient: 'linear-gradient(90deg, #6600FF, #CC99FF)' },
  { text: 'Technology', gradient: 'linear-gradient(90deg, #FF00CC, #FFCCFF)' },
  { text: 'Workshop', gradient: 'linear-gradient(90deg, #00FFCC, #66FFE6)' },
  { text: 'Networking', gradient: 'linear-gradient(90deg, #FF3366, #FF99CC)' },
  { text: 'Leadership', gradient: 'linear-gradient(90deg, #9933FF, #CC99FF)' },
  { text: 'Creativity', gradient: 'linear-gradient(90deg, #FF9900, #FFCC66)' },
  { text: 'Learning', gradient: 'linear-gradient(90deg, #33CC33, #99FF99)' },
  { text: 'Strategy', gradient: 'linear-gradient(90deg, #3366FF, #99CCFF)' },
  { text: 'Mentoring', gradient: 'linear-gradient(90deg, #FF6699, #FFCCCC)' },
  { text: 'Agile', gradient: 'linear-gradient(90deg, #00CC99, #66FFB2)' },
  { text: 'Scaling', gradient: 'linear-gradient(90deg, #FF9933, #FFCC99)' },
  { text: 'Community', gradient: 'linear-gradient(90deg, #6633FF, #CC99FF)' }
];

interface GradientTextProps {
  gradient: string;
}

const ServiceBanner = () => {
  return (
    <BannerContainer>
      <ContentWrapper>
        <AnimatedContainer>
          <TextContainer
            initial={{ x: '0%' }}
            animate={{ x: `-${100 / 3}%` }}
            transition={{
              x: {
                duration: 60,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop'
              }
            }}
          >
            {[...Array(4)].map((_, setIndex) =>
              keywords.map(({ text, gradient }, index) => (
                <GradientText key={`set-${setIndex}-keyword-${index}`} gradient={gradient}>
                  {text}
                </GradientText>
              ))
            )}
          </TextContainer>
        </AnimatedContainer>
      </ContentWrapper>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  position: relative;
  height: 5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #1a1a1a;
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const AnimatedContainer = styled.div`
  position: absolute;
  display: flex;
  flex: 1;
  width: 100%;
`;

const TextContainer = styled(motion.div)`
  display: flex;
  white-space: nowrap;
`;

const GradientText = styled.div<GradientTextProps>`
  font-family: 'NanumSquare', sans-serif;
  font-weight: 800;
  flex-shrink: 0;
  font-size: 2rem;
  margin-right: 3rem;
  background-image: ${({ gradient }) => gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
`;

export default ServiceBanner;
